"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
  init: () => void;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("core-theme", theme);
  } catch {}
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },
  toggle: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    applyTheme(next);
    set({ theme: next });
  },
  init: () => {
    if (typeof window === "undefined") return;
    let stored: Theme | null = null;
    try {
      stored = localStorage.getItem("core-theme") as Theme | null;
    } catch {}
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme: Theme = stored ?? (prefersDark ? "dark" : "light");
    applyTheme(theme);
    set({ theme });
  },
}));
