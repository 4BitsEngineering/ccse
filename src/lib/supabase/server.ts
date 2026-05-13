/**
 * Supabase server client.
 *
 * Para usar desde Server Components, Server Actions y Route Handlers.
 * Lee y escribe cookies a través de next/headers (en Next 16 cookies()
 * es async, hay que await).
 *
 * Si el componente que llama es un Server Component "puro" (sin Server
 * Action ni Route Handler), las llamadas a cookieStore.set() lanzan: en
 * ese caso ignoramos el error porque el proxy (proxy.ts) ya se encarga
 * de refrescar la sesión.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      db: { schema: "ccse" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component puro: el proxy refrescará la sesión.
          }
        },
      },
    },
  );
}
