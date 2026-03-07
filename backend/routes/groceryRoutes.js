import express from "express";
import { getGrocery, updateGrocery } from "../controllers/groceryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getGrocery);
router.post("/", protect, updateGrocery);

export default router;