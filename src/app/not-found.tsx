import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Página no encontrada — CCSE",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="text-sm font-mono text-zinc-500">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Esta página no existe
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Puede que el enlace esté roto o que hayas escrito mal la
        dirección. Estos son los sitios principales:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          Inicio
        </Link>
        <Link
          href="/demo"
          className={buttonVariants({ variant: "outline" })}
        >
          Demo gratis
        </Link>
        <Link
          href="/precio"
          className={buttonVariants({ variant: "outline" })}
        >
          Precio
        </Link>
      </div>
    </main>
  );
}
