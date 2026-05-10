"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PracticaDeck } from "@/components/practica/PracticaDeck";
import { readEstados, type EstadoPregunta } from "@/lib/progreso";
import type { Pregunta } from "@/lib/content";

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
  const [estados, setEstados] = useState<Record<string, EstadoPregunta>>({});

  useEffect(() => {
    setEstados(readEstados());
  }, []);

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
    <div className="space-y-6">
      <Card className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-3">
          Filtros
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="search" className="text-xs">
              Buscar texto
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="enunciado, opciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dif" className="text-xs">
              Dificultad
            </Label>
            <select
              id="dif"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value as Dificultad)}
              className="mt-1 h-8 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-background px-2 text-sm"
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
              className="h-4 w-4 mb-2"
            />
            <Label htmlFor="falladas" className="text-sm mb-1">
              Solo falladas
            </Label>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          {filtradas.length} de {preguntas.length} preguntas
        </p>
      </Card>

      {filtradas.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Ninguna pregunta encaja con esos filtros. Limpia algún filtro o
            cambia los términos de búsqueda.
          </p>
        </Card>
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
