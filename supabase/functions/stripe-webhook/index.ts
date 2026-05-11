/**
 * Edge Function: stripe-webhook
 *
 * Procesa eventos de Stripe Checkout y mantiene sincronizada la tabla
 * public.entitlements. Verifica la firma con STRIPE_WEBHOOK_SECRET y
 * escribe con SUPABASE_SERVICE_ROLE_KEY (bypassa la RLS de escritura).
 *
 * Runtime: Deno + npm:stripe + npm:@supabase/supabase-js.
 *
 * URL pública:
 *   https://<ref>.supabase.co/functions/v1/stripe-webhook
 *
 * Eventos manejados:
 *  - checkout.session.completed  → activa el entitlement (365 días)
 *  - charge.refunded             → revoca si el reembolso es total
 *  - charge.dispute.created      → revoca provisional mientras se resuelve
 *  - charge.dispute.closed       → si won, restaura; si lost, deja revocado
 *
 * "Revocar" = poner expires_at = now() (el código cliente ya trata las
 * filas con expires_at < now como caducadas). Mantenemos la fila para
 * preservar stripe_customer_id e histórico.
 *
 * En config.toml: [functions.stripe-webhook] verify_jwt = false.
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

async function activate(
  userId: string,
  sessionId: string,
  customerId: string | null,
) {
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
      stripe_session_id: sessionId,
      stripe_customer_id: customerId,
      updated_at: now.toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw new Error(`activate: ${error.message}`);
}

async function revokeByCustomer(customerId: string) {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("entitlements")
    .update({ expires_at: now, updated_at: now })
    .eq("stripe_customer_id", customerId);
  if (error) throw new Error(`revoke: ${error.message}`);
}

async function restoreByCustomer(customerId: string) {
  // Restaura expires_at = purchased_at + 365d. Si purchased_at queda en
  // el pasado lejano, el entitlement quedará caducado de forma natural.
  const { data, error: readErr } = await supabase
    .from("entitlements")
    .select("purchased_at")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  if (readErr) throw new Error(`restore-read: ${readErr.message}`);
  if (!data) return; // no hay fila — nada que restaurar
  const expiresAt = new Date(
    new Date(data.purchased_at).getTime() + ANNUAL_MS,
  ).toISOString();
  const { error } = await supabase
    .from("entitlements")
    .update({ expires_at: expiresAt, updated_at: new Date().toISOString() })
    .eq("stripe_customer_id", customerId);
  if (error) throw new Error(`restore: ${error.message}`);
}

function extractCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): string | null {
  if (!customer) return null;
  return typeof customer === "string" ? customer : customer.id;
}

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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        if (!userId) {
          console.error("Missing user_id in session metadata", session.id);
          return new Response("Missing user_id", { status: 400 });
        }
        if (session.payment_status !== "paid") {
          // SEPA y similares pueden quedar en processing; no activamos
          // hasta que esté confirmado.
          return new Response(
            JSON.stringify({ received: true, skipped: "unpaid" }),
            { status: 200, headers: { "content-type": "application/json" } },
          );
        }
        await activate(userId, session.id, extractCustomerId(session.customer));
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        if (charge.amount_refunded < charge.amount) {
          // Reembolso parcial: dejamos la fila tal cual; decisión manual.
          return new Response(
            JSON.stringify({ received: true, skipped: "partial-refund" }),
            { status: 200, headers: { "content-type": "application/json" } },
          );
        }
        const customerId = extractCustomerId(charge.customer);
        if (customerId) await revokeByCustomer(customerId);
        break;
      }

      case "charge.dispute.created": {
        const dispute = event.data.object as Stripe.Dispute;
        const chargeId =
          typeof dispute.charge === "string"
            ? dispute.charge
            : dispute.charge.id;
        const charge = await stripe.charges.retrieve(chargeId);
        const customerId = extractCustomerId(charge.customer);
        if (customerId) await revokeByCustomer(customerId);
        break;
      }

      case "charge.dispute.closed": {
        const dispute = event.data.object as Stripe.Dispute;
        if (dispute.status !== "won") break; // lost o warning_closed: dejar revocado
        const chargeId =
          typeof dispute.charge === "string"
            ? dispute.charge
            : dispute.charge.id;
        const charge = await stripe.charges.retrieve(chargeId);
        const customerId = extractCustomerId(charge.customer);
        if (customerId) await restoreByCustomer(customerId);
        break;
      }

      default:
        // Ignoramos eventos para los que no estamos suscritos.
        break;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Handler error:", msg);
    return new Response(`Handler error: ${msg}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
});
