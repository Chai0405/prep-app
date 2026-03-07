/* eslint-env node */

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import verifyEmail from "../emails/verifyEmail.js";
import resetPassword from "../emails/resetPassword.js";
import resetNewPassword from "../emails/resetNewPassword.js";
import welcomeEmail from "../emails/welcomeEmail.js";
import newsletterEmail from "../emails/newsletterEmail.js";

import sendEmail from "../utils/sendEmail.js";

/*
================================
REGISTER
================================
*/

export const registerUser = async (req, res) => {

try {

const { name, email, password } = req.body;

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

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user)
return res.status(400).json({ message: "Invalid credentials" });

if (!user.isVerified)
return res.status(401).json({
message: "Please verify your email first"
});

const match = await bcrypt.compare(password, user.password);

if (!match)
return res.status(400).json({ message: "Invalid credentials" });

const token = jwt.sign(
{ id: user._id },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
});

res.json({
success: true,
token,
user: {
id: user._id,
name: user.name,
email: user.email
}
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

const user = await User
.findById(req.user)
.select("-password");

if (!user)
return res.status(404).json({ message: "User not found" });

res.json(user);

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

res.cookie("token", "", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(0),
});

res.json({ success: true });

};



/*
================================
CHANGE PASSWORD
================================
*/

export const changePassword = async (req, res) => {

try {

const user = await User.findById(req.user);

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

await user.save();

res.json({ success: true });

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

const {email} = req.body;

const user = await User.findOne({email});

if(!user)
return res.status(404).json({message:"User not found"});

const resetToken = crypto.randomBytes(32).toString("hex");

user.resetToken = resetToken;
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

res.json({
message:"Reset email sent"
});

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

const user = await User.findOne({
resetToken:token,
resetTokenExpire:{$gt:Date.now()}
});

if(!user)
return res.status(400).json({
message:"Token expired"
});

user.password = await bcrypt.hash(password,10);

user.resetToken = undefined;
user.resetTokenExpire = undefined;

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



/*
================================
NEWSLETTER EMAIL
================================
*/

export const sendNewsletter = async (req,res)=>{

try{

const users = await User.find({ isVerified: true });

for(const user of users){

try {

await sendEmail(
user.email,
"What's new in PREP",
newsletterEmail()
);

} catch (mailError) {

console.error("Newsletter email failed:", mailError);

}

}

res.json({ message:"Newsletter sent successfully" });

}catch(err){

console.error(err);

res.status(500).json({ message:"Newsletter failed" });

}

};



/*
================================
SUBSCRIBE NEWSLETTER
================================
*/

export const subscribeNewsletter = async (req,res)=>{

try{

const { email } = req.body;

try {

await sendEmail(
email,
"What's new in PREP",
newsletterEmail()
);

} catch (mailError) {

console.error("Newsletter send failed:", mailError);

}

res.json({ message:"Newsletter sent successfully" });

}catch(err){

console.error(err);

res.status(500).json({ message:"Newsletter failed" });

}

};