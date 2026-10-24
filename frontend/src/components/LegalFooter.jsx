import { Link } from "react-router-dom";
import { openPrivacySettings } from "../utils/consent";

export default function LegalFooter() {
  return (
    <div className="footer-bottom legal-only">
      <div className="footer-bottom-content">
        <p>© 2026 Prep. All rights reserved.</p>

        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/accessibility">Accessibility</Link>
          <button
            type="button"
            className="footer-legal-button"
            onClick={openPrivacySettings}
          >
            Privacy settings
          </button>
        </div>
      </div>
    </div>
  );
}
