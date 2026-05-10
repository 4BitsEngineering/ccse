"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Underline } from "@/components/ui/underline";
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
      <div
        className="rounded-2xl border border-rule bg-paper-warm p-6 animate-pulse"
        aria-busy="true"
      >
        <div className="h-4 w-1/3 rounded bg-rule" />
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border border-rule bg-cream p-6">
        <h2 className="font-serif text-xl font-medium leading-snug">
          Sin preguntas que repasar
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          La cola Leitner se llena conforme practicas. Cada pregunta que fallas
          vuelve a aparecer aquí; cuando la respondes bien varias veces
          seguidas, “duerme” más tiempo y eventualmente pasa a dominada.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/practicar/1"
            className={
              buttonVariants({ variant: "terracotta" }) +
              " h-11 px-4 rounded-xl"
            }
          >
            Empezar a practicar
          </Link>
          <Link
            href="/progreso"
            className={
              buttonVariants({ variant: "ink-outline" }) + " h-11 px-4"
            }
          >
            Ver mi progreso
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    const total = queue.length;
    return (
      <div className="space-y-7">
        <header>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-olive">
            Repaso terminado
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight">
            Hecho.
          </h2>
          <Underline width={80} className="mt-1" />
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
            Las falladas vuelven a la caja 1. Las acertadas suben de caja y se
            reprograman.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="terracotta"
            className="h-12 px-5 rounded-xl text-base"
            onClick={() => location.reload()}
          >
            Cargar nueva tanda
          </Button>
          <Link
            href="/progreso"
            className={
              buttonVariants({ variant: "ink-outline" }) +
              " h-12 px-5 rounded-xl text-base"
            }
          >
            Ver progreso
          </Link>
        </div>
      </div>
    );
  }

  const p = queue[idx];
  const isLast = idx === queue.length - 1;

  return (
    <div className="space-y-7">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-serif italic text-ink-soft">
          {idx + 1} / {queue.length}
        </span>
        <div className="flex-1 h-1 bg-rule rounded-sm overflow-hidden">
          <div
            className="h-full bg-terracotta transition-[width] duration-500"
            style={{ width: `${((idx + 1) / queue.length) * 100}%` }}
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
          {isLast ? "Terminar" : "Siguiente →"}
        </Button>
      </div>
    </div>
  );
}
