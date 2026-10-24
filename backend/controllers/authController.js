/* eslint-env node */

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import verifyEmail from "../emails/verifyEmail.js";
import resetPassword from "../emails/resetPassword.js";
import resetNewPassword from "../emails/resetNewPassword.js";
import welcomeEmail from "../emails/welcomeEmail.js";

import sendEmail from "../utils/sendEmail.js";
import { issueSession, clearSession, sessionUser, toSafeUser } from "../utils/session.js";

const MIN_PASSWORD_LENGTH = 10;

const normalizeEmail = (email) =>
typeof email === "string" ? email.trim().toLowerCase() : "";

// Reset tokens are stored hashed so a leaked database can't be used to reset passwords
const hashToken = (token) =>
crypto.createHash("sha256").update(token).digest("hex");

/*
================================
REGISTER
================================
*/

export const registerUser = async (req, res) => {

try {

const { name, password } = req.body;
const email = normalizeEmail(req.body.email);

if (!name || !email || !password)
return res.status(400).json({ message: "Name, email and password are required" });

if (password.length < MIN_PASSWORD_LENGTH)
return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });

const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({ message: "Email already registered" });
}

const hashedPassword = await bcrypt.hash(password, 10);

const verifyToken = crypto.randomBytes(32).toString("hex");

await User.create({
name,
email,
password: hashedPassword,
verifyToken
});

const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

try {

await sendEmail(
email,
"Verify your email",
verifyEmail(name, verifyLink)
);

} catch (mailError) {

console.error("Verification email failed:", mailError);

}

res.status(201).json({
message: "Account created. Please verify your email."
});

} catch (error) {

console.error("Register error:", error);

res.status(500).json({
message: "Registration failed"
});

}

};



/*
================================
LOGIN
================================
*/

export const loginUser = async (req, res) => {

try {

const { password } = req.body;
const email = normalizeEmail(req.body.email);

if (!email || !password)
return res.status(400).json({ message: "Invalid credentials" });

const user = await User.findOne({ email });

if (!user)
return res.status(400).json({ message: "Invalid credentials" });

const match = await bcrypt.compare(password, user.password);

if (!match)
return res.status(400).json({ message: "Invalid credentials" });

if (!user.isVerified)
return res.status(401).json({
message: "Please verify your email first"
});

const token = issueSession(res, user);

res.json({
success: true,
token,
user: sessionUser(user)
});

} catch (err) {

console.error("Login error:", err);

res.status(500).json({ message: "Login failed" });

}

};



/*
================================
GET CURRENT USER
================================
*/

export const getMe = async (req, res) => {

try {

const user = await User.findById(req.user);

if (!user)
return res.status(404).json({ message: "User not found" });

res.json(toSafeUser(user));

} catch (err) {

console.error(err);

res.status(500).json({ message: "Server error" });

}

};



/*
================================
LOGOUT
================================
*/

export const logoutUser = (req, res) => {

clearSession(res);

res.json({ success: true });

};



/*
================================
CHANGE PASSWORD
================================
*/

export const changePassword = async (req, res) => {

try {

if (!req.body.current || !req.body.newPassword)
return res.status(400).json({ message: "Current and new password are required" });

if (req.body.newPassword.length < MIN_PASSWORD_LENGTH)
return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });

const user = await User.findById(req.user);

if (!user)
return res.status(404).json({ message: "User not found" });

const match = await bcrypt.compare(
req.body.current,
user.password
);

if (!match)
return res.status(400).json({ message: "Wrong password" });

user.password = await bcrypt.hash(
req.body.newPassword,
10
);

// Signs out every other session; this one gets a fresh token
user.tokenVersion = (user.tokenVersion || 0) + 1;

await user.save();

const token = issueSession(res, user);

res.json({ success: true, token });

} catch (err) {

console.error(err);

res.status(500).json({ message: "Password change failed" });

}

};



/*
================================
FORGOT PASSWORD
================================
*/

export const forgotPassword = async (req,res)=>{

try{

const email = normalizeEmail(req.body.email);

const genericResponse = {
message:"If an account exists for this email, a reset link has been sent"
};

const user = email ? await User.findOne({email}) : null;

if(!user)
return res.json(genericResponse);

const resetToken = crypto.randomBytes(32).toString("hex");

user.resetToken = hashToken(resetToken);
user.resetTokenExpire = Date.now() + 10*60*1000;

await user.save();

const resetLink =
`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

try {

await sendEmail(
user.email,
"Reset your password",
resetPassword(resetLink)
);

} catch (mailError) {

console.error("Reset email failed:", mailError);

}

res.json(genericResponse);

}catch(err){

console.error(err);

res.status(500).json({
message:"Error sending reset email"
});

}

};



/*
================================
RESET PASSWORD
================================
*/

export const resetPasswordController = async (req,res)=>{

try{

const {token} = req.params;
const {password} = req.body;

if(!password || password.length < MIN_PASSWORD_LENGTH)
return res.status(400).json({
message:`Password must be at least ${MIN_PASSWORD_LENGTH} characters`
});

const user = await User.findOne({
resetToken:hashToken(token),
resetTokenExpire:{$gt:Date.now()}
});

if(!user)
return res.status(400).json({
message:"Reset link is invalid or has expired"
});

user.password = await bcrypt.hash(password,10);

user.resetToken = undefined;
user.resetTokenExpire = undefined;
user.tokenVersion = (user.tokenVersion || 0) + 1;

await user.save();

try {

await sendEmail(
user.email,
"Password changed",
resetNewPassword(user.name)
);

} catch (mailError) {

console.error("Password change email failed:", mailError);

}

res.json({
message:"Password updated"
});

}catch(err){

console.error(err);

res.status(500).json({
message:"Password reset failed"
});

}

};



/*
================================
VERIFY EMAIL
================================
*/

export const verifyEmailController = async (req,res)=>{

try{

const { token } = req.params;

const user = await User.findOne({ verifyToken: token });

if(!user){
return res.status(200).json({
message:"Email already verified"
});
}

user.verifyToken = undefined;
user.isVerified = true;

await user.save();

try {

await sendEmail(
user.email,
"Welcome to PREP",
welcomeEmail(user.name)
);

} catch (mailError) {

console.error("Welcome email failed:", mailError);

}

res.json({
message:"Email verified successfully"
});

}catch(err){

console.error(err);

res.status(500).json({
message:"Verification failed"
});

}

};
