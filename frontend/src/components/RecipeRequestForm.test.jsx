import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RecipeRequestForm from "./RecipeRequestForm";

const renderForm = () => render(<MemoryRouter><RecipeRequestForm /></MemoryRouter>);
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

describe("RecipeRequestForm", () => {
  it("asks logged-out visitors to log in", () => {
    renderForm();
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/auth");
    expect(screen.queryByRole("button", { name: "Request recipe" })).not.toBeInTheDocument();
  });

  it("sends the request and shows the thank-you message", async () => {
    localStorage.setItem("token", "t");
    const fetchMock = vi.fn(async () => json({ message: 'Thanks! We\'ve received your request for "Paneer Tikka". We aim to add it within 1 day.' }, 201));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Recipe name"), "Paneer Tikka");
    await user.type(screen.getByLabelText(/Any details/), "air-fryer");
    await user.click(screen.getByRole("button", { name: "Request recipe" }));

    expect(await screen.findByRole("status")).toHaveTextContent(/within 1 day/);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://api.test/api/recipe-requests");
    expect(JSON.parse(options.body)).toEqual({ name: "Paneer Tikka", details: "air-fryer" });

    await user.click(screen.getByRole("button", { name: "Request another recipe" }));
    expect(screen.getByLabelText("Recipe name")).toHaveValue("");
  });

  it("shows the server's reason when a request is refused", async () => {
    localStorage.setItem("token", "t");
    vi.stubGlobal("fetch", vi.fn(async () => json({ message: "You can request up to 5 recipes a day. Please try again tomorrow." }, 429)));
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Recipe name"), "Dosa");
    await user.click(screen.getByRole("button", { name: "Request recipe" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/tomorrow/);
  });

  it("switches to the login prompt if the session has expired", async () => {
    localStorage.setItem("token", "expired");
    vi.stubGlobal("fetch", vi.fn(async () => json({ message: "Not authorized" }, 401)));
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Recipe name"), "Dosa");
    await user.click(screen.getByRole("button", { name: "Request recipe" }));

    expect(await screen.findByRole("link", { name: "Log in" })).toBeInTheDocument();
  });
});
