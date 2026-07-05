import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addCertification,
  fetchAllCertifications,
  fetchCertificationById,
  editCertification,
  removeCertification,
} from "./certification.service.js";

export const create = asyncHandler(async (req, res) => {
  const certification = await addCertification(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Certification created successfully",
      certification
    )
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const certifications = await fetchAllCertifications();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Certifications fetched successfully",
      certifications
    )
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const certification = await fetchCertificationById(req.params.id);

  if (!certification) {
    throw new ApiError(404, "Certification not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Certification fetched successfully",
      certification
    )
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchCertificationById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Certification not found");
  }

  const certification = await editCertification(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Certification updated successfully",
      certification
    )
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchCertificationById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Certification not found");
  }

  await removeCertification(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Certification deleted successfully"
    )
  );
});