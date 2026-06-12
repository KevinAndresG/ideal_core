"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase/auth-server";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "product-images";
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

async function requireAdminSession(): Promise<{ error?: string }> {
  const authClient = await getSupabaseAuthServerClient();
  const {
    data: { session },
  } = await authClient.auth.getSession();
  if (!session) return { error: "No autorizado." };
  return {};
}

export interface SignedUploadResult {
  signedUrl?: string;
  path?: string;
  error?: string;
}

export async function getSignedUploadUrl(): Promise<SignedUploadResult> {
  const auth = await requireAdminSession();
  if (auth.error) return { error: auth.error };

  // Server-generated path — client never controls the path or extension
  const path = `img-${crypto.randomUUID()}`;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error) return { error: `No se pudo preparar la subida: ${error.message}` };

  return { signedUrl: data.signedUrl, path };
}

export interface VerifyUploadResult {
  publicUrl?: string;
  error?: string;
}

export async function verifyUpload(path: string): Promise<VerifyUploadResult> {
  const auth = await requireAdminSession();
  if (auth.error) return { error: auth.error };

  if (!path || !/^img-[0-9a-f-]{36}$/.test(path)) {
    return { error: "Path inválido." };
  }

  const supabase = getSupabaseServerClient();

  // Read actual metadata from storage — not trusting any client-provided values
  const { data: files, error: listError } = await supabase.storage.from(BUCKET).list("", {
    search: path,
  });

  if (listError || !files?.length) {
    return { error: "No se encontró el archivo subido." };
  }

  const file = files.find((f) => f.name === path);
  if (!file) return { error: "No se encontró el archivo subido." };

  const mime = file.metadata?.mimetype as string | undefined;
  const size = file.metadata?.size as number | undefined;

  if (!mime || !ALLOWED_MIME_TYPES.has(mime)) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { error: "Tipo de archivo no permitido. Solo JPEG, PNG, WebP, GIF." };
  }

  if (typeof size === "number" && size > MAX_SIZE_BYTES) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { error: "La imagen supera 5MB." };
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { publicUrl: urlData.publicUrl };
}
