import { useEffect, useState } from "react";

export default function PrivacyConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("prep_privacy_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("prep_privacy_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="privacy-popup">
  <h3>We value your privacy</h3>

  <p>
    PREP uses cookies and local storage to enhance your experience while
    planning meals, organising recipes, and managing your weekly grocery
    lists. These technologies help us remember your preferences and improve
    the overall functionality of the platform.
  </p>

  <p className="privacy-note">
    By continuing to use PREP, you agree to our use of cookies to support
    essential features and improve usability.
  </p>

  <div className="privacy-buttons">
    <button className="btn-outline">Customize</button>
    <button className="btn-outline">Reject All</button>
    <button className="btn-primary" onClick={handleAccept}>
      Accept All
    </button>
  </div>
</div>
  );
}