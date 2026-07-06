import prisma from "../../lib/prisma.js";

export const createAchievement = async (data) => {
  return await prisma.achievement.create({
    data,
    include: { media: true },
  });
};

export const getAllAchievements = async () => {
  return await prisma.achievement.findMany({
    include: { media: true },
    orderBy: { displayOrder: "asc" },
  });
};

export const getAchievementById = async (id) => {
  return await prisma.achievement.findUnique({
    where: { id },
    include: { media: true },
  });
};

export const updateAchievement = async (id, data) => {
  return await prisma.achievement.update({
    where: { id },
    data,
    include: { media: true },
  });
};

export const deleteAchievement = async (id) => {
  return await prisma.achievement.delete({ where: { id } });
};
