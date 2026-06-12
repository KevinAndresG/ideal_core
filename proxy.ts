import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Protege todas las rutas bajo ADMIN_BASE_PATH usando Supabase Auth.
 * - Si no hay sesión válida y no es la página de login -> redirige a login.
 * - Si hay sesión válida y es la página de login -> redirige al dashboard.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_BASE_PATH)) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);

  const loginPath = `${ADMIN_BASE_PATH}/login`;
  const isLoginPage = pathname === loginPath;

  if (isLoginPage) {
    if (user) {
      return NextResponse.redirect(new URL(ADMIN_BASE_PATH, request.url));
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
