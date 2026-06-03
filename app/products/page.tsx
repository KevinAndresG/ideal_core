"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/data/products";
import type { Category } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const priceRanges = [
  { label: "Todos",          min: 0,      max: Infinity },
  { label: "Hasta $80k",    min: 0,      max: 80000 },
  { label: "$80k - $150k",  min: 80000,  max: 150000 },
  { label: "$150k - $250k", min: 150000, max: 250000 },
  { label: "Más de $250k",  min: 250000, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [priceRange, setPriceRange]             = useState(0);
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [search, setSearch]                     = useState("");
  const [showFilters, setShowFilters]           = useState(false);

  const filtered = useMemo(() => {
    const range = priceRanges[priceRange];
    return products.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (p.price < range.min || p.price > range.max)                   return false;
      if (customizableOnly && !p.customizable)                           return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedCategory, priceRange, customizableOnly, search]);

  return (
    <div className="min-h-screen">
      {/* Header band */}
      <div className="aurora-band relative pb-16 px-4 overflow-hidden text-center pt-28">
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4"
          >
            Todos los Productos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/55 mb-8"
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
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              type="text"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="petal-input pl-11 pr-4"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 items-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-bloom text-white shadow-md shadow-bloom/30"
                  : "bg-surface text-ink/55 hover:bg-bloom/10 border border-bloom/15"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-bloom text-white shadow-md shadow-bloom/30"
                    : "bg-surface text-ink/55 hover:bg-bloom/10 border border-bloom/15"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              showFilters
                ? "bg-ink text-white"
                : "bg-surface text-ink/55 hover:bg-bloom/10 border border-bloom/15"
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
              className="petal-card p-5 mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm font-semibold text-ink mb-2">Precio</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(i)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          priceRange === i
                            ? "bg-peach text-orange-900 shadow-sm"
                            : "bg-mist text-ink/55 hover:bg-peach/25 border border-peach/25"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink mb-2">Tipo</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizableOnly}
                      onChange={(e) => setCustomizableOnly(e.target.checked)}
                      className="rounded accent-bloom w-4 h-4"
                    />
                    <span className="text-sm text-ink/65 flex items-center gap-1">
                      ✨ Solo personalizables
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-ink/45 text-sm mb-5">
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
              <p className="text-ink/45">No se encontraron productos con esos filtros.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearch("");
                  setPriceRange(0);
                  setCustomizableOnly(false);
                }}
                className="petal-btn petal-btn-secondary mt-4 text-sm py-2.5 px-6 cursor-pointer"
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
