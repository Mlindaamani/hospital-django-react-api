import create from "zustand";
import { getBackendErrorMessage } from "../utils/functions";

export const usePrescriptionStore = create((set) => ({
  prescriptions: [],
  presciption: null,
  loading: false,
  error: null,

  getPrescriptions: async () => {
    set({ loading: true, error: null });
    try {
      const prescriptions = await axiosInstance.get("/prescriptions/");
      set({ prescriptions: prescriptions.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createPrescription: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/prescriptions/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updatePrescription: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/prescriptions/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deletePrescription: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/prescriptions/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  getPrescription: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.get(`/prescriptions/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
