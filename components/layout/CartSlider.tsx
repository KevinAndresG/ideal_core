"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartSlider() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: "var(--bg-base)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sage/15">
                  <ShoppingBag size={20} className="text-sage-dark" />
                </div>
                <div>
                  <h2 className="font-semibold text-charcoal font-serif text-lg">Tu Carrito</h2>
                  <p className="text-sm text-charcoal/50">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-sage/10 transition-colors text-charcoal/60 hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 gap-4"
                  >
                    <div className="text-6xl animate-float">🎁</div>
                    <p className="text-charcoal/50 text-center">Tu carrito está vacío.<br />¡Agrega algo especial!</p>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="clay-btn clay-btn-primary text-sm py-2.5 px-5"
                    >
                      Ver Productos
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="clay-card p-4"
                    >
                      <div className="flex gap-3">
                        {/* Emoji / image placeholder */}
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #eef6e8, #d8eacc)" }}>
                          {item.type === "custom" ? "🎁" : "✨"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-charcoal text-sm truncate">
                            {item.type === "custom"
                              ? `Ancheta Custom: ${item.customConfig?.base.name}`
                              : item.product?.name}
                          </p>
                          {item.type === "custom" && item.customConfig && (
                            <p className="text-xs text-charcoal/40 truncate">
                              {item.customConfig.items.length} items · Lazo {item.customConfig.ribbonColor.name}
                            </p>
                          )}
                          <p className="text-sage-dark font-semibold text-sm mt-1">
                            {formatPrice(item.unitPrice)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-rose/20 text-charcoal/30 hover:text-rose-600 transition-colors flex-shrink-0"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Qty */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-sage/10 hover:bg-sage/20 flex items-center justify-center transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-sage/10 hover:bg-sage/20 flex items-center justify-center transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                        <span className="ml-auto text-sm font-semibold text-charcoal">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-sage/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 text-sm">Subtotal</span>
                  <span className="font-bold text-charcoal text-lg">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-charcoal/40 text-center">Envío calculado al confirmar el pedido</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="clay-btn clay-btn-primary w-full justify-center"
                >
                  Finalizar Pedido
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-sm text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  Ver carrito completo
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
