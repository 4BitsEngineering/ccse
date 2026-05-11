"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Botón "Comprar 9,99 €" → Stripe Checkout.
 *
 * Llama a /api/stripe/checkout (que requiere sesión) y redirige a la
 * URL hosted que devuelve. Si el usuario no tiene sesión, redirige a
 * /registro?next=/cuenta — la compra necesita user_id en metadata.
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onClick = async () => {
    setError(null);
    setBusy(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      credentials: "same-origin",
    });
    if (res.status === 401) {
      router.push("/registro?next=/cuenta");
      return;
    }
    const json = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };
    if (!res.ok || !json.url) {
      setBusy(false);
      setError(json.error ?? "No se pudo iniciar el pago.");
      return;
    }
    // No setBusy(false): vamos a navegar fuera, el botón queda en estado
    // "Redirigiendo…" hasta que la página cambie.
    window.location.href = json.url;
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="terracotta"
        size={size}
        className={cn("h-12 px-5 text-base rounded-xl", className)}
        onClick={onClick}
        disabled={busy}
      >
        {busy ? "Redirigiendo…" : label}
      </Button>
      {error && (
        <p
          role="alert"
          className="text-sm text-terracotta-deep bg-terracotta-soft/50 rounded-lg px-3 py-2"
        >
          {error}
        </p>
      )}
    </div>
  );
}
