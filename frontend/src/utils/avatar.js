// Mirrors the backend rules in backend/utils/avatar.js
export const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
export const MAX_AVATAR_FILE_BYTES = 5 * 1024 * 1024;
const AVATAR_SIZE = 256;

// Returns an error message for files we won't even try to process
export const checkAvatarFile = (file) => {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return "Please choose a PNG, JPEG, WebP or GIF image";
  }
  if (file.size > MAX_AVATAR_FILE_BYTES) {
    return "Image is too large (max 5 MB)";
  }
  return null;
};

/*
  Scales the image down to fit 256x256 and re-encodes it as JPEG, so what we
  store is a few tens of KB instead of the original photo.
*/
export const resizeAvatar = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, AVATAR_SIZE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));

      const ctx = canvas.getContext("2d");
      // JPEG has no transparency: paint transparent areas black like the UI
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file could not be read as an image"));
    };

    img.src = url;
  });
