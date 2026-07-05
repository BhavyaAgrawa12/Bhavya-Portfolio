import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  getSkillByName,
} from "./skill.repository.js";

import ApiError from "../../utils/ApiError.js";

export const addSkill = async (data) => {
  const existingSkill = await getSkillByName(data.name);

  if (existingSkill) {
    throw new ApiError(409, "Skill already exists");
  }

  return await createSkill(data);
};

export const fetchAllSkills = async () => {
  return await getAllSkills();
};

export const fetchSkillById = async (id) => {
  return await getSkillById(id);
};

export const editSkill = async (id, data) => {
  if (data.name) {
    const existingSkill = await getSkillByName(data.name);

    if (existingSkill && existingSkill.id !== id) {
      throw new ApiError(409, "Skill already exists");
    }
  }

  return await updateSkill(id, data);
};

export const removeSkill = async (id) => {
  return await deleteSkill(id);
};