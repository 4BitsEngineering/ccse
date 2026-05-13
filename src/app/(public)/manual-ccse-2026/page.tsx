import type { Metadata } from "next";
import Link from "next/link";
import { Underline } from "@/components/ui/underline";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Manual CCSE 2026 del Instituto Cervantes: qué contiene y cómo usarlo",
  description:
    "Guía del manual oficial CCSE 2026 del Instituto Cervantes: las 300 preguntas, los 5 temas, dónde descargarlo en PDF y cómo aprovecharlo para preparar el examen sin perder tiempo.",
  alternates: { canonical: "/manual-ccse-2026" },
};

const TEMAS = [
  {
    n: 1,
    titulo: "Gobierno, legislación y participación ciudadana",
    qEsto:
      "La Constitución de 1978, el rey, las Cortes Generales, el Gobierno y cómo se elige. El esqueleto del Estado.",
  },
  {
    n: 2,
    titulo: "Derechos y deberes fundamentales",
    qEsto:
      "Igualdad, libertad de expresión, sanidad, educación, vivienda, trabajo. Lo que la Constitución te da y lo que te pide.",
  },
  {
    n: 3,
    titulo: "Organización territorial y geografía",
    qEsto:
      "Las 17 comunidades autónomas, las 50 provincias, las ciudades autónomas, los ríos y los relieves principales.",
  },
  {
    n: 4,
    titulo: "Cultura e historia de España",
    qEsto:
      "De los íberos a la Transición. Hispania romana, Al-Ándalus, los Reyes Católicos, la Constitución de Cádiz, la Guerra Civil, 1978.",
  },
  {
    n: 5,
    titulo: "Sociedad española",
    qEsto:
      "El día a día: horarios, fiestas, gastronomía, sanidad pública, educación, trámites con la Administración.",
  },
] as const;

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Manual CCSE 2026 del Instituto Cervantes: qué contiene y cómo usarlo para aprobar",
  description:
    "Guía del manual oficial CCSE 2026 del Instituto Cervantes. Estructura por temas, las 300 preguntas, dónde descargar el PDF gratis y cómo usarlo eficientemente.",
  inLanguage: "es",
  about: {
    "@type": "Thing",
    name: "Manual CCSE 2026 — Conocimientos Constitucionales y Socioculturales de España",
  },
  publisher: {
    "@type": "Organization",
    name: "CCSE",
    legalName: "4Bits Engineering",
  },
} as const;

