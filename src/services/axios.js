import axios from "axios";

 
const API_BASE_URL = "https://api.collectedcompany.com/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

//https://card-collectibles-2.onrender.com
//http://127.0.0.1:8000/
//https://api.collectedcompany.com/

// Request interceptor to add auth header conditionally
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Skip auth for login endpoint
//     if (config.url?.includes('/login') || config.url?.includes('/auth')) {
//       return config;
//     }
    
//     // Add auth header for other requests
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;