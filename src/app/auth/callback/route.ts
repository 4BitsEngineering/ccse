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

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/cuenta";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
