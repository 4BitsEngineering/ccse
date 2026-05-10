import Link from "next/link";
import { notFound } from "next/navigation";
import { loadTema, type Tarea } from "@/lib/content";
import { extractToc, splitMdAtMidpoint } from "@/lib/markdown";
import { TemaRenderer } from "@/components/content/TemaRenderer";
import { TemaToc } from "@/components/content/TemaToc";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    title: `Tarea ${t} CCSE — ${titulo}`,
    description: `Apuntes en castellano B1 para la Tarea ${t} del manual oficial CCSE 2026 del Instituto Cervantes: ${titulo.toLowerCase()}.`,
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
    <div className="mx-auto max-w-7xl px-6 py-10 lg:flex lg:gap-10">
      <aside className="lg:sticky lg:top-10 lg:self-start lg:w-64 lg:shrink-0 mb-8 lg:mb-0">
        <TemaToc items={toc} />
      </aside>
      <main className="flex-1 min-w-0">
        <p className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
          {isFree ? "Tarea muestra (gratis)" : "Vista previa pública"}
        </p>
        <TemaRenderer md={first} />
        {hayContinuacion && (
          <Card className="mt-12 p-6 border-2 border-zinc-300 dark:border-zinc-700">
            <h2 className="text-xl font-semibold">Sigue leyendo</h2>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Esta es la primera mitad de la Tarea {t}. La segunda mitad,
              las explicaciones razonadas de las preguntas oficiales, los
              simulacros y el repaso espaciado están en el acceso completo.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/precio" className={buttonVariants()}>
                Activar acceso 9,99 € / 365 días
              </Link>
              <Link
                href="/demo"
                className={buttonVariants({ variant: "outline" })}
              >
                Probar 10 preguntas gratis
              </Link>
            </div>
          </Card>
        )}
        <footer className="mt-10 text-sm">
          <Link href="/" className="text-zinc-500 hover:underline">
            ← Volver
          </Link>
        </footer>
      </main>
    </div>
  );
}
