/* eslint-env node */
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

  let token;

  // 1️⃣ check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ fall back to the httpOnly cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Tokens die with the account, and with every password change
    const user = await User.findById(decoded.id).select("tokenVersion");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Tokens from before this field existed carry no version and count as 0
    if ((decoded.v || 0) !== (user.tokenVersion || 0)) {
      return res.status(401).json({ message: "Session expired. Please sign in again." });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("Auth check failed:", err);
    return res.status(500).json({ message: "Server error" });
  }

};
