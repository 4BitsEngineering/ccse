import Link from "next/link";
import { Seal } from "@/components/ui/seal";

const NAV = [
  { href: "/dashboard", label: "Panel" },
  { href: "/practicar", label: "Practicar" },
  { href: "/simulacro", label: "Examen" },
  { href: "/progreso", label: "Progreso" },
];

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
            href="/dashboard"
            className="flex items-center gap-2.5 font-serif text-lg font-medium tracking-wide"
          >
            <Seal size={26} />
            <span>CCSE</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-x-5 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
        {/* Mobile nav: tab bar bajo el header */}
        <nav
          aria-label="Navegación principal"
          className="sm:hidden border-t border-rule"
        >
          <ul className="mx-auto max-w-6xl px-2 flex">
            {NAV.map((item) => (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className="block py-3 text-center text-xs font-medium text-ink-soft hover:bg-paper-warm hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
