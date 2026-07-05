import api from './axiosInstance';
import type { AdminUser } from '../types/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post('/auth/login', payload);
  return res.data.data;
};

export const fetchMe = async (): Promise<AdminUser> => {
  const res = await api.get('/auth/me');
  return res.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
