import { loadBanco } from "@/lib/content";
import { PaywallGate } from "@/components/paywall/PaywallGate";
import { RepasoClient } from "@/components/progreso/RepasoClient";

export const metadata = {
  title: "Repaso espaciado — CCSE",
};

export default function RepasoPage() {
  const banco = loadBanco();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Repaso</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Las preguntas que has fallado, espaciadas en el tiempo. Cuando
          las dominas, dejan de aparecer.
        </p>
      </header>
      <PaywallGate
        title="Repaso espaciado — premium"
        subtitle="El sistema Leitner que recuerda tus errores y te los devuelve en el momento justo es parte del acceso completo."
      >
        <RepasoClient banco={banco.preguntas} />
      </PaywallGate>
    </main>
  );
}
