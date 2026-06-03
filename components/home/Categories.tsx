"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/lib/data/products";

const cardVariants = [
  "petal-card-peach",
  "petal-card-violet",
  "petal-card-mint",
  "petal-card-sky",
  "petal-card-pink",
  "petal-card-butter",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.88 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-bloom font-semibold text-sm tracking-widest uppercase">
          Explora
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-2">
          Categorías
        </h2>
        <p className="text-ink/50 mt-3 max-w-md mx-auto">
          Encuentra el regalo perfecto para cada ocasión
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((cat, i) => (
          <motion.div key={cat.id} variants={item}>
            <Link href={`/products?category=${cat.id}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`petal-card ${cardVariants[i % cardVariants.length]} rounded-3xl p-6 text-center cursor-pointer group`}
              >
                <div className="text-4xl mb-3 group-hover:animate-wiggle inline-block">
                  {cat.emoji}
                </div>
                <h3 className="font-semibold text-ink text-sm">{cat.label}</h3>
                <p className="text-ink/45 text-xs mt-1 leading-tight">{cat.description}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
