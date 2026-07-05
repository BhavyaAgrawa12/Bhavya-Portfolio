import api from './axiosInstance';
import type { ApiProject } from '../types/api';

export const fetchAllProjects = async (): Promise<ApiProject[]> => {
  const res = await api.get('/projects');
  return res.data.data;
};

export const fetchProjectBySlug = async (slug: string): Promise<ApiProject> => {
  const res = await api.get(`/projects/${slug}`);
  return res.data.data;
};

export const fetchProjectById = async (id: string): Promise<ApiProject> => {
  const res = await api.get(`/projects/id/${id}`);
  return res.data.data;
};

export const createProject = async (data: Record<string, unknown>): Promise<ApiProject> => {
  const res = await api.post('/projects', data);
  return res.data.data;
};

export const updateProject = async (id: string, data: Record<string, unknown>): Promise<ApiProject> => {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

/* ── Project image endpoints ──────────────────────────────────── */

export const setProjectThumbnail = async (id: string, thumbnailId: string): Promise<ApiProject> => {
  const res = await api.post(`/projects/${id}/thumbnail`, { thumbnailId });
  return res.data.data;
};

export const removeProjectThumbnail = async (id: string): Promise<ApiProject> => {
  const res = await api.delete(`/projects/${id}/thumbnail`);
  return res.data.data;
};

export const addProjectGalleryImage = async (id: string, mediaId: string, displayOrder = 0): Promise<void> => {
  await api.post(`/projects/${id}/images`, { mediaId, displayOrder });
};

export const removeProjectGalleryImage = async (projectId: string, imageId: string): Promise<void> => {
  await api.delete(`/projects/${projectId}/images/${imageId}`);
};
