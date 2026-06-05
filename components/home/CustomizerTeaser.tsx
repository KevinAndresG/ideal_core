"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, Clock } from "lucide-react";

const steps = [
  { emoji: "🧺", label: "Elige la base" },
  { emoji: "✨", label: "Agrega items" },
  { emoji: "🎀", label: "Personaliza" },
  { emoji: "🚀", label: "¡Ordena!" },
];

const floatingItems = [
  { emoji: "🌹", x: "15%", y: "20%", delay: 0   },
  { emoji: "🍫", x: "75%", y: "15%", delay: 0.3 },
  { emoji: "🕯️", x: "10%", y: "65%", delay: 0.6 },
  { emoji: "🧸", x: "80%", y: "60%", delay: 0.9 },
  { emoji: "💌", x: "50%", y: "80%", delay: 0.4 },
  { emoji: "🎈", x: "35%", y: "10%", delay: 0.7 },
];

const features = [
  "Sin costo de personalización",
  "Precio en tiempo real",
  "Entrega en 24-48h",
  "+50 items disponibles",
];

export function CustomizerTeaser() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(237, 233, 254, 0.92)",
                border: "1.5px solid rgba(139, 92, 246, 0.25)",
                color: "var(--color-violet-dark)",
              }}
            >
              <Clock size={14} />
              Próximamente
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
              Arma tu ancheta{" "}
              <span className="italic text-gradient">perfecta</span>{" "}
              en tiempo real
            </h2>

            <p className="text-ink/55 text-lg leading-relaxed mb-8">
              Estamos preparando un personalizador interactivo para que armes tu regalo
              en tiempo real. ¡Muy pronto disponible!
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(110, 231, 183, 0.25)" }}
                  >
                    <Check size={11} className="text-mint-dark" />
                  </div>
                  <span className="text-ink/65 text-sm">{feat}</span>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="petal-card petal-card-violet flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm">
                    <span>{step.emoji}</span>
                    <span className="font-medium text-ink/65 text-xs">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight size={14} className="text-ink/25 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <Link href="/customize">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="petal-btn petal-btn-secondary inline-flex items-center gap-3 text-base px-8 py-4 cursor-pointer"
              >
                <Sparkles size={18} />
                Saber más
              </motion.span>
            </Link>
          </motion.div>

          {/* Right: animated preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative h-96 lg:h-[500px] overflow-hidden"
              style={{
                borderRadius: "40px",
                background: "linear-gradient(135deg, rgba(251,207,232,0.8) 0%, rgba(237,233,254,0.8) 50%, rgba(209,250,229,0.7) 100%)",
              }}
            >
              {/* Floating emoji items */}
              {floatingItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl select-none"
                  style={{ left: item.x, top: item.y }}
                  animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.emoji}
                </motion.div>
              ))}

              {/* Central basket */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="text-9xl drop-shadow-2xl mb-2">🧺</div>
                  <div
                    className="petal-card petal-card-mint px-5 py-2.5 rounded-2xl text-sm font-semibold text-ink"
                  >
                    ¡Tu ancheta aquí!
                  </div>
                </motion.div>
              </div>

              {/* Coming soon badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: "rgba(139, 92, 246, 0.92)" }}
              >
                <Clock size={12} />
                PRÓXIMAMENTE
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
