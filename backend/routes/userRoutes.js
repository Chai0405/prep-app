import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile, updateAvatar } from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.put("/avatar", protect, updateAvatar);

export default router;