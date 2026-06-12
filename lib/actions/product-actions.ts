"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  isSlugTaken,
  updateProduct,
} from "@/lib/server/products";
import type { Category, Product } from "@/lib/data/products";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";

export interface ProductFormState {
  error?: string;
}

const VALID_CATEGORIES: Category[] = ["bouquets", "anchetas"];

function parseProductForm(formData: FormData): Omit<Product, "id"> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const originalPriceRaw = String(formData.get("originalPrice") ?? "").trim();
  const category = String(formData.get("category") ?? "") as Category;
  const tagsRaw = String(formData.get("tags") ?? "");
  const imagesRaw = String(formData.get("images") ?? "");
  const customizable = formData.get("customizable") === "on";
  const featured = formData.get("featured") === "on";
  const ratingRaw = String(formData.get("rating") ?? "5");
  const reviewsRaw = String(formData.get("reviews") ?? "0");

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const images = imagesRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const data: Omit<Product, "id"> = {
    slug,
    name,
    description,
    price,
    category,
    tags,
    customizable,
    featured,
    images,
    rating: Number(ratingRaw),
    reviews: Number(reviewsRaw),
  };

  if (originalPriceRaw) {
    data.originalPrice = Number(originalPriceRaw);
  }

  return data;
}

function validateProduct(data: Omit<Product, "id">): string | null {
  if (!data.slug) return "El slug es obligatorio.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    return "El slug solo puede contener minúsculas, números y guiones (ej: bouquet-rosas-rojas).";
  }
  if (!data.name) return "El nombre es obligatorio.";
  if (!data.description) return "La descripción es obligatoria.";
  if (!VALID_CATEGORIES.includes(data.category)) {
    return "Selecciona una categoría válida.";
  }
  if (Number.isNaN(data.price) || data.price <= 0) {
    return "El precio debe ser un número positivo.";
  }
  if (
    data.originalPrice !== undefined &&
    (Number.isNaN(data.originalPrice) || data.originalPrice <= 0)
  ) {
    return "El precio original debe ser un número positivo.";
  }
  if (data.images.length === 0) return "Agrega al menos una imagen (ruta separada por comas).";
  if (Number.isNaN(data.rating) || data.rating < 0 || data.rating > 5) {
    return "La calificación debe ser un número entre 0 y 5.";
  }
  if (Number.isNaN(data.reviews) || data.reviews < 0) {
    return "El número de reseñas debe ser un número positivo.";
  }
  return null;
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const data = parseProductForm(formData);
  const error = validateProduct(data);
  if (error) return { error };

  if (await isSlugTaken(data.slug)) {
    return { error: "Ya existe un producto con ese slug." };
  }

  await createProduct(data);

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`${ADMIN_BASE_PATH}/productos`);
  redirect(`${ADMIN_BASE_PATH}/productos`);
}

export async function updateProductAction(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const data = parseProductForm(formData);
  const error = validateProduct(data);
  if (error) return { error };

  if (await isSlugTaken(data.slug, id)) {
    return { error: "Ya existe otro producto con ese slug." };
  }

  const updated = await updateProduct(id, data);
  if (!updated) return { error: "Producto no encontrado." };

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath(`${ADMIN_BASE_PATH}/productos`);
  redirect(`${ADMIN_BASE_PATH}/productos`);
}

export async function deleteProductAction(id: string): Promise<void> {
  await deleteProduct(id);

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`${ADMIN_BASE_PATH}/productos`);
}
