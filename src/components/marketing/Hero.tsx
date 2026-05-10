import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Manual oficial CCSE 2026 · Instituto Cervantes
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Prepara el examen CCSE y consigue tu nacionalidad española.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
          Apuntes en español sencillo, las 300 preguntas oficiales con
          explicación razonada y simulacros con cronómetro real.{" "}
          <span className="font-semibold">9,99 € durante un año entero.</span>{" "}
          Sin suscripción.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/demo"
            className={buttonVariants({ size: "lg" }) + " text-base"}
          >
            Probar 10 preguntas gratis
          </Link>
          <Link
            href="#precio"
            className={
              buttonVariants({ variant: "outline", size: "lg" }) + " text-base"
            }
          >
            Ver qué incluye
          </Link>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Sin tarjeta para la demo · Sin registro · 10 preguntas reales del
          banco oficial
        </p>
      </div>
    </section>
  );
}
