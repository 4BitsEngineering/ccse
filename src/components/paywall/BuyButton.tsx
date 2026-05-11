"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { purchaseRemoteMock } from "@/lib/entitlement";
import { cn } from "@/lib/utils";

/**
 * Botón "Comprar 9,99 €". Mock hasta Stripe real: la compra escribe
 * directamente la fila en la tabla entitlements vía /api/comprar-mock.
 *
 * Requiere sesión. Si el usuario no está logueado, redirige a
 * /registro?next=/cuenta — la fila necesita user_id sí o sí. Cuando
 * llegue Stripe este componente se sustituye por uno que llame a
 * /api/stripe/checkout y redirija a la sesión de Stripe Checkout.
 */
export function BuyButton({
  size = "lg",
  className,
  label = "Comprar 9,99 €",
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onClick = async () => {
    setError(null);
    setBusy(true);
    const res = await fetch("/api/me/entitlement", {
      credentials: "same-origin",
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as {
      user?: { id: string } | null;
    };
    setBusy(false);
    if (!json.user) {
      router.push("/registro?next=/cuenta");
      return;
    }
    setOpen(true);
  };

  const confirm = async () => {
    setError(null);
    setBusy(true);
    const remote = await purchaseRemoteMock();
    setBusy(false);
    if (!remote) {
      setError("No se pudo activar el acceso. Inténtalo en un momento.");
      return;
    }
    setOpen(false);
    router.push("/cuenta");
    router.refresh();
  };

  return (
    <>
      <Button
        variant="terracotta"
        size={size}
        className={cn("h-12 px-5 text-base rounded-xl", className)}
        onClick={onClick}
        disabled={busy}
      >
        {busy && !open ? "…" : label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modo demo · sin pago real</DialogTitle>
            <DialogDescription className="text-left">
              Stripe aún no está conectado. Si confirmas, se activa un
              acceso de prueba durante 365 días asociado a tu cuenta. En
              producción esto será una sesión real de Stripe Checkout.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p
              role="alert"
              className="text-sm text-terracotta-deep bg-terracotta-soft/50 rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}
          <DialogFooter className="flex flex-row gap-2 justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "outline" })}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={busy}
              className={buttonVariants()}
            >
              {busy ? "Activando…" : "Activar acceso de prueba"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
