import Link from "next/link";
import { Seal } from "@/components/ui/seal";

export function LandingFooter() {
  return (
    <footer className="bg-paper-warm border-t border-rule">
      <div className="mx-auto max-w-2xl px-6 py-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Seal size={26} />
            <p className="font-serif text-lg font-medium tracking-wide">CCSE</p>
          </div>
          <p className="text-sm text-ink-muted mt-2">
            4Bits Engineering · Manual CCSE 2026 del Instituto Cervantes.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-ink-soft sm:flex sm:flex-col sm:items-end">
          <Link href="/demo" className="hover:text-ink">
            Demo
          </Link>
          <Link href="/dashboard" className="hover:text-ink">
            Estudiar
          </Link>
          <Link href="/simulacro" className="hover:text-ink">
            Simulacros
          </Link>
          <Link href="/cambios" className="hover:text-ink">
            Cambios
          </Link>
          <Link href="/legal/privacidad" className="hover:text-ink">
            Privacidad
          </Link>
          <Link href="/legal/condiciones" className="hover:text-ink">
            Condiciones
          </Link>
          <Link href="/legal/cookies" className="hover:text-ink">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
