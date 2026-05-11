/**
 * POST /api/comprar-mock
 *
 * Compra mock: requiere sesión Supabase y hace upsert de un
 * entitlement anual (365 días) con source='manual'. Cuando llegue
 * Stripe real, este endpoint queda obsoleto y la fila la escribe la
 * Edge Function del webhook con source='stripe'.
 *
 * Usa el admin client (secret key) porque la policy de entitlements
 * solo deja SELECT al rol authenticated; las escrituras pasan por
 * service_role.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Entitlement } from "@/lib/entitlement";

const ANNUAL_MS = 365 * 24 * 3600 * 1000;
const MANUAL_VERSION = "2026";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Inicia sesión para activar el acceso." },
      { status: 401 },
    );
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ANNUAL_MS);

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("entitlements")
    .upsert(
      {
        user_id: user.id,
        plan: "anual",
        source: "manual",
        manual_version: MANUAL_VERSION,
        purchased_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        updated_at: now.toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("plan, source, manual_version, purchased_at, expires_at")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Error al activar el acceso." },
      { status: 500 },
    );
  }

  const entitlement: Entitlement = {
    plan: "anual",
    purchaseAt: data.purchased_at,
    expiresAt: data.expires_at,
    manualVersion: data.manual_version,
    source: "mock",
  };

  return NextResponse.json({ entitlement });
}
