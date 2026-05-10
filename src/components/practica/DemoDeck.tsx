"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PreguntaCard } from "@/components/content/PreguntaCard";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Pregunta {idx + 1} de {preguntas.length}
        </span>
        <span>Sin feedback hasta el final</span>
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
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setIdx((i) => i - 1)}
          disabled={idx === 0}
        >
          Anterior
        </Button>
        <Button onClick={advance} disabled={!answers.has(p.id)}>
          {isLast ? "Ver resultados" : "Siguiente"}
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
      ? "¡Buen comienzo! En el examen real necesitas 15 aciertos sobre 25."
      : aciertos >= 4
        ? "Vas por el camino. Con preparación estructurada la diferencia se nota rápido."
        : "Aún hay margen. Cada pregunta del banco está explicada en la plataforma completa.";

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Demo terminada</h2>
        <p className="text-3xl font-mono">
          {aciertos}
          <span className="text-zinc-400"> / {total}</span>{" "}
          <span className="text-base text-zinc-500">({pct} %)</span>
        </p>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {tagline}
        </p>
      </Card>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Revisar respuestas</h3>
        {preguntas.map((p) => (
          <PreguntaCard
            key={p.id}
            pregunta={p}
            mode="exam"
            revealed
            initialSelected={answers.get(p.id)}
          />
        ))}
      </section>
    </div>
  );
}
