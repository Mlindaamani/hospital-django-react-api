import create from "zustand";
import { axiosInstance } from "../config/config";
import { getBackendErrorMessage } from "../utils/functions";

export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  loading: false,
  error: null,
  completingAppointment: false,

  getAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const appointments = await axiosInstance.get("/appointments/");
      set({ appointments: appointments.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  createAppointment: async (data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/appointments/", data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  getAppointment: async (id) => {
    set({ loading: true, error: null });
    try {
      const appointment = await axiosInstance.get(`/appointments/${id}/`);
      set({ appointment: appointment.data, loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  updateAppointment: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/appointments/${id}/`, data);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  deleteAppointment: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/appointments/${id}/`);
      set({ loading: false });
    } catch (error) {
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  markAppointmentAsCompleted: async (id) => {
    set({ completingAppointment: true, error: null });
    try {
      await axiosInstance.patch(`/appointments/${id}/`, {
        status: "Completed",
      });
      set({ completingAppointment: false });
    } catch (error) {
      set({
        error: getBackendErrorMessage(error),
        completingAppointment: false,
      });
    }
  },
}));
