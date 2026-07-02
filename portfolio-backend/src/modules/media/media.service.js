import path from "path";
import {
  createMedia,
  getAllMedia,
  getMediaById,
  deleteMedia,
} from "./media.respository.js";

export const uploadMedia = async (file) => {
  const type = file.mimetype.startsWith("image/")
    ? "IMAGE"
    : "PDF";

  return await createMedia({
    fileName: file.filename,
    fileUrl: `/uploads/${path.basename(file.destination)}/${file.filename}`,
    mimeType: file.mimetype,
    fileSize: file.size,
    type,
  });
};

export const fetchAllMedia = async () => {
  return await getAllMedia();
};

export const fetchMediaById = async (id) => {
  return await getMediaById(id);
};

export const removeMedia = async (id) => {
  return await deleteMedia(id);
};