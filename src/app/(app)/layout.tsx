import Link from "next/link";

const TAREAS = [
  { n: 1, label: "Tarea 1" },
  { n: 2, label: "Tarea 2" },
  { n: 3, label: "Tarea 3" },
  { n: 4, label: "Tarea 4" },
  { n: 5, label: "Tarea 5" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/" className="font-semibold tracking-tight">
            CCSE
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href="/dashboard"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/simulacro"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Simulacros
            </Link>
            <Link
              href="/repaso"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Repaso
            </Link>
            <Link
              href="/progreso"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Progreso
            </Link>
            <Link
              href="/cuenta"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Cuenta
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            {TAREAS.map((t) => (
              <Link
                key={`e${t.n}`}
                href={`/estudiar/${t.n}`}
                className="text-zinc-700 dark:text-zinc-300 hover:underline"
              >
                Estudiar {t.n}
              </Link>
            ))}
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            {TAREAS.map((t) => (
              <Link
                key={`p${t.n}`}
                href={`/practicar/${t.n}`}
                className="text-zinc-700 dark:text-zinc-300 hover:underline"
              >
                Practicar {t.n}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
