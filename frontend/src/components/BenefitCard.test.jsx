import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import BenefitCard from "./BenefitCard";
import benefits from "../data/benefits";

const planning = benefits[0];
const renderCard = () => {
  const { container } = render(<MemoryRouter><BenefitCard benefit={planning} /></MemoryRouter>);
  const [front, back] = container.querySelectorAll(".benefit-face");
  return { card: container.querySelector(".benefit-card"), front, back };
};

describe("BenefitCard", () => {
  it("starts on the front; the back can't be reached", () => {
    const { card, front, back } = renderCard();
    expect(card).not.toHaveClass("is-flipped");
    expect(front).not.toHaveAttribute("inert");
    expect(back).toHaveAttribute("inert");
    expect(screen.getByRole("button", { name: /Organized Planning: show more/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("flips to the details when tapped, and back again", async () => {
    const user = userEvent.setup();
    const { card, front, back } = renderCard();

    await user.click(screen.getByRole("button", { name: /show more/ }));
    expect(card).toHaveClass("is-flipped");
    expect(front).toHaveAttribute("inert");
    expect(back).not.toHaveAttribute("inert");

    expect(screen.getByText(planning.details)).toBeInTheDocument();
    planning.points.forEach((point) => expect(screen.getByText(point)).toBeInTheDocument());
    expect(screen.getByRole("link", { name: /Open Planner/ })).toHaveAttribute("href", "/planner");

    await user.click(screen.getByRole("button", { name: /Organized Planning: back/ }));
    expect(card).not.toHaveClass("is-flipped");
  });

  it("every card has details, points and a link", () => {
    for (const b of benefits) {
      expect(b.details).toBeTruthy();
      expect(b.points.length).toBeGreaterThanOrEqual(2);
      expect(b.link.to).toMatch(/^\//);
    }
  });
});
