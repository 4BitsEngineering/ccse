/**
 * Singleton del SDK de Stripe (server-only).
 *
 * apiVersion pineada para que el comportamiento no cambie entre minor
 * releases del SDK. v22 sigue usando `2026-03-25.dahlia` (la "Dahlia"
 * release que entró en v21).
 */

import "server-only";
import Stripe from "stripe";

// Saneamos por si la env var llega con BOM (U+FEFF) o whitespace por
// un mal copy-paste en Vercel: un carácter no-ASCII en la cabecera
// Authorization hace que node:https rechace el request y el SDK lo
// reporta como StripeConnectionError (code: null), sin pista clara.
// Mismo patrón aplicado a NEXT_PUBLIC_SITE_URL en a7e49c0.
function clean(v: string | undefined): string {
  return (v ?? "").replace(/^﻿/, "").trim();
}

export const stripe = new Stripe(clean(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export const STRIPE_PRICE_ID = clean(process.env.STRIPE_PRICE_ID);
