"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  clearEntitlement,
  daysUntilExpiry,
  formatDateEs,
  getEntitlement,
  purchaseMock,
  type Entitlement,
} from "@/lib/entitlement";
import { BuyButton } from "@/components/paywall/BuyButton";
import { cn } from "@/lib/utils";

export function CuentaClient() {
  const [ent, setEnt] = useState<Entitlement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEnt(getEntitlement());
    setLoaded(true);
  }, []);

  const refresh = () => {
    setEnt(getEntitlement());
    window.dispatchEvent(new CustomEvent("ccse:entitlement-changed"));
  };

  const setPaid = () => {
    purchaseMock();
    refresh();
  };

  const setUnpaid = () => {
    clearEntitlement();
    refresh();
  };

  if (!loaded) {
    return (
      <div
        className="rounded-2xl border border-rule bg-paper-warm p-6 animate-pulse"
        aria-busy="true"
      >
        <div className="h-5 w-2/3 rounded bg-rule" />
        <div className="mt-3 h-3 w-1/2 rounded bg-rule" />
      </div>
    );
  }

  const dias = ent ? daysUntilExpiry(ent) : 0;
  const venceProximo = ent && dias <= 30;
  const expirado = ent && dias === 0;
  const isPaid = !!ent && !expirado;

  return (
    <div className="space-y-5">
      {/* Toggle de validación — destacado */}
      <div className="rounded-2xl bg-paper-warm p-5">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Modo validación
          </p>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full",
              isPaid
                ? "bg-olive text-cream"
                : "bg-terracotta-soft text-terracotta-deep",
            )}
          >
            {isPaid ? "Pagado" : "No pagado"}
          </span>
        </div>
        <p className="text-sm text-ink-soft">
          Alterna entre los dos estados para ver cómo se comporta la web con
          y sin acceso. No hay pago real hasta que conectemos Stripe.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={isPaid ? "ink-outline" : "terracotta"}
            size="sm"
            className="h-10 px-4 rounded-xl"
            onClick={setPaid}
            disabled={isPaid}
          >
            Marcar como pagado
          </Button>
          <Button
            variant={!isPaid ? "ink-outline" : "ghost"}
            size="sm"
            className="h-10 px-4 rounded-xl"
            onClick={setUnpaid}
            disabled={!isPaid}
          >
            Marcar como no pagado
          </Button>
        </div>
      </div>

      {!ent ? (
        <div className="rounded-2xl bg-cream border border-rule p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Sin acceso activo
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-snug">
            Aún no has activado tu acceso.
          </h2>
          <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
            Con 4,99 € desbloqueas la plataforma entera durante 365 días.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <BuyButton />
            <Link
              href="/demo"
              className={
                buttonVariants({ variant: "ink-outline" }) + " h-12 px-4"
              }
            >
              Probar la demo
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={
            "rounded-2xl border p-6 " +
            (expirado
              ? "bg-terracotta/[0.07] border-terracotta/30"
              : "bg-cream border-rule")
          }
        >
          <p
            className={
              "text-[11px] font-semibold uppercase tracking-[0.14em] " +
              (expirado ? "text-terracotta-deep" : "text-olive")
            }
          >
            {expirado ? "Acceso expirado" : "Acceso activo"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight">
            {expirado ? (
              "Renueva para seguir."
            ) : (
              <>
                <span className="italic text-terracotta-deep">{dias}</span>{" "}
                días por delante.
              </>
            )}
          </h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-t border-rule">
              <dt className="text-ink-muted">Plan</dt>
              <dd className="font-medium text-ink">
                Anual {ent.manualVersion}
              </dd>
            </div>
            <div className="flex justify-between py-2 border-t border-rule">
              <dt className="text-ink-muted">Activado el</dt>
              <dd className="font-medium text-ink">
                {formatDateEs(ent.purchaseAt)}
              </dd>
            </div>
            <div className="flex justify-between py-2 border-t border-rule">
              <dt className="text-ink-muted">Expira el</dt>
              <dd className="font-medium text-ink">
                {formatDateEs(ent.expiresAt)}
              </dd>
            </div>
            <div className="flex justify-between py-2 border-t border-rule">
              <dt className="text-ink-muted">Origen</dt>
              <dd className="font-serif italic text-ink-soft">
                {ent.source === "mock" ? "modo demo (sin Stripe)" : "Stripe"}
              </dd>
            </div>
          </dl>
          {venceProximo && !expirado && (
            <p className="mt-4 rounded-xl bg-paper-warm p-3 text-sm text-ink-soft">
              Te quedan menos de 30 días. Renueva cuando quieras.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            {expirado ? (
              <BuyButton label="Renovar 4,99 €" />
            ) : (
              <BuyButton label="Renovar otro año" />
            )}
            <Link
              href="/dashboard"
              className={
                buttonVariants({ variant: "ink-outline" }) + " h-12 px-4"
              }
            >
              Ir al panel
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
