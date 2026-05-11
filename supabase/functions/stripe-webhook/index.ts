/**
 * Edge Function: stripe-webhook
 *
 * Recibe eventos de Stripe Checkout. Verifica la firma con el
 * STRIPE_WEBHOOK_SECRET, lee user_id del metadata y escribe la fila
 * en public.entitlements usando SUPABASE_SERVICE_ROLE_KEY (bypassa
 * RLS — esa policy solo deja escribir a service_role).
 *
 * Runtime: Deno + npm:stripe + Supabase JS. constructEventAsync
 * porque Deno no expone el crypto sync que usa el método clásico.
 *
 * URL pública tras deploy:
 *   https://<ref>.supabase.co/functions/v1/stripe-webhook
 *
 * Importante: en `supabase/config.toml` esta función lleva
 * `verify_jwt = false` — Stripe no manda JWT, manda firma propia.
 */

// @ts-expect-error Deno runtime; tipos inyectados en deploy
import Stripe from "npm:stripe@^22";
// @ts-expect-error Deno runtime
import { createClient } from "npm:@supabase/supabase-js@^2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-04-22.dahlia",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const ANNUAL_MS = 365 * 24 * 3600 * 1000;
const MANUAL_VERSION = "2026";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      sig,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Bad signature:", msg);
    return new Response(`Webhook signature error: ${msg}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id ?? null;

    if (!userId) {
      console.error("Missing user_id in session metadata", session.id);
      return new Response("Missing user_id", { status: 400 });
    }
    if (session.payment_status !== "paid") {
      // checkout.session.completed se dispara también para sesiones
      // con payment_intent en processing (p.ej. SEPA). Solo activamos
      // entitlement cuando el pago está confirmado.
      return new Response(JSON.stringify({ received: true, skipped: "unpaid" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + ANNUAL_MS);

    const { error } = await supabase.from("entitlements").upsert(
      {
        user_id: userId,
        plan: "anual",
        source: "stripe",
        manual_version: MANUAL_VERSION,
        purchased_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        stripe_session_id: session.id,
        stripe_customer_id: customerId,
        updated_at: now.toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (error) {
      console.error("DB upsert error:", error);
      return new Response(`DB error: ${error.message}`, { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
});
