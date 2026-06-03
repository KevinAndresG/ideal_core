"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ShoppingBag, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useCustomizerStore } from "@/lib/store/customizer";
import { useCartStore } from "@/lib/store/cart";
import {
  customizerBases,
  customizerItems,
  ribbonColors,
  itemCategories,
} from "@/lib/data/customizer-items";
import { formatPrice } from "@/lib/utils";

const steps = [
  { id: 0, label: "Base",     emoji: "🧺" },
  { id: 1, label: "Items",    emoji: "✨" },
  { id: 2, label: "Etiqueta", emoji: "💌" },
  { id: 3, label: "Lazo",     emoji: "🎀" },
];

export function CustomizerControls() {
  const {
    base, setBase,
    items, addItem, removeItem,
    label, setLabel,
    ribbonColor, setRibbonColor,
    step, setStep,
    reset, totalPrice,
  } = useCustomizerStore();
  const { addItem: addToCart, openCart } = useCartStore();
  const [activeCategory, setActiveCategory] = useState(itemCategories[0]);

  const price = totalPrice();

  const handleAddToCart = () => {
    if (items.length === 0) {
      toast.error("Agrega al menos 1 item a tu ancheta");
      return;
    }
    addToCart({
      type: "custom",
      quantity: 1,
      unitPrice: price,
      customConfig: { base, items, label, ribbonColor, totalPrice: price },
    });
    toast.success("¡Ancheta custom agregada al carrito! 🎁", { description: formatPrice(price) });
    openCart();
    reset();
  };

  const itemCountById = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.id] = (acc[item.id] ?? 0) + 1;
    return acc;
  }, {});

  const filteredItems = customizerItems.filter((i) => i.category === activeCategory);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Step indicators */}
      <div className="flex gap-2">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              step === s.id
                ? "petal-card petal-card-mint"
                : "bg-surface text-ink/40 hover:bg-bloom/6 border border-bloom/12"
            }`}
          >
            <span className="text-lg">{s.emoji}</span>
            <span className={step === s.id ? "text-ink" : ""}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="h-full overflow-y-auto pr-1"
          >
            {/* Step 0: Base */}
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-ink/55 mb-4">Elige el contenedor para tu regalo</p>
                {customizerBases.map((b) => (
                  <motion.button
                    key={b.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBase(b)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left cursor-pointer ${
                      base.id === b.id
                        ? "petal-card petal-card-mint ring-2 ring-mint/35"
                        : "petal-card"
                    }`}
                  >
                    <span className="text-3xl">{b.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-sm">{b.name}</p>
                      <p className="text-xs text-ink/45">{b.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-bloom-dark">{formatPrice(b.basePrice)}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Step 1: Items */}
            {step === 1 && (
              <div>
                <p className="text-sm text-ink/55 mb-3">Toca para agregar o quitar items</p>

                {/* Category tabs */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {itemCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-bloom text-white shadow-sm shadow-bloom/30"
                          : "bg-surface text-ink/55 hover:bg-bloom/10 border border-bloom/12"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filteredItems.map((item) => {
                    const count = itemCountById[item.id] ?? 0;
                    return (
                      <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.97 }}
                        className={`petal-card p-3 rounded-2xl ${count > 0 ? "ring-2 ring-mint/35 petal-card-mint" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-2xl">{item.emoji}</span>
                          {count > 0 && (
                            <span className="bg-bloom text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {count}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-ink leading-tight mb-1">{item.name}</p>
                        <p className="text-xs text-ink/45 mb-2">{formatPrice(item.price)}</p>
                        <div className="flex gap-1">
                          {count > 0 && (
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Quitar item"
                              className="flex-1 py-1 rounded-xl bg-rose-light text-rose-700 text-xs font-semibold hover:bg-rose/25 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Minus size={11} />
                            </button>
                          )}
                          <button
                            onClick={() => addItem(item)}
                            aria-label="Agregar item"
                            className="flex-1 py-1 rounded-xl bg-bloom/15 text-bloom-dark text-xs font-semibold hover:bg-bloom/25 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Label */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-ink/55">Escribe el mensaje para la tarjeta</p>
                <div className="petal-card petal-card-violet p-5 rounded-2xl text-center">
                  <div className="text-5xl mb-3">💌</div>
                  <p className="text-xs text-ink/40 mb-4">Tu mensaje irá en una tarjeta dentro del regalo</p>
                </div>
                <textarea
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Ej: ¡Feliz cumpleaños! Te quiero mucho 💕"
                  className="petal-input resize-none"
                  rows={4}
                  maxLength={150}
                />
                <div className="flex justify-between text-xs text-ink/40">
                  <span>Gratis · incluido en tu ancheta</span>
                  <span>{label.length}/150</span>
                </div>

                {label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="petal-card petal-card-violet p-4 rounded-2xl"
                  >
                    <p className="text-xs text-ink/45 mb-1">Vista previa:</p>
                    <p className="text-sm text-ink italic">&ldquo;{label}&rdquo;</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Ribbon */}
            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm text-ink/55">Elige el color del lazo</p>
                <div className="grid grid-cols-2 gap-2">
                  {ribbonColors.map((rc) => (
                    <motion.button
                      key={rc.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRibbonColor(rc)}
                      className={`p-4 rounded-2xl flex items-center gap-3 transition-all petal-card cursor-pointer ${
                        ribbonColor.id === rc.id ? "ring-2 ring-offset-1" : ""
                      }`}
                      style={{ outlineColor: rc.color }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ background: rc.color, boxShadow: `inset 0 2px 4px ${rc.color}88, 0 2px 8px ${rc.color}44` }}
                      />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-ink">{rc.name}</p>
                        {rc.price > 0 && <p className="text-xs text-ink/40">+{formatPrice(rc.price)}</p>}
                        {rc.price === 0 && <p className="text-xs text-mint-dark font-medium">Gratis</p>}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="petal-btn petal-btn-secondary py-2.5 px-4 gap-1.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="petal-btn petal-btn-primary flex-1 justify-center gap-1.5 text-sm cursor-pointer"
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="petal-btn petal-btn-primary flex-1 justify-center gap-2 text-sm cursor-pointer"
          >
            <ShoppingBag size={16} />
            Agregar · {formatPrice(price)}
          </button>
        )}
      </div>

      {/* Price breakdown */}
      <div className="petal-card p-3 rounded-2xl">
        <div className="flex justify-between text-xs text-ink/45 mb-1">
          <span>Base: {base.name}</span>
          <span>{formatPrice(base.basePrice)}</span>
        </div>
        {items.length > 0 && (
          <div className="flex justify-between text-xs text-ink/45 mb-1">
            <span>{items.length} items</span>
            <span>+{formatPrice(items.reduce((s, i) => s + i.price, 0))}</span>
          </div>
        )}
        {ribbonColor.price > 0 && (
          <div className="flex justify-between text-xs text-ink/45 mb-1">
            <span>Lazo premium</span>
            <span>+{formatPrice(ribbonColor.price)}</span>
          </div>
        )}
        <div className="border-t border-ink/10 pt-2 flex justify-between font-bold text-ink text-sm">
          <span>Total</span>
          <span>{formatPrice(price)}</span>
        </div>
      </div>

      <button
        onClick={reset}
        className="text-xs text-ink/30 hover:text-ink/55 transition-colors flex items-center gap-1 self-center cursor-pointer"
      >
        <RotateCcw size={12} /> Empezar de nuevo
      </button>
    </div>
  );
}
