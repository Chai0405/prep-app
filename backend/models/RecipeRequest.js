import mongoose from "mongoose";

// A recipe a user asked for that isn't on PREP yet
const recipeRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    details: { type: String, trim: true, maxlength: 1000, default: "" },
    status: { type: String, enum: ["open", "added", "declined"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("RecipeRequest", recipeRequestSchema);
