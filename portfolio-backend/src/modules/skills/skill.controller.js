import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addSkill,
  fetchAllSkills,
  fetchSkillById,
  editSkill,
  removeSkill,
} from "./skill.service.js";

export const create = asyncHandler(async (req, res) => {
  const skill = await addSkill(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Skill created successfully",
      skill
    )
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const skills = await fetchAllSkills();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Skills fetched successfully",
      skills
    )
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const skill = await fetchSkillById(req.params.id);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Skill fetched successfully",
      skill
    )
  );
});

export const update = asyncHandler(async (req, res) => {
  const existingSkill = await fetchSkillById(req.params.id);

  if (!existingSkill) {
    throw new ApiError(404, "Skill not found");
  }

  const skill = await editSkill(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Skill updated successfully",
      skill
    )
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existingSkill = await fetchSkillById(req.params.id);

  if (!existingSkill) {
    throw new ApiError(404, "Skill not found");
  }

  await removeSkill(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Skill deleted successfully"
    )
  );
});