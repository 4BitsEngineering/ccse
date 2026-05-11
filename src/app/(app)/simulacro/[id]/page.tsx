import Link from "next/link";
import { notFound } from "next/navigation";
import { getSimulacroDinamico } from "@/lib/simulacro";
import { SimulacroDeck } from "@/components/simulacro/SimulacroDeck";
import { PaywallGate } from "@/components/paywall/PaywallGate";

const VALID = [1, 2, 3, 4, 5] as const;

export function generateStaticParams() {
  return VALID.map((n) => ({ id: String(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Simulacro ${id} — CCSE`,
    description: `Examen CCSE en formato real con cronómetro de 45 minutos y 25 preguntas oficiales del banco 2026.`,
  };
}

export default async function SimulacroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = Number(id);
  if (!VALID.includes(n as (typeof VALID)[number])) notFound();

  const preguntas = getSimulacroDinamico(n);
  const isFree = n === 1;

  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta mb-3">
        <Link href="/simulacro" className="hover:text-terracotta-deep">
          ← Examen
        </Link>{" "}
        · Simulacro {n}
      </p>
      {isFree ? (
        <SimulacroDeck preguntas={preguntas} simulacroId={n} />
      ) : (
        <PaywallGate
          title={`Simulacro ${n} — premium`}
          subtitle="El Simulacro 1 está abierto como muestra. Los simulacros 2-5 forman parte del acceso completo (4,99 € por 365 días)."
        >
          <SimulacroDeck preguntas={preguntas} simulacroId={n} />
        </PaywallGate>
      )}
    </main>
  );
}
