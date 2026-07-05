import api from './axiosInstance';
import type { ContactFormData, ApiContactMessage } from '../types/api';

export const submitContact = async (data: ContactFormData): Promise<ApiContactMessage> => {
  const res = await api.post('/contacts', data);
  return res.data.data;
};

/* Admin endpoints */
export const fetchAllMessages = async (): Promise<ApiContactMessage[]> => {
  const res = await api.get('/contacts');
  return res.data.data;
};

export const fetchUnreadCount = async (): Promise<number> => {
  const res = await api.get('/contacts/unread/count');
  return res.data.data.count;
};

export const markMessageRead = async (id: string): Promise<ApiContactMessage> => {
  const res = await api.patch(`/contacts/${id}/read`);
  return res.data.data;
};

export const deleteMessage = async (id: string): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};
