import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL - có thể thay đổi theo environment
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Tạo axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - gắn JWT token nếu có
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Nếu token hết hạn (401), logout user
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Xử lý lỗi khác
    const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;