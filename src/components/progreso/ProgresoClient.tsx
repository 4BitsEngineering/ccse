"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDateEs } from "@/lib/entitlement";
import {
  readEstados,
  readSimulacros,
  statsPorTarea,
  type SimulacroResultado,
  type StatsTarea,
} from "@/lib/progreso";
import { SIMULACRO_APROBADO_MIN } from "@/lib/simulacro-config";
import type { Pregunta } from "@/lib/content";

const TAREA_TITULO: Record<number, string> = {
  1: "Gobierno",
  2: "Derechos",
  3: "Territorial",
  4: "Cultura e historia",
  5: "Sociedad",
};

export function ProgresoClient({ banco }: { banco: Pregunta[] }) {
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState<StatsTarea[]>([]);
  const [historial, setHistorial] = useState<SimulacroResultado[]>([]);

  useEffect(() => {
    const estados = readEstados();
    setStats(statsPorTarea(banco, estados));
    setHistorial(readSimulacros());
    setLoaded(true);
  }, [banco]);

  if (!loaded) {
    return (
      <div
        className="rounded-2xl border border-rule bg-paper-warm p-6 animate-pulse"
        aria-busy="true"
      >
        <div className="h-4 w-1/3 rounded bg-rule" />
      </div>
    );
  }

  const totalDominadas = stats.reduce((acc, s) => acc + s.dominada, 0);
  const totalPreguntas = stats.reduce((acc, s) => acc + s.total, 0);
  const totalVistas = stats.reduce(
    (acc, s) => acc + s.acertada + s.fallada + s.dominada + s.vista,
    0,
  );
  const simulacrosAprobados = historial.filter(
    (r) => r.aciertos >= SIMULACRO_APROBADO_MIN,
  ).length;
  const mediaSimulacros =
    historial.length > 0
      ? Math.round(
          (historial.reduce((a, r) => a + r.aciertos, 0) / historial.length) *
            10,
        ) / 10
      : null;

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-cream border border-rule p-5">
          <p className="font-serif text-4xl font-medium leading-none tracking-[-0.02em] text-ink">
            {totalDominadas}
          </p>
          <p className="text-xs text-ink-muted mt-2 leading-tight">
            de {totalPreguntas} preguntas dominadas
          </p>
          <div className="h-1 bg-rule rounded-sm mt-3 overflow-hidden">
            <div
              className="h-full bg-terracotta"
              style={{
                width: `${totalPreguntas > 0 ? (totalDominadas / totalPreguntas) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
        <div className="rounded-2xl bg-terracotta text-cream p-5">
          <p className="font-serif text-4xl font-medium leading-none">
            {simulacrosAprobados}
            <span className="text-2xl opacity-70">
              /{historial.length || "—"}
            </span>
          </p>
          <p className="text-xs mt-2 leading-tight opacity-90">
            simulacros aprobados
          </p>
          {mediaSimulacros !== null && (
            <p className="font-serif italic text-sm mt-2 opacity-95">
              media: {mediaSimulacros}/25
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-paper-warm p-5">
          <p className="font-serif text-3xl font-medium leading-none text-ink">
            {totalVistas}
          </p>
          <p className="text-xs text-ink-muted mt-2 leading-tight">
            preguntas vistas
          </p>
        </div>
        <div className="rounded-2xl bg-paper-warm p-5">
          <p className="font-serif text-3xl font-medium leading-none text-ink">
            {historial.length}
          </p>
          <p className="text-xs text-ink-muted mt-2 leading-tight">
            simulacros realizados
          </p>
        </div>
      </div>

      {/* Dominio por tarea */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Dominio por tarea
        </p>
        <ul>
          {stats.map((s) => (
            <BarraTarea key={s.tarea} s={s} />
          ))}
        </ul>
      </section>

      {/* Historial */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Historial de simulacros
        </p>
        {historial.length === 0 ? (
          <div className="rounded-2xl bg-cream border border-rule p-5">
            <p className="font-serif text-[16px] leading-relaxed text-ink-soft">
              Aún no has hecho ningún simulacro. Cuando termines uno, aparecerá
              aquí con la nota y el desglose por tarea.
            </p>
            <Link
              href="/simulacro"
              className="mt-3 inline-block text-sm font-medium text-terracotta-deep hover:underline"
            >
              Ir a simulacros →
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {[...historial].reverse().map((r, i) => {
              const aprobado = r.aciertos >= SIMULACRO_APROBADO_MIN;
              return (
                <li key={`${r.fechaIso}-${i}`}>
                  <div className="flex items-center gap-4 rounded-2xl border border-rule bg-cream p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-medium text-ink">
                        Simulacro {r.simulacroId}{" "}
                        <span className="font-serif italic text-ink-muted font-normal">
                          · {formatDateEs(r.fechaIso)}
                        </span>
                      </p>
                      <p className="text-[11px] text-ink-muted mt-1 font-mono tabular-nums">
                        {Object.entries(r.porTarea)
                          .sort(([a], [b]) => Number(a) - Number(b))
                          .map(
                            ([t, v]) => `T${t} ${v.aciertos}/${v.total}`,
                          )
                          .join("  ·  ")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          "font-serif text-2xl font-medium leading-none tabular-nums",
                          aprobado ? "text-olive" : "text-terracotta-deep",
                        )}
                      >
                        {r.aciertos}
                        <span className="text-ink-muted text-base">
                          /{r.total}
                        </span>
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-ink-muted mt-1 font-semibold">
                        {aprobado ? "aprobado" : "no aprobado"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function BarraTarea({ s }: { s: StatsTarea }) {
  const pct = s.total === 0 ? 0 : s.dominada / s.total;
  return (
    <li className="py-3 border-b border-rule first:border-t first:border-t-rule">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[14.5px] text-ink">
          Tema {s.tarea}{" "}
          <span className="text-ink-muted font-normal text-[13px]">
            — {TAREA_TITULO[s.tarea] ?? ""}
          </span>
        </span>
        <span className="font-serif italic text-[13.5px] text-ink-soft tabular-nums">
          {Math.round(pct * 100)}%
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-sm overflow-hidden bg-rule flex">
        {s.dominada > 0 && (
          <span
            className="bg-olive"
            style={{ width: `${(s.dominada / s.total) * 100}%` }}
          />
        )}
        {s.acertada > 0 && (
          <span
            className="bg-olive-soft"
            style={{ width: `${(s.acertada / s.total) * 100}%` }}
          />
        )}
        {s.fallada > 0 && (
          <span
            className="bg-terracotta"
            style={{ width: `${(s.fallada / s.total) * 100}%` }}
          />
        )}
        {s.vista > 0 && (
          <span
            className="bg-terracotta-soft"
            style={{ width: `${(s.vista / s.total) * 100}%` }}
          />
        )}
      </div>
      <p className="mt-1.5 text-[11px] text-ink-muted">
        Dominada {s.dominada} · Acertada {s.acertada} · Fallada {s.fallada} ·
        No vista {s.no_vista}
      </p>
    </li>
  );
}
