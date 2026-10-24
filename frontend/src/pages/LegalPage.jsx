import { openPrivacySettings } from "../utils/consent";
import "../styles/legal.css";

/*
  PLACEHOLDER legal pages. This text has NOT been reviewed by a lawyer and
  must be replaced with reviewed content before production use.
*/

const PAGES = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          This placeholder describes what the PREP app currently stores. It is
          a factual summary for development, not a privacy policy.
        </p>

        <h2>Account data</h2>
        <p>
          Your name, email address, a hashed password, an optional profile
          picture, your weekly meal plans, your grocery list and, if you
          subscribe, your newsletter email address.
        </p>

        <h2>Storage on your device</h2>
        <ul>
          <li><strong>Essential:</strong> a sign-in token and a secure cookie that keep you signed in, and a record of your privacy choice.</li>
          <li><strong>Preferences (optional):</strong> your cart, saved between visits only if you allow it.</li>
        </ul>
        <p>PREP does not use analytics or advertising cookies.</p>
        <p>
          <button type="button" className="legal-button" onClick={openPrivacySettings}>
            Change privacy settings
          </button>
        </p>

        <h2>Deleting your account</h2>
        <p>
          You can delete your account from your profile. This permanently
          removes your account, meal plans, grocery list and newsletter
          subscription.
        </p>

        <h2>Third parties</h2>
        <p>
          Emails are sent through a transactional email provider. Fonts are
          loaded from Google Fonts.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms",
    body: (
      <p>
        Terms of use have not been written yet. Online ordering and payments
        are not available.
      </p>
    ),
  },
  accessibility: {
    title: "Accessibility",
    body: (
      <p>
        An accessibility statement has not been written yet. If something in
        PREP is hard to use, please let us know.
      </p>
    ),
  },
};

export default function LegalPage({ page }) {
  const { title, body } = PAGES[page];

  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1>{title}</h1>

        <p className="legal-placeholder" role="note">
          Placeholder content. This page has not been legally reviewed and
          must be replaced before production use.
        </p>

        {body}
      </div>
    </div>
  );
}
