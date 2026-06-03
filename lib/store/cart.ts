"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";
import type { CustomizerBase, CustomizerItem, RibbonColor } from "@/lib/data/customizer-items";

export interface CartItem {
  id: string;
  type: "product" | "custom";
  product?: Product;
  customConfig?: {
    base: CustomizerBase;
    items: CustomizerItem[];
    label: string;
    ribbonColor: RibbonColor;
    totalPrice: number;
  };
  quantity: number;
  unitPrice: number;
  selectedColor?: string;
  customText?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        set((state) => ({ items: [...state.items, { ...item, id }] }));
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "core-cart" }
  )
);
