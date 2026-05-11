import Link from "next/link";
import { Seal } from "@/components/ui/seal";

/**
 * Layout común para todas las páginas públicas (landing, demo, precio,
 * cuenta mock, cambios, legal, pregunta SEO, tarea preview).
 * Header con sello + nav minimal (Demo / Precio). Cuando exista auth
 * real (Supabase), aquí entrará un toggle iniciar-sesión / panel.
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
          >
            <Seal size={26} />
            <span>CCSE</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-x-5 text-sm">
            <Link href="/demo" className="text-ink-soft hover:text-ink">
              Demo
            </Link>
            <Link href="/precio" className="text-ink-soft hover:text-ink">
              Precio
            </Link>
          </nav>
          <span className="flex-1" />
          <div className="flex items-center gap-x-4 text-sm">
            <Link
              href="/dashboard"
              className="hidden sm:inline text-ink-soft hover:text-ink"
            >
              Panel
            </Link>
            <Link
              href="/cuenta"
              className="text-ink-soft hover:text-ink"
            >
              Cuenta
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
