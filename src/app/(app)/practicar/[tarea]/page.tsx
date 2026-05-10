import Link from "next/link";
import { notFound } from "next/navigation";
import { Seal } from "@/components/ui/seal";
import { Underline } from "@/components/ui/underline";
import { getPreguntasPorTarea, type Tarea } from "@/lib/content";
import { PracticaWithFilters } from "@/components/practica/PracticaWithFilters";
import { PaywallGate } from "@/components/paywall/PaywallGate";

const VALID: Tarea[] = [1, 2, 3, 4, 5];

const TITULO_TAREA: Record<Tarea, string> = {
  1: "Gobierno, legislación y participación",
  2: "Derechos y deberes fundamentales",
  3: "Organización territorial y geografía",
  4: "Cultura e historia",
  5: "Sociedad española",
};

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
      <header className="flex items-center gap-2.5 mb-8">
        <Seal size={28} />
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-wide"
        >
          CCSE
        </Link>
      </header>

      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Tarea {t} · {preguntas.length} preguntas
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-balance">
        {TITULO_TAREA[t]}
      </h1>
      <Underline width={150} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Feedback inmediato, razonamiento al elegir y mnemotécnico al final.{" "}
        <Link
          href={`/estudiar/${t}`}
          className="text-ink underline decoration-terracotta underline-offset-2"
        >
          Repasar el tema antes
        </Link>
        .
      </p>

      <div className="mt-8">
        <PaywallGate
          title="Practicar es premium"
          subtitle="La práctica con feedback inmediato, explicación razonada de cada distractor y mnemotécnico es lo que diferencia esta plataforma de la app oficial gratuita. Pruébala primero con la demo de 10 preguntas."
        >
          <PracticaWithFilters
            preguntas={preguntas}
            contexto={{
              tarea: t,
              titulo: `Practicar Tarea ${t}`,
              href: `/practicar/${t}`,
            }}
          />
        </PaywallGate>
      </div>
    </main>
  );
}
