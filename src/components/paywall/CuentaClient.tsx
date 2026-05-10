"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  clearEntitlement,
  daysUntilExpiry,
  formatDateEs,
  getEntitlement,
  type Entitlement,
} from "@/lib/entitlement";
import { BuyButton } from "@/components/paywall/BuyButton";

export function CuentaClient() {
  const [ent, setEnt] = useState<Entitlement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEnt(getEntitlement());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-3 h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
      </Card>
    );
  }

  if (!ent) {
    return (
      <Card className="p-6">
        <h2 className="font-semibold text-lg">Sin acceso activo</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Aún no has activado tu acceso. Con 9,99 € desbloqueas la
          plataforma entera durante 365 días.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <BuyButton size="default" />
          <Link
            href="/demo"
            className={buttonVariants({ variant: "outline" })}
          >
            Probar la demo
          </Link>
        </div>
      </Card>
    );
  }

  const dias = daysUntilExpiry(ent);
  const venceProximo = dias <= 30;
  const expirado = dias === 0;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="font-semibold text-lg">
          {expirado
            ? "Acceso expirado"
            : `Acceso activo · ${dias} días`}
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Plan</dt>
            <dd>Anual {ent.manualVersion}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Activado el</dt>
            <dd>{formatDateEs(ent.purchaseAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Expira el</dt>
            <dd>{formatDateEs(ent.expiresAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Origen</dt>
            <dd className="text-zinc-500 italic">
              {ent.source === "mock" ? "modo demo (sin Stripe)" : "Stripe"}
            </dd>
          </div>
        </dl>
        {venceProximo && !expirado && (
          <p className="mt-4 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 p-3 text-sm">
            Te quedan menos de 30 días. Renueva cuando quieras.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          {expirado ? (
            <BuyButton size="default" label="Renovar 9,99 €" />
          ) : (
            <BuyButton size="default" label="Renovar otro año" />
          )}
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline" })}
          >
            Ir al dashboard
          </Link>
        </div>
      </Card>

      <details className="text-xs text-zinc-500">
        <summary className="cursor-pointer">
          Opciones avanzadas (modo demo)
        </summary>
        <div className="mt-3 space-y-2 rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
          <p>
            Eliminar el entitlement local te devuelve al estado de
            visitante sin pago. Útil para probar el paywall.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearEntitlement();
              setEnt(null);
            }}
          >
            Eliminar acceso de este navegador
          </Button>
        </div>
      </details>
    </div>
  );
}
