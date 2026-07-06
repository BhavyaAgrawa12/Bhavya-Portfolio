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

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const folder = req.body.folder || "temp";

    if (!ALLOWED_FOLDERS.includes(folder)) {
      throw new Error("Invalid folder name");
    }

    return {
      // Organise under portfolio/ so all assets live in one top-level folder
      folder: `portfolio/${folder}`,
      // Keep the original file extension for PDFs; Cloudinary handles images natively
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
      resource_type: "auto",          // accepts both images and raw (PDF)
      // No transformation — store originals as-is
    };
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
  ];

  if (allowed.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB — same as before
});

export default upload;
