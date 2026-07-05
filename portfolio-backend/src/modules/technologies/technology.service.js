import ApiError from "../../utils/ApiError.js";

import {
  createTechnology,
  getAllTechnologies,
  getTechnologyById,
  getTechnologyByName,
  updateTechnology,
  deleteTechnology,
} from "./technology.repository.js";

export const addTechnology = async (data) => {
  const existing = await getTechnologyByName(data.name);

  if (existing) {
    throw new ApiError(409, "Technology already exists");
  }

  return await createTechnology(data);
};

export const fetchAllTechnologies = async () => {
  return await getAllTechnologies();
};

export const fetchTechnologyById = async (id) => {
  return await getTechnologyById(id);
};

export const editTechnology = async (id, data) => {
  return await updateTechnology(id, data);
};

export const removeTechnology = async (id) => {
  return await deleteTechnology(id);
};