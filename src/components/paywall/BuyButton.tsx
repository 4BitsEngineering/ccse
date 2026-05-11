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
import { purchaseMock } from "@/lib/entitlement";
import { cn } from "@/lib/utils";

/**
 * Botón "Comprar 4,99 €" en modo mock. Muestra un diálogo claro de
 * "esto es una simulación" antes de activar el entitlement local.
 *
 * Cuando llegue Stripe real este componente se sustituye por uno
 * que llame al endpoint /api/stripe/checkout y redirija a la sesión
 * de Stripe Checkout.
 */
export function BuyButton({
  size = "lg",
  className,
  label = "Comprar 4,99 €",
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const confirm = () => {
    purchaseMock();
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
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modo demo · sin pago real</DialogTitle>
            <DialogDescription className="text-left">
              Stripe aún no está conectado. Si confirmas, se activa un
              acceso de prueba durante 365 días almacenado en este
              navegador (sin pago, sin tarjeta). En producción esto será
              una sesión real de Stripe Checkout.
            </DialogDescription>
          </DialogHeader>
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
              className={buttonVariants()}
            >
              Activar acceso de prueba
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
