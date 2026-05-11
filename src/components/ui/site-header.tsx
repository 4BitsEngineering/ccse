import Link from "next/link";
import { Seal } from "@/components/ui/seal";

/**
 * Header global único. Mismo conjunto de enlaces en toda la web —
 * pública y autenticada — para que el menú nunca cambie al saltar
 * entre zonas. Las páginas "premium" gestionan su propio paywall
 * dentro del contenido.
 */
const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/demo", label: "Demo" },
  { href: "/precio", label: "Precio" },
  { href: "/dashboard", label: "Panel" },
  { href: "/estudiar", label: "Estudiar" },
  { href: "/practicar", label: "Practicar" },
  { href: "/simulacro", label: "Examen" },
  { href: "/progreso", label: "Progreso" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif text-lg font-medium tracking-wide shrink-0"
          aria-label="CCSE — inicio"
        >
          <Seal size={26} />
          <span className="hidden xs:inline">CCSE</span>
        </Link>
        <span className="flex-1" />
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-x-4 text-sm overflow-x-auto"
        >
          {NAV.map((it) => (
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
            className="ml-2 grid place-items-center w-9 h-9 rounded-full bg-terracotta-soft text-terracotta-deep font-serif italic text-sm font-medium hover:bg-terracotta hover:text-cream transition-colors shrink-0"
            aria-label="Tu cuenta"
            title="Tu cuenta"
          >
            T
          </Link>
        </nav>
      </div>
    </header>
  );
}
