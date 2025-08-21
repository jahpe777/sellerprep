import axios from "axios";

// Determine the base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return "https://sellerprep-backend.onrender.com/api";
  }
  return "/api"; // Development - handled by Vite proxy
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses more carefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only trigger session expired for actual authentication failures
    if (error.response && error.response.status === 401) {
      const isAdminEndpoint = error.config?.url?.includes('/admin/');
      const isCheckStatusEndpoint = error.config?.url?.includes('/admin/check-status/');
      
      // Don't trigger session expired for admin endpoint failures or status checks
      // Those are just permission issues, not authentication failures
      if (!isAdminEndpoint || isCheckStatusEndpoint) {
        // For check-status endpoint, it's safe to fail silently
        if (isCheckStatusEndpoint) {
          return Promise.reject(error);
        }
        
        // For other non-admin 401s, trigger session expired
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event("sessionExpired"));
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
