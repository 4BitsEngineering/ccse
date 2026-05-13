import type { Metadata } from "next";
import { Underline } from "@/components/ui/underline";

export const metadata: Metadata = {
  title: "Cambios — CCSE",
  description:
    "Registro público de cambios en la plataforma: actualizaciones del banco, correcciones de erratas, mejoras y nuevas funcionalidades.",
  alternates: { canonical: "/cambios" },
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

const TIPO_STYLE: Record<Cambio["tipo"], string> = {
  lanzamiento: "bg-olive/15 text-olive",
  contenido: "bg-paper-warm text-ink-soft border border-rule",
  errata: "bg-terracotta-soft/30 text-terracotta-deep",
  funcionalidad: "bg-terracotta/[0.12] text-terracotta-deep",
  legal: "bg-paper-warm text-ink-soft border border-rule",
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
    <main className="mx-auto max-w-2xl px-6 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Registro público
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        <span className="italic text-terracotta-deep">Cambios</span> de la
        plataforma.
      </h1>
      <Underline width={170} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Actualizaciones del banco, erratas corregidas y novedades. Cuando el
        Cervantes publique manual nuevo, las preguntas afectadas aparecen aquí.
      </p>

      <ol className="mt-8 space-y-6">
        {CAMBIOS.map((c, i) => (
          <li key={i} className="border-l-2 border-rule pl-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <time
                dateTime={c.fecha}
                className="font-mono text-ink-muted tabular-nums"
              >
                {c.fecha}
              </time>
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
                  TIPO_STYLE[c.tipo]
                }
              >
                {TIPO_LABEL[c.tipo]}
              </span>
            </div>
            <h2 className="mt-1.5 font-sans font-semibold text-ink">
              {c.titulo}
            </h2>
            {c.detalle && (
              <p className="mt-1 font-serif text-[15px] leading-relaxed text-ink-soft">
                {c.detalle}
              </p>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
