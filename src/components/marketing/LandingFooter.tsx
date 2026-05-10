import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">CCSE</p>
          <p className="text-sm text-zinc-500 mt-1">
            4Bits Engineering · Manual CCSE 2026 del Instituto Cervantes
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <Link href="/demo" className="hover:underline">
            Demo
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Estudiar
          </Link>
          <Link href="/simulacro" className="hover:underline">
            Simulacros
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600">
            Privacidad · Condiciones · Cambios (próximamente)
          </span>
        </nav>
      </div>
    </footer>
  );
}
