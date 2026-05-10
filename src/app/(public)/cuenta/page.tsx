import { CuentaClient } from "@/components/paywall/CuentaClient";

export const metadata = {
  title: "Tu cuenta — CCSE",
};

export default function CuentaPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tu cuenta</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sprint 2 mock: el acceso se guarda en este navegador. Cuando
          llegue Supabase, tu compra se asociará a tu email.
        </p>
      </header>
      <CuentaClient />
    </main>
  );
}
