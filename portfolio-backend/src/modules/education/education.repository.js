import prisma from "../../lib/prisma.js";

export const createEducation = async (data) => {
  return await prisma.education.create({
    data,
  });
};

export const getAllEducation = async () => {
  return await prisma.education.findMany({
    orderBy: {
      displayOrder: "asc",
    },
  });
};

export const getEducationById = async (id) => {
  return await prisma.education.findUnique({
    where: {
      id,
    },
  });
};

export const updateEducation = async (id, data) => {
  return await prisma.education.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteEducation = async (id) => {
  return await prisma.education.delete({
    where: {
      id,
    },
  });
};