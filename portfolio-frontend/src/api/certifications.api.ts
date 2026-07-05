import api from './axiosInstance';
import type { ApiCertification } from '../types/api';

export const fetchAllCertifications = async (): Promise<ApiCertification[]> => {
  const res = await api.get('/certifications');
  return res.data.data;
};

export const createCertification = async (data: Partial<ApiCertification>): Promise<ApiCertification> => {
  const res = await api.post('/certifications', data);
  return res.data.data;
};

export const updateCertification = async (id: string, data: Partial<ApiCertification>): Promise<ApiCertification> => {
  const res = await api.patch(`/certifications/${id}`, data);
  return res.data.data;
};

export const deleteCertification = async (id: string): Promise<void> => {
  await api.delete(`/certifications/${id}`);
};
