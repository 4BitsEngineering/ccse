/**
 * Supabase session refresher para el Next 16 Proxy.
 *
 * Llamado desde src/proxy.ts en cada request. Refresca el JWT si está
 * caducado y reescribe las cookies, manteniendo viva la sesión del
 * usuario. No bloquea rutas ni redirige — CCSE es mayormente público y
 * cada página decide su propio gating.
 *
 * Regla crítica del SDK: no insertar código entre createServerClient()
 * y supabase.auth.getUser(). Cualquier lógica antes de getUser puede
 * desincronizar la cookie y dejar al usuario randomly desconectado.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // No tocar nada entre el createServerClient de arriba y este getUser.
  await supabase.auth.getUser();

  return supabaseResponse;
}
