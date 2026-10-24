import { useEffect, useState } from "react";
import "../styles/loadingState.css";

// On Render's free plan the backend sleeps when idle; the first request
// after that takes 30-60 s, so explain the wait instead of showing nothing.
const SLOW_AFTER_MS = 4000;

export default function LoadingState({ label = "Loading..." }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-state-box" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{label}</p>
      {slow && (
        <p className="loading-slow">
          Waking up the server — this can take up to a minute on the first visit.
        </p>
      )}
    </div>
  );
}
