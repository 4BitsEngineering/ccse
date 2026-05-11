import { Underline } from "@/components/ui/underline";
import { CuentaClient } from "@/components/paywall/CuentaClient";
import { SesionCard } from "@/components/auth/SesionCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Tu cuenta — CCSE",
};

export default async function CuentaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        Tu <span className="italic text-terracotta-deep">cuenta</span>.
      </h1>
      <Underline width={120} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Acceso y progreso. Mientras no haya sesión, el estado se guarda solo en
        este navegador.
      </p>

      <div className="mt-8 space-y-5">
        <SesionCard email={user?.email ?? null} />
        <CuentaClient />
      </div>
    </main>
  );
}
