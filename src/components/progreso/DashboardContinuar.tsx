"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatDateEs } from "@/lib/entitlement";
import { getUltimaActividad, type UltimaActividad } from "@/lib/progreso";

const TIPO_LABEL: Record<UltimaActividad["tipo"], string> = {
  practicar: "Practicar",
  estudiar: "Estudiar",
  simulacro: "Simulacro",
  repaso: "Repaso",
};

export function DashboardContinuar() {
  const [act, setAct] = useState<UltimaActividad | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAct(getUltimaActividad());
    setLoaded(true);
  }, []);

  if (!loaded || !act) return null;

  return (
    <Card className="p-5 mb-6 border-zinc-300 dark:border-zinc-700">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Continuar donde lo dejaste
      </p>
      <Link href={act.href} className="mt-2 block group">
        <p className="text-lg font-semibold group-hover:underline">
          {TIPO_LABEL[act.tipo]} · {act.titulo} →
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Última visita el {formatDateEs(act.cuandoIso)}
        </p>
      </Link>
    </Card>
  );
}
