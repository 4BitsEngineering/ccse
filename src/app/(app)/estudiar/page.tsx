import Link from "next/link";
import { Underline } from "@/components/ui/underline";
import { loadBanco } from "@/lib/content";

const TAREAS = [
  { n: 1, titulo: "Gobierno, legislación y participación" },
  { n: 2, titulo: "Derechos y deberes fundamentales" },
  { n: 3, titulo: "Organización territorial y geografía" },
  { n: 4, titulo: "Cultura e historia" },
  { n: 5, titulo: "Sociedad española" },
] as const;

export const metadata = {
  title: "Estudiar — CCSE",
};

export default function EstudiarIndexPage() {
  const banco = loadBanco();
  const conteo = TAREAS.map((t) => ({
    ...t,
    total: banco.preguntas.filter((p) => p.tarea === t.n).length,
  }));

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Los 5 temas
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        <span className="italic text-terracotta-deep">Estudia</span> los
        apuntes.
      </h1>
      <Underline width={140} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Escritos en español B1: tablas, listas y ejemplos. Léelos en web o
        descárgalos en PDF desde el Panel.
      </p>

      <ul className="mt-8 space-y-3">
        {conteo.map((t) => (
          <li
            key={t.n}
            className="flex items-center gap-4 rounded-2xl border border-rule bg-cream p-5 hover:border-ink/40 transition-colors"
          >
            <span className="w-12 h-12 rounded-xl bg-paper-warm border border-rule grid place-items-center font-serif italic text-2xl font-medium text-ink-soft shrink-0">
              {t.n}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-xl font-medium tracking-tight leading-snug">
                Tarea {t.n}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {t.titulo} · {t.total} preguntas
              </p>
            </div>
            <Link
              href={`/practicar/${t.n}`}
              className="text-xs text-ink-soft hover:text-ink px-2.5 py-1.5 rounded-full hover:bg-paper-warm"
            >
              Practicar
            </Link>
            <Link
              href={`/estudiar/${t.n}`}
              className="text-xs font-semibold text-cream bg-terracotta hover:bg-terracotta-deep px-3 py-1.5 rounded-full"
            >
              Leer →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
