import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile, updateAvatar, deleteAccount } from "../controllers/userController.js";

const router = express.Router();

// Deletion checks the password, so limit guessing like the login route
const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skip: () => process.env.DISABLE_RATE_LIMIT === "true",
  message: { message: "Too many attempts. Please try again later." }
});

router.put("/profile", protect, updateProfile);
router.put("/avatar", protect, updateAvatar);
router.delete("/", deleteLimiter, protect, deleteAccount);

export default router;