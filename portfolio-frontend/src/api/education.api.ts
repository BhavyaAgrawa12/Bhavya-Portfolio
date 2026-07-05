import api from './axiosInstance';
import type { ApiEducation } from '../types/api';

export const fetchAllEducation = async (): Promise<ApiEducation[]> => {
  const res = await api.get('/education');
  return res.data.data;
};

export const createEducation = async (data: Partial<ApiEducation>): Promise<ApiEducation> => {
  const res = await api.post('/education', data);
  return res.data.data;
};

export const updateEducation = async (id: string, data: Partial<ApiEducation>): Promise<ApiEducation> => {
  const res = await api.patch(`/education/${id}`, data);
  return res.data.data;
};

export const deleteEducation = async (id: string): Promise<void> => {
  await api.delete(`/education/${id}`);
};
