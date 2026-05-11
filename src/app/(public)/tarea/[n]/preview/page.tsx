import Link from "next/link";
import { notFound } from "next/navigation";
import { Underline } from "@/components/ui/underline";
import { loadTema, type Tarea } from "@/lib/content";
import { extractToc, splitMdAtMidpoint } from "@/lib/markdown";
import { TemaRenderer } from "@/components/content/TemaRenderer";
import { TemaToc } from "@/components/content/TemaToc";
import { buttonVariants } from "@/components/ui/button";

const VALID: Tarea[] = [1, 2, 3, 4, 5];

const TAREA_TITULO: Record<Tarea, string> = {
  1: "Gobierno, legislación y participación ciudadana",
  2: "Derechos y deberes fundamentales",
  3: "Organización territorial y geografía",
  4: "Cultura e historia de España",
  5: "Sociedad española",
};

export function generateStaticParams() {
  return VALID.map((n) => ({ n: String(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const t = Number(n) as Tarea;
  if (!VALID.includes(t)) return {};
  const titulo = TAREA_TITULO[t];
  return {
    title: `Tema ${t} CCSE — ${titulo}`,
    description: `Apuntes en castellano B1 para el Tema ${t} del manual oficial CCSE 2026 del Instituto Cervantes: ${titulo.toLowerCase()}.`,
    alternates: { canonical: `/tarea/${t}/preview` },
  };
}

export default async function TareaPreviewPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const t = Number(n) as Tarea;
  if (!VALID.includes(t)) notFound();

  const md = loadTema(t);
  const isFree = t === 1;
  const { first, rest } = isFree
    ? { first: md, rest: "" }
    : splitMdAtMidpoint(md);
  const toc = extractToc(first);
  const hayContinuacion = rest.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:flex lg:gap-10">
      <aside className="lg:sticky lg:top-10 lg:self-start lg:w-60 lg:shrink-0 mb-8 lg:mb-0">
        <TemaToc items={toc} />
      </aside>
      <main className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          {isFree ? "Tema muestra · gratis" : "Vista previa pública"}
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
          {TAREA_TITULO[t]}
        </h1>
        <Underline width={180} className="mt-1 mb-8" />

        <TemaRenderer md={first} />

        {hayContinuacion && (
          <div className="mt-12 rounded-2xl bg-terracotta/[0.07] border border-terracotta/30 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
              Acceso completo
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium leading-snug">
              Sigue leyendo el tema completo.
            </h2>
            <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
              Esta es la primera mitad del Tema {t}. La segunda mitad, las
              explicaciones razonadas de las preguntas oficiales, los
              simulacros y el repaso espaciado están en el acceso completo.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/precio"
                className={
                  buttonVariants({ variant: "terracotta" }) +
                  " h-11 px-4 rounded-xl text-sm"
                }
              >
                Activar acceso 9,99 € / 365 días
              </Link>
              <Link
                href="/demo"
                className={
                  buttonVariants({ variant: "ghost" }) +
                  " h-11 px-4 text-sm text-ink-soft hover:bg-paper-warm"
                }
              >
                Probar 10 preguntas gratis
              </Link>
            </div>
          </div>
        )}

        <footer className="mt-10 text-sm">
          <Link href="/" className="text-ink-soft hover:text-ink">
            ← Volver
          </Link>
        </footer>
      </main>
    </div>
  );
}
