import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToPlanner, getPlanner, addMealToPlanner } from "../controllers/plannerController.js";

const router = express.Router();

router.post("/", protect, addToPlanner);
router.post("/add", protect, addMealToPlanner);
router.get("/", protect, getPlanner);

export default router;