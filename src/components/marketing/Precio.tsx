import Link from "next/link";
import { Card } from "@/components/ui/card";
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

export function Precio() {
  return (
    <section
      id="precio"
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Un solo pago, un año entero
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Sin suscripción, sin renovación automática, sin sorpresas.
          </p>
        </header>

        <Card className="p-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight">9,99 €</span>
            <span className="text-zinc-500">una vez · 365 días</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Pago único. No es suscripción. Si pasado el año quieres seguir,
            decides tú si vuelves a comprar.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {INCLUYE.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-green-600 dark:text-green-400">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <BuyButton />
            <Link
              href="/demo"
              className={
                buttonVariants({ variant: "outline", size: "lg" }) +
                " text-base"
              }
            >
              Probar la demo primero
            </Link>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Modo demo: la compra simulada activa el acceso en este
            navegador durante 365 días, sin pago real. Stripe entra cuando
            conectemos el backend de cuentas.
          </p>
        </Card>
      </div>
    </section>
  );
}
