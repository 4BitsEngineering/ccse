# ADR 0007 — Auth y entitlement con Supabase + Edge Functions

**Estado**: aceptada · **Fecha**: 2026-05-10 · **Sustituye a**: [ADR 0002](0002-auth-clerk-stub.md)

## Contexto

ADR 0002 eligió **Clerk** como stub temporal de auth, con plan de migrar a "la instancia central de 4Bits" cuando estuviese disponible. Durante Sprint 1 (10 mayo 2026) revisamos esa decisión y se descartó Clerk antes incluso de cablearlo. Razón: el equipo ya está usando **Supabase** para otros productos y prefiere consolidar auth + datos de usuario allí en lugar de añadir un proveedor externo más al stack.

La decisión llega con código ya construido bajo el supuesto de que la auth se incorporaría más tarde. Sprint 1 y Sprint 3 se entregaron sin login: contenido público, paywall mockeado en `localStorage`. Esto deja una capa "como si hubiese cuenta" lista para enchufar a un backend real.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Mantener Clerk como stub** (ADR 0002) | Lanzamiento más rápido, magic link out of the box | Vendor extra que luego hay que migrar; coste a partir de 10k MAU; duplica responsabilidades con la futura DB |
| **Supabase Auth + Edge Functions** | Mismo proveedor que la DB; auth, almacenamiento y compute bajo un único panel; magic link y OAuth listos; gratuito hasta 50 k usuarios activos al mes | Acoplamiento al ecosistema Supabase. La Edge Function añade una capa que hay que escribir y probar |
| **Auth.js (NextAuth) self-hosted con Supabase como adapter** | Más control sobre el flujo, no atado al cliente de Supabase | Dos piezas que mantener (Auth.js + Supabase). Sobre-ingeniería para nuestro caso |

## Decisión

**Supabase Auth como proveedor de identidad** y **Edge Functions** como capa de servidor para todo lo que no sea consulta directa a tablas (notablemente el webhook de Stripe y la activación de entitlements).

### Esquema esperado

```sql
-- Usuarios los gestiona auth.users (Supabase). Solo añadimos tablas de negocio.

create table public.entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null check (plan in ('anual')),
  source text not null check (source in ('stripe', 'manual')),
  manual_version text not null,
  purchased_at timestamptz not null,
  expires_at timestamptz not null,
  stripe_session_id text,
  stripe_customer_id text,
  updated_at timestamptz not null default now()
);

create table public.progreso_estados (
  user_id uuid not null references auth.users(id) on delete cascade,
  pregunta_id text not null,
  estado text not null check (estado in ('vista','acertada','fallada','dominada')),
  caja_srs int not null check (caja_srs between 1 and 4),
  aciertos_consecutivos int not null default 0,
  ultima_respuesta text,
  ultima_correcta bool,
  last_seen_at timestamptz not null default now(),
  primary key (user_id, pregunta_id)
);

create table public.simulacro_resultados (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  simulacro_id int not null,
  fecha timestamptz not null default now(),
  total int not null,
  aciertos int not null,
  por_tarea jsonb not null,
  duracion_segundos int not null,
  preguntas_falladas text[] not null
);
```

RLS estricto: cada fila se filtra por `user_id = auth.uid()`. Solo el rol `service_role` puede modificar `entitlements` (lo usa la Edge Function del webhook de Stripe).

### Edge Functions

- `stripe-webhook` — recibe los eventos de Stripe. Verifica la firma con `STRIPE_WEBHOOK_SECRET`, procesa `checkout.session.completed` y hace upsert sobre `entitlements` con `service_role`. Reemplaza al `/api/stripe/webhook/route.ts` planeado en ADR 0003.
- `seed-progreso` — opcional, futura: lee el localStorage del usuario tras login y migra estados existentes.

El cliente Next.js sigue usando funciones puras de tabla (a través del SDK de Supabase) para leer entitlement y progreso; las escrituras sensibles al pago pasan por Edge Functions.

## Plan de migración

1. Levantar proyecto Supabase (free tier).
2. Aplicar el esquema anterior con migraciones (`supabase/migrations`).
3. Cablear `@supabase/ssr` en Next.js para auth con magic link + email/password.
4. Reescribir `src/lib/entitlement.ts` para que lea de Supabase en lugar de localStorage. La interfaz pública (`hasActiveEntitlement`, `getEntitlement`) **se mantiene**, así PaywallGate y BuyButton no cambian.
5. Reescribir `src/lib/progreso.ts` con la misma idea: misma API pública, distintas implementaciones. ProgresoStore con `LocalStorageStore` (offline / no-login) y `SupabaseStore` (cuando hay sesión).
6. Implementar la Edge Function `stripe-webhook` y conectarla con Stripe en modo test.
7. Sustituir el `BuyButton` mock por uno que llame a `/api/stripe/checkout` (que crea la sesión con el `userId` actual).
8. Cuando funcione end-to-end, retirar la lógica mock (`purchaseMock`, opciones avanzadas de `/cuenta`).

## Consecuencias

- **Positivas**: una sola plataforma para auth, DB, compute serverless y almacenamiento. El SDK de Supabase es ampliamente usado, hay ejemplos abundantes para Next App Router. Coste predecible.
- **Negativas**: vendor lock-in moderado a Supabase. Si en el futuro el equipo quiere cambiar, hay que reescribir las queries y migrar usuarios; menor fricción que migrar de Clerk porque controlamos el esquema.
- **Acción pendiente**: crear el proyecto Supabase y los secretos necesarios antes de arrancar el sprint Stripe-real.

## Estado de los ADRs relacionados

- **ADR 0002 (Clerk como stub)**: queda **superseded** por este. No se llegó a cablear.
- **ADR 0003 (Stripe one-shot 365 días)**: el modelo de negocio se mantiene. Solo cambia el destinatario del webhook (Edge Function de Supabase, no Clerk metadata).
- **ADR 0005 (Progreso en localStorage)**: vigente para usuarios anónimos / sin login. Cuando hay sesión, `SupabaseStore` se hace prioritario y `LocalStorageStore` queda como fallback offline.
- **ADR 0006 (Paywall freemium)**: se mantiene. La capa que decide "está pagado" cambia de fuente, pero la jerarquía de contenido público / preview / premium no cambia.
