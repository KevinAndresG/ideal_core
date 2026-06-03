"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María Fernanda",
    location: "Bogotá",
    emoji: "👩‍🦱",
    rating: 5,
    text: "¡Quedé enamorada de mi ancheta! La personalicé en el sitio y llegó exactamente como la diseñé. Super bonita y bien presentada.",
    product: "Ancheta Wellness",
    color: "clay-card-lavender",
  },
  {
    name: "Camila Torres",
    location: "Medellín",
    emoji: "👩",
    rating: 5,
    text: "Perfecto para el cumpleaños de mi mamá. El personalizador es super fácil de usar y el resultado fue espectacular. ¡Ella lloró de la emoción!",
    product: "Ancheta Amor Eterno",
    color: "clay-card-peach",
  },
  {
    name: "Santiago Ruiz",
    location: "Cali",
    emoji: "👨‍🦰",
    rating: 5,
    text: "Llevaba buscando un regalo único para mi novia y CORE era exactamente lo que necesitaba. Calidad increíble, envío rápido.",
    product: "Set Spa Completo",
    color: "clay-card-sage",
  },
  {
    name: "Valeria Gómez",
    location: "Bucaramanga",
    emoji: "👩‍🦲",
    rating: 5,
    text: "Las flores preservadas son hermosas, parecen recién cortadas. Ya compré 3 veces y siempre superan mis expectativas.",
    product: "Corona de Flores Eternas",
    color: "clay-card-sky",
  },
  {
    name: "Andrés Castro",
    location: "Barranquilla",
    emoji: "👨",
    rating: 5,
    text: "Regalé una ancheta de baby shower y fue el regalo más comentado. Todo muy bien presentado y con una tarjeta personalizada.",
    product: "Ancheta Baby Shower",
    color: "clay-card-rose",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 overflow-hidden bg-sage-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Amor de Clientes</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mt-2">
            Lo que dicen de CORE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4 }}
            >
              <div className={`clay-card ${t.color} p-6 h-full flex flex-col`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-peach fill-peach" />
                  ))}
                </div>

                <Quote size={24} className="text-charcoal/20 mb-3" />

                <p className="text-charcoal/70 text-sm leading-relaxed flex-1">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-charcoal/10">
                  <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center text-xl">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                    <p className="text-charcoal/40 text-xs">{t.location} · {t.product}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
