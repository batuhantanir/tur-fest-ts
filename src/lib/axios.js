import axios from 'axios';


export const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

service.defaults.withCredentials = false;

service.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

export default service;
