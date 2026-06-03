"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

const categoryGradients: Record<string, string> = {
  anchetas:    "from-peach-light to-peach",
  flores:      "from-rose-light to-rose",
  velas:       "from-violet-light to-lilac",
  decoraciones:"from-sky-light to-sky",
  sets:        "from-mist-dark to-butter-light",
  manualidades:"from-mint-light to-mint",
};

const categoryBadgeColors: Record<string, string> = {
  anchetas:    "bg-peach/20 text-orange-700",
  flores:      "bg-rose-light text-rose-700",
  velas:       "bg-violet-light text-violet-dark",
  decoraciones:"bg-sky-light text-sky-700",
  sets:        "bg-butter-light text-yellow-700",
  manualidades:"bg-mint-light text-mint-dark",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ type: "product", product, quantity: 1, unitPrice: product.price });
    toast.success(`¡${product.name} agregado! 🎁`, {
      description: `${formatPrice(product.price)} · ${product.category}`,
    });
    openCart();
  };

  const gradientClass = categoryGradients[product.category] ?? "from-mist-dark to-butter-light";
  const badgeClass    = categoryBadgeColors[product.category] ?? "bg-mist-dark text-ink";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, type: "spring", stiffness: 200 }}
    >
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="petal-card group overflow-hidden cursor-pointer"
        >
          {/* Image area */}
          <div className={`relative h-52 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
            <motion.span
              className="text-7xl select-none drop-shadow-lg"
              whileHover={{ scale: 1.22, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {product.category === "anchetas"     ? "🎁"  :
               product.category === "flores"       ? "🌸"  :
               product.category === "velas"        ? "🕯️" :
               product.category === "decoraciones" ? "✨"  :
               product.category === "sets"         ? "💝"  :
               product.category === "manualidades" ? "🎨"  : "🎁"}
            </motion.span>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.originalPrice && (
                <span className={`petal-badge ${badgeClass}`}>
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
              {product.featured && (
                <span className="petal-badge bg-bloom/15 text-bloom-dark flex items-center gap-1">
                  <Star size={9} fill="currentColor" /> Destacado
                </span>
              )}
            </div>

            {product.customizable && (
              <div className="absolute top-3 right-3">
                <span className="petal-badge bg-violet/15 text-violet-dark flex items-center gap-1">
                  <Sparkles size={9} /> Custom
                </span>
              </div>
            )}

            {/* Quick add */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 petal-btn petal-btn-primary py-2 px-4 text-xs gap-1.5 cursor-pointer"
            >
              <ShoppingBag size={13} />
              Agregar
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-ink text-sm line-clamp-2 group-hover:text-bloom-dark transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={12} className="text-peach fill-peach" />
              <span className="text-xs text-ink/55 font-medium">{product.rating}</span>
              <span className="text-xs text-ink/35">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="font-bold text-ink">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-ink/30 text-xs line-through ml-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleAddToCart}
                className="w-8 h-8 rounded-xl bg-bloom/10 hover:bg-bloom/20 flex items-center justify-center text-bloom-dark transition-colors cursor-pointer"
              >
                <ShoppingBag size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
