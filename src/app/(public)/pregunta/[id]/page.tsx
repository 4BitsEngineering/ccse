import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { loadBanco } from "@/lib/content";
import { PaywallGate } from "@/components/paywall/PaywallGate";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return loadBanco().preguntas.map((p) => ({ id: p.id_oficial }));
}

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;
  const banco = loadBanco();
  const p = banco.preguntas.find((q) => q.id_oficial === id);
  if (!p) return {};
  const titulo = p.enunciado.replace(/\.$/, "");
  return {
    title: `${titulo} — Pregunta ${p.id_oficial} CCSE`,
    description: `Pregunta ${p.id_oficial} del banco oficial CCSE 2026 (Tarea ${p.tarea}). Enunciado, opciones y respuesta correcta. Explicación razonada con acceso completo.`,
    alternates: { canonical: `/pregunta/${p.id_oficial}` },
  };
}

export default async function PreguntaPage({ params }: RouteParams) {
  const { id } = await params;
  const banco = loadBanco();
  const p = banco.preguntas.find((q) => q.id_oficial === id);
  if (!p) notFound();

  const opciones = p.opciones as Record<string, string>;
  // Filtra opciones vacías (las V/F de Tarea 2 dejan c con string vacío).
  const opcionesArr = Object.entries(opciones).filter(
    ([, v]) => v.trim() !== "",
  );
  const correcta = opciones[p.correcta];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: p.enunciado,
    text: p.enunciado,
    answerCount: opcionesArr.length,
    acceptedAnswer: {
      "@type": "Answer",
      text: correcta,
    },
    suggestedAnswer: opcionesArr
      .filter(([k]) => k !== p.correcta)
      .map(([, txt]) => ({ "@type": "Answer", text: txt })),
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
        Pregunta {p.id_oficial} · Tarea {p.tarea} · {p.dificultad} ·
        Manual {banco.version_manual}
      </p>
      <h1 className="text-2xl font-semibold leading-snug mb-6">
        {p.enunciado}
      </h1>

      <ol className="space-y-2 list-none">
        {opcionesArr.map(([k, v]) => {
          const isCorrect = k === p.correcta;
          return (
            <li key={k}>
              <div
                className={
                  "flex gap-3 rounded-md border p-3 " +
                  (isCorrect
                    ? "border-green-600 bg-green-50 dark:bg-green-950/40"
                    : "border-zinc-200 dark:border-zinc-800")
                }
              >
                <span className="font-mono font-semibold w-5">
                  {k.toLowerCase()})
                </span>
                <span className="flex-1">{v}</span>
                {isCorrect && (
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                    correcta
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 text-sm">
        <strong>Respuesta correcta:</strong> {p.correcta}) {correcta}
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          Por qué esta es la correcta
        </h2>
        <PaywallGate
          title="Explicación razonada — premium"
          subtitle="La razón detrás de la respuesta, por qué fallan las otras opciones y la pista mnemotécnica forman parte del acceso completo."
        >
          <Card className="p-5 space-y-3 text-sm">
            <p>{p.explicacion}</p>
            {p.mnemotecnico && (
              <p className="italic text-zinc-700 dark:text-zinc-300">
                Mnemotécnico: {p.mnemotecnico}
              </p>
            )}
            {p.explicacion_distractores && (
              <div>
                <p className="font-semibold mt-2">
                  Por qué fallan las otras opciones
                </p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  {Object.entries(p.explicacion_distractores).map(
                    ([k, txt]) => (
                      <li key={k}>
                        <strong>{k})</strong> {txt as string}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </Card>
        </PaywallGate>
      </section>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-sm">
        <Link
          href={`/tarea/${p.tarea}/preview`}
          className="text-zinc-700 dark:text-zinc-300 hover:underline"
        >
          ← Tema completo de la Tarea {p.tarea}
        </Link>
        <Link
          href="/demo"
          className={buttonVariants({ variant: "outline" })}
        >
          Probar 10 preguntas gratis
        </Link>
      </footer>
    </main>
  );
}
