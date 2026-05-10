"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PreguntaCard } from "@/components/content/PreguntaCard";
import { cn } from "@/lib/utils";
import {
  SIMULACRO_APROBADO_MIN,
  SIMULACRO_DURACION_S,
} from "@/lib/simulacro-config";
import type { Pregunta } from "@/lib/content";
import {
  recordAnswer,
  registrarSimulacro,
  setUltimaActividad,
  type SimulacroResultado,
} from "@/lib/progreso";

export function SimulacroDeck({
  preguntas,
  simulacroId,
}: {
  preguntas: Pregunta[];
  simulacroId: number;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [done, setDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SIMULACRO_DURACION_S);
  const startedAt = useRef(Date.now());
  const recorded = useRef(false);

  useEffect(() => {
    setUltimaActividad({
      tipo: "simulacro",
      id: simulacroId,
      titulo: `Simulacro ${simulacroId}`,
      href: `/simulacro/${simulacroId}`,
    });
  }, [simulacroId]);

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      const left = SIMULACRO_DURACION_S - elapsed;
      if (left <= 0) {
        setSecondsLeft(0);
        setDone(true);
        clearInterval(timer);
      } else {
        setSecondsLeft(left);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (!done || recorded.current) return;
    recorded.current = true;
    const aciertos = preguntas.filter(
      (p) => answers.get(p.id) === p.correcta,
    ).length;
    const porTarea: SimulacroResultado["porTarea"] = {};
    for (const p of preguntas) {
      const k = String(p.tarea);
      if (!porTarea[k]) porTarea[k] = { total: 0, aciertos: 0 };
      porTarea[k].total++;
      if (answers.get(p.id) === p.correcta) porTarea[k].aciertos++;
    }
    const falladas = preguntas
      .filter((p) => answers.get(p.id) !== p.correcta)
      .map((p) => p.id);
    for (const p of preguntas) {
      const sel = answers.get(p.id);
      if (sel === undefined) continue;
      recordAnswer(p, sel, sel === p.correcta);
    }
    registrarSimulacro({
      simulacroId,
      fechaIso: new Date().toISOString(),
      total: preguntas.length,
      aciertos,
      porTarea,
      duracionSegundos: Math.min(
        SIMULACRO_DURACION_S,
        Math.floor((Date.now() - startedAt.current) / 1000),
      ),
      preguntasFalladas: falladas,
    });
  }, [done, answers, preguntas, simulacroId]);

  if (done) {
    return (
      <SimulacroResults
        preguntas={preguntas}
        answers={answers}
        simulacroId={simulacroId}
      />
    );
  }

  const p = preguntas[idx];
  const isLast = idx === preguntas.length - 1;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeWarning = secondsLeft <= 5 * 60;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm">
        <span
          className={cn(
            "font-mono text-lg tabular-nums",
            timeWarning && "text-red-600 dark:text-red-400 font-semibold",
          )}
        >
          {mins}:{String(secs).padStart(2, "0")}
        </span>
        <span className="text-zinc-500">
          Pregunta {idx + 1} de {preguntas.length} · {answers.size} respondidas
        </span>
      </div>
      <Progress value={((idx + 1) / preguntas.length) * 100} />
      <PreguntaCard
        key={p.id}
        pregunta={p}
        mode="exam"
        initialSelected={answers.get(p.id)}
        onAnswer={(sel) => {
          setAnswers((prev) => new Map(prev).set(p.id, sel));
        }}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={idx === 0}
            onClick={() => setIdx((i) => i - 1)}
          >
            Anterior
          </Button>
          {isLast ? (
            <Button onClick={() => setDone(true)}>Terminar simulacro</Button>
          ) : (
            <Button onClick={() => setIdx((i) => i + 1)}>Siguiente</Button>
          )}
        </div>
        <details className="text-xs">
          <summary className="cursor-pointer text-zinc-500">
            Saltar a pregunta
          </summary>
          <div className="mt-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {preguntas.map((q, i) => {
              const answered = answers.has(q.id);
              const current = i === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={cn(
                    "h-8 rounded border text-xs font-mono",
                    current &&
                      "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100",
                    !current &&
                      answered &&
                      "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700",
                    !current &&
                      !answered &&
                      "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800",
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}

function SimulacroResults({
  preguntas,
  answers,
  simulacroId,
}: {
  preguntas: Pregunta[];
  answers: Map<string, string>;
  simulacroId: number;
}) {
  const aciertos = preguntas.filter(
    (p) => answers.get(p.id) === p.correcta,
  ).length;
  const total = preguntas.length;
  const pct = Math.round((aciertos / total) * 100);
  const aprobado = aciertos >= SIMULACRO_APROBADO_MIN;

  const porTarea = ([1, 2, 3, 4, 5] as const)
    .map((t) => {
      const ps = preguntas.filter((p) => p.tarea === t);
      const correctas = ps.filter(
        (p) => answers.get(p.id) === p.correcta,
      ).length;
      return { tarea: t, total: ps.length, correctas };
    })
    .filter((x) => x.total > 0);

  const falladas = preguntas.filter(
    (p) => answers.get(p.id) !== p.correcta,
  );

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "p-6 border-2",
          aprobado
            ? "border-green-600 bg-green-50/40 dark:bg-green-950/20"
            : "border-amber-600 bg-amber-50/40 dark:bg-amber-950/20",
        )}
      >
        <h2 className="text-2xl font-semibold mb-1">
          Simulacro {simulacroId} —{" "}
          {aprobado ? "Aprobado ✓" : "No aprobado"}
        </h2>
        <p className="text-4xl font-mono">
          {aciertos}
          <span className="text-zinc-400"> / {total}</span>{" "}
          <span className="text-base text-zinc-500">({pct} %)</span>
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          En el examen real necesitas {SIMULACRO_APROBADO_MIN} aciertos sobre{" "}
          {total} (60 %). Sin penalización por error.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Desglose por tarea</h3>
        <table className="w-full text-sm">
          <tbody>
            {porTarea.map((t) => (
              <tr
                key={t.tarea}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="py-2">Tarea {t.tarea}</td>
                <td className="py-2 text-right font-mono">
                  {t.correctas} / {t.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {falladas.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">
            Preguntas falladas ({falladas.length})
          </h3>
          {falladas.map((p) => (
            <PreguntaCard
              key={p.id}
              pregunta={p}
              mode="exam"
              revealed
              initialSelected={answers.get(p.id)}
            />
          ))}
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/simulacro" className={buttonVariants()}>
          Otro simulacro
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
