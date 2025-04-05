import toast from "react-hot-toast";
import create from "zustand";
import { persist } from "zustand/middleware";
import { getBackendErrorMessage, redirectTo } from "../utils/functions";
import { axiosInstance } from "../config/config";
import { jwtDecode } from "jwt-decode";
import { removeTokens, storeTokens, getAccessToken } from "../utils/functions";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: !!getAccessToken(),
      user: null,
      loading: false,
      profile: null,

      register: async (first_name, last_name, email, password, navigate) => {
        if (!first_name || !last_name || !email || !password)
          return toast.error("All field are required!");

        set({ loading: true, error: null });

        try {
          await axiosInstance.post("/auth/users/", {
            first_name,
            last_name,
            email,
            password,
          });

          set({ loading: false });
          toast.success("You have successfully registered", {
            duration: 2000,
            id: "register",
          });
          navigate("/login");
        } catch (error) {
          set({ loading: false });
          toast.error(getBackendErrorMessage(error), {
            duration: 2000,
            position: "top-center",
            id: "register",
          });
        }
      },

      login: async (email, password, navigate) => {
        if (!email || !password) return toast.error("All field are required!");
        set({ loading: true });

        try {
          const { refresh, access } = (
            await axiosInstance.post("/auth/jwt/create/", {
              email,
              password,
            })
          ).data;

          const {
            user_id,
            first_name,
            last_name,
            role,
            email: decodeEmail,
          } = jwtDecode(access);
          storeTokens(access, refresh);

          set({
            isAuthenticated: true,
            loading: false,
            user: { user_id, first_name, last_name, email: decodeEmail, role },
          });
          // Redirect user to the appropriate page based on their role
          redirectTo(navigate, role);
          toast.success("You have successfully logged in.", {
            duration: 4000,
            position: "top-right",
            id: "login",
          });
        } catch (error) {
          console.log(error);
          set({ loading: false });
          toast.error(getBackendErrorMessage(error), {
            duration: 2000,
            position: "top-center",
            id: "login",
          });
        }
      },

      userProfile: async () => {
        set({ loading: true });
        try {
          const { data } = await axiosInstance.get("/auth/users/me/");
          set({ profile: data, loading: false });
        } catch (error) {
          set({ loading: false });
          toast.error(getBackendErrorMessage(error), {
            duration: 2000,
            position: "top-center",
            id: "profile",
          });
        }
      },

      logout: (navigate) => {
        removeTokens();
        set({ isAuthenticated: false, user: null });
        navigate("/login");
      },
    }),

    { name: "hms-storage", getStorage: () => localStorage }
  )
);
