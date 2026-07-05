import api from './axiosInstance';
import type { ApiMedia } from '../types/api';

export const fetchAllMedia = async (): Promise<ApiMedia[]> => {
  const res = await api.get('/media');
  return res.data.data;
};

export const uploadMedia = async (file: File, folder = 'temp'): Promise<ApiMedia> => {
  const form = new FormData();
  form.append('file', file);
  // Backend multer reads req.body.folder to pick the upload subdirectory.
  // It must be sent BEFORE the file field in multipart form data so multer
  // can read it in the destination callback. Appending it first achieves this.
  form.append('folder', folder);
  const res = await api.post('/media/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};

export const deleteMedia = async (id: string): Promise<void> => {
  await api.delete(`/media/${id}`);
};
