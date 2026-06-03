"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { useCustomizerStore } from "@/lib/store/customizer";
import { formatPrice } from "@/lib/utils";

const itemPositions = [
  { x: 35, y: 55 }, { x: 55, y: 50 }, { x: 25, y: 65 },
  { x: 65, y: 60 }, { x: 45, y: 40 }, { x: 30, y: 45 },
  { x: 60, y: 40 }, { x: 50, y: 65 }, { x: 40, y: 70 },
  { x: 70, y: 50 }, { x: 20, y: 55 }, { x: 55, y: 35 },
];

export function CustomizerCanvas() {
  const { base, items, label, ribbonColor } = useCustomizerStore();
  const [rotated, setRotated] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Canvas area */}
      <div className="flex-1 relative rounded-3xl overflow-hidden min-h-[420px]"
        style={{
          background: `linear-gradient(135deg, ${ribbonColor.color}22 0%, #f9f0e1 50%, ${base.color}22 100%)`,
          border: `3px solid ${ribbonColor.color}66`,
          boxShadow: `0 20px 60px ${ribbonColor.color}44, 0 8px 0 0 ${ribbonColor.color}44`,
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-20"
            style={{ background: ribbonColor.color, filter: "blur(20px)" }} />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full opacity-15"
            style={{ background: base.color, filter: "blur(25px)" }} />
        </div>

        {/* Rotate button */}
        <button
          onClick={() => setRotated(!rotated)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl glass-card text-charcoal/60 hover:text-charcoal transition-all hover:scale-105"
        >
          <RotateCcw size={16} />
        </button>

        {/* Live badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
          style={{ background: "rgba(61,74,62,0.8)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
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
                <div className="mt-1 px-4 py-1 rounded-full text-xs font-semibold text-charcoal/60"
                  style={{ background: `${base.color}44` }}>
                  {base.name}
                </div>
              </div>
            </motion.div>

            {/* Items floating around the base */}
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
              <div className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal bg-white/90 backdrop-blur-sm border border-sage/20 shadow-sm whitespace-nowrap max-w-48 truncate">
                💌 {label}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
            <p className="text-charcoal/30 text-sm">Agrega items desde el panel izquierdo ✨</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="clay-card clay-card-sage p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-charcoal">Resumen</span>
          <span className="text-xs text-charcoal/40">{items.length} items</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {items.length === 0 ? (
            <span className="text-xs text-charcoal/40">Sin items aún</span>
          ) : (
            items.map((item, i) => (
              <span key={`sum-${i}`} className="text-xl" title={item.name}>{item.emoji}</span>
            ))
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-charcoal/50">Lazo: {ribbonColor.name}</span>
          <span className="font-bold text-charcoal text-sm">
            Base: {base.name}
          </span>
        </div>
      </div>
    </div>
  );
}
