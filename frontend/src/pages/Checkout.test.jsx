import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import Checkout from "./Checkout";

const renderCheckout = () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: { cartItems: [{ id: "bakery-1", name: "Bread", price: 50, quantity: 2, image: "", tags: ["Fresh"] }] },
    },
  });
  render(
    <Provider store={store}>
      <MemoryRouter><Checkout /></MemoryRouter>
    </Provider>
  );
  return store;
};

describe("Checkout without a payment provider", () => {
  it("says payments are unavailable and cannot place an order", async () => {
    const store = renderCheckout();

    expect(screen.getByRole("status")).toHaveTextContent(/payment isn't available yet/i);
    const button = screen.getByRole("button", { name: "Payments coming soon" });
    expect(button).toBeDisabled();

    await userEvent.setup().click(button);
    expect(screen.queryByText(/order placed/i)).not.toBeInTheDocument();
    expect(store.getState().cart.cartItems).toHaveLength(1); // cart kept
  });

  it("still lets the cart be edited", async () => {
    const store = renderCheckout();
    await userEvent.setup().click(screen.getByRole("button", { name: "+" }));
    expect(store.getState().cart.cartItems[0].quantity).toBe(3);
  });
});
