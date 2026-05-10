"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatDateEs,
} from "@/lib/entitlement";
import {
  readEstados,
  readSimulacros,
  statsPorTarea,
  type SimulacroResultado,
  type StatsTarea,
} from "@/lib/progreso";
import type { Pregunta } from "@/lib/content";

const TAREA_TITULO: Record<number, string> = {
  1: "Gobierno, legislación y participación",
  2: "Derechos y deberes fundamentales",
  3: "Organización territorial y geografía",
  4: "Cultura e historia",
  5: "Sociedad española",
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
      <Card className="p-6 animate-pulse" aria-busy="true">
        <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      </Card>
    );
  }

  const totalDominadas = stats.reduce((acc, s) => acc + s.dominada, 0);
  const totalPreguntas = stats.reduce((acc, s) => acc + s.total, 0);
  const totalVistas = stats.reduce(
    (acc, s) => acc + s.acertada + s.fallada + s.dominada + s.vista,
    0,
  );
  const pctDominado =
    totalPreguntas > 0
      ? Math.round((totalDominadas / totalPreguntas) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Resumen</h2>
        <div className="flex items-baseline gap-6 mt-3 flex-wrap">
          <div>
            <p className="text-3xl font-mono">{pctDominado} %</p>
            <p className="text-xs text-zinc-500">dominadas del banco</p>
          </div>
          <div>
            <p className="text-2xl font-mono">{totalVistas}</p>
            <p className="text-xs text-zinc-500">preguntas vistas</p>
          </div>
          <div>
            <p className="text-2xl font-mono">{historial.length}</p>
            <p className="text-xs text-zinc-500">simulacros realizados</p>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-lg font-semibold mb-3">Por tarea</h2>
        <div className="space-y-3">
          {stats.map((s) => (
            <BarraTarea key={s.tarea} s={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Historial de simulacros</h2>
        {historial.length === 0 ? (
          <Card className="p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Aún no has hecho ningún simulacro. Cuando termines uno,
              aparecerá aquí con la nota y el desglose por tarea.
            </p>
            <Link
              href="/simulacro"
              className="mt-3 inline-block text-sm font-medium hover:underline"
            >
              Ir a simulacros →
            </Link>
          </Card>
        ) : (
          <ul className="space-y-2">
            {[...historial].reverse().map((r, i) => {
              const aprobado = r.aciertos >= 15;
              return (
                <li key={`${r.fechaIso}-${i}`}>
                  <Card className="p-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-medium">
                        Simulacro {r.simulacroId} ·{" "}
                        <span className="text-zinc-500">
                          {formatDateEs(r.fechaIso)}
                        </span>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {Object.entries(r.porTarea)
                          .sort(([a], [b]) => Number(a) - Number(b))
                          .map(
                            ([t, v]) =>
                              `T${t} ${v.aciertos}/${v.total}`,
                          )
                          .join(" · ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          "font-mono text-lg",
                          aprobado
                            ? "text-green-700 dark:text-green-400"
                            : "text-amber-700 dark:text-amber-400",
                        )}
                      >
                        {r.aciertos}/{r.total}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {aprobado ? "aprobado" : "no aprobado"}
                      </p>
                    </div>
                  </Card>
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
  const pct = s.total === 0 ? 0 : (s.dominada / s.total) * 100;
  return (
    <Card className="p-4">
      <div className="flex justify-between items-baseline mb-2">
        <p className="font-medium">
          Tarea {s.tarea}{" "}
          <span className="text-zinc-500 font-normal text-sm">
            — {TAREA_TITULO[s.tarea]}
          </span>
        </p>
        <p className="font-mono text-sm">
          {s.dominada}/{s.total} dominadas
        </p>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden flex bg-zinc-100 dark:bg-zinc-800">
        {s.dominada > 0 && (
          <span
            className="bg-green-500"
            style={{ width: `${(s.dominada / s.total) * 100}%` }}
          />
        )}
        {s.acertada > 0 && (
          <span
            className="bg-emerald-300 dark:bg-emerald-700"
            style={{ width: `${(s.acertada / s.total) * 100}%` }}
          />
        )}
        {s.fallada > 0 && (
          <span
            className="bg-red-400"
            style={{ width: `${(s.fallada / s.total) * 100}%` }}
          />
        )}
        {s.vista > 0 && (
          <span
            className="bg-zinc-400"
            style={{ width: `${(s.vista / s.total) * 100}%` }}
          />
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Dominada {s.dominada} · Acertada {s.acertada} · Fallada{" "}
        {s.fallada} · No vista {s.no_vista}
      </p>
    </Card>
  );
}
