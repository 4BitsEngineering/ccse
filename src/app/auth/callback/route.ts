/**
 * Auth callback: Supabase manda al usuario aquí desde el email de
 * confirmación (signup), magic link o recuperación de contraseña. El
 * parámetro `code` se canjea por una sesión y se pone la cookie.
 *
 * Si todo va bien, redirige a `next` (por defecto /cuenta) para que el
 * usuario vea el estado de su cuenta recién creada.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

// `next` puede llegar absoluto (cuando emailRedirectTo es URL completa)
// o relativo. Si concatenamos `${origin}${next}` con next absoluto sale
// `${origin}https://...` y la URL se rompe.
function resolveNext(next: string, base: string): string {
  if (next.startsWith("/")) return `${base}${next}`;
  try {
    const url = new URL(next);
    if (url.host === new URL(base).host) return url.toString();
  } catch {}
  return `${base}/cuenta`;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin: reqOrigin } = new URL(request.url);
  const base = SITE_URL || reqOrigin;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/cuenta";

  if (!code) {
    return NextResponse.redirect(`${base}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${base}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(resolveNext(next, base));
}
