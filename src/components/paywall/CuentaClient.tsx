"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  daysUntilExpiry,
  formatDateEs,
  getEntitlement,
  syncEntitlementFromServer,
  type Entitlement,
} from "@/lib/entitlement";
import { BuyButton } from "@/components/paywall/BuyButton";
import { ReciboButton } from "@/components/paywall/ReciboButton";

export function CuentaClient() {
  const [ent, setEnt] = useState<Entitlement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    syncEntitlementFromServer().then(() => {
      if (!alive) return;
      setEnt(getEntitlement());
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, []);

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

  return (
    <div className="space-y-5">
      {!ent ? (
        <div className="rounded-2xl bg-cream border border-rule p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Sin acceso activo
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-snug">
            Aún no has activado tu acceso.
          </h2>
          <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
            Con 9,99 € desbloqueas la plataforma entera durante 365 días.
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
              <BuyButton label="Renovar 9,99 €" />
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
            {ent.hasStripeCustomer && <ReciboButton />}
          </div>
        </div>
      )}
    </div>
  );
}
