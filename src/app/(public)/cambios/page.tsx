import Link from "next/link";

export const metadata = {
  title: "Cambios — CCSE",
  description:
    "Registro público de cambios en la plataforma: actualizaciones del banco, correcciones de erratas, mejoras y nuevas funcionalidades.",
};

interface Cambio {
  fecha: string;
  tipo: "lanzamiento" | "contenido" | "errata" | "funcionalidad" | "legal";
  titulo: string;
  detalle?: string;
}

const TIPO_LABEL: Record<Cambio["tipo"], string> = {
  lanzamiento: "Lanzamiento",
  contenido: "Contenido",
  errata: "Errata corregida",
  funcionalidad: "Nueva funcionalidad",
  legal: "Legal",
};

const TIPO_COLOR: Record<Cambio["tipo"], string> = {
  lanzamiento:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  contenido:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  errata: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  funcionalidad:
    "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  legal: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
};

const CAMBIOS: Cambio[] = [
  {
    fecha: "2026-05-10",
    tipo: "lanzamiento",
    titulo: "Versión inicial publicada",
    detalle:
      "300 preguntas oficiales del manual CCSE 2026, 5 temas en español B1, 5 simulacros, descargas en PDF.",
  },
];

export default function CambiosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Inicio
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Cambios</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Registro público de actualizaciones del banco, erratas
          corregidas y novedades de la plataforma.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Cuando publiquemos el manual nuevo del Cervantes (esperado en
          diciembre), las preguntas afectadas aparecerán aquí.
        </p>
      </header>

      <ol className="space-y-6">
        {CAMBIOS.map((c, i) => (
          <li
            key={i}
            className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <time
                dateTime={c.fecha}
                className="font-mono text-zinc-500"
              >
                {c.fecha}
              </time>
              <span
                className={
                  "rounded px-2 py-0.5 text-xs font-medium " +
                  TIPO_COLOR[c.tipo]
                }
              >
                {TIPO_LABEL[c.tipo]}
              </span>
            </div>
            <h2 className="mt-1 font-semibold">{c.titulo}</h2>
            {c.detalle && (
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                {c.detalle}
              </p>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
