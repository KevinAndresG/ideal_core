import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para uso exclusivo en el servidor (Server Actions,
// Server Components, Route Handlers). Usa la Service Role Key, que
// tiene permisos completos y bypassea Row Level Security.
//
// NUNCA importes este archivo desde un componente "use client".

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Faltan las variables de entorno SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY. " +
        "Agrégalas a tu archivo .env.local."
    );
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}
