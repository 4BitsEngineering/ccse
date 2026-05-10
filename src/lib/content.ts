import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

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

const CONTENT_DIR = path.join(process.cwd(), "content");

let cached: Banco | null = null;

export function loadBanco(): Banco {
  if (cached) return cached;
  const raw = readFileSync(path.join(CONTENT_DIR, "banco_300.json"), "utf8");
  const parsed = JSON.parse(raw);
  cached = BancoSchema.parse(parsed);
  return cached;
}
