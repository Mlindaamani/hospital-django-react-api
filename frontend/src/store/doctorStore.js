import create from "zustand";
import { axiosInstance } from "../config/config";

export const useDoctorStore = create((set) => ({
  doctors: [],
  loading: false,
  error: null,

  getDoctors: async () => {
    set({ loading: true, error: null });
    try {
      constdoctors = await axiosInstance.get("/doctors/");
      set({ doctors: doctors.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createDoctor: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/doctors/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updateDoctor: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/doctors/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deleteDoctor: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/doctors/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
