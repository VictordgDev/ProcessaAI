import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const compareDocuments = async (leftFileId: string, rightFileId: string) => {
  const response = await api.post('/compare', null, {
    params: { left_file_id: leftFileId, right_file_id: rightFileId },
  });
  return response.data;
};
