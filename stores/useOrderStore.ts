// stores/useOrderStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  title: string;
  price: number;
};

type OrderItem = Product & {
  quantity: number;
};

type OrderStore = {
  items: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromOrder: (id: string) => void;
  clearOrder: () => void;
};

export const useOrderStore = create(
  persist<OrderStore>(
    (set, get) => ({
      items: [],

      addToOrder: (product) =>
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);
          if (exists) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      increaseQty: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromOrder: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearOrder: () => set({ items: [] }),

      getTotalQuantity: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "order-storage", // کلید localStorage
      // اگر بخوای می‌تونی partialize بزاری تا فقط بخشی از state ذخیره شه
    }
  )
);
