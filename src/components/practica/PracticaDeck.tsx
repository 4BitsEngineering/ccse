"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PreguntaCard } from "@/components/content/PreguntaCard";
import { Underline } from "@/components/ui/underline";
import { shuffle } from "@/lib/utils";
import type { Pregunta } from "@/lib/content";
import { recordAnswer, setUltimaActividad } from "@/lib/progreso";

export function PracticaDeck({
  preguntas,
  contexto,
}: {
  preguntas: Pregunta[];
  contexto?: { tarea?: number; titulo: string; href: string };
}) {
  const order = useMemo(() => shuffle(preguntas), [preguntas]);
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ aciertos: 0, fallos: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!contexto) return;
    setUltimaActividad({
      tipo: "practicar",
      id: contexto.tarea ?? "general",
      titulo: contexto.titulo,
      href: contexto.href,
    });
  }, [contexto]);

  const total = order.length;

  if (done) {
    const pct = Math.round((stats.aciertos / total) * 100);
    const aprobaria = stats.aciertos / total >= 0.6;
    return (
      <div className="space-y-7">
        <header>
          <p
            className={
              "text-[11px] font-bold uppercase tracking-[0.14em] " +
              (aprobaria ? "text-olive" : "text-terracotta-deep")
            }
          >
            Tarea completada
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight">
            {aprobaria ? "Buen ritmo." : "A seguir."}{" "}
            <span className="italic text-terracotta-deep">{pct} %</span>
          </h2>
          <Underline width={120} className="mt-1" />
        </header>

        <div className="rounded-2xl bg-cream border border-rule p-6">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-7xl font-medium leading-none tracking-[-0.04em] text-terracotta">
              {stats.aciertos}
            </span>
            <span className="font-serif italic text-2xl text-ink-muted">
              / {total}
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            {stats.fallos} fallo{stats.fallos === 1 ? "" : "s"} · vuelven al
            repaso espaciado.
          </p>
        </div>

        <Button
          variant="terracotta"
          className="h-12 px-5 rounded-xl text-base"
          onClick={() => {
            setIdx(0);
            setStats({ aciertos: 0, fallos: 0 });
            setDone(false);
          }}
        >
          Volver a empezar
        </Button>
      </div>
    );
  }

  const p = order[idx];
  const isLast = idx === total - 1;

  return (
    <div className="space-y-7">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-serif italic text-ink-soft">
          {idx + 1} / {total}
        </span>
        <div className="flex-1 h-1 bg-rule rounded-sm overflow-hidden">
          <div
            className="h-full bg-terracotta transition-[width] duration-500"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-ink-muted">
          <span className="text-olive">{stats.aciertos}</span> ·{" "}
          <span className="text-terracotta">{stats.fallos}</span>
        </span>
      </div>

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
          variant="terracotta"
          className="h-12 px-5 rounded-xl text-base"
          onClick={() => (isLast ? setDone(true) : setIdx((i) => i + 1))}
        >
          {isLast ? "Terminar" : "Siguiente pregunta →"}
        </Button>
      </div>
    </div>
  );
}
