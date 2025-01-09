import { axiosInstance } from "./config";
import { removeTokens } from "../../utils/functions";

// Register a new user
export const createNewStaff = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/users/", data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Login a user
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/jwt/create/", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout a user
export const logout = () => {
  removeTokens();
  window.location.href = "/login/";
};

// Verify JW token
export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.post("/auth/jwt/verify/", { token });
    return response.data;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};

// Refresh JWT token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/auth/jwt/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
