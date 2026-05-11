/**
 * Singleton del SDK de Stripe (server-only).
 *
 * apiVersion pineada para que el comportamiento no cambie entre minor
 * releases del SDK. v22 sigue usando `2026-03-25.dahlia` (la "Dahlia"
 * release que entró en v21).
 */

import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;
