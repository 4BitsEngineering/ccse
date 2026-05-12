"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InlineTtsButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  useEffect(() => () => { detachAndCancel(); }, [text]);

  const start = (currentRate: number) => {
    detachAndCancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = currentRate;
    u.pitch = 1;
    u.onend = () => {
      if (utterRef.current === u) { utterRef.current = null; setPlaying(false); }
    };
    u.onerror = () => {
      if (utterRef.current === u) { utterRef.current = null; setPlaying(false); }
    };
    utterRef.current = u;
    setPlaying(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => { detachAndCancel(); setPlaying(false); };

  const changeRate = (r: number) => {
    setRate(r);
    if (playing) start(r);
  };

  if (!supported) return null;

  return (
    <div className="not-prose flex items-center gap-2 mb-4 mt-1">
      {playing ? (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-1 rounded-lg bg-ink text-cream px-2.5 h-7 text-xs font-semibold hover:bg-ink-soft"
        >
          ⏹ Detener
        </button>
      ) : (
        <button
          type="button"
          onClick={() => start(rate)}
          className="inline-flex items-center gap-1 rounded-lg border border-rule bg-paper-warm text-ink-soft px-2.5 h-7 text-xs font-medium hover:bg-cream hover:text-ink"
        >
          ▶ Leer
        </button>
      )}
      <div role="group" aria-label="Velocidad" className="flex items-center gap-0.5">
        {[1, 1.5, 2].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => changeRate(r)}
            className={cn(
              "px-1.5 h-6 rounded text-xs font-mono tabular-nums",
              rate === r ? "bg-ink text-cream" : "text-ink-muted hover:bg-cream",
            )}
          >
            {r}×
          </button>
        ))}
      </div>
    </div>
  );
}
