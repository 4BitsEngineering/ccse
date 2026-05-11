/**
 * POST /api/me/progreso/simulacro
 *
 * Inserta un resultado de simulacro para el usuario logueado.
 * simulacro_resultados es inmutable desde el cliente: solo permite
 * INSERT y SELECT.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface IncomingSimulacro {
  simulacroId: number;
  fechaIso: string;
  total: number;
  aciertos: number;
  porTarea: Record<string, { total: number; aciertos: number }>;
  duracionSegundos: number;
  preguntasFalladas: string[];
}

function isValid(body: unknown): body is IncomingSimulacro {
  if (!body || typeof body !== "object") return false;
  const s = body as Record<string, unknown>;
  return (
    typeof s.simulacroId === "number" &&
    typeof s.fechaIso === "string" &&
    typeof s.total === "number" &&
    typeof s.aciertos === "number" &&
    typeof s.porTarea === "object" &&
    s.porTarea !== null &&
    typeof s.duracionSegundos === "number" &&
    Array.isArray(s.preguntasFalladas)
  );
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sin sesión." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  if (!isValid(body)) {
    return NextResponse.json({ error: "Simulacro inválido." }, { status: 400 });
  }

  const { error } = await supabase.from("simulacro_resultados").insert({
    user_id: user.id,
    simulacro_id: body.simulacroId,
    fecha: body.fechaIso,
    total: body.total,
    aciertos: body.aciertos,
    por_tarea: body.porTarea,
    duracion_segundos: body.duracionSegundos,
    preguntas_falladas: body.preguntasFalladas,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
