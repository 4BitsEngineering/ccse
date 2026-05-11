/**
 * Cliente Supabase con secret key — server-only.
 *
 * Bypassea RLS, así que SOLO usar para operaciones controladas desde
 * el servidor (escribir en entitlements desde el webhook de Stripe o
 * la API de compra mock). Nunca importar desde Client Components.
 */

import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
