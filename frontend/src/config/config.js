import axios from "axios";
import {
  getAccessToken,
  storeTokens,
  removeTokens,
  getRefreshToken,
} from "../utils/functions";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// Attach access token to authorization headers.
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
        if (!refreshToken) {
          removeTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axiosInstance.post("auth/jwt/refresh/", {
          refreshToken,
        });

        storeTokens(response.accessToken, refreshToken);
        previousRequest.headers.Authorization = `JWT ${response.accessToken}`;
        // Retry previous request with new access token
        return axiosInstance(previousRequest);
      } catch (refreshError) {
        removeTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
