/* eslint-env node */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import newsletterRoutes from "./routes/newsletter.js";

// Builds the Express app without connecting to the database or listening,
// so tests can exercise it against an in-memory database.
const createApp = () => {

  const app = express();

  // Behind a hosting proxy (Render, Railway, ...) so rate limiting sees the real client IP
  app.set("trust proxy", 1);

  // Only the frontend may make credentialed requests.
  // CLIENT_URL is the main frontend; CORS_ORIGINS adds extra comma-separated origins.
  const allowedOrigins = [
    process.env.CLIENT_URL,
    ...(process.env.CORS_ORIGINS || "").split(","),
    "http://localhost:5173"
  ]
    .map(origin => origin?.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Non-browser clients (curl, health checks) send no Origin header
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(null, false);
      },
      credentials: true
    })
  );

  app.use(helmet());

  const skipRateLimit = () => process.env.DISABLE_RATE_LIMIT === "true";

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    skip: skipRateLimit
  }));

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skip: skipRateLimit,
    message: { message: "Too many attempts. Please try again later." }
  });

  app.use(
    ["/api/auth/login", "/api/auth/register", "/api/auth/forgot-password", "/api/auth/reset-password", "/api/newsletter"],
    authLimiter
  );

  // Avatars are resized in the browser and capped at 300 KB, so 1 MB is ample
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/planner", plannerRoutes);
  app.use("/api/recipes", recipeRoutes);
  app.use("/api/grocery", groceryRoutes);
  app.use("/api/newsletter", newsletterRoutes);

  app.get("/", (req, res) => {
    res.send("PREP backend running 🚀");
  });

  return app;
};

export default createApp;
