/* eslint-env node */
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  let token;

  // 1️⃣ check Authorization header
  if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
) {
  token = req.headers.authorization.split(" ")[1];
}

if (!token && req.cookies?.token) {
  token = req.cookies.token;
}

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(401).json({ message: "Invalid token" });
  }

};