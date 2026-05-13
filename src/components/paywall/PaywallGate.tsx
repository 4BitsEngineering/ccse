"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { hasActiveEntitlement } from "@/lib/entitlement";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** título y subtítulo del CTA por defecto */
  title?: string;
  subtitle?: string;
}

const subscribeEntitlement = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  window.addEventListener("ccse:entitlement-changed", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("ccse:entitlement-changed", cb);
  };
};
const getEntitlementState = () =>
  hasActiveEntitlement() ? "active" : "locked";
const getEntitlementServerState = () => "loading" as const;

/**
 * Gate visual: muestra `children` si hay entitlement activo, si no
 * muestra `fallback` o el CTA por defecto. En SSR devuelve un
 * placeholder neutro para evitar flash.
 */
export function PaywallGate({
  children,
  fallback,
  title = "Contenido premium",
  subtitle = "Activa tu acceso por 9,99 € durante 365 días para desbloquear esta sección.",
}: Props) {
  const state = useSyncExternalStore(
    subscribeEntitlement,
    getEntitlementState,
    getEntitlementServerState,
  );

  if (state === "loading") {
    return (
      <div
        className="rounded-2xl border border-rule bg-paper-warm p-6 animate-pulse"
        aria-busy="true"
      >
        <div className="h-4 w-1/3 rounded bg-rule" />
        <div className="mt-3 h-3 w-2/3 rounded bg-rule" />
      </div>
    );
  }

  if (state === "active") return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <div className="rounded-2xl bg-terracotta/[0.07] border border-terracotta/30 p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
        Acceso completo
      </p>
      <h3 className="mt-2 font-serif text-xl font-medium leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
        {subtitle}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/precio"
          className={
            buttonVariants({ variant: "terracotta" }) +
            " h-11 px-4 rounded-xl text-sm"
          }
        >
          Ver precio
        </Link>
        <Link
          href="/demo"
          className={
            buttonVariants({ variant: "ghost" }) +
            " h-11 px-4 text-sm text-ink-soft hover:bg-paper-warm"
          }
        >
          Probar la demo
        </Link>
      </div>
    </div>
  );
}
