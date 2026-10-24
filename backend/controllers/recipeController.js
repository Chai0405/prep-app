import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error("Get recipes error:", err);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    console.error("Get recipe error:", err);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
};
