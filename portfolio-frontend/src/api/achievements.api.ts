import api from './axiosInstance';
import type { ApiAchievement } from '../types/api';

export const fetchAllAchievements = async (): Promise<ApiAchievement[]> => {
  const res = await api.get('/achievements');
  return res.data.data;
};

export const createAchievement = async (data: Record<string, unknown>): Promise<ApiAchievement> => {
  const res = await api.post('/achievements', data);
  return res.data.data;
};

export const updateAchievement = async (id: string, data: Record<string, unknown>): Promise<ApiAchievement> => {
  const res = await api.patch(`/achievements/${id}`, data);
  return res.data.data;
};

export const deleteAchievement = async (id: string): Promise<void> => {
  await api.delete(`/achievements/${id}`);
};
