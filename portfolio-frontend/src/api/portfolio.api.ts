import api from './axiosInstance';
import type { Portfolio } from '../types/api';

export const fetchPortfolio = async (): Promise<Portfolio> => {
  const res = await api.get('/portfolio');
  console.log('[Portfolio API] Resume URL from API response:', res.data.data?.resume?.fileUrl);
  return res.data.data;
};

export const updatePortfolio = async (data: Partial<Portfolio>): Promise<Portfolio> => {
  const res = await api.patch('/portfolio', data);
  return res.data.data;
};
