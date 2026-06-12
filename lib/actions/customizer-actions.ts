"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createCustomizerItem,
  deleteCustomizerItem,
  isCustomizerItemIdTaken,
  updateCustomizerItem,
} from "@/lib/server/customizer-items";
import {
  createCustomizerBase,
  deleteCustomizerBase,
  isCustomizerBaseIdTaken,
  updateCustomizerBase,
} from "@/lib/server/customizer-bases";
import {
  createCustomizerRibbon,
  deleteCustomizerRibbon,
  isCustomizerRibbonIdTaken,
  updateCustomizerRibbon,
} from "@/lib/server/customizer-ribbons";
import type { CustomizerBase, CustomizerItem, RibbonColor } from "@/lib/data/customizer-items";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

function revalidateCustomizer() {
  revalidatePath("/customize");
  revalidatePath("/api/customizer-config");
  revalidatePath(`${ADMIN_BASE_PATH}/personalizador`);
  revalidatePath(`${ADMIN_BASE_PATH}/personalizador/bases`);
  revalidatePath(`${ADMIN_BASE_PATH}/personalizador/lazos`);
}

// ============================================================
// Items
// ============================================================

export interface CustomizerItemFormState {
  error?: string;
}

const POSITION_HINTS: CustomizerItem["positionHint"][] = ["top", "middle", "bottom", "side"];

function parseCustomizerItemForm(formData: FormData): CustomizerItem {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price"));
  const positionHint = String(
    formData.get("positionHint") ?? "middle"
  ) as CustomizerItem["positionHint"];

  return { id, name, emoji, category, price, positionHint };
}

function validateCustomizerItem(data: CustomizerItem): string | null {
  if (!data.id) return "El identificador es obligatorio.";
  if (!SLUG_REGEX.test(data.id)) {
    return "El identificador solo puede contener minúsculas, números y guiones (ej: choco-belga).";
  }
  if (!data.name) return "El nombre es obligatorio.";
  if (!data.emoji) return "El emoji es obligatorio.";
  if (!data.category) return "La categoría es obligatoria.";
  if (Number.isNaN(data.price) || data.price < 0) {
    return "El precio debe ser un número positivo.";
  }
  if (!POSITION_HINTS.includes(data.positionHint)) {
    return "Selecciona una posición válida.";
  }
  return null;
}

export async function createCustomizerItemAction(
  _prevState: CustomizerItemFormState,
  formData: FormData
): Promise<CustomizerItemFormState> {
  const data = parseCustomizerItemForm(formData);
  const error = validateCustomizerItem(data);
  if (error) return { error };

  if (await isCustomizerItemIdTaken(data.id)) {
    return { error: "Ya existe un ítem con ese identificador." };
  }

  await createCustomizerItem(data);

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador`);
}

export async function updateCustomizerItemAction(
  originalId: string,
  _prevState: CustomizerItemFormState,
  formData: FormData
): Promise<CustomizerItemFormState> {
  const data = parseCustomizerItemForm(formData);
  const error = validateCustomizerItem(data);
  if (error) return { error };

  if (await isCustomizerItemIdTaken(data.id, originalId)) {
    return { error: "Ya existe otro ítem con ese identificador." };
  }

  const updated = await updateCustomizerItem(originalId, data);
  if (!updated) return { error: "Ítem no encontrado." };

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador`);
}

export async function deleteCustomizerItemAction(id: string): Promise<void> {
  await deleteCustomizerItem(id);
  revalidateCustomizer();
}

// ============================================================
// Bases
// ============================================================

export interface CustomizerBaseFormState {
  error?: string;
}

function parseCustomizerBaseForm(formData: FormData): CustomizerBase {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const basePrice = Number(formData.get("basePrice"));
  const color = String(formData.get("color") ?? "").trim();

  return { id, name, emoji, description, basePrice, color };
}

