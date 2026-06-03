export interface CustomizerBase {
  id: string;
  name: string;
  emoji: string;
  description: string;
  basePrice: number;
  color: string;
}

export interface CustomizerItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  positionHint: "bottom" | "middle" | "top" | "side";
}

export interface RibbonColor {
  id: string;
  name: string;
  color: string;
  price: number;
}

export const customizerBases: CustomizerBase[] = [
  { id: "cesta", name: "Cesta de Mimbre", emoji: "🧺", description: "Clásica y elegante", basePrice: 45000, color: "#D4A373" },
  { id: "caja-kraft", name: "Caja Kraft", emoji: "📦", description: "Eco y minimalista", basePrice: 35000, color: "#B5835A" },
  { id: "caja-premium", name: "Caja Premium", emoji: "🎁", description: "Lujo y elegancia", basePrice: 55000, color: "#8FAF7E" },
  { id: "bolsa-tela", name: "Bolsa de Tela", emoji: "👜", description: "Reutilizable y chic", basePrice: 30000, color: "#D4B8E0" },
  { id: "maleta", name: "Maleta de Picnic", emoji: "🧳", description: "Original y funcional", basePrice: 65000, color: "#F5C5A3" },
];

export const customizerItems: CustomizerItem[] = [
  { id: "choco-belga", name: "Chocolates Belgas", emoji: "🍫", category: "Dulces", price: 25000, positionHint: "bottom" },
  { id: "macarons", name: "Macarons", emoji: "🍬", category: "Dulces", price: 18000, positionHint: "middle" },
  { id: "gomitas-gourmet", name: "Gomitas Gourmet", emoji: "🍭", category: "Dulces", price: 12000, positionHint: "side" },
  { id: "galletas-avena", name: "Galletas de Avena", emoji: "🍪", category: "Dulces", price: 15000, positionHint: "bottom" },
  { id: "rosas-rojas", name: "Rosas Rojas", emoji: "🌹", category: "Flores", price: 28000, positionHint: "top" },
  { id: "girasoles", name: "Girasoles", emoji: "🌻", category: "Flores", price: 22000, positionHint: "top" },
  { id: "flores-mix", name: "Mix de Flores", emoji: "💐", category: "Flores", price: 35000, positionHint: "top" },
  { id: "lavanda", name: "Lavanda Seca", emoji: "🪻", category: "Flores", price: 16000, positionHint: "side" },
  { id: "vela-soya", name: "Vela de Soya", emoji: "🕯️", category: "Bienestar", price: 32000, positionHint: "middle" },
  { id: "jabon-artesanal", name: "Jabón Artesanal", emoji: "🧼", category: "Bienestar", price: 18000, positionHint: "side" },
  { id: "crema-corporal", name: "Crema Corporal", emoji: "🧴", category: "Bienestar", price: 24000, positionHint: "middle" },
  { id: "sales-bano", name: "Sales de Baño", emoji: "🛁", category: "Bienestar", price: 20000, positionHint: "bottom" },
  { id: "peluche-oso", name: "Peluche Oso", emoji: "🧸", category: "Especiales", price: 38000, positionHint: "middle" },
  { id: "globo-corazon", name: "Globo Corazón", emoji: "🎈", category: "Especiales", price: 8000, positionHint: "top" },
  { id: "tarjeta-custom", name: "Tarjeta Personalizada", emoji: "💌", category: "Especiales", price: 12000, positionHint: "side" },
  { id: "foto-polaroid", name: "Foto Polaroid", emoji: "📷", category: "Especiales", price: 15000, positionHint: "side" },
  { id: "cafe-premium", name: "Café Premium", emoji: "☕", category: "Bebidas", price: 28000, positionHint: "bottom" },
  { id: "te-herbal", name: "Té Herbal Mix", emoji: "🍵", category: "Bebidas", price: 22000, positionHint: "bottom" },
  { id: "vino-mini", name: "Mini Vino", emoji: "🍷", category: "Bebidas", price: 35000, positionHint: "middle" },
  { id: "jugo-natural", name: "Jugo Natural", emoji: "🧃", category: "Bebidas", price: 12000, positionHint: "bottom" },
  { id: "miel-artesanal", name: "Miel Artesanal", emoji: "🍯", category: "Gourmet", price: 25000, positionHint: "bottom" },
  { id: "mermelada", name: "Mermelada Casera", emoji: "🫙", category: "Gourmet", price: 20000, positionHint: "bottom" },
  { id: "nueces-mix", name: "Mix de Nueces", emoji: "🥜", category: "Gourmet", price: 18000, positionHint: "side" },
  { id: "queso-brie", name: "Queso Mini Brie", emoji: "🧀", category: "Gourmet", price: 22000, positionHint: "side" },
];

export const ribbonColors: RibbonColor[] = [
  { id: "rosa", name: "Rosa Pastel", color: "#F0B8C8", price: 0 },
  { id: "verde", name: "Verde Sage", color: "#8FAF7E", price: 0 },
  { id: "lavanda", name: "Lavanda", color: "#D4B8E0", price: 0 },
  { id: "celeste", name: "Celeste", color: "#B8D4E0", price: 0 },
  { id: "dorado", name: "Dorado Premium", color: "#D4AF37", price: 5000 },
  { id: "rojo", name: "Rojo Pasión", color: "#E07070", price: 0 },
  { id: "crema", name: "Crema Natural", color: "#F9F0E1", price: 0 },
  { id: "negro", name: "Negro Elegante", color: "#2D2D2D", price: 5000 },
];

export const itemCategories = [...new Set(customizerItems.map((i) => i.category))];
