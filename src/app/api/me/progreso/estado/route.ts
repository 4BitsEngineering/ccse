/**
 * POST /api/me/progreso/estado
 *
 * Upsert de un EstadoPregunta para el usuario logueado. La política
 * RLS permite INSERT/UPDATE solo cuando user_id = auth.uid().
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ESTADOS_VALIDOS = ["vista", "acertada", "fallada", "dominada"] as const;
type EstadoBd = (typeof ESTADOS_VALIDOS)[number];

interface IncomingEstado {
  id: string;
  estado: string;
  cajaSrs: number;
  aciertosConsecutivos: number;
  ultimaRespuesta?: string;
  ultimaCorrecta?: boolean;
  lastSeenAt: string;
}

function isValid(body: unknown): body is IncomingEstado {
  if (!body || typeof body !== "object") return false;
  const e = body as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.estado === "string" &&
    (ESTADOS_VALIDOS as readonly string[]).includes(e.estado) &&
    typeof e.cajaSrs === "number" &&
    e.cajaSrs >= 1 &&
    e.cajaSrs <= 4 &&
    typeof e.aciertosConsecutivos === "number" &&
    typeof e.lastSeenAt === "string"
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
    return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
  }

  const { error } = await supabase
    .from("progreso_estados")
    .upsert(
      {
        user_id: user.id,
        pregunta_id: body.id,
        estado: body.estado as EstadoBd,
        caja_srs: body.cajaSrs,
        aciertos_consecutivos: body.aciertosConsecutivos,
        ultima_respuesta: body.ultimaRespuesta ?? null,
        ultima_correcta: body.ultimaCorrecta ?? null,
        last_seen_at: body.lastSeenAt,
      },
      { onConflict: "user_id,pregunta_id" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
