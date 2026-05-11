"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/actions";
import { forgetEntitlement } from "@/lib/entitlement";

/**
 * Botón "Cerrar sesión" como Client Component.
 *
 * Antes de disparar el server action limpia la cache de entitlement en
 * localStorage y emite "ccse:entitlement-changed" — así el SiteHeader
 * pasa a estado anónimo inmediatamente, sin esperar al redirect ni al
 * próximo syncEntitlementFromServer().
 */
export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    forgetEntitlement();
    window.dispatchEvent(new CustomEvent("ccse:entitlement-changed"));
    startTransition(() => {
      void signOut();
    });
  };

  return (
    <Button
      type="button"
      variant="ink-outline"
      size="sm"
      onClick={onClick}
      disabled={pending}
      className="h-10 px-4 rounded-xl"
    >
      {pending ? "Cerrando…" : "Cerrar sesión"}
    </Button>
  );
}
