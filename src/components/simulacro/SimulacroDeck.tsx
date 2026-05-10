"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Underline } from "@/components/ui/underline";
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
    <div className="space-y-7">
      {/* Header sticky: cronómetro + barra 25 segments */}
      <div className="pb-4 border-b border-rule">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Simulacro nº {simulacroId}
            </p>
            <p className="mt-0.5 font-serif italic text-[15px] text-ink-soft">
              pregunta {idx + 1} de {preguntas.length}
            </p>
          </div>
          <span className="flex-1" />
          <div
            className={cn(
              "px-3.5 py-2 rounded-lg font-mono text-lg font-medium tabular-nums tracking-wide",
              timeWarning
                ? "bg-terracotta text-cream animate-pulse"
                : "bg-ink text-cream",
            )}
          >
            {mins}:{String(secs).padStart(2, "0")}
          </div>
        </div>

        {/* 25 segments */}
        <div className="mt-3 flex gap-1">
          {preguntas.map((q, i) => {
            const answered = answers.has(q.id);
            const current = i === idx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Ir a pregunta ${i + 1}`}
                className={cn(
                  "flex-1 h-1.5 rounded-sm transition-colors",
                  current
                    ? "bg-terracotta"
                    : answered
                      ? "bg-ink"
                      : "bg-rule hover:bg-ink-muted",
                )}
              />
            );
          })}
        </div>
      </div>

      <PreguntaCard
        key={p.id}
        pregunta={p}
        mode="exam"
        initialSelected={answers.get(p.id)}
        onAnswer={(sel) => {
          setAnswers((prev) => new Map(prev).set(p.id, sel));
        }}
      />

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          disabled={idx === 0}
          onClick={() => setIdx((i) => i - 1)}
          className="h-12 px-4 bg-paper-warm text-ink-soft rounded-xl"
        >
          ← anterior
        </Button>
        <span className="flex-1" />
        {isLast ? (
          <Button
            variant="terracotta"
            onClick={() => setDone(true)}
            className="h-12 px-5 rounded-xl text-base"
          >
            Terminar simulacro
          </Button>
        ) : (
          <Button
            variant="terracotta"
            onClick={() => setIdx((i) => i + 1)}
            className="h-12 px-5 rounded-xl text-base"
          >
            siguiente →
          </Button>
        )}
      </div>
    </div>
  );
}

const TAREA_LABEL: Record<number, string> = {
  1: "Gobierno",
  2: "Derechos",
  3: "Territorial",
  4: "Historia",
  5: "Vida diaria",
};

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
    <div className="space-y-8">
      <header>
        <p
          className={cn(
            "text-[11px] font-bold uppercase tracking-[0.14em]",
            aprobado ? "text-olive" : "text-terracotta-deep",
          )}
        >
          {aprobado ? "Aprobado" : "No aprobado"}
        </p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
          {aprobado ? (
            <>
              Si fuera el examen
              <br />
              <span className="italic text-terracotta-deep">de verdad, hoy</span>{" "}
              aprobarías.
            </>
          ) : (
            <>
              Casi.{" "}
              <span className="italic text-terracotta-deep">Volvamos</span> a las
              falladas.
            </>
          )}
        </h2>
        <Underline width={180} className="mt-1" />
      </header>

      <div className="rounded-2xl bg-cream border border-rule p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[96px] font-medium leading-none tracking-[-0.04em] text-terracotta">
            {aciertos}
          </span>
          <span className="font-serif italic text-2xl text-ink-muted">
            / {total}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Necesitabas{" "}
          <strong className="font-sans text-ink">
            {SIMULACRO_APROBADO_MIN}
          </strong>{" "}
          para aprobar (60 % de aciertos, sin penalización por error).
        </p>
      </div>

      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Desglose por tarea
        </p>
        <ul>
          {porTarea.map((t) => {
            const pct = t.correctas / t.total;
            const allRight = pct === 1;
            return (
              <li
                key={t.tarea}
                className="flex items-center gap-3 py-3 border-b border-rule first:border-t first:border-t-rule"
              >
                <span
                  className={cn(
                    "w-7 h-7 rounded-lg grid place-items-center font-serif italic text-[13px] text-cream",
                    allRight ? "bg-olive" : "bg-terracotta-soft",
                  )}
                >
                  {t.tarea}
                </span>
                <span className="flex-1 font-sans text-[14.5px] text-ink">
                  {TAREA_LABEL[t.tarea] ?? `Tarea ${t.tarea}`}
                </span>
                <div className="w-20 h-1 rounded-sm bg-rule">
                  <div
                    className={cn(
                      "h-full rounded-sm",
                      allRight ? "bg-olive" : "bg-terracotta",
                    )}
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
                <span className="font-serif italic text-[14.5px] text-ink w-12 text-right tabular-nums">
                  {t.correctas}/{t.total}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {falladas.length > 0 && (
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep mb-3">
            {falladas.length} para repasar
          </p>
          <div className="space-y-4">
            {falladas.map((p) => (
              <PreguntaCard
                key={p.id}
                pregunta={p}
                mode="exam"
                revealed
                initialSelected={answers.get(p.id)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/simulacro"
          className={
            buttonVariants({ variant: "terracotta" }) +
            " h-12 px-5 rounded-xl text-base"
          }
        >
          Otro simulacro →
        </Link>
        <Link
          href="/dashboard"
          className={
            buttonVariants({ variant: "ink-outline" }) +
            " h-12 px-5 rounded-xl text-base"
          }
        >
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
