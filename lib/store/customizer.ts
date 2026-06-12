"use client";

import { create } from "zustand";
import type {
  CustomizerBase,
  CustomizerConfig,
  CustomizerItem,
  RibbonColor,
} from "@/lib/data/customizer-items";

interface CustomizerStore {
  // Configuración cargada desde Supabase (bases, items, lazos, categorías).
  config: CustomizerConfig | null;
  base: CustomizerBase | null;
  items: CustomizerItem[];
  label: string;
  ribbonColor: RibbonColor | null;
  step: number;
  setConfig: (config: CustomizerConfig) => void;
  setBase: (base: CustomizerBase) => void;
  addItem: (item: CustomizerItem) => void;
  removeItem: (itemId: string) => void;
  setLabel: (label: string) => void;
  setRibbonColor: (color: RibbonColor) => void;
  setStep: (step: number) => void;
  reset: () => void;
  totalPrice: () => number;
}

export const useCustomizerStore = create<CustomizerStore>((set, get) => ({
  config: null,
  base: null,
  items: [],
  label: "",
  ribbonColor: null,
  step: 0,

  setConfig: (config) =>
    set((state) => ({
      config,
      base: state.base ?? config.bases[0] ?? null,
      ribbonColor: state.ribbonColor ?? config.ribbonColors[0] ?? null,
    })),

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
  reset: () =>
    set((state) => ({
      base: state.config?.bases[0] ?? null,
      items: [],
      label: "",
      ribbonColor: state.config?.ribbonColors[0] ?? null,
      step: 0,
    })),

  totalPrice: () => {
    const { base, items, ribbonColor } = get();
    return (
      (base?.basePrice ?? 0) +
      items.reduce((sum, item) => sum + item.price, 0) +
      (ribbonColor?.price ?? 0)
    );
  },
}));
