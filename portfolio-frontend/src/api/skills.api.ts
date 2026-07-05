import api from './axiosInstance';
import type { ApiSkill } from '../types/api';

export const fetchAllSkills = async (): Promise<ApiSkill[]> => {
  const res = await api.get('/skills');
  return res.data.data;
};

export const createSkill = async (data: Partial<ApiSkill>): Promise<ApiSkill> => {
  const res = await api.post('/skills', data);
  return res.data.data;
};

export const updateSkill = async (id: string, data: Partial<ApiSkill>): Promise<ApiSkill> => {
  const res = await api.patch(`/skills/${id}`, data);
  return res.data.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
