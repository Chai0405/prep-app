/* eslint-env node */
import jwt from "jsonwebtoken";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

// Signs a JWT for the user, sets it as an httpOnly cookie and returns it
// (the frontend also keeps it for the Authorization header).
export const issueSession = (res, user) => {
  const token = jwt.sign(
    { id: user._id, v: user.tokenVersion || 0 },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, COOKIE_OPTIONS);

  return token;
};

export const clearSession = (res) => {
  res.cookie("token", "", { ...COOKIE_OPTIONS, expires: new Date(0) });
};

// Never send hashes, one-time tokens or session internals to the client
export const toSafeUser = (user) => {
  const {
    password, verifyToken, resetToken, resetTokenExpire, tokenVersion, ...safeUser
  } = user.toObject();
  return safeUser;
};

// Public shape of the user returned by login endpoints
export const sessionUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});
