import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const uploadRoot = "uploads";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const folder = req.body.folder || "temp";

        const allowedFolders = [
            "profile",
            "workspace",
            "projects",
            "certifications",
            "interships",
            "achievements",
            "resume",
            "temp",
        ];

        if(!allowedFolders.includes(folder)){
            return cb(new Error("Invalid folder name"));
        }

        const uploadPath = path.join(uploadRoot, folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },

    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`)
    }
});

const fileFilter = (req, file, cb) => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  const pdfTypes = [
    "application/pdf",
  ];

  const allowedTypes = [
    ...imageTypes,
    ...pdfTypes,
  ];

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type"));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024, 
    },
});

export default upload;