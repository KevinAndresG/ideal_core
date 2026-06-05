"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const steps = [
  { emoji: "🧺", label: "Elige la base" },
  { emoji: "✨", label: "Agrega items" },
  { emoji: "🎀", label: "Personaliza" },
  { emoji: "🚀", label: "¡Ordena!" },
];

export default function CustomizePage() {
  const waText = encodeURIComponent(
    "🎁 ¡Hola CORE! Me gustaría armar una ancheta personalizada. ¿Pueden ayudarme con los detalles?"
  );

  return (
    <div className="pt-28 min-h-screen px-4 sm:px-6">
      <div className="max-w-3xl mx-auto py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{
            background: "rgba(237, 233, 254, 0.92)",
            border: "1.5px solid rgba(139, 92, 246, 0.25)",
            color: "var(--color-violet-dark)",
          }}
        >
          <Clock size={14} />
          Próximamente
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-5 leading-tight"
        >
          Personalización en Vivo{" "}
          <span className="italic text-gradient">muy pronto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-ink/55 text-lg leading-relaxed mb-8 max-w-xl mx-auto"
        >
          Estamos preparando un personalizador interactivo donde podrás armar tu ancheta
          o bouquet en tiempo real. Mientras tanto, escríbenos por WhatsApp y lo armamos
          contigo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="petal-btn inline-flex items-center gap-2 text-base px-7 py-3.5 text-white"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={18} />
            Armar mi ancheta por WhatsApp
          </a>

          <Link
            href="/products"
            className="petal-btn petal-btn-secondary inline-flex items-center gap-2 text-base px-7 py-3.5"
          >
            <Sparkles size={18} />
            Ver Productos
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
