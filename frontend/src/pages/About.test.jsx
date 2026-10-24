import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About page", () => {
  it("shows the founder story as real, readable text", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The story behind");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Why I created it?");
    expect(screen.getByText("PREP was created to bring structure to that process.")).toBeInTheDocument();
    expect(screen.getByText("Small systems create lasting habits.")).toBeInTheDocument();
    expect(screen.getByText("Chaithra Hegde")).toBeInTheDocument();
    expect(screen.getByAltText(/Chaithra Hegde, founder of PREP/)).toHaveAttribute("src", "/about/founder.webp");
  });
});
