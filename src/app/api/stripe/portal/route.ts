/**
 * POST /api/stripe/portal
 *
 * Crea una sesión del Customer Portal de Stripe para que el usuario
 * vea sus recibos y descargue factura. Requiere sesión Supabase y que
 * la fila entitlements tenga stripe_customer_id (lo escribe el webhook
 * tras un checkout exitoso).
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

function originFromHeaders(h: Headers): string {
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

// return_url debe apuntar al dominio canónico: con el origin de las
// cabeceras, en Vercel sale el dominio de deploy (ccse-khaki.vercel.app),
// un alias que ya no resuelve (404 DEPLOYMENT_NOT_FOUND). En local, sin
// la env var, caemos al origin real de la petición.
function siteUrl(h: Headers): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  return fromEnv || originFromHeaders(h);
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sin sesión." }, { status: 401 });
  }

  const { data: ent } = await supabase
    .from("entitlements")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle<{ stripe_customer_id: string | null }>();

  if (!ent?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No tienes ninguna compra registrada en Stripe." },
      { status: 404 },
    );
  }

  const origin = siteUrl(await headers());
  const session = await stripe.billingPortal.sessions.create({
    customer: ent.stripe_customer_id,
    return_url: `${origin}/cuenta`,
    locale: "es",
  });

  return NextResponse.json({ url: session.url });
}
