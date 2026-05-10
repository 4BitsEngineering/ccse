"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Pregunta } from "@/lib/content";

export type PreguntaMode = "instant" | "exam";

interface Props {
  pregunta: Pregunta;
  mode: PreguntaMode;
  /** initial picked option, for resuming state */
  initialSelected?: string;
  /** parent callback after user picks an option */
  onAnswer?: (selected: string, correct: boolean) => void;
  /** in exam mode, true reveals correct answer + explanation */
  revealed?: boolean;
  className?: string;
}

const DIFICULTAD_LABEL: Record<string, string> = {
  facil: "fácil",
  "fácil": "fácil",
  media: "media",
  dificil: "difícil",
  "difícil": "difícil",
};

export function PreguntaCard({
  pregunta,
  mode,
  initialSelected,
  onAnswer,
  revealed,
  className,
}: Props) {
  const [selected, setSelected] = useState<string | null>(
    initialSelected ?? null,
  );
  const opciones = pregunta.opciones as Record<string, string>;
  // El banco usa {a, b, c} para todo, pero las V/F de Tarea 2 dejan c
  // vacío. Filtramos para no renderizar opciones en blanco.
  const keys = Object.keys(opciones).filter(
    (k) => (opciones[k] ?? "").trim() !== "",
  );
  const showFeedback =
    mode === "instant" ? selected !== null : revealed === true;
  const locked =
    (mode === "instant" && selected !== null) ||
    (mode === "exam" && revealed === true);

  const handlePick = (k: string) => {
    if (locked) return;
    setSelected(k);
    onAnswer?.(k, k === pregunta.correcta);
  };

  return (
    <article className={cn("w-full", className)}>
      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-full bg-paper-warm border border-rule text-[11px] font-medium tracking-wide text-ink-soft">
          Tarea {pregunta.tarea}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-olive/10 text-olive text-[11px] font-medium">
          {DIFICULTAD_LABEL[pregunta.dificultad] ?? pregunta.dificultad}
        </span>
        <span className="ml-auto text-[11px] text-ink-muted self-center">
          nº {pregunta.id_oficial}
        </span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-[1.2] tracking-tight text-balance">
        {pregunta.enunciado}
      </h2>

      <ol className="mt-7 space-y-2.5 list-none">
        {keys.map((k) => {
          const isCorrect = k === pregunta.correcta;
          const isPicked = selected === k;
          const reveal = showFeedback;

          // Estados visuales (Direction B):
          // - default: cream + rule
          // - picked sin reveal (exam): ink fondo + cream texto
          // - reveal & correct: paper-warm verdoso + olive border
          // - reveal & wrong picked: terracota-soft + terracota border
          let bg = "bg-cream";
          let border = "border-rule";
          let textColor = "text-ink";
          let bubbleBg = "bg-paper-warm";
          let bubbleText = "text-ink";
          let bubbleContent: string = k.toLowerCase();

          if (reveal && isCorrect) {
            bg = "bg-olive/10";
            border = "border-olive";
            bubbleBg = "bg-olive";
            bubbleText = "text-cream";
            bubbleContent = "✓";
          } else if (reveal && isPicked && !isCorrect) {
            bg = "bg-terracotta-soft/30";
            border = "border-terracotta";
            bubbleBg = "bg-terracotta";
            bubbleText = "text-cream";
            bubbleContent = "✗";
          } else if (reveal) {
            textColor = "text-ink-muted";
          } else if (isPicked) {
            bg = "bg-ink";
            border = "border-ink";
            textColor = "text-cream";
            bubbleBg = "bg-cream";
            bubbleText = "text-ink";
          }

          return (
            <li key={k}>
              <button
                type="button"
                disabled={locked}
                onClick={() => handlePick(k)}
                className={cn(
                  "w-full text-left flex items-start gap-3.5 rounded-2xl border-[1.5px] p-4 transition-colors",
                  bg,
                  border,
                  !locked && "hover:border-ink/40",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 w-8 h-8 rounded-full grid place-items-center font-serif italic text-[15px] font-medium",
                    bubbleBg,
                    bubbleText,
                  )}
                >
                  {bubbleContent}
                </span>
                <span
                  className={cn(
                    "flex-1 font-serif text-[16.5px] leading-snug pt-0.5",
                    textColor,
                    reveal && isCorrect && "font-semibold",
                  )}
                >
                  {opciones[k]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {showFeedback && (
        <div className="mt-5 rounded-2xl bg-paper-warm p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Por qué
          </p>
          <p className="mt-2 font-serif text-[16px] leading-relaxed text-ink text-pretty">
            {pregunta.explicacion}
          </p>
          {pregunta.mnemotecnico && (
            <div className="mt-3 rounded-xl bg-cream p-3 flex gap-2 items-start">
              <span className="font-serif italic text-2xl text-terracotta leading-none">
                “
              </span>
              <span className="font-serif italic text-sm text-ink-soft flex-1 pt-1">
                {pregunta.mnemotecnico}
              </span>
            </div>
          )}
          {pregunta.explicacion_distractores && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-medium uppercase tracking-wide text-ink-muted hover:text-ink">
                Por qué fallan las otras opciones
              </summary>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                {Object.entries(pregunta.explicacion_distractores).map(
                  ([k, txt]) => (
                    <li key={k}>
                      <strong className="font-sans text-ink">{k})</strong>{" "}
                      {txt as string}
                    </li>
                  ),
                )}
              </ul>
            </details>
          )}
        </div>
      )}
    </article>
  );
}
