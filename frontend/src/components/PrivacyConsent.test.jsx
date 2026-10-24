import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrivacyConsent from "./PrivacyConsent";
import { CONSENT_KEY, getConsent, openPrivacySettings } from "../utils/consent";

// A fresh store per test, so it re-reads consent and storage on load
const freshStore = async () => {
  vi.resetModules();
  const { default: store } = await import("../redux/store");
  const { addToCart } = await import("../redux/features/cart/cartSlice");
  return { store, addToCart };
};

const product = { id: "bakery-1", name: "Bread", price: 50, tags: [] };

beforeEach(() => localStorage.clear());

describe("PrivacyConsent", () => {
  it("shows on first visit and Accept All allows saving the cart", async () => {
    const user = userEvent.setup();
    const { store, addToCart } = await freshStore();
    render(<PrivacyConsent />);

    store.dispatch(addToCart(product));
    expect(localStorage.getItem("cartItems")).toBeNull(); // nothing optional before a choice

    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getConsent()).toEqual({ preferences: true });
    expect(JSON.parse(localStorage.getItem("cartItems"))).toHaveLength(1);
  });

  it("Reject All keeps the cart in memory only", async () => {
    const user = userEvent.setup();
    const { store, addToCart } = await freshStore();
    render(<PrivacyConsent />);

    await user.click(screen.getByRole("button", { name: "Reject All" }));
    store.dispatch(addToCart(product));

    expect(store.getState().cart.cartItems).toHaveLength(1);
    expect(localStorage.getItem("cartItems")).toBeNull();
    expect(getConsent()).toEqual({ preferences: false });
  });

  it("Customize saves the chosen categories; essential cannot be switched off", async () => {
    const user = userEvent.setup();
    render(<PrivacyConsent />);

    await user.click(screen.getByRole("button", { name: "Customize" }));
    const [essential, preferences] = screen.getAllByRole("checkbox");
    expect(essential).toBeChecked();
    expect(essential).toBeDisabled();
    expect(preferences).not.toBeChecked();

    await user.click(preferences);
    await user.click(screen.getByRole("button", { name: "Save choices" }));
    expect(getConsent()).toEqual({ preferences: true });
  });

  it("stays hidden after a choice and reopens from Privacy settings to withdraw consent", async () => {
    const user = userEvent.setup();
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, preferences: true }));
    localStorage.setItem("cartItems", JSON.stringify([{ ...product, quantity: 1 }]));
    const { store } = await freshStore();
    expect(store.getState().cart.cartItems).toHaveLength(1); // saved cart restored

    render(<PrivacyConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => openPrivacySettings());
    const preferences = screen.getAllByRole("checkbox")[1];
    expect(preferences).toBeChecked();

    await user.click(preferences);
    await user.click(screen.getByRole("button", { name: "Save choices" }));

    expect(localStorage.getItem("cartItems")).toBeNull(); // saved copy removed
    expect(store.getState().cart.cartItems).toHaveLength(1); // current visit unaffected
  });

  it("does not restore a saved cart without consent", async () => {
    localStorage.setItem("cartItems", JSON.stringify([{ ...product, quantity: 1 }]));
    const { store } = await freshStore();
    expect(store.getState().cart.cartItems).toEqual([]);
  });

  it("treats the old 'accepted' value as full consent", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    expect(getConsent()).toEqual({ preferences: true });
  });
});
