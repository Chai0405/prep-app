import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import Navbar from "./Navbar";
import { notifyUserUpdated } from "../utils/userEvents";

describe("Navbar", () => {
  it("shows a new avatar as soon as the profile saves it", async () => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async () =>
      new Response(JSON.stringify({ name: "Chaithra Pai", avatar: "" }), { status: 200 })));
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(<Provider store={store}><MemoryRouter><Navbar /></MemoryRouter></Provider>);

    expect(await screen.findByText("CH")).toBeInTheDocument(); // initials first

    act(() => notifyUserUpdated({ name: "Chaithra Pai", avatar: "data:image/jpeg;base64,/9j/AAAA" }));

    expect(screen.getByAltText("avatar")).toHaveAttribute("src", "data:image/jpeg;base64,/9j/AAAA");
    expect(screen.queryByText("CH")).not.toBeInTheDocument();
  });
});
