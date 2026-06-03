"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const floatingItems = [
  { emoji: "🌹", top: "15%", left: "8%", delay: 0, size: "text-4xl" },
  { emoji: "🎁", top: "20%", right: "6%", delay: 0.5, size: "text-5xl" },
  { emoji: "🕯️", bottom: "30%", left: "5%", delay: 1, size: "text-3xl" },
  { emoji: "🌸", top: "45%", right: "8%", delay: 1.5, size: "text-4xl" },
  { emoji: "🧸", bottom: "20%", right: "12%", delay: 0.8, size: "text-4xl" },
  { emoji: "💐", top: "70%", left: "10%", delay: 0.3, size: "text-3xl" },
  { emoji: "🍫", top: "35%", left: "3%", delay: 1.2, size: "text-3xl" },
  { emoji: "✨", bottom: "45%", right: "3%", delay: 0.6, size: "text-2xl" },
];

const blobs = [
  { color: "#fae0cc", top: "-10%", left: "-5%", size: 500, delay: 0 },
  { color: "#ead8f2", top: "30%", right: "-10%", size: 450, delay: 2 },
  { color: "#d8eacc", bottom: "-15%", left: "20%", size: 400, delay: 1 },
  { color: "#fad8e4", top: "10%", right: "25%", size: 300, delay: 3 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none animate-blob"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: (blob as any).right,
            bottom: (blob as any).bottom,
            opacity: 0.6,
            animationDelay: `${blob.delay}s`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: blob.delay * 0.3 }}
        />
      ))}

      {/* Floating items */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none`}
          style={{
            top: item.top,
            left: (item as any).left,
            right: (item as any).right,
            bottom: (item as any).bottom,
            animationDelay: `${item.delay}s`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + item.delay * 0.2,
            type: "spring",
          }}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 text-sm font-semibold"
          style={{
            background: "rgba(143, 175, 126, 0.15)",
            border: "2px solid rgba(143, 175, 126, 0.3)",
            color: "#6a8c5c",
          }}
        >
          <Sparkles size={14} />
          100% Hecho a Mano · Envíos a toda Colombia
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-charcoal mb-6"
        >
          Regala algo <span className="italic text-gradient">único.</span>
          <br />
          Regala algo <span className="font-black text-gradient">CORE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-charcoal/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Anchetas personalizadas, flores preservadas y manualidades únicas.{" "}
          <strong className="text-charcoal/80">Arma tu regalo en vivo</strong> y
          ve cómo queda antes de ordenarlo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="clay-btn clay-btn-secondary inline-flex items-center gap-2 text-base px-8 py-4"
            >
              Ver Productos
              <ArrowRight size={18} />
            </motion.span>
          </Link>
          <Link href="/customize">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="clay-btn clay-btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
            >
              ✨ Armar mi Ancheta
            </motion.span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { value: "+2.500", label: "Regalos enviados" },
            { value: "4.9★", label: "Calificación promedio" },
            { value: "100%", label: "Hecho a mano" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif font-bold text-2xl text-charcoal">
                {stat.value}
              </div>
              <div className="text-charcoal/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-charcoal/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-sage/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
