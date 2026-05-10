import { Card } from "@/components/ui/card";

const PILARES = [
  {
    titulo: "Apuntes claros en español B1 + PDF descargable",
    cuerpo:
      "5 temas escritos en español sencillo, con tablas y ejemplos. Léelos en el navegador o descárgalos en PDF para repasar sin internet, en el metro o en la cola del médico.",
  },
  {
    titulo: "Cada pregunta, razonada",
    cuerpo:
      "No solo cuál es la correcta. También por qué fallan las otras dos opciones, una pista mnemotécnica para no olvidar y la página del manual donde aparece la información.",
  },
  {
    titulo: "Simulacros reales con cronómetro",
    cuerpo:
      "25 preguntas, 45 minutos, distribución 60 / 40 entre bloques, sin penalización. Igual que el examen oficial. Al terminar ves dónde fallaste y por qué.",
  },
  {
    titulo: "Repaso de lo que fallas",
    cuerpo:
      "La plataforma recuerda qué preguntas has fallado y te las muestra otra vez, espaciadas en el tiempo. Así no se olvidan antes del examen.",
  },
  {
    titulo: "Tu progreso, siempre a mano",
    cuerpo:
      "Ves cuántas preguntas dominas de cada tarea, cuántos simulacros has aprobado y cuánto te falta. Sin necesidad de hacer cuentas en una libreta.",
  },
];

export function Pilares() {
  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Por qué pagar 9,99 € si la app oficial es gratis
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            La app oficial del Cervantes te da las preguntas. Aquí tienes
            cinco ventajas concretas que sí marcan la diferencia el día del
            examen.
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILARES.map((p, i) => (
            <li key={p.titulo}>
              <Card className="h-full p-6">
                <p className="text-xs font-mono text-zinc-400 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold mb-2">{p.titulo}</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {p.cuerpo}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
