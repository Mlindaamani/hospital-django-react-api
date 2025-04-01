import { axiosInstance } from "./config";
import { removeTokens } from "../../utils/functions";

// Register a new user
export const createNewStaff = async (data) => {
  try {
    // Send a POST request to register a new user
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
    // Send a POST request to login the user and get JWT tokens
    const response = await axiosInstance.post("/auth/jwt/create/", credentials);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout a user
export const logout = () => {
  // Remove tokens from storage and redirect to login page
  removeTokens();
  window.location.href = "/login/";
};

// Verify JWT token
export const verifyToken = async (token) => {
  try {
    // Send a POST request to verify the provided JWT token
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
    // Send a POST request to refresh the JWT token using the refresh token
    const response = await axiosInstance.post("/auth/jwt/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
