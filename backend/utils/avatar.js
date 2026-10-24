/* eslint-env node */

// The browser resizes avatars to 256px before upload (~20-40KB), so this is generous
export const MAX_AVATAR_BYTES = 300 * 1024;

const SIGNATURES = {
  "image/png": (b) => b.length > 8 && b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG",
  "image/jpeg": (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/gif": (b) => b.length > 6 && b.toString("ascii", 0, 4) === "GIF8",
  "image/webp": (b) => b.length > 12 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP",
};

/*
  Validates an avatar data URL. Returns an error message, or null if valid.
  The declared type must match the file's actual signature bytes, so text or
  scripts can't be smuggled in with an image/* label.
*/
export const validateAvatar = (avatar) => {
  if (typeof avatar !== "string") return "Avatar must be an image";

  const match = avatar.match(/^data:(image\/(?:png|jpeg|gif|webp));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) return "Avatar must be a PNG, JPEG, WebP or GIF image";

  const [, mimeType, base64] = match;
  const bytes = Buffer.from(base64, "base64");

  if (bytes.length > MAX_AVATAR_BYTES) return "Image is too large (max 300 KB after resizing)";
  if (!SIGNATURES[mimeType](bytes)) return "File content does not match its image type";

  return null;
};
