import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useInView } from "./useInView";

function Section() {
  const [ref, inView] = useInView();
  return <section ref={ref} data-testid="s" className={inView ? "is-visible" : ""} />;
}

// Minimal stand-in that lets a test say "this element is now on screen"
const installObserver = () => {
  const instances = [];
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      this.disconnect = vi.fn();
      instances.push(this);
    }
    observe(el) { this.el = el; }
    enter() { act(() => this.callback([{ isIntersecting: true, target: this.el }])); }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  return instances;
};

afterEach(() => vi.unstubAllGlobals());

describe("useInView", () => {
  it("stays hidden until the section scrolls into view, then stays visible", () => {
    const observers = installObserver();
    render(<Section />);
    expect(screen.getByTestId("s")).not.toHaveClass("is-visible");

    observers[0].enter();
    expect(screen.getByTestId("s")).toHaveClass("is-visible");
    expect(observers[0].disconnect).toHaveBeenCalled(); // one-time: stops watching
  });

  it("shows content immediately in browsers without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Section />);
    expect(screen.getByTestId("s")).toHaveClass("is-visible");
  });
});
