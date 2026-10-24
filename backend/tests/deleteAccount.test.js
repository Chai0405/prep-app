/* eslint-env node */
import { describe, it, expect } from "vitest";
import User from "../models/User.js";
import Planner from "../models/Planner.js";
import Grocery from "../models/Grocery.js";
import Newsletter from "../models/Newsletter.js";
import { api, auth, createUser, loginAs, PASSWORD } from "./helpers.js";

// Everything here runs against the per-file in-memory database
const seedAccount = async (email = "user@example.com") => {
  const user = await createUser({ email });
  await Planner.create({ user: user._id, weekStart: new Date("2026-10-19"), meals: {} });
  await Grocery.create({ user: user._id, items: [{ name: "milk" }] });
  await Newsletter.create({ email });
  return user;
};

describe("delete account", () => {
  it("requires a session", async () => {
    expect((await api().delete("/api/user").send({ password: PASSWORD, confirm: "DELETE" })).status).toBe(401);
  });

  it("requires the confirmation word and the correct password", async () => {
    await seedAccount();
    const token = await loginAs();

    expect((await api().delete("/api/user").set(auth(token)).send({ password: PASSWORD })).status).toBe(400);
    expect((await api().delete("/api/user").set(auth(token)).send({ confirm: "DELETE" })).status).toBe(400);
    expect((await api().delete("/api/user").set(auth(token)).send({ password: "wrong-password", confirm: "DELETE" })).status).toBe(400);

    expect(await User.countDocuments()).toBe(1);
  });

  it("removes the user and all of their data, and only theirs", async () => {
    const user = await seedAccount();
    const other = await seedAccount("other@example.com");
    const token = await loginAs();

    const res = await api().delete("/api/user").set(auth(token)).send({ password: PASSWORD, confirm: "DELETE" });
    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"][0]).toMatch(/token=;/);

    expect(await User.findById(user._id)).toBeNull();
    expect(await Planner.countDocuments({ user: user._id })).toBe(0);
    expect(await Grocery.countDocuments({ user: user._id })).toBe(0);
    expect(await Newsletter.countDocuments({ email: "user@example.com" })).toBe(0);

    // the other account is untouched
    expect(await User.findById(other._id)).toBeTruthy();
    expect(await Planner.countDocuments({ user: other._id })).toBe(1);
    expect(await Grocery.countDocuments({ user: other._id })).toBe(1);
    expect(await Newsletter.countDocuments({ email: "other@example.com" })).toBe(1);
  });

  it("rejects the old token everywhere afterwards", async () => {
    await seedAccount();
    const token = await loginAs();
    await api().delete("/api/user").set(auth(token)).send({ password: PASSWORD, confirm: "DELETE" });

    for (const [method, path] of [["get", "/api/auth/me"], ["get", "/api/planner"], ["post", "/api/grocery"], ["put", "/api/user/profile"]]) {
      expect((await api()[method](path).set(auth(token)).send({ items: [] })).status).toBe(401);
    }
    // and a fresh login fails because the account is gone
    expect((await api().post("/api/auth/login").send({ email: "user@example.com", password: PASSWORD })).status).toBe(400);
  });

  it("frees the email for a new registration", async () => {
    await seedAccount();
    const token = await loginAs();
    await api().delete("/api/user").set(auth(token)).send({ password: PASSWORD, confirm: "DELETE" });
    const res = await api().post("/api/auth/register").send({ name: "New", email: "user@example.com", password: PASSWORD });
    expect(res.status).toBe(201);
  });
});
