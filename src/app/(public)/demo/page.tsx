import { getDemoPreguntas } from "@/lib/content";
import { DemoDeck } from "@/components/practica/DemoDeck";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demo gratis — CCSE",
  description:
    "10 preguntas aleatorias del banco oficial CCSE 2026. Sin registro. Recibe la explicación razonada de cada respuesta al final.",
};

export default function DemoPage() {
  const preguntas = getDemoPreguntas(10);
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Demo CCSE</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          10 preguntas aleatorias del banco oficial 2026. Sin registro.
          Recibirás la explicación razonada al final.
        </p>
      </header>
      <DemoDeck preguntas={preguntas} />
    </main>
  );
}
