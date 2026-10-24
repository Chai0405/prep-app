import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import WeekOverview from "./WeekOverview";
import Planner from "../pages/Planner";
import { saveWeekImage } from "../utils/weekImage";

vi.mock("../utils/weekImage", () => ({ saveWeekImage: vi.fn(async () => {}) }));

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEALS = ["Breakfast","Lunch","Dinner","Snacks"];
const tikka = { _id: "r1", title: "Paneer Tikka", image: "/t.webp" };
const toast = { _id: "r2", title: "Avocado Toast", image: "/a.webp" };
const poha = { _id: "r3", title: "Veg Poha", image: "/p.webp" };

const planner = {
  monday: { breakfast: [toast, poha], dinner: [tikka] },
  friday: { snacks: [tikka] },
};

describe("WeekOverview", () => {
  it("summarises the week", () => {
    render(<MemoryRouter><WeekOverview planner={planner} days={DAYS} meals={MEALS} onOpen={() => {}} /></MemoryRouter>);
    expect(screen.getByText(/meals planned/)).toHaveTextContent("3 of 28 meals planned · 4 recipes · 25 slots still open");
  });

  it("shows each slot and opens it when tapped", async () => {
    const onOpen = vi.fn();
    render(<MemoryRouter><WeekOverview planner={planner} days={DAYS} meals={MEALS} onOpen={onOpen} /></MemoryRouter>);

    const monBreakfast = screen.getByRole("cell", { name: "Monday Breakfast: Avocado Toast, Veg Poha" });
    expect(monBreakfast).toHaveTextContent("Avocado Toast +1");
    expect(monBreakfast).toHaveClass("is-filled");
    expect(screen.getByRole("cell", { name: "Sunday Lunch: nothing planned" })).not.toHaveClass("is-filled");

    await userEvent.setup().click(screen.getByRole("cell", { name: /Friday Snacks/ }));
    expect(onOpen).toHaveBeenCalledWith("Friday", "Snacks");

    expect(screen.getByRole("link", { name: "View grocery list" })).toHaveAttribute("href", "/grocery");
  });

  it("saves the week as an image", async () => {
    render(<MemoryRouter><WeekOverview planner={planner} days={DAYS} meals={MEALS} onOpen={() => {}} /></MemoryRouter>);
    await userEvent.setup().click(screen.getByRole("button", { name: "Save as image" }));
    expect(saveWeekImage).toHaveBeenCalledWith({
      planner, days: DAYS, meals: MEALS,
      summary: "3 of 28 meals planned · 4 recipes · 25 slots still open",
    });
  });

  it("tells the user when saving fails", async () => {
    saveWeekImage.mockRejectedValueOnce(new Error("no canvas"));
    render(<MemoryRouter><WeekOverview planner={planner} days={DAYS} meals={MEALS} onOpen={() => {}} /></MemoryRouter>);
    await userEvent.setup().click(screen.getByRole("button", { name: "Save as image" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Couldn't save the image");
  });

  it("celebrates a full week", () => {
    const full = Object.fromEntries(DAYS.map((d) => [d.toLowerCase(), Object.fromEntries(MEALS.map((m) => [m.toLowerCase(), [tikka]]))]));
    render(<MemoryRouter><WeekOverview planner={full} days={DAYS} meals={MEALS} onOpen={() => {}} /></MemoryRouter>);
    expect(screen.getByText(/meals planned/)).toHaveTextContent("28 of 28 meals planned · every slot is filled");
  });
});

describe("Planner › Week overview", () => {
  it("replaces Food Pyramid and jumps to a day from the overview", async () => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ meals: planner }))));
    const user = userEvent.setup();
    render(<MemoryRouter><Planner /></MemoryRouter>);

    expect(screen.queryByText(/Food Pyramid/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Week overview/ }));
    // "3 of 28" is bold, so match on the summary line's full text
    const summary = await screen.findByText((_, el) => el?.classList?.contains("week-overview-summary"));
    expect(summary).toHaveTextContent("3 of 28 meals planned");

    await user.click(screen.getByRole("cell", { name: /Friday Snacks/ }));
    expect(screen.getByRole("button", { name: /Friday/ })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "Snacks" })).toHaveClass("active");
    expect(screen.getByText("Paneer Tikka")).toBeInTheDocument();
  });
});
