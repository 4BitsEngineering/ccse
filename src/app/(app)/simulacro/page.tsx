import Link from "next/link";
import { Underline } from "@/components/ui/underline";

const SIMULACROS = [1, 2, 3, 4, 5] as const;

export const metadata = {
  title: "Simulacros — CCSE",
};

export default function SimulacrosPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        <span className="italic text-terracotta-deep">5 simulacros</span>{" "}
        reales.
      </h1>
      <Underline width={180} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        25 preguntas · 45 minutos · sin penalización · aprueba con 15 aciertos.
        Distribución oficial 15/10 entre los bloques.
      </p>

      <ul className="mt-8 space-y-3">
        {SIMULACROS.map((n) => (
          <li key={n}>
            <Link
              href={`/simulacro/${n}`}
              className="flex items-center gap-4 rounded-2xl border border-rule bg-cream p-5 hover:border-ink/40 transition-colors group"
            >
              <span className="w-12 h-12 rounded-xl bg-terracotta text-cream grid place-items-center font-serif italic text-2xl font-medium shrink-0">
                {n}
              </span>
              <div className="flex-1">
                <p className="font-serif text-xl font-medium tracking-tight leading-snug">
                  Simulacro {n}
                </p>
                <p className="text-xs text-ink-muted mt-0.5">
                  25 preguntas · 45 min
                </p>
              </div>
              <span
                aria-hidden
                className="text-ink-muted group-hover:text-terracotta transition-colors"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
