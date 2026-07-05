import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addTechnology,
  fetchAllTechnologies,
  fetchTechnologyById,
  editTechnology,
  removeTechnology,
} from "./technology.service.js";

export const create = asyncHandler(async (req, res) => {
  const technology = await addTechnology(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Technology created successfully", technology)
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const technologies = await fetchAllTechnologies();

  return res.status(200).json(
    new ApiResponse(200, "Technologies fetched successfully", technologies)
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const technology = await fetchTechnologyById(req.params.id);

  if (!technology) {
    throw new ApiError(404, "technology not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "technology fetched successfully", technology)
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchTechnologyById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Technology not found");
  }

  const technology = await editTechnology(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Technology updated successfully", technology)
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchTechnologyById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Technology not found");
  }

  await removeTechnology(req.params.id);

  return res.status(200).json(
    new ApiResponse(200, "technology deleted successfully")
  );
});