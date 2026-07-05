import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addProject,
  fetchAllProjects,
  fetchProjectBySlug,
  fetchProjectById,
  editProject,
  removeProject,
  setThumbnail,
  removeThumbnail,
  uploadGalleryImage,
  fetchGallery,
  removeGalleryImage,
} from "./project.service.js";


export const create = asyncHandler(async (req, res) => {
  const project = await addProject(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Project created successfully", project)
  );
});

export const getAll = asyncHandler(async (req, res) => {
  const projects = await fetchAllProjects();

  return res.status(200).json(
    new ApiResponse(200, "Projects fetched successfully", projects)
  );
});

export const getBySlug = asyncHandler(async (req, res) => {
  const project = await fetchProjectBySlug(req.params.slug);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Project fetched successfully", project)
  );
});

export const getById = asyncHandler(async (req, res) => {
  const project = await fetchProjectById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Project fetched successfully", project)
  );
});

export const update = asyncHandler(async (req, res) => {
  const existing = await fetchProjectById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Project not found");
  }

  const project = await editProject(req.params.id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Project updated successfully", project)
  );
});

export const remove = asyncHandler(async (req, res) => {
  const existing = await fetchProjectById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Project not found");
  }

  await removeProject(req.params.id);

  return res.status(200).json(
    new ApiResponse(200, "Project deleted successfully")
  );
});

export const setProjectThumbnail = asyncHandler(async (req, res) => {
  const existing = await fetchProjectById(req.params.id);

  if (!existing) {
    throw new ApiError(404, "Project not found");
  }

  const project = await setThumbnail(
    req.params.id,
    req.body.thumbnailId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Thumbnail updated successfully",
      project
    )
  );
});

export const removeProjectThumbnail = asyncHandler(async (req, res) => {
  const project = await removeThumbnail(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Thumbnail removed successfully",
      project
    )
  );
});

export const addProjectImage = asyncHandler(async (req, res) => {
  const image = await uploadGalleryImage(
    req.params.id,
    req.body.mediaId,
    req.body.displayOrder
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Project image added successfully",
      image
    )
  );
});

export const getProjectImages = asyncHandler(async (req, res) => {
  const images = await fetchGallery(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project images fetched successfully",
      images
    )
  );
});

export const deleteProjectImage = asyncHandler(async (req, res) => {
  await removeGalleryImage(req.params.imageId);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project image deleted successfully"
    )
  );
});