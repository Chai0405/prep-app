import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Recipes from "./Recipes";

const renderRecipes = () => render(<MemoryRouter initialEntries={["/recipes"]}><Recipes /></MemoryRouter>);

describe("Recipes page", () => {
  it("shows a loading message, then the recipes", async () => {
    let answer;
    vi.stubGlobal("fetch", vi.fn(() => new Promise((resolve) => { answer = resolve; })));
    renderRecipes();

    expect(screen.getByRole("status")).toHaveTextContent("Loading recipes...");

    answer(new Response(JSON.stringify([
      { _id: "1", title: "Idli Sambar", image: "/recipes/idli-sambar.jpg", mealType: "Breakfast", cuisine: "Indian", time: "30 min", calories: 300 },
    ])));

    expect(await screen.findByText("Idli Sambar")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByAltText("Idli Sambar")).toHaveAttribute("loading", "lazy");
  });

  it("shows an error with a retry button when the server fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 503 })));
    renderRecipes();

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't be loaded/i);
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("pre-fills the request form when arriving from search", async () => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("[]")));
    Element.prototype.scrollIntoView = vi.fn();
    render(<MemoryRouter initialEntries={["/recipes?request=Chicken%20Biryani"]}><Recipes /></MemoryRouter>);

    expect(await screen.findByLabelText("Recipe name")).toHaveValue("Chicken Biryani");
    // the scroll runs in an effect just after the form renders
    await vi.waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled());
  });
});
