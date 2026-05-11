import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/actions";

/**
 * Bloque "Sesión" para /cuenta. Server Component: lee el user del
 * cliente Supabase del padre y muestra estado + acciones. El logout va
 * en un form con server action.
 */
export function SesionCard({ email }: { email: string | null }) {
  if (!email) {
    return (
      <div className="rounded-2xl bg-paper-warm p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted mb-3">
          Sesión
        </p>
        <p className="text-sm text-ink-soft mb-4">
          Aún no has iniciado sesión. Con una cuenta podrás guardar tu compra y
          tu progreso entre dispositivos.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/login"
            className={buttonVariants({ variant: "terracotta", size: "sm" }) + " h-10 px-4 rounded-xl"}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className={buttonVariants({ variant: "ink-outline", size: "sm" }) + " h-10 px-4 rounded-xl"}
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-paper-warm p-5">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Sesión
        </p>
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-olive text-cream">
          Conectado
        </span>
      </div>
      <p className="text-sm text-ink-soft">
        Tu cuenta:{" "}
        <span className="font-medium text-ink break-all">{email}</span>
      </p>
      <form action={signOut} className="mt-4">
        <Button
          type="submit"
          variant="ink-outline"
          size="sm"
          className="h-10 px-4 rounded-xl"
        >
          Cerrar sesión
        </Button>
      </form>
    </div>
  );
}
