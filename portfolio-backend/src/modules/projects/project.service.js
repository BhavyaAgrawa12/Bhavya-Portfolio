import ApiError from "../../utils/ApiError.js";

import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  getProjectByTitle,
  updateProject,
  deleteProject,
  updateProjectThumbnail,
  removeProjectThumbnail,
  addProjectImage,
  getProjectImages,
  deleteProjectImage,
} from "./project.repository.js";

import { fetchMediaById } from "../media/media.service.js";

import { slugify } from "../../utils/slugify.js";

export const addProject = async (data) => {
  const {
    technologies = [],
    ...projectData
  } = data;

  // Generate slug automatically
  projectData.slug = slugify(projectData.title);

  // Check duplicate title (optional)
  const existingTitle = await getProjectByTitle(projectData.title);

  if (existingTitle) {
    throw new ApiError(409, "Project title already exists");
  }

  // Check duplicate slug
  const existingSlug = await getProjectBySlug(projectData.slug);

  if (existingSlug) {
    throw new ApiError(409, "Project slug already exists");
  }

  return await createProject(projectData, technologies);
}


export const fetchAllProjects = async () => {
  return await getAllProjects();
};

export const fetchProjectBySlug = async (slug) => {
  return await getProjectBySlug(slug);
};

export const fetchProjectById = async (id) => {
  return await getProjectById(id);
};

export const editProject = async (id, data) => {
  const {
    technologies = [],
    ...projectData
  } = data;

  if (projectData.title) {
    projectData.slug = slugify(projectData.title);
  }

  return await updateProject(id, projectData, technologies);
};

export const removeProject = async (id) => {
  return await deleteProject(id);
};

export const setThumbnail = async (projectId, thumbnailId) => {
  const media = await fetchMediaById(thumbnailId);

  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  return await updateProjectThumbnail(projectId, thumbnailId);
};

export const removeThumbnail = async (projectId) => {
  return await removeProjectThumbnail(projectId);
};

export const uploadGalleryImage = async (
  projectId,
  mediaId,
  displayOrder
) => {
  return await addProjectImage(
    projectId,
    mediaId,
    displayOrder
  );
};

export const fetchGallery = async (projectId) => {
  return await getProjectImages(projectId);
};

export const removeGalleryImage = async (id) => {
  return await deleteProjectImage(id);
};