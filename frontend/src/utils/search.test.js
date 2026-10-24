import { describe, it, expect } from "vitest";
import { normalize, searchAll } from "./search";

const recipes = [
  { _id: "1", title: "Paneer Tikka", cuisine: "Indian", mealType: "Snacks", tags: ["Vegetarian", "High Protein"], ingredients: ["250g paneer cubes", "1/2 cup yogurt"] },
  { _id: "2", title: "Butter Paneer", cuisine: "Indian", mealType: "Dinner", tags: ["Comfort Food"], ingredients: ["200g paneer cubes"] },
  { _id: "3", title: "Greek Salad", cuisine: "Mediterranean", mealType: "Lunch", tags: ["Fresh"], ingredients: ["Cucumber", "Feta"] },
  { _id: "4", title: "Jalapeño Poppers", cuisine: "Mexican", mealType: "Snacks", tags: [], ingredients: [] },
];

describe("normalize", () => {
  it("lowercases, strips accents, HTML and punctuation", () => {
    expect(normalize("  Jalapeño <b>Poppers</b>!! ")).toBe("jalapeno poppers");
  });
});

describe("searchAll", () => {
  it("returns nothing for an empty query", () => {
    expect(searchAll("   ", { recipes })).toEqual({ recipes: [], products: [], blogs: [] });
  });

  it("ranks names starting with the query first", () => {
    const titles = searchAll("paneer", { recipes }).recipes.map((r) => r.title);
    expect(titles).toEqual(["Paneer Tikka", "Butter Paneer"]);
  });

  it("matches cuisine, meal type, tags and ingredients", () => {
    expect(searchAll("mediterranean", { recipes }).recipes.map((r) => r.title)).toEqual(["Greek Salad"]);
    expect(searchAll("high protein", { recipes }).recipes.map((r) => r.title)).toEqual(["Paneer Tikka"]);
    expect(searchAll("cucumber", { recipes }).recipes.map((r) => r.title)).toEqual(["Greek Salad"]);
  });

  it("requires every word to match", () => {
    expect(searchAll("paneer snacks", { recipes }).recipes.map((r) => r.title)).toEqual(["Paneer Tikka"]);
    expect(searchAll("paneer salad", { recipes }).recipes).toEqual([]);
  });

  it("ignores accents and case", () => {
    expect(searchAll("JALAPENO", { recipes }).recipes.map((r) => r.title)).toEqual(["Jalapeño Poppers"]);
  });

  it("searches the real pantry catalogue with category info", () => {
    const products = searchAll("avocado").products;
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].name).toMatch(/avocado/i);
    expect(products.every((p) => p.categorySlug && p.categoryTitle)).toBe(true);
  });

  it("searches blog titles and content", () => {
    const blogs = searchAll("meal prep").blogs;
    expect(blogs.length).toBeGreaterThan(0);
    expect(blogs[0]).toHaveProperty("slug");
  });

  it("limits each group", () => {
    const many = Array.from({ length: 20 }, (_, i) => ({ _id: String(i), title: `Soup ${i}` }));
    expect(searchAll("soup", { recipes: many }).recipes).toHaveLength(6);
  });
});
