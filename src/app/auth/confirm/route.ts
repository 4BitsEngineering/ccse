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

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/cuenta";

  if (!token_hash || !type) {
    return NextResponse.redirect(`${origin}/login?error=missing_params`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
