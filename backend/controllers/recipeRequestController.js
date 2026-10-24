/* eslint-env node */
import RecipeRequest from "../models/RecipeRequest.js";
import User from "../models/User.js";
import sendEmail, { parseSender } from "../utils/sendEmail.js";
import recipeRequestEmail from "../emails/recipeRequestEmail.js";

export const MAX_REQUESTS_PER_DAY = 5;

// Where request notifications go: ADMIN_EMAIL, or else the MAIL_FROM sender
const adminEmail = () => process.env.ADMIN_EMAIL || parseSender(process.env.MAIL_FROM).email;

export const createRecipeRequest = async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const details = typeof req.body.details === "string" ? req.body.details.trim() : "";

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ message: "Please enter a recipe name (2–100 characters)" });
    }
    if (details.length > 1000) {
      return res.status(400).json({ message: "Details can be up to 1000 characters" });
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recent = await RecipeRequest.countDocuments({ user: req.user, createdAt: { $gte: since } });

    if (recent >= MAX_REQUESTS_PER_DAY) {
      return res.status(429).json({ message: `You can request up to ${MAX_REQUESTS_PER_DAY} recipes a day. Please try again tomorrow.` });
    }

    const user = await User.findById(req.user).select("name email");
    const request = await RecipeRequest.create({ user: req.user, name, details });

    // Saved first, so a mail problem never loses the request
    const to = adminEmail();
    if (to) {
      await sendEmail(
        to,
        `Recipe request: ${name}`,
        recipeRequestEmail({
          recipeName: name,
          details,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "unknown",
          requestedAt: request.createdAt.toUTCString(),
        })
      );
    } else {
      console.error("Recipe request saved but not emailed: set ADMIN_EMAIL or MAIL_FROM");
    }

    res.status(201).json({
      message: `Thanks! We've received your request for "${name}". We aim to add it within 1 day.`,
    });
  } catch (err) {
    console.error("Recipe request error:", err);
    res.status(500).json({ message: "Request failed. Please try again." });
  }
};
