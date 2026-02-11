import axios, { AxiosError, AxiosResponse } from 'axios';
import { onLogout } from 'utils/on-logout';

// Create API instance
const auth = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL + '/',
});

auth.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
auth.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
    };

    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
auth.interceptors.response.use(
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

export default auth;