export default function ManualCcse2026Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />

      {/* Hero */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Manual oficial · Edición 2026
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
        El{" "}
        <span className="italic text-terracotta-deep">manual CCSE 2026</span>{" "}
        del Cervantes, sin paja.
      </h1>
      <Underline width={180} className="mt-2" />
      <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft text-pretty">
        El Instituto Cervantes publica cada año un{" "}
        <strong className="font-sans font-semibold text-ink">
          manual oficial gratuito
        </strong>{" "}
        con todo lo que entra en el examen CCSE: las 300 preguntas, las
        respuestas y los apuntes en cinco temas. Es la única fuente que
        garantiza que estudias <em>exactamente</em> lo que cae. Aquí te
        explicamos qué contiene, dónde descargarlo y cómo aprovecharlo de
        verdad.
      </p>

      {/* TOC */}
      <nav
        aria-label="Índice"
        className="mt-8 rounded-2xl bg-paper-warm border border-rule p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          En esta página
        </p>
        <ul className="space-y-1.5 text-sm text-ink-soft">
          <li>
            <a href="#que-es" className="hover:text-ink">
              Qué es el manual oficial
            </a>
          </li>
          <li>
            <a href="#contenido" className="hover:text-ink">
              Qué contiene: 5 temas + 300 preguntas
            </a>
          </li>
          <li>
            <a href="#descarga" className="hover:text-ink">
              Dónde descargarlo
            </a>
          </li>
          <li>
            <a href="#novedades" className="hover:text-ink">
              Qué cambia respecto a ediciones anteriores
            </a>
          </li>
          <li>
            <a href="#uso" className="hover:text-ink">
              Cómo usarlo para aprobar
            </a>
          </li>
          <li>
            <a href="#limites" className="hover:text-ink">
              Lo que el manual no te da
            </a>
          </li>
        </ul>
      </nav>

      {/* Qué es */}
      <section id="que-es" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Qué es
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          El material{" "}
          <span className="italic text-terracotta-deep">único y oficial</span>{" "}
          que el Cervantes publica cada año.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El manual del CCSE es un PDF gratuito que el Instituto Cervantes
          actualiza anualmente. La{" "}
          <strong className="font-sans font-semibold text-ink">
            edición 2026
          </strong>{" "}
          es la única vigente para los exámenes que se hacen este año. Lo
          importante: <em>las 300 preguntas oficiales salen de aquí, literales</em>.
          No hay un banco secreto ni preguntas «trampa»: el examen es un
          recortable del manual.
        </p>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          Está escrito pensando en un nivel B1 de español (el mínimo
          recomendado para la nacionalidad), con frases cortas, listas y
          tablas. No es un libro académico — es un material pedagógico hecho
          para que se entienda sin esfuerzo.
        </p>
      </section>

      {/* Contenido */}
      <section id="contenido" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Contenido
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          5 temas, 300 preguntas y las respuestas.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          La estructura del manual lleva años siendo la misma: cinco bloques
          temáticos, cada uno con sus apuntes y unas 60 preguntas con la
          respuesta correcta marcada.
        </p>
        <ul className="mt-6 space-y-5">
          {TEMAS.map((t) => (
            <li
              key={t.n}
              className="border-b border-rule pb-5 last:border-b-0 last:pb-0"
            >
              <Link
                href={`/tarea/${t.n}/preview`}
                className="group block hover:bg-paper-warm/60 -mx-2 px-2 py-1 rounded-lg transition-colors"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Tema {t.n}
                </p>
                <h3 className="mt-1 font-serif text-[19px] font-medium text-ink group-hover:text-terracotta-deep transition-colors">
                  {t.titulo} <span className="text-terracotta-soft">→</span>
                </h3>
                <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-soft">
                  {t.qEsto}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Descarga */}
      <section id="descarga" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Descarga
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Dónde conseguirlo{" "}
          <span className="italic text-terracotta-deep">gratis</span>.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El manual está disponible en la web oficial del Instituto Cervantes,
          en la sección dedicada al CCSE. Allí encuentras siempre la edición
          vigente del año en curso en PDF, junto a la información de
          convocatorias y centros examinadores.
        </p>
        <div className="mt-5">
          <a
            href="https://examenes.cervantes.es/ccse"
            target="_blank"
            rel="noopener noreferrer"
            className={
              buttonVariants({ variant: "ink-outline", size: "lg" }) +
              " h-12 px-5 text-base"
            }
          >
            Ir al sitio oficial del CCSE ↗
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Te abrimos el sitio del Cervantes en una pestaña nueva. Asegúrate de
          descargar la edición <strong>2026</strong>: las anteriores siguen
          accesibles en algunos buscadores y no sirven para el examen de este
          año.
        </p>
      </section>

      {/* Novedades */}
      <section id="novedades" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Novedades 2026
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Qué cambia respecto a ediciones anteriores.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El núcleo del manual (estructura, número de preguntas, formato del
          examen) <em>no</em> cambia entre ediciones. Lo que sí se actualiza
          cada año son los datos que envejecen: composición del Gobierno,
          presidentes autonómicos, leyes recientes, organismos públicos.
        </p>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          Por eso es importante estudiar siempre con el manual del año en
          curso, especialmente si tu examen es a partir del segundo trimestre:
          las preguntas de actualidad política suelen ir alineadas con la
          edición vigente. Para repasar, dale prioridad al{" "}
          <strong className="font-sans font-semibold text-ink">Tema 1</strong>{" "}
          (Gobierno) y al{" "}
          <strong className="font-sans font-semibold text-ink">Tema 3</strong>{" "}
          (organización territorial), que es donde más se notan los cambios
          año a año.
        </p>
      </section>

      {/* Uso */}
      <section id="uso" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Cómo usarlo
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Tres formas de estudiarlo{" "}
          <span className="italic text-terracotta-deep">sin agobio</span>.
        </h2>
        <ol className="mt-5 space-y-4 text-[15.5px] text-ink-soft font-serif leading-relaxed list-none">
          <li className="flex gap-3">
            <span
              aria-hidden
              className="shrink-0 w-7 h-7 rounded-full bg-terracotta/10 grid place-items-center font-serif italic text-[14px] text-terracotta-deep"
            >
              1
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Lectura de barrido (una tarde por tema).
              </strong>{" "}
              No te pares en lo que no entiendes. La idea es tener el mapa
              completo en la cabeza: dónde está cada cosa, qué orden tienen las
              instituciones, qué siglos cubre el tema 4. Vuelves después.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden
              className="shrink-0 w-7 h-7 rounded-full bg-terracotta/10 grid place-items-center font-serif italic text-[14px] text-terracotta-deep"
            >
              2
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Subraya por pregunta.
              </strong>{" "}
              Mira las 60 preguntas de cada tema y subraya{" "}
              <em>solo</em> los párrafos del manual que las contestan. Te
              ahorra horas: ese 20-30 % del manual es lo que realmente cae.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden
              className="shrink-0 w-7 h-7 rounded-full bg-terracotta/10 grid place-items-center font-serif italic text-[14px] text-terracotta-deep"
            >
              3
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Practica con las 300, no con las del manual a pelo.
              </strong>{" "}
              Las preguntas del manual tienen la respuesta marcada al lado, así
              que es trampa: te aprendes la letra, no el contenido. Usa un
              entorno donde respondas a ciegas y te corrija al final.
            </span>
          </li>
        </ol>
      </section>

      {/* Lo que el manual no da */}
      <section id="limites" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Sus límites
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Lo que el manual{" "}
          <span className="italic text-terracotta-deep">no</span> te da.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El manual te marca la respuesta correcta, pero no te dice{" "}
          <em>por qué</em>. Y eso es lo que falla cuando la pregunta cambia un
          verbo, una fecha o una palabra y de pronto las opciones se parecen
          mucho. Las tres cosas que un manual no resuelve:
        </p>
        <ul className="mt-5 space-y-3 text-[15.5px] text-ink-soft font-serif leading-relaxed">
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Por qué fallan las otras opciones.
              </strong>{" "}
              Saber por qué la B es incorrecta es lo que blinda la respuesta
              cuando dudas entre dos.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Trucos para acordarte el día del examen.
              </strong>{" "}
              Mnemotecnias, frases cortas, asociaciones visuales. El manual no
              está escrito para memorizar.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Repaso espaciado y simulacros cronometrados.
              </strong>{" "}
              Saber el material no es lo mismo que rendirlo bajo presión en 45
              minutos. Para eso necesitas practicar el formato exacto del
              examen.
            </span>
          </li>
        </ul>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-paper-warm border border-rule p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Si quieres ahorrar tiempo
          </p>
          <h3 className="mt-2 font-serif text-2xl font-medium leading-snug tracking-tight">
            Empieza con la{" "}
            <span className="italic text-terracotta-deep">demo gratis</span>{" "}
            y mira cómo trabajamos las preguntas.
          </h3>
          <p className="mt-3 font-serif text-[15.5px] leading-relaxed text-ink-soft">
            10 preguntas aleatorias del banco oficial, con la explicación
            razonada al final. Sin registro ni tarjeta. Si te convence el
            método, el acceso completo está en{" "}
            <Link
              href="/precio"
              className="underline underline-offset-4 decoration-terracotta hover:text-ink"
            >
              9,99 € durante un año
            </Link>
            : las 300 preguntas con razonamiento, los 5 temas en español B1,
            simulacros con cronómetro y repaso espaciado de tus errores.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/demo"
              className={
                buttonVariants({ variant: "terracotta", size: "lg" }) +
                " h-12 px-5 text-base rounded-xl"
              }
            >
              Probar 10 preguntas gratis →
            </Link>
            <Link
              href="/examen-ccse-2026"
              className={
                buttonVariants({ variant: "ink-outline", size: "lg" }) +
                " h-12 px-5 text-base"
              }
            >
              Ver guía del examen
            </Link>
          </div>
        </div>
      </section>

      {/* Lecturas relacionadas */}
      <section className="mt-12 border-t border-rule pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Sigue leyendo
        </p>
        <Link
          href="/examen-ccse-2026"
          className="group block rounded-2xl bg-paper-warm border border-rule p-5 hover:bg-cream transition-colors"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Guía
          </p>
          <h3 className="mt-1 font-serif text-[19px] font-medium text-ink group-hover:text-terracotta-deep transition-colors">
            Examen CCSE 2026: qué es y cómo prepararlo{" "}
            <span className="text-terracotta-soft">→</span>
          </h3>
          <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-soft">
            Formato del examen, requisitos, convocatorias y el método de
            preparación que sí funciona.
          </p>
        </Link>
      </section>

      <p className="mt-10 text-sm text-ink-muted text-center">
        ¿Te queda alguna duda sobre el manual o el examen? Mira las{" "}
        <Link
          href="/#faq"
          className="underline underline-offset-4 decoration-rule hover:text-ink"
        >
          preguntas frecuentes
        </Link>{" "}
        de la portada.
      </p>
    </main>
  );
}
