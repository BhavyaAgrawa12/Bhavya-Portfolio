import prisma from "../../lib/prisma.js";

export const createCertification = async (data) => {
  return await prisma.certification.create({
    data,
    include: {
      certificateImage: true,
    },
  });
};

export const getAllCertifications = async () => {
  return await prisma.certification.findMany({
    include: {
      certificateImage: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });
};

export const getCertificationById = async (id) => {
  return await prisma.certification.findUnique({
    where: {
      id,
    },
    include: {
      certificateImage: true,
    },
  });
};

export const updateCertification = async (id, data) => {
  return await prisma.certification.update({
    where: {
      id,
    },
    data,
    include: {
      certificateImage: true,
    },
  });
};

export const deleteCertification = async (id) => {
  return await prisma.certification.delete({
    where: {
      id,
    },
  });
};