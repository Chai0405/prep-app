import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SLIDES, SLIDE_DURATION } from "../data/heroSlides";
import "../styles/heroSlider.css";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function HeroSlider() {

  const navigate = useNavigate();
  // `reached` is the furthest slide shown so far; photos load one step ahead
  // of it, so the first view downloads two photos instead of all of them
  const [{ active, reached }, setSlide] = useState({ active: 0, reached: 0 });

  useEffect(() => {
    // Visitors who asked their device for less motion get a still banner
    if (prefersReducedMotion()) return;

    const timer = setInterval(() => {
      // Don't advance in a background tab
      if (!document.hidden) {
        setSlide(({ active: current, reached: furthest }) => {
          const next = (current + 1) % SLIDES.length;
          return { active: next, reached: Math.max(furthest, next) };
        });
      }
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-hero hero-slider">

      {SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero-slide-bg ${index === active ? "is-active" : ""}`}
          style={index <= reached + 1 ? { backgroundImage: `url("${slide.image}")` } : undefined}
          aria-hidden="true"
        />
      ))}

      <div className="hero-overlay hero-slide-stack">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.title}
            className={`hero-slide-content ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
            inert={index !== active}
          >
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>

            <button
              className="hero-btn"
              onClick={() => navigate(slide.to)}
            >
              {slide.cta}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
