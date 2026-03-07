import Grocery from "../models/Grocery.js";

/* =========================
   GET GROCERY
========================= */
export const getGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findOne({ user: req.user });

    if (!grocery) {
      return res.json({ items: [] });
    }

    res.json({ items: grocery.items });
  } catch (err) {
    console.error("Get grocery error:", err);
    res.status(500).json({ message: "Failed to fetch grocery" });
  }
};

/* =========================
   UPDATE GROCERY
========================= */
export const updateGrocery = async (req, res) => {
  try {
    const { items } = req.body;

    const grocery = await Grocery.findOneAndUpdate(
      { user: req.user },
      { items },
      { returnDocument: "after" }
    );

    res.json({ items: grocery.items });
  } catch (err) {
    console.error("Update grocery error:", err);
    res.status(500).json({ message: "Failed to update grocery" });
  }
};