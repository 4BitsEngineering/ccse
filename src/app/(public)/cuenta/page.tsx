import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { Underline } from "@/components/ui/underline";
import { CuentaClient } from "@/components/paywall/CuentaClient";

export const metadata = {
  title: "Tu cuenta — CCSE",
};

export default function CuentaPage() {
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
        Tu <span className="italic text-terracotta-deep">cuenta</span>.
      </h1>
      <Underline width={120} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        El acceso se guarda en este navegador. Cuando llegue Supabase, tu compra
        se asociará a tu email.
      </p>

      <div className="mt-8">
        <CuentaClient />
      </div>
    </main>
  );
}
