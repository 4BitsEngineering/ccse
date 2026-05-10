const FAQS = [
  {
    q: "¿Qué es exactamente el examen CCSE?",
    a: "Es la prueba de Conocimientos Constitucionales y Socioculturales de España. La organiza el Instituto Cervantes y es un requisito para conseguir la nacionalidad española por residencia. Son 25 preguntas en 45 minutos, apruebas con 15 aciertos.",
  },
  {
    q: "Si la app oficial del Cervantes es gratis y trae las 300 preguntas, ¿para qué pagar?",
    a: "La app oficial te da las preguntas, pero no las explicaciones. Aquí tienes por qué cada respuesta es correcta, por qué fallan las otras opciones, una pista mnemotécnica para acordarte y la página exacta del manual. Además, los apuntes en español B1, simulacros con cronómetro y repaso espaciado de tus errores no existen en la app oficial.",
  },
  {
    q: "¿Cuánto tiempo dura mi acceso?",
    a: "365 días desde el día en que pagas. No es una suscripción mensual, no se renueva sola. Si quieres otro año más adelante, vuelves a comprar de forma manual.",
  },
  {
    q: "¿Y si suspendo el examen?",
    a: "El propio Instituto Cervantes te da una segunda convocatoria gratuita dentro de 18 meses. Mientras tanto, mantienes el acceso a la plataforma con tu compra original para seguir preparándote.",
  },
  {
    q: "¿Y si el Cervantes publica un manual nuevo durante mi año?",
    a: "Tu acceso pasa automáticamente al manual vigente, sin pagar nada extra. Si compras hoy con el manual 2026 y el 2027 sale en diciembre, en enero ya estás estudiando con el material 2027.",
  },
  {
    q: "¿Puedo usarlo desde el móvil?",
    a: "Sí. La plataforma está pensada para que estudies en ratos sueltos, esperando el bus o en la cola del médico. Funciona en cualquier navegador moderno, sin necesidad de instalar nada.",
  },
  {
    q: "¿Qué nivel de español necesito?",
    a: "Los apuntes están escritos en español B1, que es el nivel que ya tienes que demostrar antes del CCSE (mediante el examen DELE A2 o equivalente). Hay tablas, listas y ejemplos para que sea fácil de seguir.",
  },
  {
    q: "¿Hay reembolso?",
    a: "No hay reembolso, porque la propia convocatoria fallida del Cervantes ya está cubierta por su segunda oportunidad gratuita. Para evitar dudas, primero prueba la demo gratuita de 10 preguntas: con eso te haces una idea clara del producto antes de pagar.",
  },
];

export function Faq() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <header className="mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight">
            Preguntas <span className="italic text-terracotta-deep">frecuentes</span>.
          </h2>
        </header>
        <ul className="divide-y divide-rule">
          {FAQS.map((f) => (
            <li key={f.q}>
              <details className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-serif text-[17px] leading-snug text-ink">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-terracotta transition group-open:rotate-45 text-2xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
