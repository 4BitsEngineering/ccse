import Link from "next/link";
import { Card } from "@/components/ui/card";

const SIMULACROS = [1, 2, 3, 4, 5] as const;

export const metadata = {
  title: "Simulacros — CCSE",
};

export default function SimulacrosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Simulacros</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Examen completo en formato real: 25 preguntas, 45 minutos, sin
          penalización. Apruebas con 15 aciertos.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Sprint 1: cada simulacro selecciona 25 preguntas del banco oficial
          siguiendo la distribución 15/10. La selección es estable por id.
        </p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SIMULACROS.map((n) => (
          <li key={n}>
            <Link href={`/simulacro/${n}`} className="block">
              <Card className="p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                <h2 className="font-semibold text-lg">Simulacro {n}</h2>
                <p className="text-sm text-zinc-500 mt-1">
                  25 preguntas · 45 min
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
