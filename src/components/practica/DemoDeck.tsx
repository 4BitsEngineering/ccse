"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PreguntaCard } from "@/components/content/PreguntaCard";
import { Underline } from "@/components/ui/underline";
import type { Pregunta } from "@/lib/content";

export function DemoDeck({ preguntas }: { preguntas: Pregunta[] }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [done, setDone] = useState(false);

  if (done) {
    return <DemoResults preguntas={preguntas} answers={answers} />;
  }

  const p = preguntas[idx];
  const isLast = idx === preguntas.length - 1;
  const advance = () => {
    if (isLast) setDone(true);
    else setIdx((i) => i + 1);
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-serif italic text-ink-soft">
          {idx + 1} / {preguntas.length}
        </span>
        <div className="flex-1 h-1 bg-rule rounded-sm overflow-hidden">
          <div
            className="h-full bg-terracotta transition-[width] duration-500"
            style={{ width: `${((idx + 1) / preguntas.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-ink-muted">Sin feedback hasta el final</span>
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
        <Button
          variant="terracotta"
          onClick={advance}
          disabled={!answers.has(p.id)}
          className="h-12 px-5 rounded-xl text-base"
        >
          {isLast ? "Ver resultados →" : "Siguiente →"}
        </Button>
      </div>
    </div>
  );
}

function DemoResults({
  preguntas,
  answers,
}: {
  preguntas: Pregunta[];
  answers: Map<string, string>;
}) {
  const aciertos = preguntas.filter(
    (p) => answers.get(p.id) === p.correcta,
  ).length;
  const total = preguntas.length;
  const pct = Math.round((aciertos / total) * 100);

  const tagline =
    aciertos >= 7
      ? "Buen comienzo. En el examen real necesitas 15 sobre 25."
      : aciertos >= 4
        ? "Vas por el camino. Con preparación estructurada la diferencia se nota rápido."
        : "Aún hay margen. Cada pregunta del banco está explicada en la plataforma completa.";

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta">
          Demo terminada
        </p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight">
          Has acertado{" "}
          <span className="italic text-terracotta-deep">{pct} %</span>.
        </h2>
        <Underline width={150} className="mt-1" />
      </header>

      <div className="rounded-2xl bg-cream border border-rule p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[88px] font-medium leading-none tracking-[-0.04em] text-terracotta">
            {aciertos}
          </span>
          <span className="font-serif italic text-2xl text-ink-muted">
            / {total}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink-soft">{tagline}</p>
      </div>

      {/* CTA conversión: la demo termina aquí, llévate al precio */}
      <div className="rounded-2xl bg-terracotta text-cream p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-90">
          Acceso completo
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-tight tracking-tight">
          Las{" "}
          <span className="italic">otras 290 preguntas</span> con explicación,
          5 simulacros y los apuntes.
        </h3>
        <p className="mt-3 text-sm opacity-90">
          4,99 € una sola vez · 365 días de acceso. Sin suscripción.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/precio"
            className="inline-flex items-center gap-1.5 rounded-xl bg-cream text-terracotta-deep px-4 h-11 text-sm font-semibold hover:bg-paper-warm"
          >
            Ver precio →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 h-11 text-sm font-medium text-cream/90 hover:text-cream"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Revisa cada respuesta
        </p>
        <div className="space-y-6">
          {preguntas.map((p) => (
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

      <div className="pt-4 flex flex-wrap gap-3">
        <Link
          href="/precio"
          className={
            buttonVariants({ variant: "terracotta" }) +
            " h-12 px-5 rounded-xl text-base"
          }
        >
          Activar acceso 4,99 € →
        </Link>
        <Link
          href="/demo"
          className={
            buttonVariants({ variant: "ink-outline" }) +
            " h-12 px-5 rounded-xl text-base"
          }
        >
          Otra ronda de 10 preguntas
        </Link>
      </div>
    </div>
  );
}
