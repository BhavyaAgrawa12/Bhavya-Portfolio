import api from './axiosInstance';
import type { ApiTechnology } from '../types/api';

export const fetchAllTechnologies = async (): Promise<ApiTechnology[]> => {
  const res = await api.get('/technologies');
  return res.data.data;
};

export const createTechnology = async (data: Partial<ApiTechnology>): Promise<ApiTechnology> => {
  const res = await api.post('/technologies', data);
  return res.data.data;
};

export const updateTechnology = async (id: string, data: Partial<ApiTechnology>): Promise<ApiTechnology> => {
  const res = await api.patch(`/technologies/${id}`, data);
  return res.data.data;
};

export const deleteTechnology = async (id: string): Promise<void> => {
  await api.delete(`/technologies/${id}`);
};
