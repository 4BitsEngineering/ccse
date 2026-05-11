import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { BottomTabs } from "@/components/ui/bottom-tabs";

const TABS = [
  { href: "/", label: "Inicio" },
  { href: "/demo", label: "Demo" },
  { href: "/precio", label: "Precio" },
];

/**
 * Layout común para todas las páginas públicas. Header arriba idéntico
 * al de (app)/layout (Logo + avatar Cuenta) y tab bar inferior con los
 * 3 enlaces marketing. La transición entre zonas pública↔autenticada
 * solo cambia los tabs de abajo; el header arriba se queda igual.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-lg font-medium tracking-wide"
            aria-label="CCSE — volver al inicio"
          >
            <Seal size={26} />
            <span>CCSE</span>
          </Link>
          <span className="flex-1" />
          <Link
            href="/cuenta"
            className="grid place-items-center w-9 h-9 rounded-full bg-terracotta-soft text-terracotta-deep font-serif italic text-sm font-medium hover:bg-terracotta hover:text-cream transition-colors"
            aria-label="Tu cuenta"
            title="Tu cuenta"
          >
            T
          </Link>
        </div>
      </header>
      <div className="pb-20">{children}</div>
      <BottomTabs items={TABS} />
    </>
  );
}
