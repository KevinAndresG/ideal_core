"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const values = [
  {
    icon: "✋",
    title: "Hecho a Mano",
    description:
      "Cada producto es elaborado con cuidado y dedicación por nuestro equipo artesanal.",
    color: "petal-card-peach",
  },
  {
    icon: "💝",
    title: "Con Amor",
    description:
      "Ponemos el corazón en cada detalle para que el regalo llegue lleno de sentimientos.",
    color: "petal-card-pink",
  },
  {
    icon: "🌱",
    title: "Sostenible",
    description:
      "Usamos materiales naturales y empaques eco-amigables que cuidan el planeta.",
    color: "petal-card-mint",
  },
  {
    icon: "✨",
    title: "Único",
    description:
      "Ningún regalo es igual a otro. Cada pieza es especial y personalizada.",
    color: "petal-card-violet",
  },
];

const processSteps = [
  {
    emoji: "💡",
    step: "01",
    title: "Inspiración",
    description:
      "Nuestros diseñadores crean conceptos únicos basados en tendencias y amor artesanal.",
  },
  {
    emoji: "🎨",
    step: "02",
    title: "Diseño y Creación",
    description:
      "Artesanas expertas elaboran cada producto a mano con materiales seleccionados.",
  },
  {
    emoji: "📦",
    step: "03",
    title: "Empaque Especial",
    description:
      "Cada regalo es empacado con esmero y presentación que enamora.",
  },
  {
    emoji: "🚀",
    step: "04",
    title: "Entrega con Amor",
    description:
      "Tu regalo llega a tiempo y en perfectas condiciones, listo para sorprender.",
  },
];

const team = [
  { name: "Kevin García", role: "Fundador", emoji: "👨‍🍳" },
  { name: "Sara García", role: "Directora", emoji: "👩‍🌾" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="aurora-band relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-6xl opacity-20 pointer-events-none"
        >
          🌸
        </motion.div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-bloom font-semibold text-sm tracking-widest uppercase mb-4 block">
              Nuestra Historia
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
              Somos <span className="italic text-gradient">CORE</span>
            </h1>
            <p className="text-ink/55 text-xl leading-relaxed max-w-2xl mx-auto">
              Nacimos del amor por crear cosas únicas con las manos. Cada regalo
              que hacemos lleva un pedazo de nosotros y mucho amor.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-bloom font-semibold text-sm tracking-widest uppercase">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-4xl font-bold text-ink mt-2 mb-6">
              Un regalo puede cambiar un día entero
            </h2>
            <p className="text-ink/55 leading-relaxed mb-4">
              CORE nació en 2022 en Bogotá, cuando Valentina decidió convertir
              su pasión por las manualidades en algo que pudiera generar
              emociones reales. Lo que comenzó como regalos para amigos y
              familia, se convirtió en una marca que hoy llega a toda Colombia.
            </p>
            <p className="text-ink/55 leading-relaxed mb-6">
              Creemos que cada regalo es una oportunidad para expresar lo que a
              veces las palabras no alcanzan. Por eso ponemos alma en cada flor
              preservada, cada vela, cada ancheta que sale de nuestras manos.
            </p>
            <div className="flex gap-6">
              {[
                { value: "+2.500", label: "Regalos" },
                { value: "4.9★", label: "Calificación" },
                { value: "3 años", label: "Experiencia" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif font-bold text-2xl text-gradient">
                    {s.value}
                  </p>
                  <p className="text-ink/40 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="petal-card petal-card-violet p-12 flex items-center justify-center"
              style={{ borderRadius: 48, minHeight: 360 }}
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-9xl mb-4">🌸</div>
                <div className="flex gap-3 justify-center">
                  {["🎁", "🕯️", "🧸"].map((e, i) => (
                    <span
                      key={e}
                      className="text-4xl animate-float"
                      style={{ animationDelay: `${(i + 1) * 0.5}s` }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-mist-soft">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-ink">
              Nuestros Valores
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -6 }}
                className={`petal-card ${v.color} p-6 rounded-3xl text-center cursor-default`}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-semibold text-ink mb-2">{v.title}</h3>
                <p className="text-ink/55 text-sm leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-ink">
            Nuestro Proceso
          </h2>
          <p className="text-ink/45 mt-3">Del corazón a tus manos</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((ps, i) => (
            <motion.div
              key={ps.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="petal-card p-6 rounded-3xl"
            >
              <div className="text-4xl mb-3">{ps.emoji}</div>
              <div className="text-xs font-bold text-bloom/55 mb-1">
                {ps.step}
              </div>
              <h3 className="font-semibold text-ink mb-2">{ps.title}</h3>
              <p className="text-ink/45 text-sm leading-relaxed">
                {ps.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-mist-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-ink mb-10">
            El Equipo CORE
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -4 }}
                className="petal-card p-6 rounded-3xl text-center w-44"
              >
                <div className="text-5xl mb-3">{member.emoji}</div>
                <p className="font-semibold text-ink text-sm">{member.name}</p>
                <p className="text-ink/45 text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center aurora-band">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">🎁</div>
          <h2 className="font-serif text-4xl font-bold text-ink mb-4">
            ¿Listo para regalar algo{" "}
            <span className="italic text-gradient">CORE</span>?
          </h2>
          <p className="text-ink/50 max-w-md mx-auto mb-8">
            Explora nuestros productos o arma tu ancheta personalizada ahora
            mismo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="petal-btn petal-btn-secondary inline-flex items-center gap-2"
            >
              Ver Productos <ArrowRight size={16} />
            </Link>
            <Link
              href="/customize"
              className="petal-btn petal-btn-primary inline-flex items-center gap-2"
            >
              <Sparkles size={16} /> Personalizar
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
