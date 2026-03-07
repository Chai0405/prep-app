import mongoose from "mongoose";

const mealSchema = {
  breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  snacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
};

const plannerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    weekStart: {
      type: Date,
      required: true
    },
    meals: {
      monday: mealSchema,
      tuesday: mealSchema,
      wednesday: mealSchema,
      thursday: mealSchema,
      friday: mealSchema,
      saturday: mealSchema,
      sunday: mealSchema
    }
  },
  { timestamps: true }
);

export default mongoose.model("Planner", plannerSchema);