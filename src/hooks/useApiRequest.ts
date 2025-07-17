import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RootState } from '@/store';
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Custom hook for API requests
const useApiRequest = () => {
  const profile = useSelector((state: RootState) => state.userData);

  const apiRequest = useCallback(
    async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      try {
        const response = await axiosInstance({
          method,
          url,
          data,
          ...config,
        headers: {
            Authorization: `Bearer ${profile?.token}`,
            ...(config?.headers || {}),
          },
        });
        return response;
      } catch (error: any) {
        if (error.response) {
          console.error(`Error ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        throw error;
      }
    },
    [profile.token]
  );
  return {
    get: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>('GET', url, undefined, config),
    post: <T>(url: string, data: any, config?: AxiosRequestConfig) => apiRequest<T>('POST', url, data, config),
    put: <T>(url: string, data: any, config?: AxiosRequestConfig) => apiRequest<T>('PUT', url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>('DELETE', url, undefined, config),
  };
};

export default useApiRequest;
