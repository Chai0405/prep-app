import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import HeroSlider from "../components/HeroSlider";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/reveal.css";
import { useInView } from "../utils/useInView";
import { apiFetch } from "../utils/api";

export default function Dashboard() {

  const navigate = useNavigate();
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [benefitsRef, benefitsVisible] = useInView();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">

      {/* ================= HERO ================= */}
      <HeroSlider />


      {/* ================= LIFESTYLE ================= */}
      <section className="dashboard-lifestyle">

        <div className="lifestyle-left">
          <h2>
            It’s not just planning,<br />
            <span>It’s a lifestyle - curated</span>
          </h2>

          <p className="lifestyle-desc">
            Prep helps you organise meals with clarity and intention.
            Plan your week, reduce decision fatigue, and enjoy food that
            fits your life — not the other way around.
          </p>

          <button
            className="lifestyle-btn"
            onClick={() =>
              document
                .querySelector(".benefits-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore how Prep works
          </button>
        </div>

        <div className="lifestyle-right">
          <ul>
            <li>Weekly meal planning made simple</li>
            <li>Flexible plans that adapt to you</li>
            <li>Smart grocery & recipe organisation</li>
            <li>Less stress. More consistency.</li>
          </ul>
        </div>

      </section>


      {/* ================= EXPLORE RECIPES ================= */}
      <section className="explore-section">

        <h2 className="explore-title">Explore Recipes</h2>

        <div className="explore-grid">

          <div
            className="explore-card"
            onClick={() => navigate("/recipes?type=breakfast")}
          >
            <img loading="lazy" decoding="async" src="/breakfast.jpg" alt="Breakfast" />
            <p>Breakfast</p>
          </div>

          <div
            className="explore-card"
            onClick={() => navigate("/recipes?type=lunch")}
          >
            <img loading="lazy" decoding="async" src="/lunch.jpg" alt="Lunch" />
            <p>Lunch</p>
          </div>

          <div
            className="explore-card"
            onClick={() => navigate("/recipes?type=dinner")}
          >
            <img loading="lazy" decoding="async" src="/dinner.jpg" alt="Dinner" />
            <p>Dinner</p>
          </div>

          <div
            className="explore-card"
            onClick={() => navigate("/recipes?type=snacks")}
          >
            <img loading="lazy" decoding="async" src="/snacks.jpg" alt="Snacks" />
            <p>Snacks</p>
          </div>

        </div>

      </section>


      {/* ================= BENEFITS ================= */}
      <section
        ref={benefitsRef}
        className={`benefits-section reveal-group ${benefitsVisible ? "is-visible" : ""}`}
      >

        <h2 className="section-title reveal-item">Why Use Prep?</h2>

        <div className="benefits-container">

          <div className="benefit-item reveal-item" style={{ "--reveal-order": 1 }}>
            <span className="material-icons benefit-icon">
              calendar_today
            </span>
            <h3>Organized Planning</h3>
            <p>Easily schedule your meals for the week.</p>
          </div>

          <div className="benefit-item reveal-item" style={{ "--reveal-order": 2 }}>
            <span className="material-icons benefit-icon">
              fitness_center
            </span>
            <h3>Healthy Choices</h3>
            <p>Choose nutritious recipes to stay on track.</p>
          </div>

          <div className="benefit-item reveal-item" style={{ "--reveal-order": 3 }}>
            <span className="material-icons benefit-icon">
              repeat
            </span>
            <h3>Stay Consistent</h3>
            <p>Build a routine with consistent meal prep.</p>
          </div>

          <div className="benefit-item reveal-item" style={{ "--reveal-order": 4 }}>
            <span className="material-icons benefit-icon">
              assignment
            </span>
            <h3>Smart Organization</h3>
            <p>Keep recipes, ingredients and groceries organised.</p>
          </div>

        </div>

      </section>


      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter-section">

        <div className="newsletter-content">

          <h2>Stay connected, gently....</h2>

          <p>
            Thoughtful recipes, planning ideas, and seasonal inspiration —
            only when it’s worth your time.
          </p>

          <form
            className="newsletter-form"
            onSubmit={async (e) => {

              e.preventDefault();

              const email = e.target.email.value.trim();
              if (!email) return;

              try {

                const res = await apiFetch("/api/newsletter", {
                  method: "POST",
                  body: { email }
                });

                const data = await res.json();

                if (!res.ok) {
                  setNewsletterMessage(data.message);
                  return;
                }

                setNewsletterMessage(data.message);
                e.target.reset();

              } catch (err) {

                console.error("Newsletter error:", err);
                setNewsletterMessage("Server error. Please try again.");

              }

            }}
          >

            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
            />

            <button type="submit">Subscribe</button>

          </form>

          {newsletterMessage && (
            <p className="newsletter-message">
              {newsletterMessage}
            </p>
          )}

        </div>

      </section>


      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonial-section">

        <h2 className="testimonial-title">
          "What Our Customers Say"
        </h2>

        <Carousel />

      </section>


      {/* ================= CTA ================= */}
      <section className="trial-section">

        <div className="trial-content">

          <h2>Start with a week.</h2>

          <p>
            Experience structured planning, curated recipes,
            and organised groceries.
          </p>

          <button
            className="trial-btn"
            onClick={() => navigate("/planner")}
          >
            Try the 1-Week Plan
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <img loading="lazy" decoding="async" src="/logo.png" alt="Prep logo" className="footer-logo" />

            <p>
              Prep is built around thoughtful meal planning — helping you
              organise your week, reduce decision fatigue, and enjoy food
              that fits your lifestyle. Designed with clarity, flexibility,
              and intention at its core.
            </p>

            <div className="footer-socials">

               {/* Twitter */}
  <a href="#" aria-label="Twitter" className="social-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53
      4.48 4.48 0 00-7.86 3v1
      A10.66 10.66 0 013 4s-4 9 5 13
      a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5
      a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  </a>

  {/* Facebook */}
  <a href="#" aria-label="Facebook" className="social-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7
      a1 1 0 011-1h3z" />
    </svg>
  </a>

  {/* Instagram */}
  <a href="#" aria-label="Instagram" className="social-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1"/>
    </svg>
  </a>

            </div>

          </div>


          <div className="footer-links">

            <h3>Explore</h3>

            <ul>
              <li><NavLink to="/planner">Planner</NavLink></li>
              <li><NavLink to="/recipes">Recipes</NavLink></li>
              <li><NavLink to="/grocery">Grocery</NavLink></li>
              <li><NavLink to="/blogs">Blog</NavLink></li>
              <li><NavLink to="/about">About us</NavLink></li>
            </ul>

          </div>


          <div className="footer-contact">

            <h3>Contact</h3>

            <div className="contact-item">
              <span>Call</span>
              <p>9100347480</p>
            </div>

            <div className="contact-item">
              <span>Email</span>
              <p>info@prep.co</p>
            </div>

            <div className="contact-item">
              <span>Location</span>
              <p>Mannagudda, Mangalore</p>
            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}