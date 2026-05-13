/**
 * Supabase browser client.
 *
 * Para usar desde Client Components ("use client"). Usa la publishable
 * key, que es segura para exponer en el bundle del navegador. La sesión
 * vive en cookies httpOnly que escribe el server.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      db: { schema: "ccse" },
    },
  );
}
