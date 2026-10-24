/* eslint-env node */
import { describe, it, expect } from "vitest";
import Recipe from "../models/Recipe.js";
import Planner from "../models/Planner.js";
import { api, auth, createUser, loginAs } from "./helpers.js";

const WEEK = "2026-10-19T00:00:00.000Z";
const add = (token, body) => api().post("/api/planner/add").set(auth(token)).send({ weekStart: WEEK, ...body });

describe("POST /api/planner/add", () => {
  it("requires a login", async () => {
    expect((await api().post("/api/planner/add").send({})).status).toBe(401);
  });

  it("adds one recipe to a day and meal, and updates the grocery list", async () => {
    await createUser();
    const token = await loginAs();
    const tikka = await Recipe.create({ title: "Paneer Tikka", ingredients: ["Paneer", "Yogurt"] });

    const res = await add(token, { day: "Monday", meal: "Dinner", recipeId: String(tikka._id) });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ day: "monday", meal: "dinner", alreadyPlanned: false });

    const plan = await api().get(`/api/planner?weekStart=${WEEK}`).set(auth(token));
    expect(plan.body.meals.monday.dinner.map((r) => r.title)).toEqual(["Paneer Tikka"]);

    const grocery = await api().get("/api/grocery").set(auth(token));
    expect(grocery.body.items.map((i) => i.name).sort()).toEqual(["paneer", "yogurt"]);
  });

  it("does not duplicate a recipe already in that slot", async () => {
    await createUser();
    const token = await loginAs();
    const tikka = await Recipe.create({ title: "Paneer Tikka", ingredients: ["Paneer"] });

    await add(token, { day: "monday", meal: "dinner", recipeId: String(tikka._id) });
    const again = await add(token, { day: "monday", meal: "dinner", recipeId: String(tikka._id) });

    expect(again.status).toBe(200);
    expect(again.body.alreadyPlanned).toBe(true);
    const planner = await Planner.findOne();
    expect(planner.meals.monday.dinner).toHaveLength(1);
  });

  it("keeps the rest of the week and the grocery ticks", async () => {
    await createUser();
    const token = await loginAs();
    const toast = await Recipe.create({ title: "Toast", ingredients: ["Bread"] });
    const tikka = await Recipe.create({ title: "Paneer Tikka", ingredients: ["Paneer"] });

    await add(token, { day: "tuesday", meal: "breakfast", recipeId: String(toast._id) });
    const list = (await api().get("/api/grocery").set(auth(token))).body.items.map((i) => ({ ...i, checked: true }));
    await api().post("/api/grocery").set(auth(token)).send({ items: list });

    await add(token, { day: "friday", meal: "snacks", recipeId: String(tikka._id) });

    const planner = await Planner.findOne();
    expect(planner.meals.tuesday.breakfast.map(String)).toEqual([String(toast._id)]);
    expect(planner.meals.friday.snacks.map(String)).toEqual([String(tikka._id)]);
    const items = (await api().get("/api/grocery").set(auth(token))).body.items;
    expect(items.find((i) => i.name === "bread").checked).toBe(true);   // tick kept
    expect(items.find((i) => i.name === "paneer").checked).toBe(false); // new item
  });

  it("rejects bad input", async () => {
    await createUser();
    const token = await loginAs();
    const tikka = await Recipe.create({ title: "Paneer Tikka", ingredients: [] });
    const id = String(tikka._id);

    expect((await add(token, { day: "funday", meal: "dinner", recipeId: id })).status).toBe(400);
    expect((await add(token, { day: "monday", meal: "brunch", recipeId: id })).status).toBe(400);
    expect((await add(token, { day: "monday", meal: "dinner", recipeId: "nope" })).status).toBe(404);
    expect((await add(token, { day: "monday", meal: "dinner", recipeId: "507f1f77bcf86cd799439011" })).status).toBe(404);
    expect((await api().post("/api/planner/add").set(auth(token)).send({ day: "monday", meal: "dinner", recipeId: id, weekStart: "not-a-date" })).status).toBe(400);
    expect(await Planner.countDocuments()).toBe(0);
  });
});
