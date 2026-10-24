import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import { SLIDES, SLIDE_DURATION } from "../data/heroSlides";

const renderSlider = () =>
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/dashboard" element={<HeroSlider />} />
        {SLIDES.map((s) => (
          <Route key={s.to} path={s.to} element={<p>{`${s.to} page`}</p>} />
        ))}
      </Routes>
    </MemoryRouter>
  );

// The visible slide is the only one not hidden from assistive tech
const visibleTitle = () => screen.getByRole("heading", { level: 1 }).textContent;

const advance = (ms = SLIDE_DURATION) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  delete window.matchMedia;
});

describe("HeroSlider", () => {
  it("starts on the first slide and changes after each slide duration", () => {
    renderSlider();
    expect(visibleTitle()).toBe(SLIDES[0].title);

    advance(SLIDE_DURATION - 1);
    expect(visibleTitle()).toBe(SLIDES[0].title); // not early

    advance(1);
    expect(visibleTitle()).toBe(SLIDES[1].title);
  });

  it("loops back to the first slide after the last one", () => {
    renderSlider();
    advance(SLIDE_DURATION * SLIDES.length);
    expect(visibleTitle()).toBe(SLIDES[0].title);
  });

  it("shows exactly one background photo at a time", () => {
    const { container } = renderSlider();
    advance();
    const active = container.querySelectorAll(".hero-slide-bg.is-active");
    expect(active).toHaveLength(1);
    expect(active[0].style.backgroundImage).toContain(SLIDES[1].image);
  });

  it("downloads photos one slide ahead instead of all at once", () => {
    const { container } = renderSlider();
    const withPhoto = () =>
      [...container.querySelectorAll(".hero-slide-bg")].filter((el) => el.style.backgroundImage).length;

    expect(withPhoto()).toBe(2); // current + next
    advance();
    expect(withPhoto()).toBe(3);
    advance(SLIDE_DURATION * SLIDES.length);
    expect(withPhoto()).toBe(SLIDES.length); // all loaded after a full loop, none dropped
  });

  it("only the visible slide's button can be used, and it opens its page", () => {
    renderSlider();
    advance(); // slide 2

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1); // hidden slides' buttons are not exposed
    expect(buttons[0]).toHaveTextContent(SLIDES[1].cta);

    fireEvent.click(buttons[0]);
    expect(screen.getByText(`${SLIDES[1].to} page`)).toBeInTheDocument();
  });

  it("stays still for visitors who prefer reduced motion", () => {
    window.matchMedia = vi.fn(() => ({ matches: true }));
    renderSlider();
    advance(SLIDE_DURATION * 3);
    expect(visibleTitle()).toBe(SLIDES[0].title);
  });

  it("does not advance while the tab is hidden", () => {
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    renderSlider();
    advance(SLIDE_DURATION * 2);
    expect(visibleTitle()).toBe(SLIDES[0].title);

    hidden.mockReturnValue(false);
    advance();
    expect(visibleTitle()).toBe(SLIDES[1].title);
  });

  it("stops its timer when the page is left", () => {
    const { unmount } = renderSlider();
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("every slide's photo exists in public/hero", async () => {
    const { existsSync } = await import("fs");
    for (const slide of SLIDES) {
      expect(existsSync(`public${slide.image}`), slide.image).toBe(true);
    }
  });
});
