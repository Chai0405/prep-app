/*
  Privacy consent.

  Essential (always on, not stored by choice): the login token, the httpOnly
  auth cookie, and this consent record itself.
  Optional "preferences": remembering the cart between visits (localStorage).

  PREP has no analytics or advertising cookies. Add a category here before
  introducing anything that needs one.
*/

export const CONSENT_KEY = "prep_privacy_consent";
const CONSENT_VERSION = 1;

export const CONSENT_CHANGED = "prep:consent-changed";
export const OPEN_PRIVACY_SETTINGS = "prep:open-privacy-settings";

const readStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Returns { preferences } once the user has chosen, otherwise null
export const getConsent = () => {
  const raw = readStorage(CONSENT_KEY);

  if (!raw) return null;

  // Earlier versions only had an "Accept All" button
  if (raw === "accepted") return { preferences: true };

  try {
    const parsed = JSON.parse(raw);
    return parsed?.version === CONSENT_VERSION
      ? { preferences: Boolean(parsed.preferences) }
      : null;
  } catch {
    return null;
  }
};

export const canStorePreferences = () => getConsent()?.preferences === true;

export const setConsent = ({ preferences }) => {
  const consent = { preferences: Boolean(preferences) };

  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ version: CONSENT_VERSION, ...consent, decidedAt: new Date().toISOString() })
    );
  } catch {
    // Storage blocked: the choice applies for this visit only
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: consent }));
  return consent;
};

export const openPrivacySettings = () =>
  window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS));
