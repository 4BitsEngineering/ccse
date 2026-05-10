import { loadBanco } from "@/lib/content";

export default function Home() {
  const banco = loadBanco();
  const p = banco.preguntas[0];
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          CCSE — smoke test
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Manual {banco.version_manual} · {banco.preguntas.length} preguntas
          cargadas · validador Zod OK.
        </p>
      </header>

      <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="mb-3 text-xs uppercase tracking-wide text-zinc-500">
          Pregunta {p.id_oficial} · Tarea {p.tarea} · {p.dificultad}
        </div>
        <h2 className="text-lg font-medium leading-snug">{p.enunciado}</h2>
        <ol className="mt-4 space-y-2 list-none">
          {(["a", "b", "c"] as const).map((k) => (
            <li key={k} className="flex gap-3">
              <span className="font-mono font-semibold w-5">{k})</span>
              <span>{p.opciones[k]}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-zinc-500">
          Respuesta correcta: <span className="font-mono">{p.correcta}</span>
        </p>
      </article>
    </main>
  );
}
