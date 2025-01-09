import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const items = get().items;

        const itemExist = items.find((item) => newItem.id === item.id);

        if (itemExist) {
          set({
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
      },

      updateQuantity: (id, quantity) => {
        const items = get().items;
        set({
          items: items.map((item) =>
            id === item.id ? { ...item, quantity } : item
          ),
        });
      },

      getTotalPrice: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const items = get().items;
        return items.reduce(
          (totalItems, item) => totalItems + item.quantity,
          0
        );
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      clearCart: () => set({ items: [] }),
    }),

    { name: "cart" }
  )
);

//Modal
export const useModalStore = create((set) => ({
  show: false,
  showModal: () => set({ show: true }),
  hideModal: () => set({ show: false }),
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

// Slice for managing the theme
const themeSlice = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => {
      return { theme: state.theme === "light" ? "success" : "light" };
    }),
});

// Combining the two slices into one store
export const useCartAndThemeStore = create(
  persist(
    (set) => ({
      ...themeSlice(set),
    }),
    { name: "theme" }
  )
);
