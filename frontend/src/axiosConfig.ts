import axios from "axios";

const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 (Unauthorized), clear tokens and redirect
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      // Redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
