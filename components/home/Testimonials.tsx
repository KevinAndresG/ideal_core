"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María Fernanda",
    location: "Medellín",
    // emoji: "👩‍🦱",
    rating: 5,
    text: "¡Quedé enamorada de mi ancheta! La personalicé a mi gusto y llegó exactamente como la diseñé. Super bonita y bien presentada.",
    product: "Ancheta Wellness",
    color: "petal-card-violet",
  },
  {
    name: "Camila Torres",
    location: "Medellín",
    // emoji: "👩",
    rating: 5,
    text: "Perfecto para el cumpleaños de mi mamá. ¡A Ella le encanto!",
    product: "Ancheta Amor Eterno",
    color: "petal-card-peach",
  },
  {
    name: "Santiago Ruiz",
    location: "Medellín",
    // emoji: "👨‍🦰",
    rating: 5,
    text: "Llevaba buscando un regalo único para mi novia y CORE era exactamente lo que necesitaba. Calidad increíble, envío rápido.",
    product: "Set Spa Completo",
    color: "petal-card-mint",
  },
  {
    name: "Valeria Gómez",
    location: "Medellín",
    // emoji: "👩‍🦲",
    rating: 5,
    text: "Las flores preservadas son hermosas, parecen recién cortadas. Ya compré 3 veces y siempre superan mis expectativas.",
    product: "Corona de Flores Eternas",
    color: "petal-card-sky",
  },
  {
    name: "Andrés Castro",
    location: "Medellín",
    // emoji: "👨",
    rating: 5,
    text: "Regalé una ancheta de baby shower y fue el regalo más Hermoso. Todo muy bien presentado y con una tarjeta personalizada.",
    product: "Ancheta Baby Shower",
    color: "petal-card-pink",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 overflow-hidden bg-mist-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-bloom font-semibold text-sm tracking-widest uppercase">
            Amor de Clientes
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-2">
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
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 22,
              }}
              whileHover={{ y: -6 }}
            >
              <div className={`petal-card ${t.color} p-6 h-full flex flex-col`}>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-peach fill-peach" />
                  ))}
                </div>

                <Quote size={22} className="text-ink/15 mb-3" />

                <p className="text-ink/65 text-sm leading-relaxed flex-1">
                  {t.text}
                </p>

                {/* <div className="flex items-center gap-3 mt-5 pt-4 border-t border-ink/8">
                  <div className="w-10 h-10 rounded-xl bg-white/55 backdrop-blur-sm flex items-center justify-center text-xl">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">{t.name}</p>
                    <p className="text-ink/40 text-xs">
                      {t.location} · {t.product}
                    </p>
                  </div>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
