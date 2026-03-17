// axiosConfig.js
import axios from 'axios';
import { getCookie } from './authUtils';

const axiosInstance = axios.create({
  baseURL: 
  import.meta.env.VITE_IS_LIVE === 'true' ? 
  import.meta.env.VITE_API_URL :
  import.meta.env.VITE_API_DEMO_URL
  ,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('dgf-user-token');
    // alert(token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
