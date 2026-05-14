"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/supabase/actions";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "error"; message: string }
    | { kind: "confirm-email" }
  >({ kind: "idle" });

  const submit = async (formData: FormData) => {
    setStatus({ kind: "loading" });
    const action = mode === "login" ? signIn : signUp;
    const result = await action(formData);
    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      return;
    }
    if (mode === "signup") {
      setStatus({ kind: "confirm-email" });
      return;
    }
    router.push("/cuenta");
    router.refresh();
  };

  if (status.kind === "confirm-email") {
    return (
      <div className="rounded-2xl bg-paper-warm p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive mb-3">
          Casi
        </p>
        <h2 className="font-serif text-2xl font-medium leading-snug">
          Revisa tu correo.
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Te hemos mandado un enlace de confirmación. Pulsa el botón del email
          para activar tu cuenta y volver a CCSE.
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          ¿No lo encuentras? Revisa la carpeta de spam o correo no deseado:
          a veces el mensaje acaba ahí.
        </p>
      </div>
    );
  }

  const isLoading = status.kind === "loading";

  return (
    <form action={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isLoading}
          className="h-11 rounded-xl px-3 text-[15px]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={mode === "signup" ? 8 : undefined}
          disabled={isLoading}
          className="h-11 rounded-xl px-3 text-[15px]"
        />
        {mode === "signup" && (
          <p className="text-xs text-ink-muted">Mínimo 8 caracteres.</p>
        )}
      </div>

      {status.kind === "error" && (
        <p
          role="alert"
          className="text-sm text-terracotta-deep bg-terracotta-soft/50 rounded-lg px-3 py-2"
        >
          {status.message}
        </p>
      )}

      <Button
        type="submit"
        variant="terracotta"
        disabled={isLoading}
        className="h-12 w-full rounded-xl text-[15px]"
      >
        {isLoading
          ? mode === "login"
            ? "Entrando…"
            : "Creando cuenta…"
          : mode === "login"
            ? "Iniciar sesión"
            : "Crear cuenta"}
      </Button>

      <p className="text-sm text-ink-soft text-center">
        {mode === "login" ? (
          <>
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="text-terracotta-deep underline underline-offset-4">
              Crear una
            </Link>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-terracotta-deep underline underline-offset-4">
              Iniciar sesión
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
