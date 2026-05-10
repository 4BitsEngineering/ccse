const PASOS = [
  {
    n: 1,
    titulo: "Lees los temas",
    cuerpo:
      "5 temas que cubren lo que pregunta el examen. Escritos para alguien con español B1.",
  },
  {
    n: 2,
    titulo: "Practicas las 300 preguntas",
    cuerpo:
      "Una a una, con feedback inmediato. Si fallas, ves la explicación, los distractores razonados y el truco para acordarte.",
  },
  {
    n: 3,
    titulo: "Te examinas con un simulacro",
    cuerpo:
      "25 preguntas, cronómetro de 45 minutos, sin pistas hasta el final. Igual que el día real.",
  },
  {
    n: 4,
    titulo: "Repasas lo que fallaste",
    cuerpo:
      "La plataforma te trae de vuelta las preguntas que fallaste, espaciadas. Cuando las dominas, dejan de aparecer.",
  },
];

export function ComoFunciona() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <header className="mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight text-balance">
            Cómo <span className="italic text-terracotta-deep">funciona</span>.
          </h2>
        </header>
        <ol className="space-y-6">
          {PASOS.map((p) => (
            <li key={p.n} className="flex gap-4">
              <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-rule bg-cream font-serif italic text-lg font-medium text-terracotta">
                {p.n}
              </span>
              <div>
                <h3 className="font-sans font-semibold leading-snug">
                  {p.titulo}
                </h3>
                <p className="mt-1 font-serif text-[15px] leading-relaxed text-ink-soft">
                  {p.cuerpo}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
