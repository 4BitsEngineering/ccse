import Link from "next/link";
import { notFound } from "next/navigation";
import { loadTema, type Tarea } from "@/lib/content";
import { extractToc } from "@/lib/markdown";
import { TEMA_PDF } from "@/lib/pdfs";
import { TemaRenderer } from "@/components/content/TemaRenderer";
import { TemaToc } from "@/components/content/TemaToc";
import { EstudiarTracker } from "@/components/content/EstudiarTracker";
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
    title: `Estudiar Tarea ${tarea} — CCSE`,
    description: `Apuntes en castellano B1 de la Tarea ${tarea} del manual CCSE 2026.`,
  };
}

export default async function EstudiarTareaPage({
  params,
}: {
  params: Promise<{ tarea: string }>;
}) {
  const { tarea } = await params;
  const t = Number(tarea) as Tarea;
  if (!VALID.includes(t)) notFound();

  const md = loadTema(t);
  const toc = extractToc(md);
  const isFree = t === 1;
  // Solo trackeamos cuando el contenido es accesible (gratis o desbloqueado).
  // El tracker es no-op si no hay window, así que es seguro montarlo siempre.

  const body = (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">
          ¿Prefieres leer offline o imprimir?
        </span>
        <a
          href={TEMA_PDF[t]}
          download
          className="font-medium hover:underline"
        >
          Descargar este tema en PDF ↓
        </a>
      </div>
      <TemaRenderer md={md} />
      <footer className="mt-12 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 text-sm">
        <Link
          href="/dashboard"
          className="text-zinc-700 dark:text-zinc-300 hover:underline"
        >
          ← Dashboard
        </Link>
        <Link
          href={`/practicar/${t}`}
          className="font-medium hover:underline"
        >
          Practicar Tarea {t} →
        </Link>
      </footer>
    </>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:flex lg:gap-10">
      <aside className="lg:sticky lg:top-10 lg:self-start lg:w-64 lg:shrink-0 mb-8 lg:mb-0">
        {isFree && <TemaToc items={toc} />}
      </aside>
      <main className="flex-1 min-w-0">
        <EstudiarTracker tarea={t} />
        {isFree ? (
          body
        ) : (
          <PaywallGate
            title={`Tema ${t} — contenido premium`}
            subtitle={`La Tarea 1 está abierta como muestra. Para leer el resto de los temas, activar la práctica con razonamientos y descargar los PDFs, activa tu acceso por 9,99 €.`}
          >
            {body}
          </PaywallGate>
        )}
      </main>
    </div>
  );
}
