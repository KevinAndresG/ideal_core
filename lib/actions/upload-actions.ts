"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "product-images";
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface UploadImageResult {
  url?: string;
  error?: string;
}

export async function uploadProductImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "No se recibió ningún archivo." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "El archivo debe ser una imagen." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { error: "La imagen no debe superar 5MB." };
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeBase =
    file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "imagen";
  const filename = `${safeBase}-${Date.now()}.${ext}`;

  const supabase = getSupabaseServerClient();
  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, arrayBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return {
      error: `No se pudo subir la imagen: ${uploadError.message}. Verifica que el bucket "${BUCKET}" exista y sea público en Supabase.`,
    };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  return { url: data.publicUrl };
}
