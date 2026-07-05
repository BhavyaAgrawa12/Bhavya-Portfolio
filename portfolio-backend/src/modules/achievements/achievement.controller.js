import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addAchievement,
  fetchAllAchievements,
  fetchAchievementById,
  editAchievement,
  removeAchievement,
} from "./achievement.service.js";

export const create = asyncHandler(async (req, res) => {
  const achievement = await addAchievement(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Achievement created successfully", achievement)
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const achievements = await fetchAllAchievements();

  return res.status(200).json(
    new ApiResponse(200, "Achievements fetched successfully", achievements)
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const achievement = await fetchAchievementById(req.params.id);

  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Achievement fetched successfully", achievement)
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchAchievementById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Achievement not found");
  }

  const achievement = await editAchievement(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Achievement updated successfully", achievement)
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchAchievementById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Achievement not found");
  }

  await removeAchievement(req.params.id);

  return res.status(200).json(
    new ApiResponse(200, "Achievement deleted successfully")
  );
});