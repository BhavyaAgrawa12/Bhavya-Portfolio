import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addEducation,
  fetchAllEducation,
  fetchEducationById,
  editEducation,
  removeEducation,
} from "./education.service.js";

export const create = asyncHandler(async (req, res) => {
  const education = await addEducation(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Education created successfully",
      education
    )
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const education = await fetchAllEducation();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education fetched successfully",
      education
    )
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const education = await fetchEducationById(req.params.id);

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education fetched successfully",
      education
    )
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchEducationById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Education not found");
  }

  const education = await editEducation(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education updated successfully",
      education
    )
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchEducationById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Education not found");
  }

  await removeEducation(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education deleted successfully"
    )
  );
});