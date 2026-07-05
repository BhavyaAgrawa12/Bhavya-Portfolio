import prisma from "../../lib/prisma.js";

export const createTechnology = async (data) => {
  return await prisma.technology.create({
    data,
  });
};

export const getAllTechnologies = async () => {
  return await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getTechnologyById = async (id) => {
  return await prisma.technology.findUnique({
    where: {
      id,
    },
  });
};

export const getTechnologyByName = async (name) => {
  return await prisma.technology.findUnique({
    where: {
      name,
    },
  });
};

export const updateTechnology = async (id, data) => {
  return await prisma.technology.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTechnology = async (id) => {
  return await prisma.technology.delete({
    where: {
      id,
    },
  });
};