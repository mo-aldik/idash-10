import axios, { AxiosError, AxiosResponse } from 'axios';
import { onLogout } from 'utils/on-logout';

// Create API instance
const http2 = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL_2 + '/',
});

http2.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
http2.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ['internalToken']: '63cde9c4063a486e92460c8a35e38b8e',
      ...config.headers,
    };

    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
http2.interceptors.response.use(
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

export default http2;
