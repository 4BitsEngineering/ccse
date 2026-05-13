import type { Metadata } from "next";
import Link from "next/link";
import { Underline } from "@/components/ui/underline";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Examen CCSE 2026: qué es, cómo es y cómo preparárselo",
  description:
    "Guía clara del examen CCSE 2026 del Instituto Cervantes: 25 preguntas en 45 minutos sobre las 300 oficiales, los 5 temas del manual, cómo aprobar y cómo prepararte sin perder tiempo.",
  alternates: { canonical: "/examen-ccse-2026" },
};

const TEMAS = [
  {
    n: 1,
    titulo: "Gobierno, legislación y participación ciudadana",
    detalle:
      "Constitución española, Cortes Generales, Gobierno, el rey y las elecciones. Cómo funciona el voto y los principales partidos.",
  },
  {
    n: 2,
    titulo: "Derechos y deberes fundamentales",
    detalle:
      "Igualdad, libertad de expresión, sanidad, educación, vivienda, trabajo. Qué te da y qué te pide la Constitución.",
  },
  {
    n: 3,
    titulo: "Organización territorial y geografía",
    detalle:
      "Comunidades autónomas, provincias, ciudades autónomas, ríos, montañas. España en mapa.",
  },
  {
    n: 4,
    titulo: "Cultura e historia de España",
    detalle:
      "Desde Atapuerca hasta 1978: Hispania, Al-Ándalus, los Reyes Católicos, la Guerra Civil, la Transición. Los hitos sin paja.",
  },
  {
    n: 5,
    titulo: "Sociedad española",
    detalle:
      "La vida cotidiana: horarios, fiestas, comidas, sanidad pública, educación, trámites con la Administración.",
  },
] as const;

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Examen CCSE 2026: qué es, cómo es y cómo prepararse para la prueba del Instituto Cervantes",
  description:
    "Guía del examen CCSE 2026 del Instituto Cervantes. Formato (25 preguntas, 45 minutos), las 300 preguntas oficiales, los 5 temas del manual, requisitos para la nacionalidad española y cómo prepararlo.",
  inLanguage: "es",
  about: {
    "@type": "Thing",
    name: "Examen CCSE — Conocimientos Constitucionales y Socioculturales de España",
  },
  publisher: {
    "@type": "Organization",
    name: "CCSE",
    legalName: "4Bits Engineering",
  },
} as const;

