"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hasActiveEntitlement } from "@/lib/entitlement";

interface NavItem {
  href: string;
  label: string;
}

const NAV_GUEST: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/demo", label: "Demo" },
  { href: "/precio", label: "Precio" },
];

const NAV_PAID: NavItem[] = [
  { href: "/dashboard", label: "Panel" },
  { href: "/estudiar", label: "Estudiar" },
  { href: "/practicar", label: "Practicar" },
  { href: "/simulacro", label: "Examen" },
  { href: "/progreso", label: "Progreso" },
];

/**
 * Header global. Lee el estado de entitlement en cliente y muestra el
 * menú correspondiente:
 *  - sin acceso → Inicio · Demo · Precio
 *  - con acceso → Panel · Estudiar · Practicar · Examen · Progreso
 *
 * Escucha el evento "ccse:entitlement-changed" para refrescar el menú
 * en cuanto /cuenta cambia el estado pagado/no-pagado en la misma
 * pestaña (storage events no llegan a la propia ventana).
 */
export function SiteHeader() {
  const [paid, setPaid] = useState<boolean>(false);

  useEffect(() => {
    const refresh = () => setPaid(hasActiveEntitlement());
    refresh();
    window.addEventListener("ccse:entitlement-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ccse:entitlement-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const items = paid ? NAV_PAID : NAV_GUEST;

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-6">
        <Link
          href="/"
          className="flex items-baseline gap-2.5 shrink-0"
          aria-label="CCSE — inicio"
        >
          <span className="font-serif text-xl font-medium tracking-tight">
            CCSE
          </span>
          <span className="hidden sm:inline font-serif italic text-sm text-ink-muted">
            Examen de nacionalidad
          </span>
        </Link>
        <span className="flex-1" />
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-x-4 text-sm overflow-x-auto"
        >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-ink-soft hover:text-ink whitespace-nowrap"
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/cuenta"
            className={
              "ml-2 grid place-items-center w-9 h-9 rounded-full font-serif italic text-sm font-medium transition-colors shrink-0 " +
              (paid
                ? "bg-olive text-cream hover:bg-olive/90"
                : "bg-terracotta-soft text-terracotta-deep hover:bg-terracotta hover:text-cream")
            }
            aria-label="Tu cuenta"
            title={paid ? "Tu cuenta · acceso activo" : "Tu cuenta · sin acceso"}
          >
            T
          </Link>
        </nav>
      </div>
    </header>
  );
}
