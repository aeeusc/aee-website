// src/lib/imageUpload.js
//
// Shared client-side image preparation for profile photos.
//
// Extracted 2026-08-23 when admins gained the ability to set a photo on
// someone else's account — at creation (CreateUser.jsx) and from Manage
// Accounts (AdminUsers.jsx). Profile.jsx already did this work inside its
// crop modal; rather than copy that logic into two more places, the plain
// "pick a file, get a square data URL" path lives here.
//
// Profile.jsx keeps its own richer flow (drag-to-reposition + zoom), since
// a member choosing how their own face is framed is worth the extra
// interaction. These two admin paths are bulk data entry — the admin has
// a headshot and wants it on the account — so they get a straight
// center-crop instead of a modal.
//
// WHY THIS COMPRESSES AT ALL
// Profile photos are stored in Postgres as data URLs (an explicit choice
// for this project — no separate file host). The backend caps a photo at
// ~2MB of base64 (PHOTO_DATA_URL_MAX in routes/auth.js). A photo straight
// off a phone is routinely 3-8MB, so without this step a perfectly normal
// upload would just get rejected. Re-encoding to a 512px square JPEG puts
// it comfortably under the cap while still being sharp on a retina
// display at the size a member card actually renders it.

const OUTPUT_SIZE = 512;
const JPEG_QUALITY = 0.85;

// Reads a File, center-crops it square, downscales to OUTPUT_SIZE, and
// returns a JPEG data URL. Rejects with a readable Error the caller can
// show directly.
export function fileToSquareDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected.'));
      return;
    }
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file does not look like an image.'));
      img.onload = () => {
        try {
          // Center crop to a square using the shorter edge, so a portrait
          // or landscape photo keeps its middle rather than being
          // squashed to fit.
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2;
          const sy = (img.height - side) / 2;

          const canvas = document.createElement('canvas');
          canvas.width = OUTPUT_SIZE;
          canvas.height = OUTPUT_SIZE;
          const ctx = canvas.getContext('2d');

          // White base before drawing: a transparent PNG re-encoded to
          // JPEG would otherwise render its transparent areas as black.
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
          ctx.drawImage(img, sx, sy, side, side, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

          resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
        } catch {
          reject(new Error('Could not process that image.'));
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
