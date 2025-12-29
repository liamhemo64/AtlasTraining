import { create } from "zustand";

export interface ProductCart {
  id: number;
  amount: number;
}

export interface CartStoreState {
  cart: ProductCart[];
  addProduct: (id: number) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  money: number;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  cart: [],

  addProduct: (id: number) =>
    set((state) => {
      const existing = state.cart.find((product) => product.id === id);

      if (!existing) {
        return { cart: [...state.cart, { id, amount: 1 }] };
      }

      return {
        cart: state.cart.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    }),

  removeProduct: (id: number) =>
    set((state) => {
      const existing = state.cart.find((product) => product.id === id);
      if (!existing) return state;

      if (existing.amount <= 1) {
        return { cart: state.cart.filter((product) => product.id !== id) };
      }

      return {
        cart: state.cart.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
    }),

  clearCart: () => set({ cart: [] }),

  getAmountById: (id: number) => {
    const item = get().cart.find((product) => product.id === id);
    return item ? item.amount : 0;
  },

  getTotalItems: () =>
    get().cart.reduce((sum, product) => sum + product.amount, 0),

  money: 1000,
}));
