import Link from "next/link";
import { notFound } from "next/navigation";
import { getPreguntasPorTarea, type Tarea } from "@/lib/content";
import { PracticaDeck } from "@/components/practica/PracticaDeck";
import { PaywallGate } from "@/components/paywall/PaywallGate";

const VALID: Tarea[] = [1, 2, 3, 4, 5];

export function generateStaticParams() {
  return VALID.map((n) => ({ tarea: String(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tarea: string }>;
}) {
  const { tarea } = await params;
  return {
    title: `Practicar Tarea ${tarea} — CCSE`,
    description: `Practica las preguntas oficiales de la Tarea ${tarea} con feedback inmediato y razonamiento.`,
  };
}

export default async function PracticarTareaPage({
  params,
}: {
  params: Promise<{ tarea: string }>;
}) {
  const { tarea } = await params;
  const t = Number(tarea) as Tarea;
  if (!VALID.includes(t)) notFound();

  const preguntas = getPreguntasPorTarea(t);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Practicar Tarea {t}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {preguntas.length} preguntas oficiales del banco 2026. Feedback
          inmediato y razonamiento al elegir.
        </p>
        <p className="mt-2 text-xs">
          <Link
            href={`/estudiar/${t}`}
            className="text-zinc-500 hover:underline"
          >
            Repasar el tema antes
          </Link>
        </p>
      </header>
      <PaywallGate
        title="Practicar es premium"
        subtitle="La práctica con feedback inmediato, explicación razonada de cada distractor y mnemotécnico es lo que diferencia esta plataforma de la app oficial gratuita. Pruébala primero con la demo de 10 preguntas."
      >
        <PracticaDeck
          preguntas={preguntas}
          contexto={{
            tarea: t,
            titulo: `Practicar Tarea ${t}`,
            href: `/practicar/${t}`,
          }}
        />
      </PaywallGate>
    </main>
  );
}
