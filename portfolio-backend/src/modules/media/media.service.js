import cloudinary from "../../config/cloudinary.js";
import {
  createMedia,
  getAllMedia,
  getMediaById,
  deleteMedia,
} from "./media.repository.js";

/**
 * After multer-storage-cloudinary uploads, req.file contains:
 *   file.path        → Cloudinary secure_url (absolute URL, works everywhere)
 *   file.filename    → Cloudinary public_id  (used to delete later)
 *   file.originalname
 *   file.mimetype
 *   file.size
 *
 * We store:
 *   fileName = original filename (human readable)
 *   fileUrl  = secure_url        (directly usable in <img src=...>)
 *
 * For deletion we re-derive the public_id from fileUrl.
 * This avoids any schema change.
 */
export const uploadMedia = async (file) => {
  const type = file.mimetype.startsWith("image/") ? "IMAGE" : "PDF";

  return await createMedia({
    fileName: file.originalname,
    fileUrl: file.path,       // secure_url — absolute Cloudinary URL
    mimeType: file.mimetype,
    fileSize: file.size,
    type,
  });
};

export const fetchAllMedia = async () => getAllMedia();

export const fetchMediaById = async (id) => getMediaById(id);

/**
 * Delete asset from Cloudinary then remove DB record.
 *
 * public_id is derived from the secure_url:
 *   Image: https://res.cloudinary.com/cloud/image/upload/v123/portfolio/temp/abc.jpg
 *          → public_id: "portfolio/temp/abc"  (no extension)
 *   PDF:   https://res.cloudinary.com/cloud/raw/upload/v123/portfolio/resume/abc.pdf
 *          → public_id: "portfolio/resume/abc.pdf"  (keep extension for raw type)
 */
export const removeMedia = async (id) => {
  const media = await getMediaById(id);
  if (!media) return;

  try {
    const publicId = extractPublicId(media.fileUrl, media.type);
    if (publicId) {
      const resourceType = media.type === "PDF" ? "raw" : "image";
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }
  } catch (err) {
    // Don't block DB deletion if Cloudinary fails
    console.error(`[Cloudinary] Delete failed for ${media.fileUrl}:`, err.message);
  }

  return await deleteMedia(id);
};

/**
 * Extracts Cloudinary public_id from a secure_url.
 *
 * Image URL: https://res.cloudinary.com/cloud/image/upload/v123/portfolio/temp/abc.jpg
 *   → public_id: "portfolio/temp/abc"  (no extension — Cloudinary strips it for images)
 *
 * PDF URL:   https://res.cloudinary.com/cloud/raw/upload/v123/portfolio/resume/abc.pdf
 *   → public_id: "portfolio/resume/abc.pdf"  (keep extension — required for raw assets)
 *
 * We parse the URL directly instead of reconstructing it to avoid any mismatch.
 */
function extractPublicId(url, type) {
  if (!url || !url.includes("cloudinary.com")) return null;

  try {
    // Find "/upload/" segment — works for both /image/upload/ and /raw/upload/
    const uploadIdx = url.indexOf("/upload/");
    if (uploadIdx === -1) return null;

    let after = url.slice(uploadIdx + 8);   // everything after "/upload/"
    after = after.replace(/^v\d+\//, "");   // strip optional version prefix v123456/

    if (type !== "PDF") {
      // Images: strip file extension — Cloudinary identifies by public_id without extension
      after = after.replace(/\.[^/.]+$/, "");
    }
    // PDFs (raw): keep the extension — Cloudinary raw assets require the extension in public_id

    return after;
  } catch {
    return null;
  }
}
