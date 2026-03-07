/* eslint-env node */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import plannerRoutes from "./routes/plannerRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import newsletterRoutes from "./routes/newsletter.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);


app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));

app.use(express.json({ limit: "10mb" }));


// app.use(cors());
app.use(express.json());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);