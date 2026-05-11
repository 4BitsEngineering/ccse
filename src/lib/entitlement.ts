/**
 * Entitlement: capa de "¿este usuario tiene acceso premium?".
 *
 * El estado vive en la tabla `entitlements` de Supabase, indexada por
 * user_id. Para evitar flashes de UI mientras esperamos al servidor,
 * localStorage funciona como cache: getEntitlement() lo lee síncrono,
 * y syncEntitlementFromServer() lo refresca contra la BD al montar.
 *
 * Sin sesión no hay acceso. La cache se borra automáticamente cuando
 * la sesión termina (sync detecta user=null).
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

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getEntitlement(): Entitlement | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const ent = JSON.parse(raw) as Entitlement;
    if (!ent.expiresAt) return null;
    return ent;
  } catch {
    return null;
  }
}

export function hasActiveEntitlement(): boolean {
  const e = getEntitlement();
  if (!e) return false;
  return new Date(e.expiresAt).getTime() > Date.now();
}

function setEntitlement(e: Entitlement): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
}

export function forgetEntitlement(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
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

/* ─── Sincronización con Supabase ───────────────────────────────── */

interface MeResponse {
  user: { id: string; email?: string } | null;
  entitlement: Entitlement | null;
}

/**
 * Trae la sesión + entitlement del servidor y actualiza la cache de
 * localStorage. Se llama desde useEffect en los componentes que
 * dependen del estado (CuentaClient, SiteHeader). Devuelve el user
 * para que el caller pueda saber si hay sesión.
 */
export async function syncEntitlementFromServer(): Promise<MeResponse["user"]> {
  if (!isBrowser()) return null;
  try {
    const res = await fetch("/api/me/entitlement", {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as MeResponse;

    if (json.user && json.entitlement) {
      setEntitlement(json.entitlement);
    } else {
      forgetEntitlement();
    }

    window.dispatchEvent(new CustomEvent("ccse:entitlement-changed"));
    return json.user;
  } catch {
    return null;
  }
}

/**
 * Compra mock contra el servidor: escribe la fila en la tabla
 * entitlements vía /api/comprar-mock. Requiere sesión. Cuando llegue
 * Stripe real, la fila la escribirá la Edge Function del webhook y
 * esta función desaparece.
 */
export async function purchaseRemoteMock(): Promise<Entitlement | null> {
  if (!isBrowser()) return null;
  try {
    const res = await fetch("/api/comprar-mock", {
      method: "POST",
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { entitlement?: Entitlement };
    if (!json.entitlement) return null;
    setEntitlement(json.entitlement);
    window.dispatchEvent(new CustomEvent("ccse:entitlement-changed"));
    return json.entitlement;
  } catch {
    return null;
  }
}
