import { useEffect, useState } from "react";
import "../styles/loadingState.css";

// On Render's free plan the backend sleeps when idle; the first request
// after that takes 30-60 s, so explain the wait instead of showing nothing.
const SLOW_AFTER_MS = 4000;

// The PREP logo turning in the middle; `fullScreen` centres it on the whole page
export default function LoadingState({ label = "Loading...", fullScreen = false }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`loading-state-box ${fullScreen ? "is-full-screen" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-logo-stage" aria-hidden="true">
        <img src="/logo.png" alt="" className="loading-logo" />
      </div>

      {/* read out by screen readers, not shown */}
      <span className="visually-hidden">{label}</span>

      {slow && (
        <p className="loading-slow">
          Waking up the server — this can take up to a minute on the first visit.
        </p>
      )}
    </div>
  );
}
