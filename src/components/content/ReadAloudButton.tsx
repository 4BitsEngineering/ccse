"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { MdSection } from "@/lib/markdown";

const noop = () => () => {};
const ttsSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Lector por voz con navegación por secciones.
 * Lee una sección a la vez y avanza automáticamente a la siguiente.
 *
 * No incluye "Pausar": speechSynthesis.pause/resume es inconsistente
 * en Chromium y Edge (a veces no pausa, a veces no reanuda).
 */
export function ReadAloudButton({ sections }: { sections: MdSection[] }) {
  const supported = useSyncExternalStore(noop, ttsSupported, () => false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [idx, setIdx] = useState(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  // Ref para acceder al índice actual dentro del callback de onend sin stale closure
  const idxRef = useRef(0);

  // Reset al cambiar la prop `sections` (otra ruta). Patrón React 19:
  // ajustar state en render con `useState` comparando contra la prop
  // anterior (cumple react-hooks/set-state-in-effect y react-hooks/refs).
  const [prevSections, setPrevSections] = useState(sections);
  if (prevSections !== sections) {
    setPrevSections(sections);
    setPlaying(false);
    setIdx(0);
  }

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
    if (!supported) return;
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
  }, [supported]);

  // Cancela cualquier utterance pendiente al cambiar de contenido y
  // resetea el cursor de sección a 0.
  useEffect(() => {
    idxRef.current = 0;
    return () => detachAndCancel();
  }, [sections]);

  const speak = (sectionIdx: number, currentRate: number) => {
    if (!sections[sectionIdx]) return;
    detachAndCancel();

    const u = new SpeechSynthesisUtterance(sections[sectionIdx].text);
    u.lang = "es-ES";
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = currentRate;
    u.pitch = 1;

    u.onend = () => {
      if (utterRef.current !== u) return;
      utterRef.current = null;
      const next = idxRef.current + 1;
      if (next < sections.length) {
        // Avanza a la siguiente sección automáticamente
        idxRef.current = next;
        setIdx(next);
        // Pequeño timeout para que el motor de voz no se solape
        setTimeout(() => speak(next, currentRate), 300);
      } else {
        setPlaying(false);
        idxRef.current = 0;
        setIdx(0);
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

  const goTo = (newIdx: number) => {
    const clamped = Math.max(0, Math.min(sections.length - 1, newIdx));
    idxRef.current = clamped;
    setIdx(clamped);
    if (playing) speak(clamped, rate);
  };

  const changeRate = (r: number) => {
    setRate(r);
    if (playing) speak(idxRef.current, r);
  };

  if (!supported || sections.length === 0) return null;

  const current = sections[idx];
  const total = sections.length;

  return (
    <div className="rounded-xl bg-paper-warm border border-rule px-3 py-2 space-y-2">
      {/* Fila superior: etiqueta + controles de sección */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          aria-hidden
          className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted pr-1"
        >
          Escuchar
        </span>

        {/* Navegación sección */}
        <button
          type="button"
          onClick={() => goTo(idx - 1)}
          disabled={idx === 0}
          aria-label="Sección anterior"
          className="h-7 w-7 rounded-md flex items-center justify-center text-ink-soft hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ◀
        </button>

        <span className="text-xs text-ink-soft tabular-nums">
          {idx + 1} / {total}
        </span>

        <button
          type="button"
          onClick={() => goTo(idx + 1)}
          disabled={idx === total - 1}
          aria-label="Sección siguiente"
          className="h-7 w-7 rounded-md flex items-center justify-center text-ink-soft hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ▶
        </button>

        <span className="flex-1" />

        {/* Play / Stop */}
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
            onClick={() => speak(idx, rate)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-terracotta text-cream px-3 h-8 text-xs font-semibold hover:bg-terracotta-deep"
          >
            ▶ Leer
          </button>
        )}

        {/* Velocidad */}
        <div
          role="group"
          aria-label="Velocidad de lectura"
          className="flex items-center gap-1 text-xs"
        >
          {[1, 1.5, 2].map((r) => (
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

      {/* Título de la sección activa */}
      {current.title && (
        <p className="text-xs text-ink-muted truncate pl-0.5">
          {current.title}
        </p>
      )}
    </div>
  );
}
