import create from "zustand";
import { axiosInstance } from "../config/config";

export const usePatientsStore = create((set) => ({
  patients: [],
  loading: false,
  error: null,

  getPatients: async () => {
    set({ loading: true, error: null });
    try {
      const patients = await axiosInstance.get("/patients/");
      set({ patients: patients.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createPatient: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/patients/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updatePatient: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/patients/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deletePatient: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/patients/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
