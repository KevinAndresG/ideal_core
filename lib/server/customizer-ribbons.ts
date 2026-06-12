import type { RibbonColor } from "@/lib/data/customizer-items";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Forma de una fila de la tabla `customizer_ribbons` en Supabase (snake_case).
interface CustomizerRibbonRow {
  id: string;
  name: string;
  color: string;
  price: number;
  sort_order: number;
}

function rowToRibbon(row: CustomizerRibbonRow): RibbonColor {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    price: Number(row.price),
  };
}

function ribbonToRow(input: RibbonColor, sortOrder?: number): Omit<CustomizerRibbonRow, "sort_order"> & { sort_order?: number } {
  const row: Omit<CustomizerRibbonRow, "sort_order"> & { sort_order?: number } = {
    id: input.id,
    name: input.name,
    color: input.color,
    price: input.price,
  };
  if (sortOrder !== undefined) row.sort_order = sortOrder;
  return row;
}

export async function getAllCustomizerRibbons(): Promise<RibbonColor[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_ribbons")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`No se pudieron obtener los lazos: ${error.message}`);
  return ((data ?? []) as CustomizerRibbonRow[]).map(rowToRibbon);
}

export async function getCustomizerRibbonById(id: string): Promise<RibbonColor | undefined> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_ribbons")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`No se pudo obtener el lazo: ${error.message}`);
  return data ? rowToRibbon(data as CustomizerRibbonRow) : undefined;
}

export async function isCustomizerRibbonIdTaken(id: string, excludeId?: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("customizer_ribbons").select("id").eq("id", id);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data, error } = await query;
  if (error) throw new Error(`No se pudo verificar el id: ${error.message}`);
  return (data ?? []).length > 0;
}

export async function createCustomizerRibbon(input: RibbonColor): Promise<RibbonColor> {
  const supabase = getSupabaseServerClient();

  // Nuevos lazos van al final del orden visual.
  const { count } = await supabase
    .from("customizer_ribbons")
    .select("id", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("customizer_ribbons")
    // @ts-expect-error: table not in generated Supabase types
    .insert(ribbonToRow(input, count ?? 0))
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo crear el lazo: ${error.message}`);
  return rowToRibbon(data as CustomizerRibbonRow);
}

export async function updateCustomizerRibbon(
  id: string,
  input: RibbonColor
): Promise<RibbonColor | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_ribbons")
    // @ts-expect-error: table not in generated Supabase types
    .update(ribbonToRow(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`No se pudo actualizar el lazo: ${error.message}`);
  return data ? rowToRibbon(data as CustomizerRibbonRow) : null;
}

export async function deleteCustomizerRibbon(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_ribbons")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(`No se pudo eliminar el lazo: ${error.message}`);
  return (data ?? []).length > 0;
}
