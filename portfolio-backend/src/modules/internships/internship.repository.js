import prisma from "../../lib/prisma.js";

export const createInternship = async (data) => {
  return await prisma.internship.create({
    data,
    include: { media: true },
  });
};

export const getAllInternships = async () => {
  return await prisma.internship.findMany({
    include: { media: true },
    orderBy: { displayOrder: "asc" },
  });
};

export const getInternshipById = async (id) => {
  return await prisma.internship.findUnique({
    where: { id },
    include: { media: true },
  });
};

export const updateInternship = async (id, data) => {
  return await prisma.internship.update({
    where: { id },
    data,
    include: { media: true },
  });
};

export const deleteInternship = async (id) => {
  return await prisma.internship.delete({ where: { id } });
};
