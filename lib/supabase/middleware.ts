import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Crea un cliente de Supabase para el proxy/middleware (Edge runtime) y
 * sincroniza las cookies de sesión entre el request y la respuesta.
 *
 * Devuelve la respuesta (con las cookies refrescadas) y el usuario
 * autenticado, si existe.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: no eliminar. getUser() revalida el token contra Supabase Auth.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
