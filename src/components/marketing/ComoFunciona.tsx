const PASOS = [
  {
    n: 1,
    titulo: "Lees los temas",
    cuerpo:
      "5 temas que cubren lo que pregunta el examen. Estado, derechos, geografía, cultura, vida diaria. Escritos para alguien con español B1.",
  },
  {
    n: 2,
    titulo: "Practicas las 300 preguntas",
    cuerpo:
      "Pregunta a pregunta, con feedback inmediato. Si fallas, ves la explicación, los distractores razonados y el truco para acordarte.",
  },
  {
    n: 3,
    titulo: "Te examinas con un simulacro",
    cuerpo:
      "25 preguntas, cronómetro de 45 minutos, sin pistas hasta el final. Igual que el día real. Al terminar sabes si aprobarías hoy.",
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
    <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Cómo funciona</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Un ciclo de 4 pasos hasta llegar al examen seguro de aprobar.
          </p>
        </header>
        <ol className="grid gap-6 sm:grid-cols-2">
          {PASOS.map((p) => (
            <li key={p.n} className="flex gap-4">
              <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 font-mono font-semibold">
                {p.n}
              </span>
              <div>
                <h3 className="font-semibold">{p.titulo}</h3>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
