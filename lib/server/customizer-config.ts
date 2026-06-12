import type { CustomizerConfig } from "@/lib/data/customizer-items";
import { getAllCustomizerBases } from "@/lib/server/customizer-bases";
import { getAllCustomizerItems } from "@/lib/server/customizer-items";
import { getAllCustomizerRibbons } from "@/lib/server/customizer-ribbons";

/**
 * Obtiene toda la configuración del personalizador (bases, items y lazos)
 * desde Supabase, lista para hidratar la UI del personalizador.
 */
export async function getCustomizerConfig(): Promise<CustomizerConfig> {
  const [bases, items, ribbonColors] = await Promise.all([
    getAllCustomizerBases(),
    getAllCustomizerItems(),
    getAllCustomizerRibbons(),
  ]);

  const itemCategories = [...new Set(items.map((item) => item.category))];

  return { bases, items, ribbonColors, itemCategories };
}
