import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  name: String,
  checked: { type: Boolean, default: false }
});

const grocerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [groceryItemSchema]
});

export default mongoose.model("Grocery", grocerySchema);