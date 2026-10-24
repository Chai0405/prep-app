import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const renderAt = () =>
  render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route path="/auth" element={<p>login page</p>} />
        <Route path="/private" element={<ProtectedRoute><p>secret</p></ProtectedRoute>} />
      </Routes>
    </MemoryRouter>
  );

describe("ProtectedRoute", () => {
  it("redirects to login without a token", async () => {
    renderAt();
    expect(await screen.findByText("login page")).toBeInTheDocument();
  });

  it("redirects when the server rejects the token", async () => {
    localStorage.setItem("token", "expired");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 401 })));
    renderAt();
    expect(await screen.findByText("login page")).toBeInTheDocument();
  });

  it("renders the page for a valid session", async () => {
    localStorage.setItem("token", "valid");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    renderAt();
    expect(await screen.findByText("secret")).toBeInTheDocument();
  });
});
