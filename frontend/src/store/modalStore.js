import create from "zustand";

export const useModalStore = create((set) => ({
  show: false,
  patientId: null,
  patientName: "",
  fileNumber: "",

  openModal: (patientId, patientName, fileNumber) => {
    set({
      show: true,
      patientId,
      patientName,
      fileNumber,
    });
  },

  closeModal: () =>
    set({ show: false, patientId: null, patientName: "", fileNumber: "" }),
}));
