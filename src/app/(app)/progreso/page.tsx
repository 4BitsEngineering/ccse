import { loadBanco } from "@/lib/content";
import { PaywallGate } from "@/components/paywall/PaywallGate";
import { ProgresoClient } from "@/components/progreso/ProgresoClient";

export const metadata = {
  title: "Tu progreso — CCSE",
};

export default function ProgresoPage() {
  const banco = loadBanco();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tu progreso</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Cuántas preguntas dominas de cada tarea y cómo te ha ido en los
          simulacros.
        </p>
      </header>
      <PaywallGate
        title="Tracking de progreso — premium"
        subtitle="El seguimiento detallado de tu avance entre sesiones forma parte del acceso completo."
      >
        <ProgresoClient banco={banco.preguntas} />
      </PaywallGate>
    </main>
  );
}
