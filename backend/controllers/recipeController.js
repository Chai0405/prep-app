import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
};