function validateCustomizerBase(data: CustomizerBase): string | null {
  if (!data.id) return "El identificador es obligatorio.";
  if (!SLUG_REGEX.test(data.id)) {
    return "El identificador solo puede contener minúsculas, números y guiones (ej: caja-kraft).";
  }
  if (!data.name) return "El nombre es obligatorio.";
  if (!data.emoji) return "El emoji es obligatorio.";
  if (!data.description) return "La descripción es obligatoria.";
  if (Number.isNaN(data.basePrice) || data.basePrice < 0) {
    return "El precio base debe ser un número positivo.";
  }
  if (!HEX_COLOR_REGEX.test(data.color)) {
    return "El color debe ser un código hexadecimal válido (ej: #D4A373).";
  }
  return null;
}

export async function createCustomizerBaseAction(
  _prevState: CustomizerBaseFormState,
  formData: FormData
): Promise<CustomizerBaseFormState> {
  const data = parseCustomizerBaseForm(formData);
  const error = validateCustomizerBase(data);
  if (error) return { error };

  if (await isCustomizerBaseIdTaken(data.id)) {
    return { error: "Ya existe una base con ese identificador." };
  }

  await createCustomizerBase(data);

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador/bases`);
}

export async function updateCustomizerBaseAction(
  originalId: string,
  _prevState: CustomizerBaseFormState,
  formData: FormData
): Promise<CustomizerBaseFormState> {
  const data = parseCustomizerBaseForm(formData);
  const error = validateCustomizerBase(data);
  if (error) return { error };

  if (await isCustomizerBaseIdTaken(data.id, originalId)) {
    return { error: "Ya existe otra base con ese identificador." };
  }

  const updated = await updateCustomizerBase(originalId, data);
  if (!updated) return { error: "Base no encontrada." };

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador/bases`);
}

export async function deleteCustomizerBaseAction(id: string): Promise<void> {
  await deleteCustomizerBase(id);
  revalidateCustomizer();
}

// ============================================================
// Lazos (ribbons)
// ============================================================

export interface CustomizerRibbonFormState {
  error?: string;
}

function parseCustomizerRibbonForm(formData: FormData): RibbonColor {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const price = Number(formData.get("price"));

  return { id, name, color, price };
}

function validateCustomizerRibbon(data: RibbonColor): string | null {
  if (!data.id) return "El identificador es obligatorio.";
  if (!SLUG_REGEX.test(data.id)) {
    return "El identificador solo puede contener minúsculas, números y guiones (ej: dorado).";
  }
  if (!data.name) return "El nombre es obligatorio.";
  if (!HEX_COLOR_REGEX.test(data.color)) {
    return "El color debe ser un código hexadecimal válido (ej: #D4AF37).";
  }
  if (Number.isNaN(data.price) || data.price < 0) {
    return "El precio adicional debe ser un número positivo (0 si es gratis).";
  }
  return null;
}

export async function createCustomizerRibbonAction(
  _prevState: CustomizerRibbonFormState,
  formData: FormData
): Promise<CustomizerRibbonFormState> {
  const data = parseCustomizerRibbonForm(formData);
  const error = validateCustomizerRibbon(data);
  if (error) return { error };

  if (await isCustomizerRibbonIdTaken(data.id)) {
    return { error: "Ya existe un lazo con ese identificador." };
  }

  await createCustomizerRibbon(data);

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador/lazos`);
}

export async function updateCustomizerRibbonAction(
  originalId: string,
  _prevState: CustomizerRibbonFormState,
  formData: FormData
): Promise<CustomizerRibbonFormState> {
  const data = parseCustomizerRibbonForm(formData);
  const error = validateCustomizerRibbon(data);
  if (error) return { error };

  if (await isCustomizerRibbonIdTaken(data.id, originalId)) {
    return { error: "Ya existe otro lazo con ese identificador." };
  }

  const updated = await updateCustomizerRibbon(originalId, data);
  if (!updated) return { error: "Lazo no encontrado." };

  revalidateCustomizer();
  redirect(`${ADMIN_BASE_PATH}/personalizador/lazos`);
}

export async function deleteCustomizerRibbonAction(id: string): Promise<void> {
  await deleteCustomizerRibbon(id);
  revalidateCustomizer();
}
