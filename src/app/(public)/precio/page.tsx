import { Precio } from "@/components/marketing/Precio";

export const metadata = {
  title: "Precio — CCSE",
  description:
    "4,99 € de pago único por 365 días de acceso completo a la plataforma de preparación CCSE. Sin suscripción ni renovación automática.",
};

const REASSURANCES = [
  {
    titulo: "Sin reembolso",
    texto:
      "La convocatoria fallida del Cervantes ya está cubierta por su segunda oportunidad gratis dentro de 18 meses. Para evitar dudas, prueba antes la demo gratuita.",
  },
  {
    titulo: "Manual nuevo, acceso automático",
    texto:
      "Si el Cervantes publica un manual nuevo durante tu año, tu acceso pasa al material nuevo sin pagar extra.",
  },
  {
    titulo: "Ningún cobro recurrente",
    texto:
      "Es un pago único. No queda guardada ninguna tarjeta. Pasado el año, si quieres seguir, vuelves a comprar tú mismo.",
  },
  {
    titulo: "Erratas, en silencio",
    texto:
      "Si detectamos un error, lo corregimos sin molestarte y queda anotado en /cambios.",
  },
];

export default function PrecioPage() {
  return (
    <>
      <Precio />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
            Lo importante en claro
          </p>
          <ul className="grid gap-5 sm:grid-cols-2">
            {REASSURANCES.map((r) => (
              <li key={r.titulo}>
                <h2 className="font-sans font-semibold text-ink">{r.titulo}</h2>
                <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-soft">
                  {r.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
