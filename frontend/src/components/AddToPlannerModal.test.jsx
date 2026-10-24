import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AddToPlannerModal from "./AddToPlannerModal";
import RecipeDetail from "../pages/RecipeDetail";

const recipe = { _id: "r1", title: "Paneer Tikka", image: "/x.webp", calories: 320 };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

describe("AddToPlannerModal", () => {
  it("adds with one request, shows 'Adding...' meanwhile, then reports back", async () => {
    localStorage.setItem("token", "t");
    let answer;
    const fetchMock = vi.fn(() => new Promise((r) => { answer = r; }));
    vi.stubGlobal("fetch", fetchMock);
    const onClose = vi.fn(), onAdded = vi.fn();
    const user = userEvent.setup();
    render(<MemoryRouter><AddToPlannerModal recipe={recipe} onClose={onClose} onAdded={onAdded} /></MemoryRouter>);

    await user.click(screen.getByText("Monday"));        // open day list
    await user.click(screen.getByText("Friday"));
    await user.click(screen.getByText("Dinner"));        // open meal list
    await user.click(screen.getByText("Snacks"));
    await user.click(screen.getByRole("button", { name: "ADD TO PLANNER" }));

    const busy = screen.getByRole("button", { name: "ADDING..." });
    expect(busy).toBeDisabled();
    await user.click(busy);                               // double tap ignored
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://api.test/api/planner/add");
    expect(JSON.parse(options.body)).toEqual(expect.objectContaining({ day: "friday", meal: "snacks", recipeId: "r1" }));

    answer(json({ day: "friday", meal: "snacks", alreadyPlanned: false }, 201));
    await vi.waitFor(() => expect(onAdded).toHaveBeenCalledWith({ day: "Friday", meal: "Snacks", alreadyPlanned: false }));
    expect(onClose).toHaveBeenCalled();
  });

  it("shows the error in the popup and stays open", async () => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async () => json({ message: "Recipe not found" }, 404)));
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MemoryRouter><AddToPlannerModal recipe={recipe} onClose={onClose} /></MemoryRouter>);

    await user.click(screen.getByRole("button", { name: "ADD TO PLANNER" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Recipe not found");
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "ADD TO PLANNER" })).toBeEnabled();
  });
});

describe("RecipeDetail › add to planner", () => {
  const renderPage = (addResponse) => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async (url) =>
      String(url).endsWith("/api/planner/add")
        ? addResponse()
        : json({ ...recipe, ingredients: [], instructions: [], tags: [] })));
    render(
      <MemoryRouter initialEntries={["/recipes/r1"]}>
        <Routes><Route path="/recipes/:id" element={<RecipeDetail />} /></Routes>
      </MemoryRouter>
    );
  };

  it("confirms with a message and a link to the planner", async () => {
    renderPage(() => json({ day: "monday", meal: "dinner", alreadyPlanned: false }, 201));
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Add to Planner" }));
    await user.click(screen.getByRole("button", { name: "ADD TO PLANNER" }));

    expect(await screen.findByText("✓ Added to Monday · Dinner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View planner" })).toHaveAttribute("href", "/planner");
  });

  it("says so when the recipe is already planned there", async () => {
    renderPage(() => json({ day: "monday", meal: "dinner", alreadyPlanned: true }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Add to Planner" }));
    await user.click(screen.getByRole("button", { name: "ADD TO PLANNER" }));
    expect(await screen.findByText("Already in Monday · Dinner")).toBeInTheDocument();
  });
});
