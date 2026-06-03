"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/data/products";
import type { Category } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const priceRanges = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Hasta $80k", min: 0, max: 80000 },
  { label: "$80k - $150k", min: 80000, max: 150000 },
  { label: "$150k - $250k", min: 150000, max: 250000 },
  { label: "Más de $250k", min: 250000, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [priceRange, setPriceRange] = useState(0);
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const range = priceRanges[priceRange];
    return products.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (customizableOnly && !p.customizable) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedCategory, priceRange, customizableOnly, search]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="pastel-band relative pb-16 px-4 overflow-hidden text-center pt-28">
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4"
          >
            Todos los Productos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-charcoal/60 mb-8"
          >
            {products.length} productos únicos hechos a mano
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="clay-input pl-11 pr-4"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal">
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 items-center mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-sage text-white shadow-md"
                  : "bg-white/80 text-charcoal/60 hover:bg-sage/10"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-sage text-white shadow-md"
                    : "bg-white/80 text-charcoal/60 hover:bg-sage/10"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showFilters ? "bg-charcoal text-white" : "bg-white/80 text-charcoal/60 hover:bg-sage/10"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filtros
          </button>
        </div>

        {/* Extra filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="clay-card p-5 mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm font-semibold text-charcoal mb-2">Precio</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(i)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          priceRange === i ? "bg-peach text-charcoal shadow-sm" : "bg-cream text-charcoal/60 hover:bg-peach/30"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-charcoal mb-2">Tipo</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizableOnly}
                      onChange={(e) => setCustomizableOnly(e.target.checked)}
                      className="rounded accent-sage w-4 h-4"
                    />
                    <span className="text-sm text-charcoal/70 flex items-center gap-1">
                      ✨ Solo personalizables
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-charcoal/50 text-sm mb-5">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"} encontrados
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-charcoal/50">No se encontraron productos con esos filtros.</p>
              <button
                onClick={() => { setSelectedCategory("all"); setSearch(""); setPriceRange(0); setCustomizableOnly(false); }}
                className="clay-btn clay-btn-secondary mt-4 text-sm py-2.5 px-6"
              >
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((product, i) => (
                <motion.div key={product.id} layout>
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
