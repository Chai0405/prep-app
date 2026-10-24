import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LegalPage from "./LegalPage";

describe("LegalPage", () => {
  it.each(["privacy", "terms", "accessibility"])("%s is clearly marked as an unreviewed placeholder", (page) => {
    render(<LegalPage page={page} />);
    expect(screen.getByRole("note")).toHaveTextContent(/not been legally reviewed/i);
  });
});
