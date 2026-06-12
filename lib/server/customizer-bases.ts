import type { CustomizerBase } from "@/lib/data/customizer-items";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Forma de una fila de la tabla `customizer_bases` en Supabase (snake_case).
interface CustomizerBaseRow {
  id: string;
  name: string;
  emoji: string;
  description: string;
  base_price: number;
  color: string;
  sort_order: number;
}

function rowToBase(row: CustomizerBaseRow): CustomizerBase {
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji,
    description: row.description,
    basePrice: Number(row.base_price),
    color: row.color,
  };
}

function baseToRow(input: CustomizerBase, sortOrder?: number): Omit<CustomizerBaseRow, "sort_order"> & { sort_order?: number } {
  const row: Omit<CustomizerBaseRow, "sort_order"> & { sort_order?: number } = {
    id: input.id,
    name: input.name,
    emoji: input.emoji,
    description: input.description,
    base_price: input.basePrice,
    color: input.color,
  };
  if (sortOrder !== undefined) row.sort_order = sortOrder;
  return row;
}

export async function getAllCustomizerBases(): Promise<CustomizerBase[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_bases")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`No se pudieron obtener las bases: ${error.message}`);
  return ((data ?? []) as CustomizerBaseRow[]).map(rowToBase);
}

export async function getCustomizerBaseById(id: string): Promise<CustomizerBase | undefined> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_bases")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`No se pudo obtener la base: ${error.message}`);
  return data ? rowToBase(data as CustomizerBaseRow) : undefined;
}

export async function isCustomizerBaseIdTaken(id: string, excludeId?: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("customizer_bases").select("id").eq("id", id);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data, error } = await query;
  if (error) throw new Error(`No se pudo verificar el id: ${error.message}`);
  return (data ?? []).length > 0;
}

export async function createCustomizerBase(input: CustomizerBase): Promise<CustomizerBase> {
  const supabase = getSupabaseServerClient();

  // Nuevas bases van al final del orden visual.
  const { count } = await supabase
    .from("customizer_bases")
    .select("id", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("customizer_bases")
    // @ts-expect-error: table not in generated Supabase types
    .insert(baseToRow(input, count ?? 0))
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo crear la base: ${error.message}`);
  return rowToBase(data as CustomizerBaseRow);
}

export async function updateCustomizerBase(
  id: string,
  input: CustomizerBase
): Promise<CustomizerBase | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_bases")
    // @ts-expect-error: table not in generated Supabase types
    .update(baseToRow(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`No se pudo actualizar la base: ${error.message}`);
  return data ? rowToBase(data as CustomizerBaseRow) : null;
}

export async function deleteCustomizerBase(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_bases")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(`No se pudo eliminar la base: ${error.message}`);
  return (data ?? []).length > 0;
}
