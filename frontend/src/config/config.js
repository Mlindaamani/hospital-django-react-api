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

// Request interceptor:: Attach access token to authorization headers.
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

// Response Interceptor:: Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    //Status code greater then 2xx will trigger these code
    const previousRequest = error.config;
    if (error.response.status === 401 && !previousRequest.sent) {
      previousRequest.sent = true;

      try {
        const refreshToken = getRefreshToken();
        const { accessToken } = (
          await axiosInstance.post("auth/jwt/refresh/", {
            refreshToken,
          })
        ).data;
        storeTokens(accessToken, refreshToken);
        previousRequest.headers.Authorization = `JWT ${accessToken}`;
        // Retry previous request with new access token
        return axiosInstance(previousRequest);
      } catch (refreshError) {
        // Remove tokens
        removeTokens();
        // Redirect user to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

