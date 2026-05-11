/**
 * Next 16 Proxy (antes "middleware"). Renombrado en v16.0.0; función
 * exportada es proxy(), no middleware().
 *
 * Único trabajo: refrescar la sesión Supabase en cada request relevante.
 * Sin redirects globales: CCSE es público y cada página gestiona su
 * propio gating.
 */

import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Excluimos estáticos, optimización de imágenes y assets. Todo lo
     * demás pasa por el proxy para mantener viva la cookie de sesión.
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
