import {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} from "./internship.repository.js";

export const addInternship = async (data) => {
  return await createInternship(data);
};

export const fetchAllInternships = async () => {
  return await getAllInternships();
};

export const fetchInternshipById = async (id) => {
  return await getInternshipById(id);
};

export const editInternship = async (id, data) => {
  return await updateInternship(id, data);
};

export const removeInternship = async (id) => {
  return await deleteInternship(id);
};