import {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
} from "./certification.repository.js";

export const addCertification = async (data) => {
  return await createCertification(data);
};

export const fetchAllCertifications = async () => {
  return await getAllCertifications();
};

export const fetchCertificationById = async (id) => {
  return await getCertificationById(id);
};

export const editCertification = async (id, data) => {
  return await updateCertification(id, data);
};

export const removeCertification = async (id) => {
  return await deleteCertification(id);
};