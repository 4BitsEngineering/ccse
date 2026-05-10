"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PreguntaCard } from "@/components/content/PreguntaCard";
import {
  getRepasoQueue,
  readEstados,
  recordAnswer,
  setUltimaActividad,
} from "@/lib/progreso";
import type { Pregunta } from "@/lib/content";

const MAX_REPASO = 20;

export function RepasoClient({ banco }: { banco: Pregunta[] }) {
  const [loaded, setLoaded] = useState(false);
  const [queue, setQueue] = useState<Pregunta[]>([]);
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ aciertos: 0, fallos: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    const estados = readEstados();
    const q = getRepasoQueue(banco, estados, MAX_REPASO);
    setQueue(q);
    setLoaded(true);
    setUltimaActividad({
      tipo: "repaso",
      id: "global",
      titulo: "Repaso espaciado",
      href: "/repaso",
    });
  }, [banco]);

  if (!loaded) {
    return (
      <Card className="p-6 animate-pulse" aria-busy="true">
        <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      </Card>
    );
  }

  if (queue.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold">Sin preguntas que repasar</h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          La cola Leitner se llena conforme practicas. Cada pregunta que
          fallas vuelve a aparecer aquí; cuando la respondes bien varias
          veces seguidas, "duerme" más tiempo y eventualmente pasa a
          dominada.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/practicar/1"
            className={buttonVariants()}
          >
            Empezar a practicar
          </Link>
          <Link
            href="/progreso"
            className={buttonVariants({ variant: "outline" })}
          >
            Ver mi progreso
          </Link>
        </div>
      </Card>
    );
  }

  if (done) {
    const total = queue.length;
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold">Repaso terminado</h2>
        <p className="text-3xl font-mono mt-2">
          {stats.aciertos}
          <span className="text-zinc-400"> / {total}</span>
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Las preguntas que has fallado vuelven a la caja 1; las
          acertadas suben de caja y se reprograman.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={() => location.reload()}>
            Cargar nueva tanda
          </Button>
          <Link
            href="/progreso"
            className={buttonVariants({ variant: "outline" })}
          >
            Ver progreso
          </Link>
        </div>
      </Card>
    );
  }

  const p = queue[idx];
  const isLast = idx === queue.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Pregunta {idx + 1} de {queue.length}
        </span>
        <span className="font-mono">
          {stats.aciertos} ✓ · {stats.fallos} ✗
        </span>
      </div>
      <Progress value={((idx + 1) / queue.length) * 100} />
      <PreguntaCard
        key={p.id}
        pregunta={p}
        mode="instant"
        onAnswer={(selected, correct) => {
          recordAnswer(p, selected, correct);
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
          {isLast ? "Terminar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
