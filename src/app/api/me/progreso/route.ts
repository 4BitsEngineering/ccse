/**
 * GET /api/me/progreso
 *
 * Devuelve todos los estados + simulacros del usuario logueado. La UI
 * lo usa una vez al montar para hidratar y mergear con la cache de
 * localStorage. Las RLS filtran por user_id.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type {
  EstadoPregunta,
  SimulacroResultado,
  EstadoVisto,
  CajaSrs,
} from "@/lib/progreso";

interface EstadoRow {
  pregunta_id: string;
  estado: "vista" | "acertada" | "fallada" | "dominada";
  caja_srs: number;
  aciertos_consecutivos: number;
  ultima_respuesta: string | null;
  ultima_correcta: boolean | null;
  last_seen_at: string;
}

interface SimulacroRow {
  simulacro_id: number;
  fecha: string;
  total: number;
  aciertos: number;
  por_tarea: Record<string, { total: number; aciertos: number }>;
  duracion_segundos: number;
  preguntas_falladas: string[];
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sin sesión." }, { status: 401 });
  }

  const [estadosRes, simulacrosRes] = await Promise.all([
    supabase
      .from("progreso_estados")
      .select(
        "pregunta_id, estado, caja_srs, aciertos_consecutivos, ultima_respuesta, ultima_correcta, last_seen_at",
      )
      .eq("user_id", user.id),
    supabase
      .from("simulacro_resultados")
      .select(
        "simulacro_id, fecha, total, aciertos, por_tarea, duracion_segundos, preguntas_falladas",
      )
      .eq("user_id", user.id),
  ]);

  if (estadosRes.error || simulacrosRes.error) {
    return NextResponse.json(
      {
        error:
          estadosRes.error?.message ??
          simulacrosRes.error?.message ??
          "Error leyendo progreso.",
      },
      { status: 500 },
    );
  }

  const estados: EstadoPregunta[] = (estadosRes.data as EstadoRow[] | null ?? []).map(
    (r) => ({
      id: r.pregunta_id,
      estado: r.estado as EstadoVisto,
      cajaSrs: r.caja_srs as CajaSrs,
      aciertosConsecutivos: r.aciertos_consecutivos,
      ultimaRespuesta: r.ultima_respuesta ?? undefined,
      ultimaCorrecta: r.ultima_correcta ?? undefined,
      lastSeenAt: r.last_seen_at,
    }),
  );

  const simulacros: SimulacroResultado[] = (
    simulacrosRes.data as SimulacroRow[] | null ?? []
  ).map((r) => ({
    simulacroId: r.simulacro_id,
    fechaIso: r.fecha,
    total: r.total,
    aciertos: r.aciertos,
    porTarea: r.por_tarea,
    duracionSegundos: r.duracion_segundos,
    preguntasFalladas: r.preguntas_falladas,
  }));

  return NextResponse.json({ estados, simulacros });
}
