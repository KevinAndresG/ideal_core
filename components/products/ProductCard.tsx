"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

const categoryEmojis: Record<string, string> = {
  anchetas: "🎁",
  flores: "🌸",
  velas: "🕯️",
  decoraciones: "✨",
  sets: "💝",
  manualidades: "🎨",
};

const categoryColors: Record<string, string> = {
  anchetas: "from-peach-light to-peach",
  flores: "from-rose-light to-rose",
  velas: "from-lavender-light to-lavender",
  decoraciones: "from-sky-light to-sky",
  sets: "from-cream to-cream-dark",
  manualidades: "from-mint/40 to-mint",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      type: "product",
      product,
      quantity: 1,
      unitPrice: product.price,
    });
    toast.success(`¡${product.name} agregado! 🎁`, {
      description: `${formatPrice(product.price)} · ${product.category}`,
    });
    openCart();
  };

  const gradientClass = categoryColors[product.category] ?? "from-cream to-cream-dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, type: "spring" }}
    >
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -6 }}
          className="clay-card group overflow-hidden cursor-pointer"
        >
          {/* Product image area */}
          <div className={`relative h-52 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
            <motion.span
              className="text-7xl select-none drop-shadow-lg"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring" }}
            >
              {categoryEmojis[product.category] ?? "🎁"}
            </motion.span>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.originalPrice && (
                <span className="clay-badge bg-rose text-rose-800 text-xs">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
              {product.featured && (
                <span className="clay-badge bg-sage/80 text-white text-xs flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> Destacado
                </span>
              )}
            </div>

            {product.customizable && (
              <div className="absolute top-3 right-3">
                <span className="clay-badge bg-lavender text-purple-800 text-xs flex items-center gap-1">
                  <Sparkles size={10} /> Custom
                </span>
              </div>
            )}

            {/* Quick add */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 clay-btn clay-btn-primary py-2 px-4 text-xs gap-1.5"
            >
              <ShoppingBag size={13} />
              Agregar
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-charcoal text-sm line-clamp-2 group-hover:text-sage-dark transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={12} className="text-peach fill-peach" />
              <span className="text-xs text-charcoal/60 font-medium">{product.rating}</span>
              <span className="text-xs text-charcoal/40">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="font-bold text-charcoal">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-charcoal/30 text-xs line-through ml-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="w-8 h-8 rounded-xl bg-sage/15 hover:bg-sage/30 flex items-center justify-center text-sage-dark transition-colors"
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
