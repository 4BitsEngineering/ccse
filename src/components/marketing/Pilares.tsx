const PILARES = [
  {
    titulo: "Apuntes claros en español B1",
    cuerpo:
      "5 temas escritos en español sencillo, con tablas y ejemplos. Léelos en web o descárgalos en PDF para repasar sin internet.",
  },
  {
    titulo: "Cada pregunta, razonada",
    cuerpo:
      "Por qué es la correcta. Y por qué fallan las otras dos. Con pista mnemotécnica y página del manual donde aparece.",
  },
  {
    titulo: "Simulacros con cronómetro real",
    cuerpo:
      "25 preguntas. 45 minutos. Distribución oficial. Igual que el examen — al terminar ves dónde fallaste y por qué.",
  },
  {
    titulo: "Repaso de lo que fallas",
    cuerpo:
      "Espaciado en el tiempo. La plataforma te trae de vuelta lo que fallaste hasta que lo dominas. No se olvida antes del examen.",
  },
];

export function Pilares() {
  return (
    <section className="bg-paper-warm border-b border-rule">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.15] tracking-tight text-balance">
          Cuatro cosas que <span className="italic">sí</span> marcan la
          diferencia.
        </h2>
        <ul className="mt-10">
          {PILARES.map((p, i) => (
            <li
              key={p.titulo}
              className={
                "flex gap-4 py-4 " +
                (i === 0 ? "" : "border-t border-rule")
              }
            >
              <span className="font-serif italic text-2xl leading-none text-terracotta pt-1 w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-sans text-base font-semibold leading-snug">
                  {p.titulo}
                </p>
                <p className="mt-1 font-serif text-[15px] leading-relaxed text-ink-soft">
                  {p.cuerpo}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <blockquote className="mt-12 text-center">
          <p className="font-serif italic text-xl leading-relaxed text-ink text-pretty">
            “Llevaba dos años con la app oficial sin enterarme.
            <br className="hidden sm:block" /> Aprobé al primer simulacro.”
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-muted">
            Daniela · Quito → Madrid
          </p>
        </blockquote>
      </div>
    </section>
  );
}
