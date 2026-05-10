import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { Underline } from "@/components/ui/underline";
import { loadBanco } from "@/lib/content";
import { PaywallGate } from "@/components/paywall/PaywallGate";
import { ProgresoClient } from "@/components/progreso/ProgresoClient";

export const metadata = {
  title: "Tu progreso — CCSE",
};

export default function ProgresoPage() {
  const banco = loadBanco();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="flex items-center gap-2.5 mb-8">
        <Seal size={28} />
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-wide"
        >
          CCSE
        </Link>
      </header>

      <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        Tu <span className="italic text-terracotta-deep">progreso</span>.
      </h1>
      <Underline width={140} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Cuántas preguntas dominas de cada tarea y cómo te ha ido en los
        simulacros.
      </p>

      <div className="mt-8">
        <PaywallGate
          title="Tracking de progreso — premium"
          subtitle="El seguimiento detallado de tu avance entre sesiones forma parte del acceso completo."
        >
          <ProgresoClient banco={banco.preguntas} />
        </PaywallGate>
      </div>
    </main>
  );
}
