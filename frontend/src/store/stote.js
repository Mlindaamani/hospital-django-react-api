import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        // Retrieve the current list of items from the state
        const { items } = get();

        // Check if the new item already exists in the list by comparing IDs
        const itemExist = items.find((item) => newItem.id === item.id);

        if (itemExist) {
          // If the item exists, update the quantity of the existing item
          set({
            items: items.map(
              (item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity } // Increase the quantity
                  : item // Keep the other items unchanged
            ),
          });
        } else {
          // If the item does not exist, add it to the list with a default quantity of 1 if not specified
          set({
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 }],
          });
        }
      },

      updateQuantity: (id, quantity) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            id === item.id ? { ...item, quantity } : item
          ),
        });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const { items } = get();
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
