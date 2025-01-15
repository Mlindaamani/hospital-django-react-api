import axios from "axios";
import { redirect } from "react-router-dom";
import { refreshToken } from "./auth";
import {
  getAccessToken,
  storeTokens,
  removeTokens,
  getRefreshToken,
} from "../../utils/functions";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `JWT ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;

      try {
        const { access } = await refreshToken(getRefreshToken());
        storeTokens(access, getRefreshToken());
        originalRequest.headers.Authorization = `JWT ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeTokens();
        console.error("Token refresh error:", refreshError);
        redirect("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
