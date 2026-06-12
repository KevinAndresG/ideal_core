// Tipos del personalizador de anchetas.
//
// Toda la data (bases, items y lazos) vive en Supabase
// (tablas customizer_bases, customizer_items, customizer_ribbons).
// Este archivo ya NO contiene datos quemados: solo tipos compartidos
// y un helper para obtener la configuración desde el cliente.

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

export interface CustomizerConfig {
  bases: CustomizerBase[];
  items: CustomizerItem[];
  ribbonColors: RibbonColor[];
  itemCategories: string[];
}

/**
 * Obtiene la configuración completa del personalizador (bases, items y
 * lazos) desde el endpoint público respaldado por Supabase.
 * Pensado para usarse en componentes "use client".
 */
export async function fetchCustomizerConfig(): Promise<CustomizerConfig> {
  const res = await fetch("/api/customizer-config");
  if (!res.ok) {
    throw new Error("No se pudo cargar la configuración del personalizador.");
  }
  return res.json() as Promise<CustomizerConfig>;
}
