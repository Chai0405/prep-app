/* eslint-env node */
import bcrypt from "bcryptjs";
import request from "supertest";
import createApp from "../app.js";
import User from "../models/User.js";

export const app = createApp();
export const api = () => request(app);

export const PASSWORD = "correct-horse-battery";

export const createUser = async (overrides = {}) =>
  User.create({
    name: "Test User",
    email: "user@example.com",
    password: await bcrypt.hash(PASSWORD, 4),
    isVerified: true,
    ...overrides,
  });

// Logs in through the real endpoint and returns the bearer token
export const loginAs = async (email = "user@example.com", password = PASSWORD) => {
  const res = await api().post("/api/auth/login").send({ email, password });
  if (res.status !== 200) throw new Error(`login failed: ${res.status} ${JSON.stringify(res.body)}`);
  return res.body.token;
};

export const auth = (token) => ({ Authorization: `Bearer ${token}` });
