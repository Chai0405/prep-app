import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={["/auth"]}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<p>dashboard</p>} />
      </Routes>
    </MemoryRouter>
  );

const fillAndSubmit = async (user) => {
  await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
  await user.type(screen.getByPlaceholderText("Password"), "correct-horse-battery");
  await user.click(screen.getByRole("button", { name: "SIGN IN" }));
};

describe("Login page", () => {
  it("social sign-in buttons are clearly disabled placeholders", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: /google sign-in \(coming soon\)/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /facebook sign-in \(coming soon\)/i })).toBeDisabled();
  });

  it("email/password login stores the token and opens the dashboard", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ token: "jwt-123" }), { status: 200 })));
    renderLogin();

    await fillAndSubmit(user);

    expect(await screen.findByText("dashboard")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe("jwt-123");
  });

  it("shows the server error and stays on the page", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(async () =>
      new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 })));
    renderLogin();

    await fillAndSubmit(user);

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
