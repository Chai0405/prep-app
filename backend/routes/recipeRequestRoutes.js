import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRecipeRequest } from "../controllers/recipeRequestController.js";

const router = express.Router();

router.post("/", protect, createRecipeRequest);

export default router;
