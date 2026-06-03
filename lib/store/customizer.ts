"use client";

import { create } from "zustand";
import type { CustomizerBase, CustomizerItem, RibbonColor } from "@/lib/data/customizer-items";
import { customizerBases, ribbonColors } from "@/lib/data/customizer-items";

interface CustomizerStore {
  base: CustomizerBase;
  items: CustomizerItem[];
  label: string;
  ribbonColor: RibbonColor;
  step: number;
  setBase: (base: CustomizerBase) => void;
  addItem: (item: CustomizerItem) => void;
  removeItem: (itemId: string) => void;
  setLabel: (label: string) => void;
  setRibbonColor: (color: RibbonColor) => void;
  setStep: (step: number) => void;
  reset: () => void;
  totalPrice: () => number;
}

const defaultBase = customizerBases[0];
const defaultRibbon = ribbonColors[0];

export const useCustomizerStore = create<CustomizerStore>((set, get) => ({
  base: defaultBase,
  items: [],
  label: "",
  ribbonColor: defaultRibbon,
  step: 0,

  setBase: (base) => set({ base }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => {
      const idx = state.items.findLastIndex((i) => i.id === itemId);
      if (idx === -1) return state;
      const next = [...state.items];
      next.splice(idx, 1);
      return { items: next };
    }),
  setLabel: (label) => set({ label }),
  setRibbonColor: (ribbonColor) => set({ ribbonColor }),
  setStep: (step) => set({ step }),
  reset: () => set({ base: defaultBase, items: [], label: "", ribbonColor: defaultRibbon, step: 0 }),

  totalPrice: () => {
    const { base, items, ribbonColor } = get();
    return (
      base.basePrice +
      items.reduce((sum, item) => sum + item.price, 0) +
      ribbonColor.price
    );
  },
}));
