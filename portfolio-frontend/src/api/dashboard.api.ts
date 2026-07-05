import api from './axiosInstance';
import type { DashboardData } from '../types/api';

export const fetchDashboard = async (): Promise<DashboardData> => {
  const res = await api.get('/dashboard');
  return res.data.data;
};
