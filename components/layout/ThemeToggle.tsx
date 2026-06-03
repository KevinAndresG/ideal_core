"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";

export function ThemeToggle() {
  const { theme, toggle, init } = useThemeStore();

  useEffect(() => {
    init();
  }, [init]);

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      onClick={toggle}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className="relative p-2.5 rounded-2xl bg-sage/10 hover:bg-sage/20 transition-colors text-charcoal overflow-hidden"
    >
      <motion.span
        key={theme}
        initial={{ y: -20, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="block"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </motion.button>
  );
}
