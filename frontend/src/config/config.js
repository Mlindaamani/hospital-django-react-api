import axios from "axios";
import {
  storeTokens,
  removeTokens,
  getRefreshToken,
  getAccessToken,
} from "../utils/functions";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

// Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const previousRequest = error.config;
    if (error.response?.status === 401 && !previousRequest.sent) {
      previousRequest.sent = true;

      try {
        const refreshToken = getRefreshToken();
        const { data } = await axiosInstance.post("auth/jwt/refresh/", {
          refresh: refreshToken,
        });

        storeTokens(data.access, refreshToken);
        previousRequest.headers.Authorization = `JWT ${data.access}`;
        return axiosInstance(previousRequest);
      } catch (refreshError) {
        removeTokens();
        window.location.href = import.meta.env.VITE_LOGOUT_URL;
      }
    }
    return Promise.reject(error);
  }
);
