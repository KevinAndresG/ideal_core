"use server";

import { redirect } from "next/navigation";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { getSupabaseAuthServerClient } from "@/lib/supabase/auth-server";

export interface LoginState {
  error?: string;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const supabase = await getSupabaseAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect(ADMIN_BASE_PATH);
}

export async function logout(): Promise<void> {
  const supabase = await getSupabaseAuthServerClient();
  await supabase.auth.signOut();
  redirect(`${ADMIN_BASE_PATH}/login`);
}
