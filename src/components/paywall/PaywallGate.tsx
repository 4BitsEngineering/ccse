"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { hasActiveEntitlement } from "@/lib/entitlement";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** título y subtítulo del CTA por defecto */
  title?: string;
  subtitle?: string;
}

/**
 * Gate visual: muestra `children` si hay entitlement activo, si no
 * muestra `fallback` o el CTA por defecto. Hasta que monte en
 * cliente devuelve un placeholder neutro para evitar flash.
 */
export function PaywallGate({
  children,
  fallback,
  title = "Contenido premium",
  subtitle = "Activa tu acceso por 9,99 € durante 365 días para desbloquear esta sección.",
}: Props) {
  const [state, setState] = useState<"loading" | "active" | "locked">(
    "loading",
  );

  useEffect(() => {
    setState(hasActiveEntitlement() ? "active" : "locked");
  }, []);

  if (state === "loading") {
    return (
      <div
        className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 animate-pulse"
        aria-busy="true"
      >
        <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-3 h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  if (state === "active") return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <Card className="p-6 border-2 border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20">
      <h3 className="text-lg font-semibold">🔒 {title}</h3>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {subtitle}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/precio" className={buttonVariants()}>
          Ver precio
        </Link>
        <Link
          href="/demo"
          className={buttonVariants({ variant: "outline" })}
        >
          Probar la demo gratis
        </Link>
      </div>
    </Card>
  );
}
