import { Underline } from "@/components/ui/underline";
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        Sistema Leitner
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        <span className="italic text-terracotta-deep">Repaso</span> espaciado.
      </h1>
      <Underline width={130} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Las preguntas que has fallado, espaciadas en el tiempo. Cuando las
        dominas, dejan de aparecer.
      </p>

      <div className="mt-8">
        <PaywallGate
          title="Repaso espaciado — premium"
          subtitle="El sistema Leitner que recuerda tus errores y te los devuelve en el momento justo es parte del acceso completo."
        >
          <RepasoClient banco={banco.preguntas} />
        </PaywallGate>
      </div>
    </main>
  );
}
