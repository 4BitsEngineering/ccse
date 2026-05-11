import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { Underline } from "@/components/ui/underline";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Iniciar sesión — CCSE",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/cuenta");

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
        Iniciar <span className="italic text-terracotta-deep">sesión</span>.
      </h1>
      <Underline width={120} className="mt-1" />
      <p className="mt-4 text-sm text-ink-soft">
        Entra para ver tu acceso, tu progreso y tu historial de simulacros.
      </p>

      <div className="mt-8">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
