/**
 * POST /api/stripe/checkout
 *
 * Crea una sesión de Stripe Checkout one-time (9,99 € · 365 días) y
 * devuelve la URL a la que el cliente debe redirigir. Requiere sesión
 * Supabase para asociar la compra al user (metadata.user_id).
 *
 * Tras pagar, Stripe redirige a /cuenta?stripe=success y dispara el
 * webhook que escribe la fila en entitlements (Edge Function de
 * Supabase, ver supabase/functions/stripe-webhook/).
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { stripe, STRIPE_PRICE_ID } from "@/lib/stripe";

function originFromHeaders(h: Headers): string {
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return NextResponse.json(
      { error: "Inicia sesión para comprar." },
      { status: 401 },
    );
  }

  const origin = originFromHeaders(await headers());

  // Reutiliza el customer si la fila ya tiene uno (caso renovación).
  const { data: ent } = await supabase
    .from("entitlements")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle<{ stripe_customer_id: string | null }>();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${origin}/cuenta?stripe=success`,
    cancel_url: `${origin}/cuenta?stripe=cancel`,
    locale: "es",
    metadata: { user_id: user.id },
    ...(ent?.stripe_customer_id
      ? { customer: ent.stripe_customer_id }
      : {
          customer_email: user.email,
          customer_creation: "always",
        }),
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
