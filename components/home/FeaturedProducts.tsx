"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Lo mejor de CORE</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mt-2">
            Productos Destacados
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hidden sm:block"
        >
          <Link href="/products">
            <motion.span
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sage-dark font-semibold text-sm hover:text-charcoal transition-colors"
            >
              Ver todos
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {featured.slice(0, 8).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="sm:hidden text-center mt-8"
      >
        <Link href="/products" className="clay-btn clay-btn-secondary inline-flex items-center gap-2">
          Ver todos los productos
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
