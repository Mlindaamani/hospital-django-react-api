import create from "zustand";

export const useLabResultsStore = create((set) => ({
  results: [],
  loading: false,
  error: null,

  getResults: async () => {
    set({ loading: true, error: null });
    try {
      const results = await axiosInstance.get("/results/");
      set({ results: results.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createResult: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/results/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updateResult: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/results/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deleteResult: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/results/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },
}));
