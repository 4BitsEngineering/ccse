import Link from "next/link";
import { notFound } from "next/navigation";
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

      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta mb-3">
        <Link
          href={`/tarea/${p.tarea}/preview`}
          className="hover:text-terracotta-deep"
        >
          ← Tarea {p.tarea}
        </Link>{" "}
        · Pregunta {p.id_oficial} · Manual {banco.version_manual}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-full bg-paper-warm border border-rule text-[11px] font-medium tracking-wide text-ink-soft">
          Tarea {p.tarea}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-olive/10 text-olive text-[11px] font-medium">
          {p.dificultad}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight text-balance">
        {p.enunciado}
      </h1>

      <ol className="mt-7 space-y-2.5 list-none">
        {opcionesArr.map(([k, v]) => {
          const isCorrect = k === p.correcta;
          return (
            <li key={k}>
              <div
                className={
                  "flex items-start gap-3.5 rounded-2xl border-[1.5px] p-4 " +
                  (isCorrect
                    ? "bg-olive/10 border-olive"
                    : "bg-cream border-rule")
                }
              >
                <span
                  className={
                    "shrink-0 w-8 h-8 rounded-full grid place-items-center font-serif italic text-[15px] font-medium " +
                    (isCorrect
                      ? "bg-olive text-cream"
                      : "bg-paper-warm text-ink")
                  }
                >
                  {isCorrect ? "✓" : k.toLowerCase()}
                </span>
                <span
                  className={
                    "flex-1 font-serif text-[16.5px] leading-snug pt-0.5 " +
                    (isCorrect ? "text-ink font-semibold" : "text-ink")
                  }
                >
                  {v}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          La razón completa
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium leading-snug">
          Por qué esta es la correcta
        </h2>
        <div className="mt-3">
          <PaywallGate
            title="Explicación razonada — premium"
            subtitle="La razón detrás de la respuesta, por qué fallan las otras opciones y la pista mnemotécnica forman parte del acceso completo."
          >
            <div className="rounded-2xl bg-paper-warm p-5 space-y-3 text-sm">
              <p className="font-serif text-[16px] leading-relaxed text-ink text-pretty">
                {p.explicacion}
              </p>
              {p.mnemotecnico && (
                <div className="rounded-xl bg-cream p-3 flex gap-2 items-start">
                  <span className="font-serif italic text-2xl text-terracotta leading-none">
                    “
                  </span>
                  <span className="font-serif italic text-sm text-ink-soft flex-1 pt-1">
                    {p.mnemotecnico}
                  </span>
                </div>
              )}
              {p.explicacion_distractores && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-muted mt-2">
                    Por qué fallan las otras opciones
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                    {Object.entries(p.explicacion_distractores).map(
                      ([k, txt]) => (
                        <li key={k}>
                          <strong className="font-sans text-ink">
                            {k})
                          </strong>{" "}
                          {txt as string}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          </PaywallGate>
        </div>
      </section>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-sm">
        <Link
          href={`/tarea/${p.tarea}/preview`}
          className="text-ink-soft hover:text-ink"
        >
          ← Tema completo de la Tarea {p.tarea}
        </Link>
        <Link
          href="/demo"
          className={buttonVariants({ variant: "ink-outline" }) + " h-10 px-4"}
        >
          Probar 10 preguntas gratis
        </Link>
      </footer>
    </main>
  );
}
