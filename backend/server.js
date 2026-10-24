/* eslint-env node */
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import createApp from "./app.js";

dotenv.config();

const REQUIRED_ENV = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];
const missing = REQUIRED_ENV.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

connectDB();

const app = createApp();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
