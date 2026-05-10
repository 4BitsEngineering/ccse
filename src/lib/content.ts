import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { shuffle } from "@/lib/utils";

export const OpcionesSchema = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const DificultadSchema = z.enum([
  "facil",
  "fácil",
  "media",
  "dificil",
  "difícil",
]);

export const PreguntaSchema = z.object({
  id: z.string(),
  id_oficial: z.string(),
  tarea: z.number().int().min(1).max(5),
  tarea_titulo: z.string(),
  enunciado: z.string(),
  opciones: OpcionesSchema,
  correcta: z.enum(["a", "b", "c"]),
  fuente_manual_pagina: z.number().int().nullable().optional(),
  pagina_manual: z.number().int().nullable().optional(),
  explicacion: z.string(),
  novedad_2026: z.string().nullable().optional(),
  etiquetas: z.array(z.string()).optional(),
  explicacion_distractores: z.record(z.string(), z.string()).optional(),
  mnemotecnico: z.string().optional(),
  dificultad: DificultadSchema,
  bloque_tema: z.string().optional(),
});

export const BancoSchema = z.object({
  version_manual: z.string(),
  fecha_publicacion: z.string().optional(),
  fecha_extraccion: z.string().optional(),
  total_preguntas: z.number(),
  renovacion_porcentaje_vs_anterior: z.number().optional(),
  estructura: z.object({
    opciones_por_pregunta: z.number(),
    etiquetas_opciones: z.array(z.string()),
    preguntas_por_tarea: z.record(z.string(), z.number()),
  }),
  preguntas: z.array(PreguntaSchema),
  fecha_razonamiento: z.string().optional(),
  preguntas_con_explicacion: z.number().optional(),
  auditoria: z.unknown().optional(),
});

export type Pregunta = z.infer<typeof PreguntaSchema>;
export type Banco = z.infer<typeof BancoSchema>;
export type Tarea = 1 | 2 | 3 | 4 | 5;

const CONTENT_DIR = path.join(process.cwd(), "content");

let cached: Banco | null = null;

export function loadBanco(): Banco {
  if (cached) return cached;
  const raw = readFileSync(path.join(CONTENT_DIR, "banco_300.json"), "utf8");
  const parsed = JSON.parse(raw);
  cached = BancoSchema.parse(parsed);
  return cached;
}

export function getPreguntasPorTarea(t: Tarea): Pregunta[] {
  return loadBanco().preguntas.filter((p) => p.tarea === t);
}

export function getPreguntaPorId(id: string): Pregunta | undefined {
  return loadBanco().preguntas.find((p) => p.id === id);
}

export function getDemoPreguntas(n = 10): Pregunta[] {
  return shuffle(loadBanco().preguntas).slice(0, n);
}

const TEMA_FILES: Record<Tarea, string> = {
  1: "01_gobierno_legislacion_participacion.md",
  2: "02_derechos_deberes_fundamentales.md",
  3: "03_organizacion_territorial_geografia.md",
  4: "04_cultura_historia_espana.md",
  5: "05_sociedad_espanola.md",
};

export function loadTema(t: Tarea): string {
  return readFileSync(
    path.join(CONTENT_DIR, "temas", TEMA_FILES[t]),
    "utf8",
  );
}

export function loadSimulacroMarkdown(id: number): string {
  if (id < 1 || id > 5) throw new Error(`Simulacro inválido: ${id}`);
  const file = `simulacro_0${id}.md`;
  return readFileSync(path.join(CONTENT_DIR, "simulacros", file), "utf8");
}

export function getOptionKeys(p: Pick<Pregunta, "opciones">): string[] {
  return Object.keys(p.opciones);
}
