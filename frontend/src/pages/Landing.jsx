import "../styles/landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">

      {/* LOGO */}
      <img src="/logo.png" alt="Prep Logo" className="landing-logo" />

      <div className="landing-left">
        <div className="landing-content">
          <h1>Plan with clarity. Eat with intention.</h1>
          <p className="subtitle">From pantry to plate.</p>
          <p className="desc">
            Prep brings structure to your weekly meals.
Plan recipes, organise ingredients, and reduce daily decision fatigue — all in one focused, distraction-free space.
          </p>
          <button onClick={() => navigate("/auth")}>
            Get Started
            </button>
        </div>
      </div>

      <div className="landing-right">
        <img src="/hero-food.png" alt="Hero" />
      </div>

    </div>
  );
}