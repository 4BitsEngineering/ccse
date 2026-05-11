"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Lleva al Customer Portal de Stripe para ver recibos / descargar
 * factura. Llama a /api/stripe/portal y redirige.
 */
export function ReciboButton({ className }: { className?: string }) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      credentials: "same-origin",
    });
    const json = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };
    if (!res.ok || !json.url) {
      setBusy(false);
      alert(json.error ?? "No se pudo abrir el portal de Stripe.");
      return;
    }
    window.location.href = json.url;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={cn(
        buttonVariants({ variant: "ink-outline" }) + " h-12 px-4",
        className,
      )}
    >
      {busy ? "Abriendo…" : "Ver mi recibo"}
    </button>
  );
}
