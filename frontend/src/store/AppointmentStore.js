import create from "zustand";
import { axiosInstance } from "../config/config";
import { getBackendErrorMessage } from "../utils/functions";
import toast from "react-hot-toast";

export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  appointment: null,
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
    if (!data.doctor) {
      toast.error("Please select a doctor.");
      return;
    }

    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/appointments/", data);
      set({ loading: false });
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.log(error);
      toast.error(getBackendErrorMessage(error));
      set({ error: getBackendErrorMessage(error), loading: false });
    }
  },

  getAppointment: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/appointments/${id}/`);
      set({ appointment: response.data, loading: false });
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
      // Show a confirmation dialog before deleting
      const confirmed = window.confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (!confirmed) {
        set({ loading: false });
        return;
      }
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
