import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CartItem } from "@/lib/store/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const WHATSAPP_NUMBER = "573245655193";

export function buildWhatsappOrderUrl(items: CartItem[], total: number): string {
  const lines = items.map((it, i) => {
    const name =
      it.type === "custom"
        ? `Ancheta Custom: ${it.customConfig?.base.name ?? ""}`
        : it.product?.name ?? "Producto";
    const subtotal = it.unitPrice * it.quantity;
    const extra = it.customText ? `\n   ✍️ Mensaje: "${it.customText}"` : "";
    return `${i + 1}. ${name} (x${it.quantity}) — ${formatPrice(subtotal)}${extra}`;
  });

  const text =
    `🎁 ¡Hola CORE! Quiero hacer este pedido:\n\n` +
    `${lines.join("\n")}\n\n` +
    `*Total:* ${formatPrice(total)}\n\n` +
    `¿Me confirman disponibilidad y datos de envío? ¡Gracias!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
