"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, MapPin, User, CreditCard, Package } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

const steps = [
  { id: 0, label: "Destinatario", icon: User },
  { id: 1, label: "Envío",        icon: MapPin },
  { id: 2, label: "Mensaje",      icon: Package },
  { id: 3, label: "Pago",         icon: CreditCard },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [done, setDone]  = useState(false);
  const { items, total, clearCart } = useCartStore();
  const cartTotal = total();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", department: "", date: "",
    message: "",
    card: "", expiry: "", cvv: "", cardName: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFinish = () => {
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8 }}
            className="text-8xl mb-6 inline-block"
          >
            🎉
          </motion.div>
          <div className="petal-card petal-card-mint p-8 rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-bloom flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mb-3">¡Pedido Confirmado!</h1>
            <p className="text-ink/55 mb-2">
              Gracias {form.name.split(" ")[0] || "por tu compra"}. Tu regalo está en camino 💕
            </p>
            <p className="text-ink/40 text-sm mb-6">
              Recibirás un correo de confirmación en {form.email || "tu correo"}
            </p>
            <div className="petal-card p-4 rounded-2xl mb-6 text-sm">
              <div className="flex justify-between text-ink/55 mb-1">
                <span>Número de pedido</span>
                <span className="font-bold text-ink">#CORE{Math.floor(Math.random() * 9000) + 1000}</span>
              </div>
              <div className="flex justify-between text-ink/55">
                <span>Total pagado</span>
                <span className="font-bold text-ink">{formatPrice(cartTotal || 150000)}</span>
              </div>
            </div>
            <Link href="/" className="petal-btn petal-btn-primary w-full justify-center block text-center">
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/cart">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-ink/45 hover:text-ink text-sm mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Volver al Carrito
          </motion.span>
        </Link>

        <h1 className="font-serif text-4xl font-bold text-ink mb-8">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex gap-2 mb-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                        i <= step
                          ? "bg-bloom text-white shadow-md shadow-bloom/35"
                          : "bg-surface text-ink/30 border border-bloom/12"
                      }`}
                    >
                      {i < step ? <Check size={16} /> : <Icon size={16} />}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        i <= step ? "text-ink" : "text-ink/30"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="petal-card p-6 rounded-3xl"
              >
                {/* Step 0 */}
                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl font-bold text-ink mb-6">Datos del Destinatario</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">Nombre completo *</label>
                        <input value={form.name} onChange={update("name")} placeholder="Ana García" className="petal-input" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">Email *</label>
                        <input type="email" value={form.email} onChange={update("email")} placeholder="ana@email.com" className="petal-input" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-semibold text-ink block mb-2">Teléfono</label>
                        <input value={form.phone} onChange={update("phone")} placeholder="+57 300 123 4567" className="petal-input" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl font-bold text-ink mb-6">Dirección de Envío</h2>
                    <div>
                      <label className="text-sm font-semibold text-ink block mb-2">Dirección completa *</label>
                      <input value={form.address} onChange={update("address")} placeholder="Calle 80 # 12-34, Apto 501" className="petal-input" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">Ciudad *</label>
                        <input value={form.city} onChange={update("city")} placeholder="Bogotá" className="petal-input" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">Departamento</label>
                        <input value={form.department} onChange={update("department")} placeholder="Cundinamarca" className="petal-input" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-semibold text-ink block mb-2">Fecha deseada de entrega</label>
                        <input type="date" value={form.date} onChange={update("date")} className="petal-input" />
                      </div>
                    </div>
                    <div className="petal-card petal-card-peach p-4 rounded-2xl">
                      <p className="text-sm font-semibold text-ink mb-1">🚀 Envíos disponibles</p>
                      <p className="text-xs text-ink/55">Estándar (2-4 días) · Express (24h) · Domicilio el mismo día en Bogotá</p>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl font-bold text-ink mb-6">Mensaje Especial</h2>
                    <div className="petal-card petal-card-violet p-5 rounded-2xl text-center">
                      <div className="text-5xl mb-2">💌</div>
                      <p className="text-sm text-ink/55">Este mensaje irá impreso en una tarjeta especial</p>
                    </div>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Ej: ¡Feliz cumpleaños! Que este día esté lleno de amor y alegría 🎂"
                      className="petal-input resize-none"
                      rows={5}
                      maxLength={200}
                    />
                    <p className="text-xs text-ink/35 text-right">{form.message.length}/200</p>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl font-bold text-ink mb-6">Información de Pago</h2>
                    <div>
                      <label className="text-sm font-semibold text-ink block mb-2">Nombre en la tarjeta *</label>
                      <input value={form.cardName} onChange={update("cardName")} placeholder="ANA GARCIA" className="petal-input" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-ink block mb-2">Número de tarjeta *</label>
                      <input value={form.card} onChange={update("card")} placeholder="1234 5678 9012 3456" maxLength={19} className="petal-input font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">Expiración</label>
                        <input value={form.expiry} onChange={update("expiry")} placeholder="MM/AA" maxLength={5} className="petal-input font-mono" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-ink block mb-2">CVV</label>
                        <input value={form.cvv} onChange={update("cvv")} placeholder="123" maxLength={4} className="petal-input font-mono" type="password" />
                      </div>
                    </div>
                    <div className="petal-card petal-card-mint p-4 rounded-2xl flex items-center gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <p className="text-xs font-semibold text-ink">Pago 100% seguro</p>
                        <p className="text-xs text-ink/45">Tus datos están protegidos con encriptación SSL</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-5">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="petal-btn petal-btn-secondary py-3 px-6 gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} /> Anterior
                </button>
              )}

              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="petal-btn petal-btn-primary flex-1 justify-center gap-2 cursor-pointer"
                >
                  Continuar <ArrowRight size={16} />
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinish}
                  className="petal-btn petal-btn-primary flex-1 justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  Confirmar Pedido · {formatPrice(cartTotal || 150000)}
                </motion.button>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="petal-card p-5 rounded-3xl sticky top-28">
              <h3 className="font-serif text-xl font-bold text-ink mb-4">Tu Pedido</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-bloom/10 flex items-center justify-center text-xl flex-shrink-0">
                      {item.type === "custom" ? "🎁" : "✨"}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-ink text-xs truncate">
                        {item.type === "custom" ? `Ancheta: ${item.customConfig?.base.name}` : item.product?.name}
                      </p>
                      <p className="text-ink/35 text-xs">x{item.quantity}</p>
                    </div>
                    <span className="font-semibold text-xs">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-ink/30 text-xs text-center py-4">Carrito vacío</p>
                )}
              </div>
              <div className="border-t border-bloom/12 pt-3">
                <div className="flex justify-between font-bold text-ink">
                  <span>Total</span>
                  <span className="font-serif text-xl">{formatPrice(cartTotal || 150000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
