"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PreguntaCard } from "@/components/content/PreguntaCard";
import { shuffle } from "@/lib/utils";
import type { Pregunta } from "@/lib/content";

export function PracticaDeck({ preguntas }: { preguntas: Pregunta[] }) {
  const order = useMemo(() => shuffle(preguntas), [preguntas]);
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ aciertos: 0, fallos: 0 });
  const [done, setDone] = useState(false);

  const total = order.length;

  if (done) {
    const pct = Math.round((stats.aciertos / total) * 100);
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Tarea completada</h2>
        <p className="text-3xl font-mono">
          {stats.aciertos}
          <span className="text-zinc-400"> / {total}</span>{" "}
          <span className="text-base text-zinc-500">({pct} %)</span>
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={() => {
              setIdx(0);
              setStats({ aciertos: 0, fallos: 0 });
              setDone(false);
            }}
          >
            Volver a empezar
          </Button>
        </div>
      </Card>
    );
  }

  const p = order[idx];
  const isLast = idx === total - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Pregunta {idx + 1} de {total}
        </span>
        <span className="font-mono">
          {stats.aciertos} ✓ · {stats.fallos} ✗
        </span>
      </div>
      <Progress value={((idx + 1) / total) * 100} />
      <PreguntaCard
        key={p.id}
        pregunta={p}
        mode="instant"
        onAnswer={(_, correct) => {
          setStats((s) =>
            correct
              ? { ...s, aciertos: s.aciertos + 1 }
              : { ...s, fallos: s.fallos + 1 },
          );
        }}
      />
      <div className="flex justify-end">
        <Button
          onClick={() => (isLast ? setDone(true) : setIdx((i) => i + 1))}
        >
          {isLast ? "Terminar" : "Siguiente pregunta"}
        </Button>
      </div>
    </div>
  );
}
