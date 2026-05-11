"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type State = "idle" | "playing" | "paused";

/**
 * Lector por voz usando Web Speech API (sin backend, sin coste). La
 * calidad depende de las voces del sistema operativo del usuario —
 * suficiente para B1. Selecciona la primera voz disponible en es-ES,
 * con fallback a la primera voz "es-*".
 *
 * El texto largo se trocea en frases para que el motor del navegador
 * no se atragante (Chrome mete límite ~32K caracteres por utterance
 * y a veces corta antes).
 */
export function ReadAloudButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [rate, setRate] = useState(1);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const idxRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const esES = voices.find((v) => v.lang === "es-ES");
      const esAny = voices.find((v) => v.lang.startsWith("es"));
      voiceRef.current = esES ?? esAny ?? null;
    };
    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Si el componente se desmonta o el texto cambia, parar.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text]);

  const buildQueue = () => {
    // Trocea por frases (. ! ? saltos) para no exceder límites del motor.
    const chunks = text
      .split(/(?<=[.!?])\s+|\n\n+/g)
      .map((s) => s.trim())
      .filter(Boolean);
    queueRef.current = chunks.map((chunk) => {
      const u = new SpeechSynthesisUtterance(chunk);
      u.lang = "es-ES";
      if (voiceRef.current) u.voice = voiceRef.current;
      u.rate = rate;
      u.pitch = 1;
      return u;
    });
    idxRef.current = 0;
  };

  const playFrom = (i: number) => {
    const q = queueRef.current;
    if (i >= q.length) {
      setState("idle");
      return;
    }
    const u = q[i];
    u.onend = () => {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        return;
      }
      idxRef.current = i + 1;
      playFrom(i + 1);
    };
    u.onerror = () => {
      setState("idle");
    };
    window.speechSynthesis.speak(u);
  };

  const handlePlay = () => {
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }
    window.speechSynthesis.cancel();
    buildQueue();
    setState("playing");
    playFrom(0);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setState("paused");
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setState("idle");
    idxRef.current = 0;
  };

  const handleRateChange = (next: number) => {
    setRate(next);
    if (state !== "idle") {
      // Reiniciar la cola con la nueva velocidad desde el chunk actual.
      const resumeIdx = idxRef.current;
      window.speechSynthesis.cancel();
      buildQueue();
      setState("playing");
      playFrom(resumeIdx);
    }
  };

  if (!supported) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-paper-warm border border-rule px-3 py-2">
      <span
        aria-hidden
        className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted pr-1"
      >
        Escuchar
      </span>
      {state === "playing" ? (
        <button
          type="button"
          onClick={handlePause}
          className="inline-flex items-center gap-1.5 rounded-lg bg-terracotta text-cream px-3 h-8 text-xs font-semibold hover:bg-terracotta-deep"
        >
          ⏸ Pausar
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-1.5 rounded-lg bg-terracotta text-cream px-3 h-8 text-xs font-semibold hover:bg-terracotta-deep"
        >
          ▶ {state === "paused" ? "Continuar" : "Leer tema"}
        </button>
      )}
      {state !== "idle" && (
        <button
          type="button"
          onClick={handleStop}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink text-ink px-3 h-8 text-xs font-semibold hover:bg-ink hover:text-cream"
        >
          ⏹ Detener
        </button>
      )}
      <span className="flex-1" />
      <div
        role="group"
        aria-label="Velocidad de lectura"
        className="flex items-center gap-1 text-xs"
      >
        {[1, 1.25, 1.5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRateChange(r)}
            className={cn(
              "px-2 h-7 rounded-md font-mono tabular-nums",
              rate === r
                ? "bg-ink text-cream"
                : "text-ink-soft hover:bg-cream",
            )}
          >
            {r}×
          </button>
        ))}
      </div>
    </div>
  );
}