export default function ExamenCcse2026Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />

      {/* Hero */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Guía 2026 · Instituto Cervantes
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
        El examen{" "}
        <span className="italic text-terracotta-deep">CCSE 2026</span>,
        explicado sin rodeos.
      </h1>
      <Underline width={180} className="mt-2" />
      <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft text-pretty">
        El CCSE es la prueba que pide el Instituto Cervantes para la{" "}
        <strong className="font-sans font-semibold text-ink">
          nacionalidad española por residencia
        </strong>
        . Son <em>25 preguntas en 45 minutos</em>, todas sacadas de un banco
        oficial de 300. Aquí tienes lo importante: cómo es, qué entra y cómo
        prepararlo sin perder semanas.
      </p>

      {/* TOC mínima */}
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
              Qué es exactamente el CCSE
            </a>
          </li>
          <li>
            <a href="#formato" className="hover:text-ink">
              Formato: 25 preguntas, 45 minutos, 15 aciertos
            </a>
          </li>
          <li>
            <a href="#temas" className="hover:text-ink">
              Los 5 temas del manual
            </a>
          </li>
          <li>
            <a href="#requisitos" className="hover:text-ink">
              Quién puede presentarse
            </a>
          </li>
          <li>
            <a href="#convocatorias" className="hover:text-ink">
              Convocatorias y segunda oportunidad
            </a>
          </li>
          <li>
            <a href="#preparacion" className="hover:text-ink">
              Cómo prepararlo
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
          La prueba de{" "}
          <span className="italic text-terracotta-deep">
            Conocimientos Constitucionales y Socioculturales
          </span>{" "}
          de España.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El CCSE evalúa lo básico que se le pide a alguien que va a ser
          español: cómo funciona el Estado, qué derechos y deberes hay, cómo se
          organiza el territorio, qué hitos marcan la historia y cómo es la
          vida cotidiana. Lo organiza el{" "}
          <strong className="font-sans font-semibold text-ink">
            Instituto Cervantes
          </strong>{" "}
          y lo gestionan centros examinadores repartidos por toda España y
          algunos países.
        </p>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          No es un examen de cultura general ni de español: es un examen{" "}
          <em>de las 300 preguntas que publica el Cervantes</em>. Estudias esas
          300 y aciertas. Punto.
        </p>
      </section>

      {/* Formato */}
      <section id="formato" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Formato
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          25 preguntas. 45 minutos.{" "}
          <span className="italic text-terracotta-deep">15 para aprobar</span>.
        </h2>
        <ul className="mt-5 space-y-3 text-[15.5px] text-ink-soft font-serif leading-relaxed">
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                25 preguntas tipo test
              </strong>
              , con 3 o 4 opciones cada una. Una sola respuesta correcta.
              Sacadas literalmente del banco oficial.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                45 minutos
              </strong>{" "}
              cronometrados. Sobra tiempo si te las sabes; si dudas mucho,
              llegas justo.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                15 aciertos
              </strong>{" "}
              (60 %) para aprobar. No hay penalización por error: <em>siempre</em>{" "}
              contesta a todo.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-terracotta font-semibold pt-0.5">
              ·
            </span>
            <span>
              Resultados en aproximadamente{" "}
              <strong className="font-sans font-semibold text-ink">
                20 días
              </strong>{" "}
              en tu área personal del Instituto Cervantes.
            </span>
          </li>
        </ul>
      </section>

      {/* Temas */}
      <section id="temas" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Manual 2026
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Los 5 temas, en una mirada.
        </h2>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft">
          El manual del Cervantes divide las 300 preguntas en estos cinco
          bloques. Cada tema aporta unas 60 preguntas.
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
                  {t.titulo}{" "}
                  <span className="text-terracotta-soft">→</span>
                </h3>
                <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-soft">
                  {t.detalle}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Requisitos
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Quién puede presentarse.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          Cualquier persona mayor de 18 años puede inscribirse en una
          convocatoria. Para tramitar la nacionalidad por residencia, además
          del CCSE necesitas acreditar nivel{" "}
          <strong className="font-sans font-semibold text-ink">A2 de español</strong>{" "}
          (con el examen DELE A2 o equivalente), salvo que vengas de un país
          con español como lengua oficial — en ese caso quedas exento del A2,
          pero{" "}
          <em>el CCSE lo haces igual</em>.
        </p>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          Hay exenciones contadas: personas con escolarización completa en
          España, mayores de 65 años con análisis específico y algunos
          supuestos médicos certificados. Para todos los demás casos, el CCSE
          es obligatorio.
        </p>
      </section>

      {/* Convocatorias */}
      <section id="convocatorias" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Convocatorias
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Una al mes.{" "}
          <span className="italic text-terracotta-deep">
            Una segunda oportunidad gratis
          </span>{" "}
          si suspendes.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          El Instituto Cervantes organiza una convocatoria CCSE al mes
          (habitualmente la última semana). Puedes inscribirte online en su
          web hasta unos 15-20 días antes. La inscripción se paga en el momento
          y el examen es presencial en uno de los centros oficiales.
        </p>
        <p className="mt-3 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          Si suspendes, no pierdes nada salvo el tiempo: el propio Cervantes te
          da una{" "}
          <strong className="font-sans font-semibold text-ink">
            segunda convocatoria gratuita
          </strong>{" "}
          dentro de los 18 meses siguientes. Esa es la razón por la que aquí no
          ofrecemos reembolso del acceso a la plataforma: la red ya la pone el
          propio examen.
        </p>
      </section>

      {/* Preparación */}
      <section id="preparacion" className="mt-12 scroll-mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
          Preparación
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
          Cómo prepararlo sin{" "}
          <span className="italic text-terracotta-deep">perder semanas</span>.
        </h2>
        <p className="mt-4 font-serif text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          La trampa del CCSE es que es un examen finito (300 preguntas), pero
          la mayoría de la gente lo aborda como si fuera infinito: vídeos
          sueltos de YouTube, PDFs sin orden, listas que te marean. El método
          que funciona es opuesto y aburrido:
        </p>
        <ol className="mt-5 space-y-3 text-[15.5px] text-ink-soft font-serif leading-relaxed list-none counter-reset-marker">
          <li className="flex gap-3">
            <span
              aria-hidden
              className="shrink-0 w-7 h-7 rounded-full bg-terracotta/10 grid place-items-center font-serif italic text-[14px] text-terracotta-deep"
            >
              1
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Lee el manual entero al menos una vez.
              </strong>{" "}
              No por aprobar, sino para tener el mapa: saber dónde encajan las
              preguntas que vayan saliendo. Una tarde por tema.
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
                Practica las 300 preguntas con explicación.
              </strong>{" "}
              No memorices la respuesta correcta: entiende{" "}
              <em>por qué</em> lo es y por qué fallan las otras. Eso es lo que
              te salva cuando la pregunta cambia el verbo y te confunde.
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
                Repaso espaciado de las falladas.
              </strong>{" "}
              Cada vez que fallas una, vuelve a aparecer a los días. Si
              aciertas seguido, sale del radar. Es lo que evita que olvides la
              semana antes.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden
              className="shrink-0 w-7 h-7 rounded-full bg-terracotta/10 grid place-items-center font-serif italic text-[14px] text-terracotta-deep"
            >
              4
            </span>
            <span>
              <strong className="font-sans font-semibold text-ink">
                Simulacros con cronómetro.
              </strong>{" "}
              25 preguntas, 45 minutos, sin pausas. Para que el día del examen
              no sea la primera vez que ves ese formato.
            </span>
          </li>
        </ol>

        {/* CTA principal */}
        <div className="mt-10 rounded-2xl bg-paper-warm border border-rule p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
            Tu siguiente paso
          </p>
          <h3 className="mt-2 font-serif text-2xl font-medium leading-snug tracking-tight">
            Prueba el método con{" "}
            <span className="italic text-terracotta-deep">
              10 preguntas reales
            </span>{" "}
            antes de pagar nada.
          </h3>
          <p className="mt-3 font-serif text-[15.5px] leading-relaxed text-ink-soft">
            10 preguntas aleatorias del banco oficial. Sin registro, sin
            tarjeta. Al final ves cuáles acertaste y la explicación razonada de
            cada una. Si te convence, el acceso completo está en{" "}
            <Link
              href="/precio"
              className="underline underline-offset-4 decoration-terracotta hover:text-ink"
            >
              9,99 € durante un año entero
            </Link>
            .
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
              href="/precio"
              className={
                buttonVariants({ variant: "ink-outline", size: "lg" }) +
                " h-12 px-5 text-base"
              }
            >
              Ver qué incluye el acceso
            </Link>
          </div>
        </div>
      </section>

      {/* Footer-link to FAQ on landing */}
      <p className="mt-12 text-sm text-ink-muted text-center">
        ¿Te queda alguna duda concreta? Mira las{" "}
        <Link
          href="/#faq"
          className="underline underline-offset-4 decoration-rule hover:text-ink"
        >
          preguntas frecuentes
        </Link>{" "}
        de la portada o escribe a{" "}
        <a
          href="mailto:hola@preparacionccse.es"
          className="underline underline-offset-4 decoration-rule hover:text-ink"
        >
          hola@preparacionccse.es
        </a>
        .
      </p>
    </main>
  );
}
