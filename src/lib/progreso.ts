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
