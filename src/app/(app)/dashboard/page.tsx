import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { Underline } from "@/components/ui/underline";
import { buttonVariants } from "@/components/ui/button";
import { loadBanco } from "@/lib/content";
import { TEMA_PDF, MANUAL_OFICIAL_PDF } from "@/lib/pdfs";
import { PaywallGate } from "@/components/paywall/PaywallGate";
import { DashboardContinuar } from "@/components/progreso/DashboardContinuar";

const TAREAS = [
  { n: 1, titulo: "Gobierno, legislación y participación" },
  { n: 2, titulo: "Derechos y deberes fundamentales" },
  { n: 3, titulo: "Organización territorial y geografía" },
  { n: 4, titulo: "Cultura e historia" },
  { n: 5, titulo: "Sociedad española" },
] as const;

export const metadata = {
  title: "Dashboard — CCSE",
};

export default function DashboardPage() {
  const banco = loadBanco();
  const conteoPorTarea = TAREAS.map((t) => ({
    ...t,
    total: banco.preguntas.filter((p) => p.tarea === t.n).length,
  }));

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
        Tu <span className="italic text-terracotta-deep">panel</span>.
      </h1>
      <Underline width={120} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Manual {banco.version_manual} · {banco.preguntas.length} preguntas
        oficiales · 5 simulacros.
      </p>

      <div className="mt-8">
        <DashboardContinuar />
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-2">
        Las 5 tareas
      </p>
      <ul>
        {conteoPorTarea.map((t) => (
          <li
            key={t.n}
            className="flex items-center gap-4 py-4 border-t border-rule first:border-t-0"
          >
            <div className="w-10 h-10 rounded-xl bg-paper-warm border border-rule grid place-items-center font-serif italic text-lg font-medium text-ink-soft shrink-0">
              {t.n}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[15px] font-medium leading-snug">
                {t.titulo}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {t.total} preguntas en el banco
              </p>
            </div>
            <div className="flex gap-1 text-xs">
              <Link
                href={`/estudiar/${t.n}`}
                className="px-2.5 py-1.5 rounded-full text-ink-soft hover:bg-paper-warm hover:text-ink"
              >
                Estudiar
              </Link>
              <Link
                href={`/practicar/${t.n}`}
                className="px-2.5 py-1.5 rounded-full text-ink-soft hover:bg-paper-warm hover:text-ink"
              >
                Practicar
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/simulacro"
        className="relative overflow-hidden mt-8 block rounded-2xl bg-terracotta text-cream p-6 hover:bg-terracotta-deep transition-colors"
      >
        <div className="absolute -top-8 -right-8 opacity-20 pointer-events-none">
          <Seal size={130} color="var(--cream)" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-90">
          Examen real, en casa
        </p>
        <p className="mt-2 font-serif italic text-2xl font-medium leading-tight tracking-tight">
          ¿Hacemos un simulacro?
        </p>
        <p className="mt-2 text-sm opacity-90">
          25 preguntas · 45 minutos · aprueba con 15
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cream text-terracotta-deep px-3 py-2 text-sm font-semibold">
          Empezar →
        </span>
      </Link>

      <section className="mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-2">
          Descargas
        </p>
        <h2 className="font-serif text-2xl font-medium leading-snug">
          Los 5 temas en <span className="italic text-terracotta-deep">PDF</span>.
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          Léelos offline, en el metro o imprimidos. Más el manual oficial del
          Instituto Cervantes (dominio público).
        </p>

        <ul className="mt-5 space-y-2">
          <li>
            <a
              href={TEMA_PDF[1]}
              download
              className="flex items-center justify-between rounded-xl border border-rule bg-cream px-4 py-3.5 text-sm hover:border-ink/40 transition-colors"
            >
              <span>
                <span className="font-medium text-ink">Tarea 1</span>{" "}
                <span className="text-ink-muted">
                  — {conteoPorTarea[0].titulo}
                </span>
                <span className="ml-2 inline-block rounded-full bg-olive/15 text-olive text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wide">
                  gratis
                </span>
              </span>
              <span aria-hidden className="text-ink-muted text-xs">
                ↓ PDF
              </span>
            </a>
          </li>
        </ul>

        <div className="mt-3">
          <PaywallGate
            title="Resto de descargas — premium"
            subtitle="Las Tareas 2-5 en PDF y el manual oficial completo del Cervantes están incluidos en el acceso anual de 9,99 €."
          >
            <ul className="space-y-2">
              {conteoPorTarea
                .filter((t) => t.n !== 1)
                .map((t) => (
                  <li key={`pdf-${t.n}`}>
                    <a
                      href={TEMA_PDF[t.n as 2 | 3 | 4 | 5]}
                      download
                      className="flex items-center justify-between rounded-xl border border-rule bg-cream px-4 py-3.5 text-sm hover:border-ink/40 transition-colors"
                    >
                      <span>
                        <span className="font-medium text-ink">
                          Tarea {t.n}
                        </span>{" "}
                        <span className="text-ink-muted">— {t.titulo}</span>
                      </span>
                      <span aria-hidden className="text-ink-muted text-xs">
                        ↓ PDF
                      </span>
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href={MANUAL_OFICIAL_PDF}
                  download
                  className="flex items-center justify-between rounded-xl border border-rule bg-paper-warm px-4 py-3.5 text-sm hover:border-ink/40 transition-colors"
                >
                  <span>
                    <span className="font-medium text-ink">
                      Manual oficial CCSE 2026
                    </span>{" "}
                    <span className="text-ink-muted">
                      — Instituto Cervantes (2,8 MB)
                    </span>
                  </span>
                  <span aria-hidden className="text-ink-muted text-xs">
                    ↓ PDF
                  </span>
                </a>
              </li>
            </ul>
          </PaywallGate>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 text-sm">
        <Link
          href="/repaso"
          className={
            buttonVariants({ variant: "ink-outline" }) + " h-10 px-4"
          }
        >
          Repaso de errores
        </Link>
        <Link
          href="/progreso"
          className={
            buttonVariants({ variant: "ghost" }) +
            " h-10 px-4 text-ink-soft hover:bg-paper-warm"
          }
        >
          Ver progreso
        </Link>
      </div>
    </main>
  );
}
