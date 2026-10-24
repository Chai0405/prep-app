import { useState } from "react";
import { Link } from "react-router-dom";

// A "Why Use Prep?" card that flips over to show more details.
// The side facing away is `inert`, so keyboards and screen readers
// only ever reach the visible side.
export default function BenefitCard({ benefit }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`benefit-card ${flipped ? "is-flipped" : ""}`}>
      <div className="benefit-flip">

        <div className="benefit-face benefit-front" inert={flipped}>
          <button
            type="button"
            className="benefit-toggle"
            onClick={() => setFlipped(true)}
            aria-expanded={flipped}
            aria-label={`${benefit.title}: show more`}
          >
            <span className="benefit-icon-wrap">
              {/* ring that draws itself when the section appears */}
              <svg className="benefit-ring" viewBox="0 0 72 72" aria-hidden="true">
                <circle cx="36" cy="36" r="34.5" pathLength="100" />
              </svg>
              <span className="material-icons benefit-icon" aria-hidden="true">
                {benefit.icon}
              </span>
            </span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
            <span className="benefit-more" aria-hidden="true">Tap for more +</span>
          </button>
        </div>

        <div className="benefit-face benefit-back" inert={!flipped}>
          <h3>{benefit.title}</h3>
          <p className="benefit-details">{benefit.details}</p>
          <ul>
            {benefit.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="benefit-back-actions">
            <Link to={benefit.link.to} className="benefit-link">
              {benefit.link.label} →
            </Link>
            <button
              type="button"
              className="benefit-back-btn"
              onClick={() => setFlipped(false)}
              aria-label={`${benefit.title}: back`}
            >
              ← Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
