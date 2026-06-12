import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para Server Actions / Server Components que necesitan
 * leer o modificar la sesión de Supabase Auth (login, logout, usuario actual).
 *
 * Usa la clave "anon"/"publishable" (segura de exponer) + cookies de Next.js
 * para mantener la sesión del usuario. NO usar para acceso a datos con
 * permisos elevados (para eso está `getSupabaseServerClient` con la
 * service role key).
 */
export async function getSupabaseAuthServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Llamado desde un Server Component (no se pueden setear cookies).
            // El proxy se encarga de refrescar la sesión en ese caso.
          }
        },
      },
    }
  );
}
