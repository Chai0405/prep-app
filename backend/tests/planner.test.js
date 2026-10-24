/* eslint-env node */
import { describe, it, expect } from "vitest";
import Recipe from "../models/Recipe.js";
import { api, auth, createUser, loginAs } from "./helpers.js";

describe("planner and grocery", () => {
  it("saving a plan builds the grocery list and keeps checked items", async () => {
    await createUser();
    const token = await loginAs();
    const toast = await Recipe.create({ title: "Toast", ingredients: ["Bread", "Butter"] });
    const eggs = await Recipe.create({ title: "Eggs", ingredients: ["Eggs", "butter "] });
    const weekStart = "2026-10-19T00:00:00.000Z";

    const save = await api().post("/api/planner").set(auth(token)).send({
      weekStart,
      meals: { monday: { breakfast: [toast._id, { _id: eggs._id }, "not-an-id"] } },
    });
    expect(save.status).toBe(200);

    const grocery = await api().get("/api/grocery").set(auth(token));
    expect(grocery.body.items.map((i) => i.name).sort()).toEqual(["bread", "butter", "eggs"]);

    const checked = grocery.body.items.map((i) => ({ ...i, checked: i.name === "eggs" }));
    expect((await api().post("/api/grocery").set(auth(token)).send({ items: checked })).status).toBe(200);

    // re-saving the plan must not lose the checked state
    await api().post("/api/planner").set(auth(token)).send({
      weekStart,
      meals: { monday: { breakfast: [toast._id, eggs._id] } },
    });
    const after = await api().get("/api/grocery").set(auth(token));
    expect(after.body.items.find((i) => i.name === "eggs").checked).toBe(true);

    const plan = await api().get(`/api/planner?weekStart=${weekStart}`).set(auth(token));
    expect(plan.body.meals.monday.breakfast.map((r) => r.title)).toEqual(["Toast", "Eggs"]);
  });

  it("grocery update works before any plan exists and validates input", async () => {
    await createUser();
    const token = await loginAs();
    expect((await api().post("/api/grocery").set(auth(token)).send({ items: "nope" })).status).toBe(400);
    const res = await api().post("/api/grocery").set(auth(token)).send({ items: [{ name: "milk" }] });
    expect(res.status).toBe(200);
    expect(res.body.items[0].name).toBe("milk");
  });
});

describe("recipes", () => {
  it("returns 404 for unknown or malformed ids", async () => {
    expect((await api().get("/api/recipes/not-an-id")).status).toBe(404);
    expect((await api().get("/api/recipes/507f1f77bcf86cd799439011")).status).toBe(404);
  });
});
