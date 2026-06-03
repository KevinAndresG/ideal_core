"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// 4 items max — 8 simultaneous CSS animations kill scroll perf
const floatingItems = [
  { emoji: "🌹", top: "15%", left: "8%",    delay: 0,   size: "text-4xl" },
  { emoji: "🎁", top: "20%", right: "6%",   delay: 0.5, size: "text-5xl" },
  { emoji: "🌸", top: "50%", right: "8%",   delay: 1.2, size: "text-4xl" },
  { emoji: "🧸", bottom: "22%", right: "12%", delay: 0.8, size: "text-4xl" },
];

// 3 blobs max, smaller, less blur
const blobs = [
  { color: "rgba(249, 168, 212, 0.48)", top: "-8%",   left: "-5%",   size: 480, delay: 0 },
  { color: "rgba(196, 181, 253, 0.45)", top: "20%",   right: "-8%",  size: 420, delay: 2 },
  { color: "rgba(110, 231, 183, 0.38)", bottom: "-12%", left: "18%", size: 360, delay: 1 },
];

function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Aurora blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none animate-blob"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: (blob as { left?: string }).left,
            right: (blob as { right?: string }).right,
            bottom: (blob as { bottom?: string }).bottom,
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
            filter: "blur(16px)",
            animationDelay: `${blob.delay}s`,
          }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: blob.delay * 0.25, ease: "easeOut" }}
        />
      ))}

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none`}
          style={{
            top: item.top,
            left: (item as { left?: string }).left,
            right: (item as { right?: string }).right,
            bottom: (item as { bottom?: string }).bottom,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 + item.delay * 0.2, type: "spring" }}
        >
          <span
            className="animate-float block drop-shadow-lg"
            style={{ animationDelay: `${item.delay}s` }}
          >
            {item.emoji}
          </span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 text-sm font-semibold"
          style={{
            background: "rgba(252, 231, 243, 0.92)",
            border: "1.5px solid rgba(232, 121, 160, 0.28)",
            color: "var(--color-bloom-dark)",
          }}
        >
          <Sparkles size={14} />
          100% Hecho a Mano · Envíos a toda Colombia
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-ink mb-6"
        >
          Regala algo{" "}
          <span className="italic text-gradient">único.</span>
          <br />
          Regala algo{" "}
          <span className="font-black text-gradient-aurora">CORE.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-ink/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Anchetas personalizadas, flores preservadas y manualidades únicas.{" "}
          <strong className="text-ink/75">Arma tu regalo en vivo</strong> y
          ve cómo queda antes de ordenarlo.
        </motion.p>

        {/* CTAs with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="/products"
            className="petal-btn petal-btn-secondary inline-flex items-center gap-2 text-base px-8 py-4 cursor-pointer"
          >
            Ver Productos
            <ArrowRight size={18} />
          </MagneticButton>

          <MagneticButton
            href="/customize"
            className="petal-btn petal-btn-primary inline-flex items-center gap-2 text-base px-8 py-4 cursor-pointer animate-pulse-glow"
          >
            <Sparkles size={18} />
            Armar mi Ancheta
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-10 mt-16"
        >
          {[
            { value: "+2.500", label: "Regalos enviados" },
            { value: "4.9★",  label: "Calificación promedio" },
            { value: "100%",  label: "Hecho a mano" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif font-bold text-2xl text-gradient">
                {stat.value}
              </div>
              <div className="text-ink/45 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-ink/15 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-bloom/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
