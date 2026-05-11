import { Underline } from "@/components/ui/underline";
import { getDemoPreguntas } from "@/lib/content";
import { DemoDeck } from "@/components/practica/DemoDeck";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demo gratis — CCSE",
  description:
    "10 preguntas aleatorias del banco oficial CCSE 2026. Sin registro. Recibe la explicación razonada de cada respuesta al final.",
};

export default function DemoPage() {
  const preguntas = getDemoPreguntas(10);
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Sin registro · Sin tarjeta
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        Prueba con{" "}
        <span className="italic text-terracotta-deep">10 preguntas</span>.
      </h1>
      <Underline width={150} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        10 preguntas aleatorias del banco oficial CCSE 2026. Al final ves cuáles
        acertaste y la explicación razonada.
      </p>

      <div className="mt-8">
        <DemoDeck preguntas={preguntas} />
      </div>
    </main>
  );
}
