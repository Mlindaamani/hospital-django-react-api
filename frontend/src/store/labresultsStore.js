import create from "zustand";
import { getBackendErrorMessage } from "../utils/functions";
import { axiosInstance } from "../config/config";

export const useLabResultsStore = create((set) => ({
  labresults: [],
  loading: false,
  error: null,

  getLabResults: async () => {
    set({ loading: true, error: null });
    try {
      const results = await axiosInstance.get("/labresults/");
      set({ labresults: results.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createResult: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/labresults/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updateResult: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/labresults/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deleteResult: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/labresults/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
