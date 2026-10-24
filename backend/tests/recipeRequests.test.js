/* eslint-env node */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import RecipeRequest from "../models/RecipeRequest.js";
import sendEmail from "../utils/sendEmail.js";
import { api, auth, createUser, loginAs } from "./helpers.js";

const request = (token, body) => api().post("/api/recipe-requests").set(auth(token)).send(body);

let savedAdmin;
beforeEach(() => { savedAdmin = process.env.ADMIN_EMAIL; process.env.ADMIN_EMAIL = "owner@example.com"; });
afterEach(() => { savedAdmin === undefined ? delete process.env.ADMIN_EMAIL : (process.env.ADMIN_EMAIL = savedAdmin); });

describe("recipe requests", () => {
  it("require a login", async () => {
    expect((await api().post("/api/recipe-requests").send({ name: "Paneer Tikka" })).status).toBe(401);
  });

  it("saves the request and emails the owner the details", async () => {
    await createUser({ name: "Athul" });
    const token = await loginAs();

    const res = await request(token, { name: "  Paneer Tikka ", details: "Air-fryer version\nplease" });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/Paneer Tikka/);
    expect(res.body.message).toMatch(/within 1 day/);

    const saved = await RecipeRequest.findOne();
    expect(saved.name).toBe("Paneer Tikka");
    expect(saved.details).toBe("Air-fryer version\nplease");
    expect(saved.status).toBe("open");

    expect(sendEmail).toHaveBeenCalledOnce();
    const [to, subject, html] = sendEmail.mock.calls[0];
    expect(to).toBe("owner@example.com");
    expect(subject).toBe("Recipe request: Paneer Tikka");
    expect(html).toContain("Paneer Tikka");
    expect(html).toContain("Air-fryer version<br>please");
    expect(html).toContain("user@example.com");
    expect(html).toContain("Athul");
  });

  it("falls back to the MAIL_FROM address when ADMIN_EMAIL is not set", async () => {
    delete process.env.ADMIN_EMAIL;
    const savedFrom = process.env.MAIL_FROM;
    process.env.MAIL_FROM = "PREP <me@gmail.com>";
    await createUser();
    await request(await loginAs(), { name: "Dosa" });
    expect(sendEmail.mock.calls[0][0]).toBe("me@gmail.com");
    process.env.MAIL_FROM = savedFrom;
  });

  it("makes user text safe inside the email", async () => {
    await createUser({ name: "<b>Eve</b>" });
    await request(await loginAs(), { name: "<img src=x onerror=alert(1)>", details: "<script>alert(1)</script>" });
    const html = sendEmail.mock.calls[0][2];
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;Eve&lt;/b&gt;");
  });

  it("validates the recipe name and details", async () => {
    await createUser();
    const token = await loginAs();
    expect((await request(token, {})).status).toBe(400);
    expect((await request(token, { name: "a" })).status).toBe(400);
    expect((await request(token, { name: "x".repeat(101) })).status).toBe(400);
    expect((await request(token, { name: "Dosa", details: "x".repeat(1001) })).status).toBe(400);
    expect((await request(token, { name: 123 })).status).toBe(400);
    expect(await RecipeRequest.countDocuments()).toBe(0);
  });

  it("allows 5 requests per person per day", async () => {
    await createUser();
    const token = await loginAs();
    for (let i = 1; i <= 5; i++) expect((await request(token, { name: `Recipe ${i}` })).status).toBe(201);

    const sixth = await request(token, { name: "Recipe 6" });
    expect(sixth.status).toBe(429);
    expect(sixth.body.message).toMatch(/tomorrow/);

    // another user is not affected
    await createUser({ email: "other@example.com" });
    expect((await request(await loginAs("other@example.com"), { name: "Recipe 6" })).status).toBe(201);
  });

  it("keeps the request even if the email fails", async () => {
    sendEmail.mockResolvedValueOnce(false);
    await createUser();
    const res = await request(await loginAs(), { name: "Idli" });
    expect(res.status).toBe(201);
    expect(await RecipeRequest.countDocuments({ name: "Idli" })).toBe(1);
  });

  it("are deleted with the account", async () => {
    await createUser();
    const token = await loginAs();
    await request(token, { name: "Idli" });
    await api().delete("/api/user").set(auth(token)).send({ password: "correct-horse-battery", confirm: "DELETE" });
    expect(await RecipeRequest.countDocuments()).toBe(0);
  });
});
