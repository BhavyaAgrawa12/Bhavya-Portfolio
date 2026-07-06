import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { uploadMedia, fetchAllMedia, removeMedia, fetchMediaById, createMedia } from "./media.service.js";

export const upload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  // Log the full Cloudinary response for debugging
  console.log("[Media Upload] Full Cloudinary response:", {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,           // secure_url stored as fileUrl
    filename: req.file.filename,   // public_id
    // Capture additional Cloudinary response fields if available
    url: req.file.url,
    secure_url: req.file.secure_url,
    public_id: req.file.public_id,
    resource_type: req.file.resource_type,
    format: req.file.format,
    original_filename: req.file.original_filename,
    asset_id: req.file.asset_id,
    version: req.file.version,
    signature: req.file.signature,
    bytes: req.file.bytes,
    etag: req.file.etag,
  });

  const media = await uploadMedia(req.file);

  return res.status(201).json(
    new ApiResponse(201, "File uploaded successfully", media)
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const media = await fetchAllMedia();

  return res.status(200).json(
    new ApiResponse(200, "Media fetched successfully", media)
  );
});

export const remove = asyncHandler(async (req, res) => {
  const media = await fetchMediaById(req.params.id);

  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  await removeMedia(media.id);

  return res.status(200).json(
    new ApiResponse(200, "Media deleted successfully")
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const media = await fetchMediaById(req.params.id);

  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Media fetched successfully", media)
  );
});

export const createFromUrl = asyncHandler(async (req, res) => {
  const { url, fileName } = req.body;

  if (!url || !fileName) {
    throw new ApiError(400, "URL and fileName are required");
  }

  // Create a media record with external URL stored in both fileName and fileUrl
  const media = await createMedia({
    fileName: fileName, // Store the external URL here for frontend detection
    fileUrl: url,       // Store the actual URL here
    mimeType: 'application/pdf',
    fileSize: 0,
    type: 'PDF',
  });

  return res.status(201).json(
    new ApiResponse(201, "Media created from URL successfully", media)
  );
});
