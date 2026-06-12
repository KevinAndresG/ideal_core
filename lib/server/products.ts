import type { Product } from "@/lib/data/products";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Forma de una fila de la tabla `products` en Supabase (snake_case).
interface ProductRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  tags: string[] | null;
  customizable: boolean;
  featured: boolean;
  images: string[] | null;
  colors: string[] | null;
  rating: number;
  reviews: number;
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    originalPrice: row.original_price !== null ? Number(row.original_price) : undefined,
    category: row.category as Product["category"],
    tags: row.tags ?? [],
    customizable: row.customizable,
    featured: row.featured,
    images: row.images ?? [],
    colors: row.colors ?? undefined,
    rating: Number(row.rating),
    reviews: row.reviews,
  };
}

function productToRow(input: Omit<Product, "id">): Omit<ProductRow, "id"> {
  return {
    slug: input.slug,
    name: input.name,
    description: input.description,
    price: input.price,
    original_price: input.originalPrice ?? null,
    category: input.category,
    tags: input.tags,
    customizable: input.customizable,
    featured: input.featured,
    images: input.images,
    colors: input.colors ?? null,
    rating: input.rating,
    reviews: input.reviews,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(`No se pudieron obtener los productos: ${error.message}`);
  return ((data ?? []) as ProductRow[]).map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`No se pudo obtener el producto: ${error.message}`);
  return data ? rowToProduct(data as ProductRow) : undefined;
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("products").select("id").eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data, error } = await query;
  if (error) throw new Error(`No se pudo verificar el slug: ${error.message}`);
  return (data ?? []).length > 0;
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  const supabase = getSupabaseServerClient();

  const { data: existing, error: idError } = await supabase.from("products").select("id");
  if (idError) throw new Error(`No se pudo calcular el nuevo id: ${idError.message}`);
  const nextId = String(
    (existing ?? []).reduce((max, row) => Math.max(max, Number((row as {id: string}).id) || 0), 0) + 1
  );

  const { data, error } = await supabase
    .from("products")
    // @ts-expect-error: table not in generated Supabase types
    .insert({ id: nextId, ...productToRow(input) })
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo crear el producto: ${error.message}`);
  return rowToProduct(data as ProductRow);
}

export async function updateProduct(
  id: string,
  input: Omit<Product, "id">
): Promise<Product | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    // @ts-expect-error: table not in generated Supabase types
    .update(productToRow(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`No se pudo actualizar el producto: ${error.message}`);
  return data ? rowToProduct(data as ProductRow) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("products").delete().eq("id", id).select("id");
  if (error) throw new Error(`No se pudo eliminar el producto: ${error.message}`);
  return (data ?? []).length > 0;
}
