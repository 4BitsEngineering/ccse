import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BuyButton } from "@/components/paywall/BuyButton";

const INCLUYE = [
  "Las 300 preguntas oficiales del banco 2026 con explicación completa",
  "Los 5 temas en español B1, en web y también en PDF para leer offline o imprimir",
  "5 simulacros con cronómetro y desglose por tarea",
  "Repaso espaciado de las preguntas que fallaste",
  "Actualización automática al manual vigente del Cervantes",
  "Acceso completo durante 365 días, desde el día que pagas",
];

/**
 * En la landing reutilizamos este bloque como sección secundaria, así
 * que el encabezado es h2 por defecto. En /precio (donde es la página
 * principal) lo pasamos a h1 con `heading="h1"`.
 */
export function Precio({ heading = "h2" }: { heading?: "h1" | "h2" } = {}) {
  const Heading = heading;
  return (
    <section id="precio" className="bg-paper-warm border-b border-rule">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
            Pago único
          </p>
          <Heading className="mt-2 font-serif text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight">
            Un solo pago,
            <br />
            <span className="italic text-terracotta-deep">un año entero</span>{" "}
            para preparar el examen CCSE.
          </Heading>
        </header>

        <div className="rounded-2xl bg-cream border border-rule p-8">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-6xl font-medium tracking-tight leading-none text-ink">
              9,99 €
            </span>
            <span className="font-serif italic text-ink-muted text-lg">
              / 365 días
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            No es suscripción, no se renueva. Si pasado el año quieres seguir,
            decides tú si vuelves a comprar.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm">
            {INCLUYE.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="text-olive font-semibold pt-0.5">
                  ✓
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton />
            <Link
              href="/demo"
              className={
                buttonVariants({ variant: "ghost", size: "lg" }) +
                " h-12 px-5 text-base text-ink-soft hover:bg-paper-warm"
              }
            >
              Probar la demo primero
            </Link>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Modo demo: la compra simulada activa el acceso en este navegador
            durante 365 días, sin pago real. Stripe entra cuando conectemos el
            backend de cuentas.
          </p>
        </div>
      </div>
    </section>
  );
}
