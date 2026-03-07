/* eslint-env node */
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dietPreference = req.body.dietPreference || user.dietPreference;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    res.json(updatedUser);

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findById(req.user._id || req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = avatar;

    const updatedUser = await user.save();

    res.json(updatedUser);

  } catch (error) {
    console.error("Avatar update error:", error);
    res.status(500).json({ message: "Avatar update failed" });
  }
};