/**
 * Entitlement: capa de "¿este usuario tiene acceso premium?".
 *
 * Sprint 2 mock: vive en localStorage. Cuando llegue Supabase + Stripe
 * real, esta misma interfaz se reimplementa contra el backend sin
 * tocar UI.
 *
 * Modo validación abierta: mientras DEFAULT_OPEN_ACCESS = true, si no
 * hay nada guardado en localStorage se devuelve un entitlement
 * sintético (válido 365 días) para que todo se pueda probar sin pulsar
 * el "Comprar mock". Si el usuario quiere ver el paywall, va a /cuenta
 * y "Eliminar acceso"; eso escribe un flag {cleared:true} que sobrescribe
 * el default.
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

/**
 * Mientras true, sin storage = acceso activo por defecto (modo validación).
 * Cambiar a false antes del lanzamiento real.
 */
const DEFAULT_OPEN_ACCESS = true;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function syntheticEntitlement(): Entitlement {
  const now = new Date();
  return {
    plan: "anual",
    purchaseAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ANNUAL_MS).toISOString(),
    manualVersion: MANUAL_VERSION,
    source: "mock",
  };
}

interface ClearedFlag {
  cleared: true;
}

function isClearedFlag(v: unknown): v is ClearedFlag {
  return typeof v === "object" && v !== null && (v as ClearedFlag).cleared === true;
}

export function getEntitlement(): Entitlement | null {
  if (!isBrowser()) {
    return DEFAULT_OPEN_ACCESS ? syntheticEntitlement() : null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_OPEN_ACCESS ? syntheticEntitlement() : null;
    const parsed = JSON.parse(raw);
    if (isClearedFlag(parsed)) return null;
    const ent = parsed as Entitlement;
    if (!ent.expiresAt) {
      return DEFAULT_OPEN_ACCESS ? syntheticEntitlement() : null;
    }
    return ent;
  } catch {
    return DEFAULT_OPEN_ACCESS ? syntheticEntitlement() : null;
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

/**
 * Marca el navegador como "bloqueado" (sobrescribe el default abierto).
 * Útil para probar el paywall durante la fase de validación.
 */
export function clearEntitlement(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cleared: true }));
}

/**
 * Mock de la compra: simula el callback que en producción haría el
 * webhook de Stripe tras un checkout.session.completed.
 */
export function purchaseMock(): Entitlement {
  const ent = syntheticEntitlement();
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
