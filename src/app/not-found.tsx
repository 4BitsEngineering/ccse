import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Página no encontrada — CCSE",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="flex justify-center mb-6">
        <Seal size={48} />
      </div>
      <p className="text-[11px] font-mono text-ink-muted">404</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        Esta página
        <br />
        <span className="italic text-terracotta-deep">no existe</span>.
      </h1>
      <p className="mt-4 text-ink-soft">
        Puede que el enlace esté roto o que hayas escrito mal la dirección.
        Estos son los sitios principales:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className={
            buttonVariants({ variant: "terracotta" }) +
            " h-11 px-4 rounded-xl"
          }
        >
          Inicio
        </Link>
        <Link
          href="/demo"
          className={
            buttonVariants({ variant: "ink-outline" }) + " h-11 px-4"
          }
        >
          Demo gratis
        </Link>
        <Link
          href="/precio"
          className={
            buttonVariants({ variant: "ghost" }) +
            " h-11 px-4 text-ink-soft hover:bg-paper-warm"
          }
        >
          Precio
        </Link>
      </div>
    </main>
  );
}
