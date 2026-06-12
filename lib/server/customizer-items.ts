import type { CustomizerItem } from "@/lib/data/customizer-items";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Forma de una fila de la tabla `customizer_items` en Supabase (snake_case).
interface CustomizerItemRow {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  position_hint: "bottom" | "middle" | "top" | "side";
}

function rowToItem(row: CustomizerItemRow): CustomizerItem {
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji,
    category: row.category,
    price: Number(row.price),
    positionHint: row.position_hint,
  };
}

function itemToRow(input: CustomizerItem): CustomizerItemRow {
  return {
    id: input.id,
    name: input.name,
    emoji: input.emoji,
    category: input.category,
    price: input.price,
    position_hint: input.positionHint,
  };
}

export async function getAllCustomizerItems(): Promise<CustomizerItem[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("customizer_items").select("*");
  if (error) throw new Error(`No se pudieron obtener los items: ${error.message}`);
  return ((data ?? []) as CustomizerItemRow[]).map(rowToItem);
}

export async function getCustomizerItemById(id: string): Promise<CustomizerItem | undefined> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`No se pudo obtener el item: ${error.message}`);
  return data ? rowToItem(data as CustomizerItemRow) : undefined;
}

export async function isCustomizerItemIdTaken(id: string, excludeId?: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("customizer_items").select("id").eq("id", id);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data, error } = await query;
  if (error) throw new Error(`No se pudo verificar el id: ${error.message}`);
  return (data ?? []).length > 0;
}

export async function createCustomizerItem(input: CustomizerItem): Promise<CustomizerItem> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_items")
    // @ts-expect-error: table not in generated Supabase types
    .insert(itemToRow(input))
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo crear el item: ${error.message}`);
  return rowToItem(data as CustomizerItemRow);
}

export async function updateCustomizerItem(
  id: string,
  input: CustomizerItem
): Promise<CustomizerItem | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_items")
    // @ts-expect-error: table not in generated Supabase types
    .update(itemToRow(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`No se pudo actualizar el item: ${error.message}`);
  return data ? rowToItem(data as CustomizerItemRow) : null;
}

export async function deleteCustomizerItem(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("customizer_items")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(`No se pudo eliminar el item: ${error.message}`);
  return (data ?? []).length > 0;
}
