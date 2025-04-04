import create from "zustand";

export const useModalStore = create((set) => ({
  show: false,

  openModal: () => {
    set({ show: true });
  },

  closeModal: () => set({ show: false }),
}));
