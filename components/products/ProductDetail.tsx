"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, ArrowLeft, Check, Sparkles, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/data/products";

const categoryEmojis: Record<string, string> = {
  anchetas: "🎁",
  bouquets: "💐",
};

const categoryGradients: Record<string, string> = {
  anchetas: "from-peach-light to-peach",
  bouquets: "from-rose-light to-rose",
};

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [qty, setQty]           = useState(1);
  const [customText, setCustomText] = useState("");
  const [liked, setLiked]       = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { addItem, openCart }   = useCartStore();

  const images = product.images.length > 0 ? product.images : [];
  const hasMany = images.length > 1;

  function prevImg() {
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  }
  function nextImg() {
    setImgIndex((i) => (i + 1) % images.length);
  }

  const handleAdd = () => {
    addItem({ type: "product", product, quantity: qty, unitPrice: product.price, customText: customText || undefined });
    toast.success(`${product.name} agregado al carrito 🎁`);
    openCart();
  };

  const gradient = categoryGradients[product.category] ?? "from-mist-dark to-butter-light";

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link href="/products">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-ink/45 hover:text-ink text-sm mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Volver a Productos
          </motion.span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {/* Main image */}
            <div className={`petal-card aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden relative`}>
              {images.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[imgIndex]}
                        alt={`${product.name} — imagen ${imgIndex + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority={imgIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {hasMany && (
                    <>
                      <button
                        onClick={prevImg}
                        aria-label="Imagen anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-ink rounded-full p-1.5 shadow transition-all cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImg}
                        aria-label="Imagen siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-ink rounded-full p-1.5 shadow transition-all cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            aria-label={`Ir a imagen ${i + 1}`}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === imgIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <motion.span
                  animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-[160px] select-none"
                >
                  {categoryEmojis[product.category] ?? "🎁"}
                </motion.span>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasMany && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      i === imgIndex
                        ? "border-bloom shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Miniatura ${i + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="petal-badge bg-bloom/12 text-bloom-dark text-xs capitalize">
                {product.category}
              </span>
              {product.customizable && (
                <span className="petal-badge bg-violet/12 text-violet-dark text-xs flex items-center gap-1">
                  <Sparkles size={10} /> Personalizable
                </span>
              )}
              {product.featured && (
                <span className="petal-badge bg-peach/40 text-orange-800 text-xs flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> Destacado
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < Math.floor(product.rating) ? "text-peach fill-peach" : "text-ink/20"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">{product.rating}</span>
              <span className="text-ink/40 text-sm">({product.reviews} reseñas)</span>
            </div>

            <p className="text-ink/55 leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif font-bold text-4xl text-ink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-ink/30 text-xl line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Custom text */}
            {product.customizable && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-ink mb-2 block">
                  Mensaje personalizado (opcional)
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej: ¡Feliz cumpleaños amor!"
                  className="petal-input"
                  maxLength={60}
                />
                <p className="text-xs text-ink/35 mt-1">{customText.length}/60 caracteres</p>
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-3 bg-surface rounded-2xl border border-bloom/15 px-4 py-2 backdrop-blur-sm">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Reducir cantidad"
                  className="text-ink/55 hover:text-ink font-bold text-lg w-6 cursor-pointer"
                >
                  −
                </button>
                <span className="font-semibold text-ink w-5 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Aumentar cantidad"
                  className="text-ink/55 hover:text-ink font-bold text-lg w-6 cursor-pointer"
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="petal-btn petal-btn-primary flex-1 justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={18} />
                Agregar al Carrito
              </motion.button>

              <button
                onClick={() => setLiked(!liked)}
                aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  liked
                    ? "bg-rose-light border-rose/40 text-rose-600"
                    : "bg-surface border-bloom/15 text-ink/40 hover:text-rose-500"
                }`}
              >
                <Heart size={20} className={liked ? "fill-current" : ""} />
              </button>
            </div>

            {/* Features */}
            <div className="petal-card petal-card-mint p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                {["Hecho a mano", "Envío en 24-48h", "Embalaje premium", "Satisfacción garantizada"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink/65">
                    <Check size={14} className="text-mint-dark flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink mb-6">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
