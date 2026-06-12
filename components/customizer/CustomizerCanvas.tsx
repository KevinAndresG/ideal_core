"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useCustomizerStore } from "@/lib/store/customizer";

const itemPositions = [
  { x: 35, y: 55 }, { x: 55, y: 50 }, { x: 25, y: 65 },
  { x: 65, y: 60 }, { x: 45, y: 40 }, { x: 30, y: 45 },
  { x: 60, y: 40 }, { x: 50, y: 65 }, { x: 40, y: 70 },
  { x: 70, y: 50 }, { x: 20, y: 55 }, { x: 55, y: 35 },
];

export function CustomizerCanvas() {
  const { base, items, label, ribbonColor } = useCustomizerStore();
  const [rotated, setRotated] = useState(false);

  if (!base || !ribbonColor) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-3 p-6 min-h-[420px]">
        <Loader2 className="animate-spin text-ink/30" size={28} />
        <p className="text-sm text-ink/45">Cargando vista previa...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Canvas area */}
      <div
        className="flex-1 relative rounded-3xl overflow-hidden min-h-[420px]"
        style={{
          background: `linear-gradient(135deg, ${ribbonColor.color}20 0%, rgba(253, 230, 138, 0.15) 50%, ${base.color}20 100%)`,
          border: `2px solid ${ribbonColor.color}55`,
          boxShadow: `0 16px 48px ${ribbonColor.color}30, 0 4px 12px rgba(0,0,0,0.04)`,
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-20"
            style={{ background: ribbonColor.color, filter: "blur(24px)" }}
          />
          <div
            className="absolute bottom-4 right-4 w-32 h-32 rounded-full opacity-15"
            style={{ background: base.color, filter: "blur(28px)" }}
          />
        </div>

        {/* Rotate button */}
        <button
          onClick={() => setRotated(!rotated)}
          aria-label="Rotar vista"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl petal-card text-ink/55 hover:text-ink transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCcw size={16} />
        </button>

        {/* Live badge */}
        <div
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
          style={{ background: "rgba(232, 121, 160, 0.92)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          EN VIVO
        </div>

        {/* 3D perspective wrapper */}
        <motion.div
          animate={{ rotateY: rotated ? 25 : 0, rotateX: rotated ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 800, transformStyle: "preserve-3d" }}
        >
          {/* Base container */}
          <div className="relative w-64 h-64">
            {/* Base */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <span className="text-8xl drop-shadow-2xl block">{base.emoji}</span>
                <div
                  className="mt-1 px-4 py-1 rounded-full text-xs font-semibold text-ink/60"
                  style={{ background: `${base.color}35` }}
                >
                  {base.name}
                </div>
              </div>
            </motion.div>

            {/* Items floating */}
            <AnimatePresence>
              {items.map((item, idx) => {
                const pos = itemPositions[idx % itemPositions.length];
                return (
                  <motion.div
                    key={`${item.id}-${idx}`}
                    initial={{ scale: 0, y: -50, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute select-none cursor-default"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10 + idx,
                    }}
                  >
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.1 }}
                      className="text-3xl drop-shadow-lg block"
                    >
                      {item.emoji}
                    </motion.span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Ribbon */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl"
              >
                🎀
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Label preview */}
        <AnimatePresence>
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="px-4 py-2 rounded-xl text-xs font-semibold text-ink bg-surface backdrop-blur-sm border border-bloom/15 shadow-sm whitespace-nowrap max-w-48 truncate">
                💌 {label}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
            <p className="text-ink/30 text-sm">Agrega items desde el panel izquierdo ✨</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="petal-card petal-card-mint p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ink">Resumen</span>
          <span className="text-xs text-ink/40">{items.length} items</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {items.length === 0 ? (
            <span className="text-xs text-ink/40">Sin items aún</span>
          ) : (
            items.map((item, i) => (
              <span key={`sum-${i}`} className="text-xl" title={item.name}>
                {item.emoji}
              </span>
            ))
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink/45">Lazo: {ribbonColor.name}</span>
          <span className="font-bold text-ink text-sm">Base: {base.name}</span>
        </div>
      </div>
    </div>
  );
}
