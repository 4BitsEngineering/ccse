/**
 * GET /api/me/entitlement
 *
 * Devuelve la sesión + el entitlement del usuario logueado. La UI lo
 * usa para sincronizar la cache de localStorage tras el login y para
 * detectar logout. Las RLS hacen el trabajo: SELECT solo devuelve la
 * fila del propio user_id.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Entitlement } from "@/lib/entitlement";

interface EntitlementRow {
  user_id: string;
  plan: "anual";
  source: "stripe" | "manual";
  manual_version: string;
  purchased_at: string;
  expires_at: string;
  stripe_customer_id: string | null;
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null, entitlement: null });
  }

  const { data, error } = await supabase
    .from("entitlements")
    .select(
      "user_id, plan, source, manual_version, purchased_at, expires_at, stripe_customer_id",
    )
    .eq("user_id", user.id)
    .maybeSingle<EntitlementRow>();

  if (error) {
    return NextResponse.json(
      { user: { id: user.id, email: user.email }, entitlement: null, error: error.message },
      { status: 500 },
    );
  }

  const entitlement: Entitlement | null = data
    ? {
        plan: data.plan,
        purchaseAt: data.purchased_at,
        expiresAt: data.expires_at,
        manualVersion: data.manual_version,
        source: data.source === "stripe" ? "stripe" : "mock",
        hasStripeCustomer: !!data.stripe_customer_id,
      }
    : null;

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    entitlement,
  });
}
