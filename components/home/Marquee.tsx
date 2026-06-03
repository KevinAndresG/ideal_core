"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";

const words = [
  { text: "HECHO A MANO",   color: "#F9A8D4" },
  { text: "PERSONALIZABLE", color: "#C4B5FD" },
  { text: "CON AMOR",       color: "#6EE7B7" },
  { text: "ÚNICO",          color: "#FDBA74" },
  { text: "ARTESANAL",      color: "#BAE6FD" },
  { text: "ESPECIAL",       color: "#FDA4AF" },
  { text: "HECHO A MANO",   color: "#C4B5FD" },
  { text: "PERSONALIZABLE", color: "#6EE7B7" },
  { text: "CON AMOR",       color: "#FDBA74" },
  { text: "ÚNICO",          color: "#BAE6FD" },
  { text: "ARTESANAL",      color: "#F9A8D4" },
  { text: "ESPECIAL",       color: "#C4B5FD" },
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const speed = 90; // px/s
    const next = x.get() - (delta * speed) / 1000;
    const halfW = trackRef.current ? trackRef.current.scrollWidth / 2 : 3000;
    // reset seamlessly when one full copy has scrolled past
    x.set(next <= -halfW ? 0 : next);
  });

  return (
    <div
      className="py-5 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #2D1B3D 0%, #3D1F6B 50%, #2D1B3D 100%)",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x, display: "inline-flex", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6">
            <span
              className="font-serif font-bold text-2xl sm:text-3xl italic"
              style={{ color: word.color }}
            >
              {word.text}
            </span>
            <span className="text-white/30 text-xl">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
