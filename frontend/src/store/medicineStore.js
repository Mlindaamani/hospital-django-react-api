import create from "zustand";
import { axiosInstance } from "../config/config";
import { getBackendErrorMessage } from "../utils/functions";

export const useMedicineStore = create((set) => ({
  medicines: [],
  loading: false,
  error: null,

  getMedicines: async () => {
    set({ loading: true, error: null });
    try {
      const medicines = await axiosInstance.get("/medicines/");
      set({ medicines: medicines.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createMedicine: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/medicines/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updateMedicine: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/medicines/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deleteMedicine: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/medicines/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
