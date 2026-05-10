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

export const metadata = {
  title: "Precio — CCSE",
  description:
    "9,99 € de pago único por 365 días de acceso completo a la plataforma de preparación CCSE. Sin suscripción ni renovación automática.",
};

export default function PrecioPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Un solo pago, un año entero
        </h1>
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
            className={buttonVariants({ variant: "outline", size: "lg" }) +
              " text-base"}
          >
            Probar la demo primero
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Modo demo Sprint 2: la compra simulada activa el acceso en este
          navegador durante 365 días, sin pago real. Stripe entra en una
          siguiente entrega.
        </p>
      </Card>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 text-sm text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="font-semibold">Sin reembolso</h2>
          <p className="mt-1">
            La convocatoria fallida del Cervantes ya está cubierta por su
            segunda oportunidad gratis dentro de 18 meses. Para evitar
            dudas, prueba antes la demo gratuita.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Manual nuevo, acceso automático</h2>
          <p className="mt-1">
            Si el Cervantes publica un manual nuevo durante tu año, tu
            acceso pasa al material nuevo sin pagar extra.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Ningún cobro recurrente</h2>
          <p className="mt-1">
            Es un pago único. No queda guardada ninguna tarjeta. Pasado el
            año, si quieres seguir, vuelves a comprar tú mismo.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Erratas, en silencio</h2>
          <p className="mt-1">
            Si detectamos un error, lo corregimos sin molestarte y queda
            anotado en /cambios.
          </p>
        </div>
      </section>
    </main>
  );
}
