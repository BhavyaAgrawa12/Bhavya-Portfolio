import {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "./education.repository.js";

export const addEducation = async (data) => {
  return await createEducation(data);
};

export const fetchAllEducation = async () => {
  return await getAllEducation();
};

export const fetchEducationById = async (id) => {
  return await getEducationById(id);
};

export const editEducation = async (id, data) => {
  return await updateEducation(id, data);
};

export const removeEducation = async (id) => {
  return await deleteEducation(id);
};