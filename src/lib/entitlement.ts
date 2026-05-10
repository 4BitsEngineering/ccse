/**
 * Entitlement: capa de "¿este usuario tiene acceso premium?".
 *
 * Sprint 2 mock: vive en localStorage. Cuando llegue Supabase + Stripe
 * real, esta misma interfaz se reimplementa contra el backend sin
 * tocar UI.
 *
 * Las funciones devuelven null/false en SSR (typeof window === 'undefined')
 * para que sean importables desde Server Components sin romper.
 */

export interface Entitlement {
  plan: "anual";
  purchaseAt: string; // ISO
  expiresAt: string; // ISO 365 días después de purchaseAt
  manualVersion: string;
  /** "mock" hasta Sprint Stripe-real */
  source: "mock" | "stripe";
}

const STORAGE_KEY = "ccse:v1:entitlement";
const ANNUAL_MS = 365 * 24 * 3600 * 1000;
const MANUAL_VERSION = "2026";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getEntitlement(): Entitlement | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Entitlement;
    if (!parsed.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasActiveEntitlement(): boolean {
  const e = getEntitlement();
  if (!e) return false;
  return new Date(e.expiresAt).getTime() > Date.now();
}

export function setEntitlement(e: Entitlement): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
}

export function clearEntitlement(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/**
 * Mock de la compra: simula el callback que en producción haría el
 * webhook de Stripe tras un checkout.session.completed.
 */
export function purchaseMock(): Entitlement {
  const now = new Date();
  const ent: Entitlement = {
    plan: "anual",
    purchaseAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ANNUAL_MS).toISOString(),
    manualVersion: MANUAL_VERSION,
    source: "mock",
  };
  setEntitlement(ent);
  return ent;
}

export function daysUntilExpiry(e: Entitlement): number {
  const ms = new Date(e.expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 3600 * 1000)));
}

export function formatDateEs(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
