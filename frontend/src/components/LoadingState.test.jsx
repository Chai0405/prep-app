import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import LoadingState from "./LoadingState";

afterEach(() => vi.useRealTimers());

describe("LoadingState", () => {
  it("explains a slow wait only after a few seconds", () => {
    vi.useFakeTimers();
    render(<LoadingState label="Loading recipes..." />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading recipes...");
    expect(screen.queryByText(/waking up the server/i)).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByText(/waking up the server/i)).toBeInTheDocument();
  });
});
