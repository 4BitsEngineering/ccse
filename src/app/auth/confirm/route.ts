/**
 * Auth confirm: endpoint al que apuntan los emails generados por
 * Supabase (signup confirmation, magic link, password recovery) cuando
 * usamos el flujo PKCE de @supabase/ssr.
 *
 * Recibe ?token_hash=...&type=email|magiclink|recovery y lo canjea
 * por una sesión vía verifyOtp. Si todo OK, redirige a `next`
 * (por defecto /cuenta).
 *
 * El callback de OAuth se gestiona en /auth/callback (exchangeCodeForSession).
 */

import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

// `next` viaja desde la plantilla de Supabase como {{ .RedirectTo }},
// que nosotros mandamos absoluta (https://www.preparacionccse.es/cuenta).
// Si concatenamos `${origin}${next}` sale `${origin}https://...` y la URL
// se rompe. Aceptamos absoluta (validando host canónico) o relativa.
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
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/cuenta";

  if (!token_hash || !type) {
    return NextResponse.redirect(`${base}/login?error=missing_params`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error) {
    return NextResponse.redirect(
      `${base}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(resolveNext(next, base));
}
