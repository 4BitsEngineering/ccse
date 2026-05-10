import { loadBanco, type Pregunta, type Tarea } from "@/lib/content";
export {
  SIMULACRO_DURACION_S,
  SIMULACRO_PREGUNTAS,
  SIMULACRO_APROBADO_MIN,
} from "@/lib/simulacro-config";

/**
 * Simulacro generation, Sprint 1 version.
 *
 * The 5 simulacro markdown files under content/simulacros/ keep the
 * original Cervantes V/F shape for Tarea 2 questions, but the
 * banco_300.json bank rewrites all 300 questions as a/b/c. Until we
 * decide whether to parse the markdown (and add V/F support to the
 * schema) or normalize Tarea 2 to a/b/c, we generate each simulacro
 * dynamically from the bank using a seeded RNG keyed off the
 * simulacro id, so /simulacro/N is stable across visits.
 */

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DISTRIBUCION: Record<Tarea, number> = {
  1: 10, // ~120/180 del bloque "Gobierno y derecho"
  2: 3, // ~36/180
  3: 2, // ~24/180
  4: 3, // ~36/120 del bloque "Cultura y sociedad"
  5: 7, // ~84/120
};

export function getSimulacroDinamico(id: number): Pregunta[] {
  if (id < 1 || id > 5) {
    throw new Error(`Simulacro id inválido: ${id} (1-5)`);
  }
  const banco = loadBanco();
  const seed = id * 1000003;

  const seleccion: Pregunta[] = [];
  for (const t of [1, 2, 3, 4, 5] as Tarea[]) {
    const pool = banco.preguntas.filter((p) => p.tarea === t);
    const picked = seededShuffle(pool, seed + t).slice(0, DISTRIBUCION[t]);
    seleccion.push(...picked);
  }

  return seededShuffle(seleccion, seed + 99);
}

