/**
 * Progreso del usuario: estado por pregunta + Leitner SRS + historial
 * de simulacros.
 *
 * MVP: localStorage. Diseñado para reemplazarse por una capa contra
 * Supabase + Edge Functions cuando llegue auth.
 *
 * Funciones SSR-safe (return [] / null si no hay window) — se pueden
 * importar desde Server Components sin romper, aunque solo aportan
 * datos cuando se llaman desde un Client Component.
 */

import type { Pregunta } from "@/lib/content";

export type EstadoVisto =
  | "no_vista"
  | "vista"
  | "acertada"
  | "fallada"
  | "dominada";

export type CajaSrs = 1 | 2 | 3 | 4;

export interface EstadoPregunta {
  id: string;
  estado: EstadoVisto;
  cajaSrs: CajaSrs;
  aciertosConsecutivos: number;
  ultimaRespuesta?: string;
  ultimaCorrecta?: boolean;
  lastSeenAt: string;
}

export interface SimulacroResultado {
  simulacroId: number;
  fechaIso: string;
  total: number;
  aciertos: number;
  porTarea: Record<string, { total: number; aciertos: number }>;
  duracionSegundos: number;
  preguntasFalladas: string[];
}

export type LastTipo = "practicar" | "estudiar" | "simulacro" | "repaso";

export interface UltimaActividad {
  tipo: LastTipo;
  id: string | number;
  titulo: string;
  href: string;
  cuandoIso: string;
}

const KEY_ESTADOS = "ccse:v1:progreso:estados";
const KEY_SIMULACROS = "ccse:v1:progreso:simulacros";
const KEY_LAST = "ccse:v1:progreso:last";

const INTERVALOS_HORAS: Record<CajaSrs, number> = {
  1: 0,
  2: 24,
  3: 72,
  4: 168,
};

const ACIERTOS_PARA_DOMINAR = 2;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

type EstadosMap = Record<string, EstadoPregunta>;

export function readEstados(): EstadosMap {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(KEY_ESTADOS);
    return raw ? (JSON.parse(raw) as EstadosMap) : {};
  } catch {
    return {};
  }
}

function writeEstados(map: EstadosMap): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY_ESTADOS, JSON.stringify(map));
}

export function getEstadoPregunta(id: string): EstadoPregunta | null {
  return readEstados()[id] ?? null;
}

export function setEstadoPregunta(estado: EstadoPregunta): void {
  const map = readEstados();
  map[estado.id] = estado;
  writeEstados(map);
  pushEstadoToServer(estado);
}

/**
 * Procesa una respuesta y actualiza la caja Leitner.
 * Devuelve el nuevo estado para que el caller lo use en UI.
 */
export function recordAnswer(
  pregunta: Pregunta,
  selected: string,
  correcta: boolean,
): EstadoPregunta {
  const prev = getEstadoPregunta(pregunta.id);
  const now = new Date().toISOString();

  if (correcta) {
    const cajaActual = prev?.cajaSrs ?? 1;
    const cajaNueva = Math.min(4, cajaActual + 1) as CajaSrs;
    const aciertos = (prev?.aciertosConsecutivos ?? 0) + 1;
    const dominada = cajaNueva === 4 && aciertos >= ACIERTOS_PARA_DOMINAR;
    const nuevo: EstadoPregunta = {
      id: pregunta.id,
      estado: dominada ? "dominada" : "acertada",
      cajaSrs: cajaNueva,
      aciertosConsecutivos: aciertos,
      ultimaRespuesta: selected,
      ultimaCorrecta: true,
      lastSeenAt: now,
    };
    setEstadoPregunta(nuevo);
    return nuevo;
  }

  const nuevo: EstadoPregunta = {
    id: pregunta.id,
    estado: "fallada",
    cajaSrs: 1,
    aciertosConsecutivos: 0,
    ultimaRespuesta: selected,
    ultimaCorrecta: false,
    lastSeenAt: now,
  };
  setEstadoPregunta(nuevo);
  return nuevo;
}

export function readSimulacros(): SimulacroResultado[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY_SIMULACROS);
    return raw ? (JSON.parse(raw) as SimulacroResultado[]) : [];
  } catch {
    return [];
  }
}

export function registrarSimulacro(r: SimulacroResultado): void {
  if (!isBrowser()) return;
  const all = readSimulacros();
  all.push(r);
  window.localStorage.setItem(KEY_SIMULACROS, JSON.stringify(all));
  pushSimulacroToServer(r);
}

export function getUltimaActividad(): UltimaActividad | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEY_LAST);
    return raw ? (JSON.parse(raw) as UltimaActividad) : null;
  } catch {
    return null;
  }
}

export function setUltimaActividad(
  a: Omit<UltimaActividad, "cuandoIso">,
): void {
  if (!isBrowser()) return;
  const full: UltimaActividad = { ...a, cuandoIso: new Date().toISOString() };
  window.localStorage.setItem(KEY_LAST, JSON.stringify(full));
}

/* ─── Stats ─────────────────────────────────────────────────────── */

export interface StatsTarea {
  tarea: number;
  total: number;
  no_vista: number;
  vista: number;
  acertada: number;
  fallada: number;
  dominada: number;
}

