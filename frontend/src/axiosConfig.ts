import axios from "axios";

const api = axios.create();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.dispatchEvent(new Event("sessionExpired"));
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default api;
