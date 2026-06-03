"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2, Plus, Minus, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const cartTotal = total();

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/products">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-ink/45 hover:text-ink text-sm mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Seguir Comprando
          </motion.span>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-ink">Tu Carrito</h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-ink/35 hover:text-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={14} /> Vaciar carrito
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-8xl mb-6 animate-float inline-block">🎁</div>
            <h2 className="font-serif text-2xl font-bold text-ink mb-3">Tu carrito está vacío</h2>
            <p className="text-ink/45 mb-8">¡Descubre nuestros productos únicos!</p>
            <Link href="/products" className="petal-btn petal-btn-primary inline-flex items-center gap-2">
              Ver Productos <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="petal-card p-5"
                  >
                    <div className="flex gap-4">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                        style={{ background: "var(--surface-violet)" }}
                      >
                        {item.type === "custom" ? "🎁" : "✨"}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-ink">
                              {item.type === "custom"
                                ? `Ancheta Custom: ${item.customConfig?.base.name}`
                                : item.product?.name}
                            </h3>
                            {item.type === "custom" && item.customConfig && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {item.customConfig.items.slice(0, 6).map((ci, i) => (
                                  <span key={i} className="text-sm">{ci.emoji}</span>
                                ))}
                                {item.customConfig.items.length > 6 && (
                                  <span className="text-xs text-ink/35">
                                    +{item.customConfig.items.length - 6}
                                  </span>
                                )}
                              </div>
                            )}
                            {item.customText && (
                              <p className="text-xs text-ink/35 mt-1 italic">
                                &ldquo;{item.customText}&rdquo;
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Eliminar item"
                            className="p-2 rounded-xl hover:bg-rose-light text-ink/25 hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-bloom/8 rounded-xl px-3 py-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Reducir cantidad"
                              className="text-ink/55 hover:text-ink font-bold cursor-pointer"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-semibold text-ink text-sm w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                              className="text-ink/55 hover:text-ink font-bold cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-ink">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Customizer CTA */}
              <Link href="/customize">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="petal-card petal-card-violet p-5 flex items-center gap-4 cursor-pointer group"
                >
                  <div className="text-3xl">✨</div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-sm">¿Quieres algo único?</p>
                    <p className="text-ink/45 text-xs">Arma tu ancheta personalizada desde cero</p>
                  </div>
                  <ArrowRight size={18} className="text-ink/35 group-hover:text-ink transition-colors" />
                </motion.div>
              </Link>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="petal-card p-5 sticky top-28">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">Resumen</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/55">
                      Subtotal ({items.length} {items.length === 1 ? "producto" : "productos"})
                    </span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/55">Envío</span>
                    <span className="text-bloom-dark font-semibold">Por calcular</span>
                  </div>
                </div>

                <div className="border-t border-bloom/12 pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-ink">Total</span>
                    <span className="font-serif font-bold text-2xl text-ink">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="petal-btn petal-btn-primary w-full justify-center block text-center cursor-pointer"
                  >
                    <ShoppingBag size={18} className="inline mr-2" />
                    Finalizar Pedido
                  </motion.span>
                </Link>

                <div className="mt-4 space-y-2">
                  {["Pago 100% seguro", "Devolución en 7 días", "Soporte 24/7"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-ink/45">
                      <span className="w-4 h-4 rounded-full bg-bloom/15 flex items-center justify-center text-bloom-dark">
                        ✓
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
