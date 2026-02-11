import axios, { AxiosError, AxiosResponse } from 'axios';
import { LocalStorageKeys } from 'utils/constants';
import { onLogout } from 'utils/on-logout';

export const getAccessToken = () => localStorage.getItem(LocalStorageKeys.access_token) || '';

export const createAuthorizationHeader = (token?: string) => (token ? `Bearer ${token}` : '');

// Create API instance
const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL + '/',
});

http.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
http.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ['Authorization']: createAuthorizationHeader(getAccessToken()),
      ...config.headers,
    };

    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      // Handle 403 error here
    }

    if (error.response?.status === 401) {
      onLogout();
    }

    return Promise.reject(error);
  },
);

export default http;
