// axiosConfig.js
import axios from 'axios';
import { getCookie } from './authUtils';

const axiosSuperAdminInstance = axios.create({
  baseURL: 
  import.meta.env.VITE_IS_LIVE === 'true' ?
  import.meta.env.VITE_API_URL :
  import.meta.env.VITE_API_DEMO_URL
  ,
});

axiosSuperAdminInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('dgf-admin-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosSuperAdminInstance;
