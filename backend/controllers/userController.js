/* eslint-env node */
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Planner from "../models/Planner.js";
import Grocery from "../models/Grocery.js";
import Newsletter from "../models/Newsletter.js";
import RecipeRequest from "../models/RecipeRequest.js";
import { toSafeUser, clearSession } from "../utils/session.js";
import { validateAvatar } from "../utils/avatar.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dietPreference = req.body.dietPreference || user.dietPreference;
    // Avatars only change through PUT /api/user/avatar, which validates them

    const updatedUser = await user.save();

    res.json(toSafeUser(updatedUser));

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const avatarError = validateAvatar(avatar);

    if (avatarError) {
      return res.status(400).json({ message: avatarError });
    }

    const user = await User.findById(req.user._id || req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = avatar;

    const updatedUser = await user.save();

    res.json(toSafeUser(updatedUser));

  } catch (error) {
    console.error("Avatar update error:", error);
    res.status(500).json({ message: "Avatar update failed" });
  }
};

/*
  Permanently deletes the account and everything tied to it:
  planners, grocery list, newsletter subscription, recipe requests,
  then the user itself.
  The app keeps no order or payment records yet, so nothing is retained.
  Old tokens stop working because the auth middleware requires the user to exist.
*/
export const deleteAccount = async (req, res) => {
  try {
    const { password, confirm } = req.body;

    if (confirm !== "DELETE") {
      return res.status(400).json({ message: 'Type DELETE to confirm' });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Dependent data first: if anything fails the account still exists and can retry
    await Planner.deleteMany({ user: user._id });
    await Grocery.deleteMany({ user: user._id });
    await Newsletter.deleteMany({ email: user.email });
    await RecipeRequest.deleteMany({ user: user._id });
    await User.deleteOne({ _id: user._id });

    clearSession(res);

    res.json({ success: true });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Account deletion failed" });
  }
};
