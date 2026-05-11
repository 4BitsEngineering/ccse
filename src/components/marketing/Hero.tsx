import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Underline } from "@/components/ui/underline";

export function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-2xl px-6 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
          Edición 2026 · 300 preguntas oficiales
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl font-normal leading-[1.02] tracking-tight text-balance">
          El examen de{" "}
          <span className="italic text-terracotta-deep">
            nacionalidad
          </span>{" "}
          al alcance.
        </h1>
        <Underline width={180} className="mt-2" />
        <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft text-pretty">
          Apuntes claros, las <em>300 preguntas</em> con explicación y
          simulacros reales. Sin trampas.{" "}
          <strong className="font-sans font-semibold text-ink">4,99 €</strong>{" "}
          un año entero.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            href="#precio"
            className={
              buttonVariants({ variant: "ghost", size: "lg" }) +
              " h-12 px-5 text-base text-ink-soft hover:bg-paper-warm"
            }
          >
            Ver qué incluye
          </Link>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Sin registro · Sin tarjeta · 10 preguntas reales del banco oficial
        </p>
      </div>
    </section>
  );
}
