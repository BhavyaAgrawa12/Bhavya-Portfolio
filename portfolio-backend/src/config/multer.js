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
 * Images: resource_type "image" — delivered at /image/upload/
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
      access_mode: "public",
    };
  },
});

/**
 * PDFs: ALSO use resource_type "image" with format "pdf".
 *
 * Why not resource_type "raw"?
 * - raw assets are delivered with Content-Disposition: attachment by default.
 * - Cloudinary does not support fl_inline on raw resources.
 * - This means raw PDFs always force a download — they cannot be opened inline.
 *
 * Why resource_type "image" for PDFs?
 * - Cloudinary's image pipeline supports PDFs natively.
 * - Images are delivered inline (Content-Disposition: inline) by default.
 * - fl_inline transformation is supported and can be added if needed.
 * - The secure_url uses /image/upload/ and opens correctly in browser tabs.
 *
 * Cloudinary documentation confirms PDFs are valid image-type uploads.
 */
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const folder = req.body.folder || "temp";
    if (!ALLOWED_FOLDERS.includes(folder)) throw new Error("Invalid folder name");
    return {
      folder: `portfolio/${folder}`,
      allowed_formats: ["pdf"],
      resource_type: "image",   // image pipeline supports PDFs and inline delivery
      format: "pdf",            // preserve as PDF — do not convert to image
      access_mode: "public",
      use_filename: true,
      unique_filename: true,
    };
  },
});

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
