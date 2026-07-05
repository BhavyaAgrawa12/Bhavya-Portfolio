import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "./achievement.repository.js";

export const addAchievement = async (data) => {
  return await createAchievement(data);
};

export const fetchAllAchievements = async () => {
  return await getAllAchievements();
};

export const fetchAchievementById = async (id) => {
  return await getAchievementById(id);
};

export const editAchievement = async (id, data) => {
  return await updateAchievement(id, data);
};

export const removeAchievement = async (id) => {
  return await deleteAchievement(id);
};