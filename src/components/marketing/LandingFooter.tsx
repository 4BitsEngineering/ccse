import Link from "next/link";
import { Seal } from "@/components/ui/seal";

const PRODUCTO = [
  { href: "/demo", label: "Demo gratis" },
  { href: "/precio", label: "Precio" },
  { href: "/dashboard", label: "Panel" },
  { href: "/cuenta", label: "Tu cuenta" },
];

const LEGAL = [
  { href: "/cambios", label: "Cambios" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/condiciones", label: "Condiciones" },
  { href: "/legal/cookies", label: "Cookies" },
];

export function LandingFooter() {
  return (
    <footer className="bg-paper-warm border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-12 grid gap-8 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <div className="flex items-center gap-2.5">
            <Seal size={26} />
            <p className="font-serif text-lg font-medium tracking-wide">CCSE</p>
          </div>
          <p className="text-sm text-ink-muted mt-2">
            4Bits Engineering · Manual CCSE 2026 del Instituto Cervantes.
          </p>
        </div>

        <nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
            Producto
          </p>
          <ul className="space-y-1.5 text-sm text-ink-soft">
            {PRODUCTO.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
            Legal
          </p>
          <ul className="space-y-1.5 text-sm text-ink-soft">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
