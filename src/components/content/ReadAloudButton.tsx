"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lector por voz usando Web Speech API. Una sola utterance con el
 * texto completo (los temas caben holgadamente en el límite ~32K
 * caracteres de Chrome). Botones Leer / Detener + selector de
 * velocidad. Cambiar velocidad mientras suena reinicia la lectura
 * desde el principio (la API no permite ajustar la rate de una
 * utterance ya en curso).
 *
 * No se incluye "Pausar" porque speechSynthesis.pause()/resume() es
 * inconsistente en Chromium y Edge: a veces no pausa, a veces no
 * reanuda. Mejor un botón Detener limpio que un pause que falla en
 * silencio.
 */
export function ReadAloudButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cancela una utterance "limpiamente": desactiva sus handlers antes
  // de llamar a cancel() para que su onend (que se dispara al cancelar)
  // no machaque el state que acabamos de cambiar.
  const detachAndCancel = () => {
    if (utterRef.current) {
      utterRef.current.onend = null;
      utterRef.current.onerror = null;
      utterRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang === "es-ES") ??
        voices.find((v) => v.lang.startsWith("es")) ??
        null;
    };
    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      detachAndCancel();
    };
  }, []);

  // Si cambia el texto (otra ruta), para la voz anterior.
  useEffect(
    () => () => {
      detachAndCancel();
    },
    [text],
  );

  const start = (currentRate: number) => {
    detachAndCancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = currentRate;
    u.pitch = 1;
    u.onend = () => {
      if (utterRef.current === u) {
        utterRef.current = null;
        setPlaying(false);
      }
    };
    u.onerror = () => {
      if (utterRef.current === u) {
        utterRef.current = null;
        setPlaying(false);
      }
    };
    utterRef.current = u;
    setPlaying(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    detachAndCancel();
    setPlaying(false);
  };

  const changeRate = (r: number) => {
    setRate(r);
    if (playing) start(r);
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
      {playing ? (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-1.5 rounded-lg bg-ink text-cream px-3 h-8 text-xs font-semibold hover:bg-ink-soft"
        >
          ⏹ Detener
        </button>
      ) : (
        <button
          type="button"
          onClick={() => start(rate)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-terracotta text-cream px-3 h-8 text-xs font-semibold hover:bg-terracotta-deep"
        >
          ▶ Leer tema
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
            onClick={() => changeRate(r)}
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
