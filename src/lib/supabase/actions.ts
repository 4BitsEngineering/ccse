"use server";

/**
 * Server Actions de auth Supabase: signIn / signUp / signOut.
 *
 * Para usar desde forms (action={signIn}) o llamadas directas desde
 * Client Components. Cada acción revalida "/" para que el árbol entero
 * recoja la nueva sesión y los Server Components reflejen el cambio.
 */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "./server";

export type AuthResult = { ok: true } | { ok: false; error: string };

function originFromHeaders(h: Headers): string {
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { ok: false, error: "Faltan email o contraseña." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: traducirError(error.message) };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { ok: false, error: "Faltan email o contraseña." };
  }
  if (password.length < 8) {
    return { ok: false, error: "La contraseña debe tener al menos 8 caracteres." };
  }

  const supabase = await createClient();
  const origin = originFromHeaders(await headers());
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });
  if (error) {
    return { ok: false, error: traducirError(error.message) };
  }

  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

function traducirError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email o contraseña incorrectos.";
  if (m.includes("user already registered")) return "Ya existe una cuenta con este email.";
  if (m.includes("email not confirmed")) return "Confirma tu email antes de iniciar sesión.";
  if (m.includes("password should be")) return "La contraseña no cumple los requisitos.";
  return msg;
}
