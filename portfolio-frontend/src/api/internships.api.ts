import api from './axiosInstance';
import type { ApiInternship } from '../types/api';

export const fetchAllInternships = async (): Promise<ApiInternship[]> => {
  const res = await api.get('/internships');
  return res.data.data;
};

export const createInternship = async (data: Partial<ApiInternship>): Promise<ApiInternship> => {
  const res = await api.post('/internships', data);
  return res.data.data;
};

export const updateInternship = async (id: string, data: Partial<ApiInternship>): Promise<ApiInternship> => {
  const res = await api.patch(`/internships/${id}`, data);
  return res.data.data;
};

export const deleteInternship = async (id: string): Promise<void> => {
  await api.delete(`/internships/${id}`);
};
