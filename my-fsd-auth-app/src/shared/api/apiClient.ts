import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Thay bằng URL API thực tế
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
