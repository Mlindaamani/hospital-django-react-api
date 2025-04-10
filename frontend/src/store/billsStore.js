import create from "zustand";
import { axiosInstance } from "../config/config";

export const useBilsStore = create((set) => ({
  bills: [],
  loading: false,
  bill: null,

  getBills: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/bills/");

      set({ bills: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching bills:", error);
      set({ loading: false });
    }
  },

  getMyBills: async (patientId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/bills/?patient=${patientId}`);

      set({ bills: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching bills:", error);
      set({ loading: false });
    }
  },

  updateMyBiils: async (billId, data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/bills/${billId}/`, data);

      set((state) => ({
        bills: state.bills.map((bill) =>
          bill.id === billId ? { ...bill, ...response.data } : bill
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating bill:", error);
      set({ loading: false });
    }
  }
}));
