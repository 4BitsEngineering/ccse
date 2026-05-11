import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { BottomTabs } from "@/components/ui/bottom-tabs";

const TABS = [
  { href: "/dashboard", label: "Panel" },
  { href: "/estudiar", label: "Estudiar" },
  { href: "/practicar", label: "Practicar" },
  { href: "/simulacro", label: "Examen" },
  { href: "/progreso", label: "Progreso" },
];

/**
 * Header arriba idéntico al de (public)/layout (Logo + avatar Cuenta)
 * y tab bar inferior con las 5 secciones de la app. Saltar entre zonas
 * solo cambia el contenido de las tabs de abajo; el header arriba se
 * queda idéntico para dar sensación de continuidad.
 */
export default function AppLayout({
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
