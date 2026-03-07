import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  cuisine: String,
  mealType: String,
  calories: Number,
  time: String,
  difficulty: String,
  ingredients: [String],
  instructions: [String],
  tags: [String]
});

export default mongoose.model("Recipe", recipeSchema);