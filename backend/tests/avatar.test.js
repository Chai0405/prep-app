/* eslint-env node */
import { describe, it, expect } from "vitest";
import User from "../models/User.js";
import { api, auth, createUser, loginAs } from "./helpers.js";

const PNG_HEADER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_HEADER = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);

const dataUrl = (type, bytes) => `data:${type};base64,${bytes.toString("base64")}`;
const png = (size = 64) => dataUrl("image/png", Buffer.concat([PNG_HEADER, Buffer.alloc(size)]));

const withSession = async () => {
  await createUser();
  return auth(await loginAs());
};

describe("avatar upload", () => {
  it("stores a valid image", async () => {
    const headers = await withSession();
    const avatar = png();
    const res = await api().put("/api/user/avatar").set(headers).send({ avatar });
    expect(res.status).toBe(200);
    expect(res.body.avatar).toBe(avatar);
    expect(res.body).not.toHaveProperty("password");
  });

  it("accepts JPEG too", async () => {
    const headers = await withSession();
    const res = await api().put("/api/user/avatar").set(headers)
      .send({ avatar: dataUrl("image/jpeg", Buffer.concat([JPEG_HEADER, Buffer.alloc(32)])) });
    expect(res.status).toBe(200);
  });

  it.each([
    ["a non-string", 123],
    ["a remote URL", "https://evil.example/x.png"],
    ["an SVG (can carry scripts)", dataUrl("image/svg+xml", Buffer.from("<svg onload=alert(1)>"))],
    ["HTML disguised as PNG", dataUrl("image/png", Buffer.from("<script>alert(1)</script>"))],
    ["a PNG labelled as JPEG", dataUrl("image/jpeg", Buffer.concat([PNG_HEADER, Buffer.alloc(16)]))],
  ])("rejects %s", async (_label, avatar) => {
    const headers = await withSession();
    const res = await api().put("/api/user/avatar").set(headers).send({ avatar });
    expect(res.status).toBe(400);
    expect((await User.findOne()).avatar).toBe("");
  });

  it("rejects images over 300 KB", async () => {
    const headers = await withSession();
    const res = await api().put("/api/user/avatar").set(headers).send({ avatar: png(310 * 1024) });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/too large/i);
  });

  it("rejects request bodies over 1 MB before they reach the handler", async () => {
    const headers = await withSession();
    const res = await api().put("/api/user/avatar").set(headers).send({ avatar: png(1024 * 1024) });
    expect(res.status).toBe(413);
  });

  it("cannot be bypassed through the profile endpoint", async () => {
    const headers = await withSession();
    await api().put("/api/user/profile").set(headers).send({ name: "New Name", avatar: "javascript:alert(1)" });
    const user = await User.findOne();
    expect(user.name).toBe("New Name");
    expect(user.avatar).toBe("");
  });

  it("requires a session", async () => {
    expect((await api().put("/api/user/avatar").send({ avatar: png() })).status).toBe(401);
  });
});
