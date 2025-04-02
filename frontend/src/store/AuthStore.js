import toast from "react-hot-toast";
import create from "zustand";
import { persist } from "zustand/middleware";
import { getBackendErrorMessage, ROLE } from "../utils/functions";
import { axiosInstance } from "../config/config";
import { jwtDecode } from "jwt-decode";
import { removeTokens, storeTokens, getAccessToken } from "../utils/functions";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      isAuthenticated: !!getAccessToken(),

      register: async (username, email, password, navigate) => {
        if (!username || !email || !password) {
          return toast.error("Please fill out all fields!");
        }
        set({ loading: true, error: null });

        try {
          await axiosInstance.post("/auth/users/", {
            username,
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
        console.log("Code executed to thuis point");
        if (!email || !password) return toast.error("All field are required!");

        set({ loading: true });

        try {
          const { refresh, access } = (
            await axiosInstance.post("/auth/jwt/create/", {
              email,
              password,
            })
          ).data;

          const { user_id, first_name, last_name, role, email } =
            jwtDecode(access);

          storeTokens(access, refresh);

          set({
            isAuthenticated: true,
            loading: false,
            user: { user_id, first_name, last_name, email, role },
          });

          switch (role) {
            case ROLE.DOCTOR:
              navigate("/doctor/");
              break;

            case ROLE.ADMIN:
              window.location.href = "http://localhost:8000/admin/";
              break;

            case ROLE.RECEPTIONIST:
              navigate("/receptionist/", { replace: true });
              break;

            case ROLE.NURSE:
              navigate("/nurse/", { replace: true });
              break;

            case ROLE.LAB_TECH:
              navigate("/labtech/", { replace: true });
              break;

            case ROLE.PHARMACIST:
              navigate("/pharmacist/", { replace: true });
              break;

            default:
              navigate("/", { replace: true });
              break;
          }

          toast.success("You have successfully logged in.", {
            duration: 4000,
            position: "top-right",
            id: "login",
          });
        } catch (error) {
          set({ loading: false });
          toast.error(getBackendErrorMessage(error), {
            duration: 2000,
            position: "top-center",
            id: "login",
          });
        }
      },

      logout: (navigate) => {
        removeTokens();
        set({ isAuthenticated: false, user: null });
        navigate("/login");
      },
    }),

    { name: "auth-storage", getStorage: () => localStorage }
  )
);