export function statsPorTarea(
  banco: Pregunta[],
  estados: EstadosMap,
): StatsTarea[] {
  const out: Record<number, StatsTarea> = {};
  for (const p of banco) {
    const t = p.tarea;
    if (!out[t]) {
      out[t] = {
        tarea: t,
        total: 0,
        no_vista: 0,
        vista: 0,
        acertada: 0,
        fallada: 0,
        dominada: 0,
      };
    }
    out[t].total++;
    const e = estados[p.id];
    if (!e) out[t].no_vista++;
    else out[t][e.estado]++;
  }
  return Object.values(out).sort((a, b) => a.tarea - b.tarea);
}

/* ─── Repaso (Leitner) ──────────────────────────────────────────── */

export function isDueForReview(
  estado: EstadoPregunta,
  now = Date.now(),
): boolean {
  if (estado.estado === "dominada") return false;
  if (estado.estado === "no_vista") return false;
  const intervalMs = INTERVALOS_HORAS[estado.cajaSrs] * 3600 * 1000;
  const due = new Date(estado.lastSeenAt).getTime() + intervalMs;
  return now >= due;
}

export function getRepasoQueue(
  banco: Pregunta[],
  estados: EstadosMap,
  max = 20,
): Pregunta[] {
  const candidatas: Array<{ p: Pregunta; e: EstadoPregunta }> = [];
  for (const p of banco) {
    const e = estados[p.id];
    if (!e) continue;
    if (isDueForReview(e)) candidatas.push({ p, e });
  }
  candidatas.sort((a, b) => {
    if (a.e.cajaSrs !== b.e.cajaSrs) return a.e.cajaSrs - b.e.cajaSrs;
    return (
      new Date(a.e.lastSeenAt).getTime() -
      new Date(b.e.lastSeenAt).getTime()
    );
  });
  return candidatas.slice(0, max).map((x) => x.p);
}

/* ─── Sincronización con Supabase ───────────────────────────────── */

/**
 * Fire-and-forget: empuja un estado al server. Si no hay sesión, la
 * respuesta 401 se traga silenciosamente — la cache local sigue siendo
 * la fuente de verdad para usuarios anónimos.
 */
function pushEstadoToServer(estado: EstadoPregunta): void {
  if (!isBrowser()) return;
  fetch("/api/me/progreso/estado", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estado),
  }).catch(() => {});
}

function pushSimulacroToServer(r: SimulacroResultado): void {
  if (!isBrowser()) return;
  fetch("/api/me/progreso/simulacro", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(r),
  }).catch(() => {});
}

interface ProgresoServerData {
  estados: EstadoPregunta[];
  simulacros: SimulacroResultado[];
}

function simulacroKey(s: SimulacroResultado): string {
  return `${s.simulacroId}|${s.fechaIso}`;
}

/**
 * Hidrata el progreso local desde Supabase y empuja al servidor lo que
 * solo existía en local. Estrategia de merge:
 *  - Por cada pregunta_id presente en ambos lados: gana el de
 *    lastSeenAt más reciente. Si gana el local, se sube al servidor.
 *  - Estados solo en server: se traen al local.
 *  - Estados solo en local: se suben al server.
 *  - Simulacros: unión por (simulacroId, fechaIso). Los del server
 *    son autoritativos; los locales que no estén se suben.
 *
 * Si no hay sesión (401), no toca nada y devuelve false. Si hay sesión
 * dispara "ccse:progreso-changed" para que las pantallas refresquen.
 */
export async function syncProgresoFromServer(): Promise<boolean> {
  if (!isBrowser()) return false;
  try {
    const res = await fetch("/api/me/progreso", {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!res.ok) return false;
    const json = (await res.json()) as ProgresoServerData;

    /* Merge estados */
    const localEstados = readEstados();
    const merged: EstadosMap = { ...localEstados };
    const pushBack: EstadoPregunta[] = [];

    const serverIds = new Set<string>();
    for (const s of json.estados) {
      serverIds.add(s.id);
      const local = localEstados[s.id];
      if (!local) {
        merged[s.id] = s;
        continue;
      }
      const serverT = new Date(s.lastSeenAt).getTime();
      const localT = new Date(local.lastSeenAt).getTime();
      if (serverT >= localT) {
        merged[s.id] = s;
      } else {
        pushBack.push(local);
      }
    }
    for (const id in localEstados) {
      if (!serverIds.has(id)) pushBack.push(localEstados[id]);
    }
    window.localStorage.setItem(KEY_ESTADOS, JSON.stringify(merged));
    for (const e of pushBack) pushEstadoToServer(e);

    /* Merge simulacros: unión por (simulacroId, fechaIso) */
    const localSims = readSimulacros();
    const seen = new Set<string>();
    const allSims: SimulacroResultado[] = [];
    for (const s of json.simulacros) {
      seen.add(simulacroKey(s));
      allSims.push(s);
    }
    const pushBackSims: SimulacroResultado[] = [];
    for (const s of localSims) {
      if (!seen.has(simulacroKey(s))) {
        allSims.push(s);
        pushBackSims.push(s);
      }
    }
    window.localStorage.setItem(KEY_SIMULACROS, JSON.stringify(allSims));
    for (const s of pushBackSims) pushSimulacroToServer(s);

    window.dispatchEvent(new CustomEvent("ccse:progreso-changed"));
    return true;
  } catch {
    return false;
  }
}
