import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addInternship,
  fetchAllInternships,
  fetchInternshipById,
  editInternship,
  removeInternship,
} from "./internship.service.js";

export const create = asyncHandler(async (req, res) => {
  const internship = await addInternship(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Internship created successfully", internship)
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const internships = await fetchAllInternships();

  return res.status(200).json(
    new ApiResponse(200, "Internships fetched successfully", internships)
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const internship = await fetchInternshipById(req.params.id);

  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Internship fetched successfully", internship)
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchInternshipById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Internship not found");
  }

  const internship = await editInternship(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Internship updated successfully", internship)
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchInternshipById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Internship not found");
  }

  await removeInternship(req.params.id);

  return res.status(200).json(
    new ApiResponse(200, "Internship deleted successfully")
  );
});