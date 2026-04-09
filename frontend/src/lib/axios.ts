import axiosLib from 'axios';
import { API_BASE_URL } from './utils';

const api = axiosLib.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const locale = document.documentElement.lang || 'tr';
    config.headers['x-locale'] = locale;
    config.headers['accept-language'] = locale;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      (err as { response?: { data?: { error?: { message?: string }; message?: string } }; message?: string })
        ?.response?.data?.error?.message ||
      (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
      (err as { message?: string })?.message ||
      'Network error';
    return Promise.reject(new Error(message));
  },
);

export default api;
