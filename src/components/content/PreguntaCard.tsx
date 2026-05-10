"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  // El banco usa {a, b, c} para todo, pero las preguntas V/F de Tarea 2
  // dejan c vacío. Filtramos para no renderizar opciones en blanco.
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
    <Card className={cn("p-6", className)}>
      <header className="mb-3 text-xs uppercase tracking-wide text-zinc-500">
        Pregunta {pregunta.id_oficial} · Tarea {pregunta.tarea} ·{" "}
        {pregunta.dificultad}
      </header>
      <h2 className="text-lg font-medium leading-snug mb-4">
        {pregunta.enunciado}
      </h2>
      <ol className="space-y-2 list-none">
        {keys.map((k) => {
          const isCorrect = k === pregunta.correcta;
          const isPicked = selected === k;
          const reveal = showFeedback;
          return (
            <li key={k}>
              <button
                type="button"
                disabled={locked}
                onClick={() => handlePick(k)}
                className={cn(
                  "w-full text-left flex gap-3 rounded-md border border-zinc-200 dark:border-zinc-800 p-3 transition",
                  !locked && "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                  isPicked &&
                    !reveal &&
                    "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800",
                  reveal &&
                    isCorrect &&
                    "border-green-600 bg-green-50 dark:bg-green-950/40",
                  reveal &&
                    isPicked &&
                    !isCorrect &&
                    "border-red-600 bg-red-50 dark:bg-red-950/40",
                )}
              >
                <span className="font-mono font-semibold w-5">
                  {k.toLowerCase()})
                </span>
                <span className="flex-1">{opciones[k]}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {showFeedback && (
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>Respuesta correcta:</strong> {pregunta.correcta}){" "}
            {opciones[pregunta.correcta]}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {pregunta.explicacion}
          </p>
          {pregunta.mnemotecnico && (
            <p className="text-zinc-600 dark:text-zinc-400 italic">
              Mnemotécnico: {pregunta.mnemotecnico}
            </p>
          )}
          {pregunta.explicacion_distractores && (
            <details className="mt-2">
              <summary className="cursor-pointer text-zinc-600 dark:text-zinc-400">
                Por qué fallan las otras opciones
              </summary>
              <ul className="mt-2 space-y-1 list-disc list-inside text-zinc-700 dark:text-zinc-300">
                {Object.entries(pregunta.explicacion_distractores).map(
                  ([k, txt]) => (
                    <li key={k}>
                      <strong>{k})</strong> {txt as string}
                    </li>
                  ),
                )}
              </ul>
            </details>
          )}
        </div>
      )}
    </Card>
  );
}
