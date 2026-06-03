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
          <motion.span whileHover={{ x: -4 }} className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Seguir Comprando
          </motion.span>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-charcoal">Tu Carrito</h1>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-sm text-charcoal/40 hover:text-rose-500 transition-colors flex items-center gap-1.5">
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
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-3">Tu carrito está vacío</h2>
            <p className="text-charcoal/50 mb-8">¡Descubre nuestros productos únicos!</p>
            <Link href="/products" className="clay-btn clay-btn-primary inline-flex items-center gap-2">
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
                    className="clay-card p-5"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#eef6e8,#d8eacc)" }}>
                        {item.type === "custom" ? "🎁" : "✨"}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-charcoal">
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
                                  <span className="text-xs text-charcoal/40">+{item.customConfig.items.length - 6}</span>
                                )}
                              </div>
                            )}
                            {item.customText && (
                              <p className="text-xs text-charcoal/40 mt-1 italic">&ldquo;{item.customText}&rdquo;</p>
                            )}
                          </div>
                          <button onClick={() => removeItem(item.id)} className="p-2 rounded-xl hover:bg-rose/15 text-charcoal/30 hover:text-rose-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-sage/10 rounded-xl px-3 py-1.5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-charcoal/60 hover:text-charcoal font-bold">
                              <Minus size={14} />
                            </button>
                            <span className="font-semibold text-charcoal text-sm w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-charcoal/60 hover:text-charcoal font-bold">
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-charcoal">{formatPrice(item.unitPrice * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Customizer CTA */}
              <Link href="/customize">
                <motion.div whileHover={{ y: -2 }} className="clay-card clay-card-lavender p-5 flex items-center gap-4 cursor-pointer group">
                  <div className="text-3xl">✨</div>
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal text-sm">¿Quieres algo único?</p>
                    <p className="text-charcoal/50 text-xs">Arma tu ancheta personalizada desde cero</p>
                  </div>
                  <ArrowRight size={18} className="text-charcoal/40 group-hover:text-charcoal transition-colors" />
                </motion.div>
              </Link>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="clay-card p-5 sticky top-28">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4">Resumen</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/60">Subtotal ({items.length} {items.length === 1 ? "producto" : "productos"})</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/60">Envío</span>
                    <span className="text-sage-dark font-semibold">Por calcular</span>
                  </div>
                </div>

                <div className="border-t border-sage/20 pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="font-serif font-bold text-2xl text-charcoal">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="clay-btn clay-btn-primary w-full justify-center block text-center"
                  >
                    <ShoppingBag size={18} className="inline mr-2" />
                    Finalizar Pedido
                  </motion.span>
                </Link>

                <div className="mt-4 space-y-2">
                  {["Pago 100% seguro", "Devolución en 7 días", "Soporte 24/7"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-charcoal/50">
                      <span className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark">✓</span>
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
