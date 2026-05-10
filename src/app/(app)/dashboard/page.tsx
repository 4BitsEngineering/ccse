import Link from "next/link";
import { Card } from "@/components/ui/card";
import { loadBanco } from "@/lib/content";
import { TEMA_PDF, MANUAL_OFICIAL_PDF } from "@/lib/pdfs";

const TAREAS = [
  { n: 1, titulo: "Gobierno, legislación y participación" },
  { n: 2, titulo: "Derechos y deberes fundamentales" },
  { n: 3, titulo: "Organización territorial y geografía" },
  { n: 4, titulo: "Cultura e historia" },
  { n: 5, titulo: "Sociedad española" },
] as const;

export const metadata = {
  title: "Dashboard — CCSE",
};

export default function DashboardPage() {
  const banco = loadBanco();
  const conteoPorTarea = TAREAS.map((t) => ({
    ...t,
    total: banco.preguntas.filter((p) => p.tarea === t.n).length,
  }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manual {banco.version_manual} · {banco.preguntas.length} preguntas
          oficiales · 5 simulacros.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Tracking de progreso pendiente (Sprint 3). Por ahora cada práctica
          empieza desde cero.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {conteoPorTarea.map((t) => (
          <Card key={t.n} className="p-5">
            <h2 className="font-semibold text-lg">Tarea {t.n}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t.titulo}
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              {t.total} preguntas en el banco
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link
                href={`/estudiar/${t.n}`}
                className="font-medium hover:underline"
              >
                Estudiar
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <Link
                href={`/practicar/${t.n}`}
                className="font-medium hover:underline"
              >
                Practicar
              </Link>
            </div>
          </Card>
        ))}
        <Card className="p-5">
          <h2 className="font-semibold text-lg">Simulacros</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            5 exámenes completos en formato real (45 min, 25 preguntas).
          </p>
          <p className="mt-3 text-xs text-zinc-500">15 aciertos para aprobar</p>
          <div className="mt-4 text-sm">
            <Link
              href="/simulacro"
              className="font-medium hover:underline"
            >
              Ver simulacros →
            </Link>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Descargas</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Los 5 temas en PDF para leer offline o imprimir, más el manual
          oficial del Instituto Cervantes.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {conteoPorTarea.map((t) => (
            <li key={`pdf-${t.n}`}>
              <a
                href={TEMA_PDF[t.n as 1 | 2 | 3 | 4 | 5]}
                download
                className="flex items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition"
              >
                <span>
                  <span className="font-medium">Tarea {t.n}</span>{" "}
                  <span className="text-zinc-500">— {t.titulo}</span>
                </span>
                <span aria-hidden className="text-zinc-400">
                  ↓ PDF
                </span>
              </a>
            </li>
          ))}
          <li className="sm:col-span-2">
            <a
              href={MANUAL_OFICIAL_PDF}
              download
              className="flex items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition"
            >
              <span>
                <span className="font-medium">
                  Manual oficial CCSE 2026
                </span>{" "}
                <span className="text-zinc-500">
                  — Instituto Cervantes (dominio público, 2,8 MB)
                </span>
              </span>
              <span aria-hidden className="text-zinc-400">
                ↓ PDF
              </span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
