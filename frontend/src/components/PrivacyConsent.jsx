import { useEffect, useState } from "react";
import { getConsent, setConsent, OPEN_PRIVACY_SETTINGS } from "../utils/consent";

export default function PrivacyConsent() {
  const [show, setShow] = useState(() => getConsent() === null);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState(
    () => getConsent()?.preferences ?? false
  );

  // "Privacy settings" links reopen the panel at any time
  useEffect(() => {
    const open = () => {
      setPreferences(getConsent()?.preferences ?? false);
      setCustomizing(true);
      setShow(true);
    };
    window.addEventListener(OPEN_PRIVACY_SETTINGS, open);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS, open);
  }, []);

  const decide = (choice) => {
    setConsent({ preferences: choice });
    setShow(false);
    setCustomizing(false);
  };

  if (!show) return null;

  return (
    <div
      className="privacy-popup"
      role="dialog"
      aria-labelledby="privacy-title"
    >
  <h3 id="privacy-title">We value your privacy</h3>

  {!customizing ? (
    <>
      <p>
        PREP uses cookies and local storage to enhance your experience while
        planning meals, organising recipes, and managing your weekly grocery
        lists. These technologies help us remember your preferences and improve
        the overall functionality of the platform.
      </p>

      <p className="privacy-note">
        Essential storage keeps you signed in and secure and is always on.
        Everything else is optional. We don't use analytics or advertising cookies.
      </p>

      <div className="privacy-buttons">
        <button className="btn-outline" onClick={() => setCustomizing(true)}>Customize</button>
        <button className="btn-outline" onClick={() => decide(false)}>Reject All</button>
        <button className="btn-primary" onClick={() => decide(true)}>
          Accept All
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="privacy-option">
        <label>
          <input type="checkbox" checked disabled />
          <span>
            <strong>Essential</strong>
            Sign-in, security and remembering this choice. Always on.
          </span>
        </label>
      </div>

      <div className="privacy-option">
        <label>
          <input
            type="checkbox"
            checked={preferences}
            onChange={(e) => setPreferences(e.target.checked)}
          />
          <span>
            <strong>Preferences</strong>
            Remember your cart between visits on this device.
          </span>
        </label>
      </div>

      <div className="privacy-buttons">
        <button className="btn-outline" onClick={() => decide(false)}>Reject All</button>
        <button className="btn-primary" onClick={() => decide(preferences)}>
          Save choices
        </button>
      </div>
    </>
  )}
</div>
  );
}
