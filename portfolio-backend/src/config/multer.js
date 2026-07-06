import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const ALLOWED_FOLDERS = [
  "profile",
  "workspace",
  "projects",
  "certifications",
  "internships",
  "achievements",
  "resume",
  "temp",
];

const IMAGE_MIMETYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const PDF_MIMETYPES   = ["application/pdf"];

/**
 * Why separate storages instead of resource_type: "auto":
 *
 * multer-storage-cloudinary@4.x stores whatever URL Cloudinary returns in
 * file.path. When resource_type is "auto", Cloudinary classifies PDFs as
 * "raw" and delivers them at /raw/upload/... but the library may record
 * /image/upload/... in file.path, causing a URL mismatch that returns 401.
 *
 * Using explicit resource_type per file type guarantees:
 *   - Images: stored and delivered at /image/upload/...  ← file.path is correct
 *   - PDFs:   stored and delivered at /raw/upload/...    ← file.path is correct
 *
 * We NEVER manually construct Cloudinary URLs. We always store file.path
 * directly from the upload response, which is always the correct delivery URL.
 */

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const folder = req.body.folder || "temp";
    if (!ALLOWED_FOLDERS.includes(folder)) throw new Error("Invalid folder name");
    return {
      folder: `portfolio/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      resource_type: "image",
      access_mode: "public",          // ensure public delivery
    };
  },
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const folder = req.body.folder || "temp";
    if (!ALLOWED_FOLDERS.includes(folder)) throw new Error("Invalid folder name");
    return {
      folder: `portfolio/${folder}`,
      allowed_formats: ["pdf"],
      resource_type: "raw",
      access_mode: "public",
      // Preserve original filename so the URL includes .pdf extension.
      // Without this Cloudinary assigns a random public_id with no extension,
      // causing browsers to not recognise the MIME type.
      // use_filename: true  → use the original file name as the public_id base
      // unique_filename: true → append a random suffix to avoid collisions
      use_filename: true,
      unique_filename: true,
    };
  },
});

/**
 * Custom storage that picks imageStorage or pdfStorage based on mimetype.
 * This is the minimal interface multer expects from a storage engine.
 */
const smartStorage = {
  _handleFile(req, file, cb) {
    if (IMAGE_MIMETYPES.includes(file.mimetype)) {
      imageStorage._handleFile(req, file, cb);
    } else if (PDF_MIMETYPES.includes(file.mimetype)) {
      pdfStorage._handleFile(req, file, cb);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  _removeFile(req, file, cb) {
    if (IMAGE_MIMETYPES.includes(file.mimetype)) {
      imageStorage._removeFile(req, file, cb);
    } else {
      pdfStorage._removeFile(req, file, cb);
    }
  },
};

const fileFilter = (_req, file, cb) => {
  const allowed = [...IMAGE_MIMETYPES, ...PDF_MIMETYPES];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Invalid file type"));
};

const upload = multer({
  storage: smartStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;
