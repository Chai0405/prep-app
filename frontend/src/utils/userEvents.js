// Lets the profile page tell the navbar that the signed-in user changed
// (new avatar or name), without reloading the page.
export const USER_UPDATED = "prep:user-updated";

export const notifyUserUpdated = (user) =>
  window.dispatchEvent(new CustomEvent(USER_UPDATED, { detail: user }));
