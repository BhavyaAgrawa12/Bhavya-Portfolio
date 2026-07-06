import prisma from "../../lib/prisma.js";

export const createCertification = async (data) => {
  return await prisma.certification.create({
    data,
    include: { media: true },
  });
};

export const getAllCertifications = async () => {
  return await prisma.certification.findMany({
    include: { media: true },
    orderBy: { displayOrder: "asc" },
  });
};

export const getCertificationById = async (id) => {
  return await prisma.certification.findUnique({
    where: { id },
    include: { media: true },
  });
};

export const updateCertification = async (id, data) => {
  return await prisma.certification.update({
    where: { id },
    data,
    include: { media: true },
  });
};

export const deleteCertification = async (id) => {
  return await prisma.certification.delete({ where: { id } });
};
