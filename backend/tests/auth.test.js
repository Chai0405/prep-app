/* eslint-env node */
import { describe, it, expect } from "vitest";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { api, auth, createUser, loginAs, PASSWORD } from "./helpers.js";

describe("register", () => {
  it("rejects missing fields and short passwords", async () => {
    expect((await api().post("/api/auth/register").send({ email: "a@b.co" })).status).toBe(400);
    const short = await api().post("/api/auth/register").send({ name: "A", email: "a@b.co", password: "short" });
    expect(short.status).toBe(400);
  });

  it("creates an unverified, lowercased account and sends a verification email", async () => {
    const res = await api().post("/api/auth/register")
      .send({ name: "Ana", email: "  Ana@Example.COM ", password: PASSWORD });
    expect(res.status).toBe(201);

    const user = await User.findOne({ email: "ana@example.com" });
    expect(user).toBeTruthy();
    expect(user.isVerified).toBe(false);
    expect(user.password).not.toBe(PASSWORD);
    expect(sendEmail).toHaveBeenCalledOnce();

    // the email must actually contain the verification link
    const html = sendEmail.mock.calls[0][2];
    expect(html).toContain(`href="http://localhost:5173/verify-email/${user.verifyToken}"`);
  });

  it("rejects a duplicate email regardless of case", async () => {
    await createUser();
    const res = await api().post("/api/auth/register")
      .send({ name: "Dup", email: "USER@example.com", password: PASSWORD });
    expect(res.status).toBe(400);
  });
});

describe("login", () => {
  it("does not reveal whether an account exists", async () => {
    await createUser({ isVerified: false });
    const unknown = await api().post("/api/auth/login").send({ email: "nobody@example.com", password: PASSWORD });
    const wrongPw = await api().post("/api/auth/login").send({ email: "user@example.com", password: "wrong-password" });
    expect(unknown.status).toBe(400);
    expect(wrongPw.status).toBe(400);
    expect(unknown.body.message).toBe(wrongPw.body.message);
  });

  it("only tells unverified users to verify after a correct password", async () => {
    await createUser({ isVerified: false });
    const res = await api().post("/api/auth/login").send({ email: "user@example.com", password: PASSWORD });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/verify/i);
  });

  it("returns a token and sets an httpOnly cookie", async () => {
    await createUser();
    const res = await api().post("/api/auth/login").send({ email: "User@Example.com", password: PASSWORD });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.headers["set-cookie"][0]).toMatch(/token=.*HttpOnly/i);
  });
});

describe("protected routes", () => {
  it("accept the bearer token or the cookie", async () => {
    await createUser();
    const token = await loginAs();
    expect((await api().get("/api/auth/me").set(auth(token))).status).toBe(200);
    expect((await api().get("/api/auth/me").set("Cookie", `token=${token}`)).status).toBe(200);
  });

  it("reject missing, forged and deleted-user tokens", async () => {
    expect((await api().get("/api/auth/me")).status).toBe(401);

    const forged = jwt.sign({ id: "507f1f77bcf86cd799439011" }, "not-the-secret");
    expect((await api().get("/api/auth/me").set(auth(forged))).status).toBe(401);

    const user = await createUser();
    const token = await loginAs();
    await User.deleteOne({ _id: user._id });
    expect((await api().get("/api/planner").set(auth(token))).status).toBe(401);
  });

  it("/me never exposes secrets", async () => {
    await createUser({ verifyToken: "abc", resetToken: "def" });
    const token = await loginAs();
    const res = await api().get("/api/auth/me").set(auth(token));
    for (const field of ["password", "verifyToken", "resetToken", "resetTokenExpire", "tokenVersion"]) {
      expect(res.body).not.toHaveProperty(field);
    }
  });
});

describe("change password", () => {
  it("signs out other sessions and issues a new working token", async () => {
    await createUser();
    const oldToken = await loginAs();

    const res = await api().put("/api/auth/password").set(auth(oldToken))
      .send({ current: PASSWORD, newPassword: "brand-new-password" });
    expect(res.status).toBe(200);

    expect((await api().get("/api/auth/me").set(auth(oldToken))).status).toBe(401);
    expect((await api().get("/api/auth/me").set(auth(res.body.token))).status).toBe(200);
    await loginAs("user@example.com", "brand-new-password");
  });

  it("rejects a wrong current password", async () => {
    await createUser();
    const token = await loginAs();
    const res = await api().put("/api/auth/password").set(auth(token))
      .send({ current: "wrong-password", newPassword: "brand-new-password" });
    expect(res.status).toBe(400);
  });
});

describe("password reset", () => {
  it("answers the same for unknown and known emails", async () => {
    await createUser();
    const unknown = await api().post("/api/auth/forgot-password").send({ email: "nobody@example.com" });
    const known = await api().post("/api/auth/forgot-password").send({ email: "user@example.com" });
    expect(unknown.status).toBe(200);
    expect(unknown.body).toEqual(known.body);
    expect(sendEmail).toHaveBeenCalledOnce();
  });

  it("stores only a hash of the token and resets with the emailed token", async () => {
    await createUser();
    const oldToken = await loginAs();
    await api().post("/api/auth/forgot-password").send({ email: "user@example.com" });

    const link = sendEmail.mock.calls[0][2].match(/reset-password\/([a-f0-9]{64})/);
    const rawToken = link[1];
    const user = await User.findOne({ email: "user@example.com" });
    expect(user.resetToken).not.toBe(rawToken);
    expect(user.resetToken).toBe(crypto.createHash("sha256").update(rawToken).digest("hex"));

    const res = await api().post(`/api/auth/reset-password/${rawToken}`).send({ password: "reset-password-123" });
    expect(res.status).toBe(200);
    await loginAs("user@example.com", "reset-password-123");

    // old sessions are revoked and the link is single-use
    expect((await api().get("/api/auth/me").set(auth(oldToken))).status).toBe(401);
    const again = await api().post(`/api/auth/reset-password/${rawToken}`).send({ password: "another-password-1" });
    expect(again.status).toBe(400);
  });
});

describe("email verification", () => {
  it("verifies the account once", async () => {
    await createUser({ isVerified: false, verifyToken: "verify-me" });
    const res = await api().get("/api/auth/verify-email/verify-me");
    expect(res.status).toBe(200);
    expect((await User.findOne({ email: "user@example.com" })).isVerified).toBe(true);
  });
});
