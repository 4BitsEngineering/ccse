"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { formatDateEs } from "@/lib/entitlement";
import {
  snapshotUltimaActividad,
  type UltimaActividad,
} from "@/lib/progreso";

const TIPO_LABEL: Record<UltimaActividad["tipo"], string> = {
  practicar: "Práctica",
  estudiar: "Estudio",
  simulacro: "Simulacro",
  repaso: "Repaso",
};

const subscribeProgreso = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  window.addEventListener("ccse:progreso-changed", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("ccse:progreso-changed", cb);
  };
};
const getServerActividad = () => null;

export function DashboardContinuar() {
  // null tanto en SSR como mientras no haya actividad → no renderiza nada.
  const act = useSyncExternalStore(
    subscribeProgreso,
    snapshotUltimaActividad,
    getServerActividad,
  );

  if (!act) return null;

  return (
    <div className="mb-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-2">
        Donde lo dejaste
      </p>
      <Link
        href={act.href}
        className="block rounded-2xl bg-ink text-cream p-5 sm:p-6 hover:bg-ink-soft transition-colors group"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-soft">
          {TIPO_LABEL[act.tipo]} · {formatDateEs(act.cuandoIso)}
        </p>
        <p className="mt-2 font-serif text-2xl font-medium leading-snug tracking-tight group-hover:underline decoration-terracotta decoration-2 underline-offset-4">
          {act.titulo} →
        </p>
      </Link>
    </div>
  );
}
