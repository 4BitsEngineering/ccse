"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PracticaDeck } from "@/components/practica/PracticaDeck";
import { snapshotEstados, type EstadoPregunta } from "@/lib/progreso";
import type { Pregunta } from "@/lib/content";

const subscribeProgreso = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  window.addEventListener("ccse:progreso-changed", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("ccse:progreso-changed", cb);
  };
};
const EMPTY_ESTADOS: Record<string, EstadoPregunta> = {};
const getServerEstados = () => EMPTY_ESTADOS;

type Dificultad = "todas" | "facil" | "media" | "dificil";

function normalizeDificultad(d: string): "facil" | "media" | "dificil" {
  const s = d.toLowerCase();
  if (s.startsWith("fac") || s.startsWith("fác")) return "facil";
  if (s.startsWith("dif") || s.startsWith("díf")) return "dificil";
  return "media";
}

export function PracticaWithFilters({
  preguntas,
  contexto,
}: {
  preguntas: Pregunta[];
  contexto: { tarea?: number; titulo: string; href: string };
}) {
  const [search, setSearch] = useState("");
  const [dificultad, setDificultad] = useState<Dificultad>("todas");
  const [soloFalladas, setSoloFalladas] = useState(false);
  const estados = useSyncExternalStore(
    subscribeProgreso,
    snapshotEstados,
    getServerEstados,
  );

  const filtradas = useMemo(() => {
    let out = preguntas;
    if (dificultad !== "todas") {
      out = out.filter(
        (p) => normalizeDificultad(p.dificultad) === dificultad,
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      out = out.filter((p) => {
        if (p.enunciado.toLowerCase().includes(q)) return true;
        const opc = p.opciones as Record<string, string>;
        return Object.values(opc).some((v) => v.toLowerCase().includes(q));
      });
    }
    if (soloFalladas) {
      out = out.filter((p) => estados[p.id]?.estado === "fallada");
    }
    return out;
  }, [preguntas, search, dificultad, soloFalladas, estados]);

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-paper-warm p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Filtros
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label
              htmlFor="search"
              className="text-[11px] uppercase tracking-wide text-ink-muted"
            >
              Buscar texto
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="enunciado, opciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1 bg-cream"
            />
          </div>
          <div>
            <Label
              htmlFor="dif"
              className="text-[11px] uppercase tracking-wide text-ink-muted"
            >
              Dificultad
            </Label>
            <select
              id="dif"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value as Dificultad)}
              className="mt-1 h-8 w-full rounded-md border border-rule bg-cream px-2 text-sm text-ink"
            >
              <option value="todas">todas</option>
              <option value="facil">fácil</option>
              <option value="media">media</option>
              <option value="dificil">difícil</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <input
              id="falladas"
              type="checkbox"
              checked={soloFalladas}
              onChange={(e) => setSoloFalladas(e.target.checked)}
              className="h-4 w-4 mb-2 accent-terracotta"
            />
            <Label htmlFor="falladas" className="text-sm mb-1 text-ink">
              Solo falladas
            </Label>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          {filtradas.length} de {preguntas.length} preguntas
        </p>
      </div>

      {filtradas.length === 0 ? (
        <div className="rounded-2xl bg-cream border border-rule p-5">
          <p className="font-serif text-[15px] leading-relaxed text-ink-soft">
            Ninguna pregunta encaja con esos filtros. Limpia algún filtro o
            cambia los términos de búsqueda.
          </p>
        </div>
      ) : (
        <PracticaDeck
          key={`${search}|${dificultad}|${soloFalladas}|${filtradas.length}`}
          preguntas={filtradas}
          contexto={contexto}
        />
      )}
    </div>
  );
}
