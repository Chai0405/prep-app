import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToPlanner, getPlanner } from "../controllers/plannerController.js";

const router = express.Router();

router.post("/", protect, addToPlanner);
router.get("/", protect, getPlanner);

export default router;