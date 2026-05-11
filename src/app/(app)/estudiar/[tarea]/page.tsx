import Link from "next/link";
import { notFound } from "next/navigation";
import { Underline } from "@/components/ui/underline";
import { buttonVariants } from "@/components/ui/button";
import { loadTema, type Tarea } from "@/lib/content";
import { extractToc } from "@/lib/markdown";
import { TEMA_PDF } from "@/lib/pdfs";
import { TemaRenderer } from "@/components/content/TemaRenderer";
import { TemaToc } from "@/components/content/TemaToc";
import { EstudiarTracker } from "@/components/content/EstudiarTracker";
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

  const body = (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper-warm border border-rule px-5 py-3.5 text-sm">
        <span className="text-ink-soft">
          ¿Prefieres leer offline o imprimir?
        </span>
        <a
          href={TEMA_PDF[t]}
          download
          className="font-medium text-terracotta-deep hover:underline"
        >
          Descargar este tema en PDF ↓
        </a>
      </div>
      <TemaRenderer md={md} />
      <footer className="mt-12 flex items-center justify-between border-t border-rule pt-6 text-sm">
        <Link
          href="/dashboard"
          className="text-ink-soft hover:text-ink"
        >
          ← Panel
        </Link>
        <Link
          href={`/practicar/${t}`}
          className={
            buttonVariants({ variant: "terracotta" }) +
            " h-11 px-4 rounded-xl"
          }
        >
          Practicar Tarea {t} →
        </Link>
      </footer>
    </>
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:flex lg:gap-10">
      <aside className="lg:sticky lg:top-10 lg:self-start lg:w-60 lg:shrink-0 mb-8 lg:mb-0">
        {isFree && <TemaToc items={toc} />}
      </aside>
      <main className="flex-1 min-w-0">
        <EstudiarTracker tarea={t} />

        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          <Link href="/dashboard" className="hover:text-terracotta-deep">
            ← Panel
          </Link>{" "}
          · Tarea {t} · apuntes
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
          {TITULO_TAREA[t]}
        </h1>
        <Underline width={180} className="mt-1 mb-8" />

        {isFree ? (
          body
        ) : (
          <PaywallGate
            title={`Tema ${t} — contenido premium`}
            subtitle={`La Tarea 1 está abierta como muestra. Para leer el resto de los temas, activar la práctica con razonamientos y descargar los PDFs, activa tu acceso por 4,99 €.`}
          >
            {body}
          </PaywallGate>
        )}
      </main>
    </div>
  );
}
