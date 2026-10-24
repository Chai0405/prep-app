/* eslint-env node */
import { vi, beforeAll, afterAll, afterEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

// Tests must never read the real .env (production database, live API keys)
vi.mock("dotenv", () => ({ default: { config: () => ({}) }, config: () => ({}) }));

// ...or send real email
vi.mock("../utils/sendEmail.js", () => ({ default: vi.fn(async () => {}) }));

Object.assign(process.env, {
  NODE_ENV: "test",
  JWT_SECRET: "test-jwt-secret",
  CLIENT_URL: "http://localhost:5173",
  DISABLE_RATE_LIMIT: "true",
  MONGO_URI: "mongodb://invalid.test:1/never-used",
  RESEND_API_KEY: "re_test_placeholder",
  MAIL_FROM: "test@example.com",
});

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  await Promise.all(Object.values(collections).map((c) => c.deleteMany({})));
  vi.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo?.stop();
});
