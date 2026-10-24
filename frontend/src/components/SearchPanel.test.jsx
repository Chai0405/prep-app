import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";

const RECIPES = [{ _id: "r1", title: "Paneer Tikka", cuisine: "Indian", mealType: "Snacks", time: "50 min", image: "/x.webp", tags: [], ingredients: [] }];

const Where = () => <p data-testid="where">{useLocation().pathname + useLocation().search}</p>;

const setup = async () => {
  vi.resetModules(); // fresh recipe cache per test
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(RECIPES))));
  const { default: SearchPanel } = await import("./SearchPanel");
  const store = configureStore({ reducer: { cart: cartReducer } });
  const onClose = vi.fn();
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <SearchPanel onClose={onClose} />
        <Routes><Route path="*" element={<Where />} /></Routes>
      </MemoryRouter>
    </Provider>
  );
  return { store, onClose, user: userEvent.setup() };
};

beforeEach(() => localStorage.clear());

describe("SearchPanel", () => {
  it("focuses the box and shows grouped results as you type", async () => {
    const { user } = await setup();
    const box = screen.getByRole("searchbox");
    expect(box).toHaveFocus();

    await user.type(box, "paneer");
    expect(await screen.findByRole("heading", { name: "Recipes" })).toBeInTheDocument();
    expect(screen.getByText("Paneer Tikka")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument(); // paneer is in the dairy catalogue
  });

  it("opens a recipe and closes the panel", async () => {
    const { user, onClose } = await setup();
    await user.type(screen.getByRole("searchbox"), "paneer tikka");
    await user.click(await screen.findByText("Paneer Tikka"));
    expect(screen.getByTestId("where")).toHaveTextContent("/recipes/r1");
    expect(onClose).toHaveBeenCalled();
  });

  it("Enter opens the top result; Escape closes", async () => {
    const { user, onClose } = await setup();
    await user.type(screen.getByRole("searchbox"), "paneer tikka");
    await screen.findByText("Paneer Tikka");
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("where")).toHaveTextContent("/recipes/r1");

    onClose.mockClear();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("adds a product to the cart from the results", async () => {
    const { user, store } = await setup();
    await user.type(screen.getByRole("searchbox"), "avocado");
    const addButtons = await screen.findAllByRole("button", { name: /^Add .* to cart$/ });
    await user.click(addButtons[0]);
    expect(store.getState().cart.cartItems).toHaveLength(1);
    expect(addButtons[0]).toHaveTextContent("Added ✓");
  });

  it("offers to request a recipe when nothing matches", async () => {
    const { user } = await setup();
    await user.type(screen.getByRole("searchbox"), "zzqx biryani");
    await user.click(await screen.findByRole("button", { name: /Request “zzqx biryani” as a recipe/ }));
    expect(screen.getByTestId("where")).toHaveTextContent("/recipes?request=zzqx%20biryani");
  });

  it("still offers a recipe request when only products match", async () => {
    const { user } = await setup();
    await user.type(screen.getByRole("searchbox"), "avocado");
    expect(await screen.findByRole("heading", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByText(/No recipe for “avocado” yet/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Request “avocado” as a recipe/ })).toBeInTheDocument();
  });
});
