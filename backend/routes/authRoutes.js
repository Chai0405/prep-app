import express from "express";
import { registerUser, loginUser, getMe, logoutUser, changePassword, verifyEmailController, forgotPassword, resetPasswordController } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/logout", logoutUser);
router.put("/password", protect, changePassword);
router.put("/update", protect, updateProfile);
router.get("/verify-email/:token", verifyEmailController);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPasswordController);

export default router;