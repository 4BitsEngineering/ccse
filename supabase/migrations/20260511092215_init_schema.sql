-- ADR 0007: auth y entitlement con Supabase + Edge Functions.
-- Esquema inicial: entitlements, progreso_estados, simulacro_resultados.
-- RLS estricto por user_id = auth.uid(). Entitlements solo lo escribe
-- service_role (Edge Function stripe-webhook).

-- ════════════════════════════════════════════════════════════════════
-- entitlements
-- ════════════════════════════════════════════════════════════════════

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

alter table public.entitlements enable row level security;

-- El usuario logueado puede leer su propio entitlement (para el paywall).
create policy "entitlements_select_own"
  on public.entitlements
  for select
  to authenticated
  using (user_id = (select auth.uid()));

-- No hay policy de INSERT/UPDATE/DELETE para authenticated.
-- service_role (Edge Function stripe-webhook) bypassea RLS y es el único
-- que puede mutar esta tabla.

-- ════════════════════════════════════════════════════════════════════
-- progreso_estados
-- ════════════════════════════════════════════════════════════════════

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

alter table public.progreso_estados enable row level security;

create policy "progreso_estados_select_own"
  on public.progreso_estados
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "progreso_estados_insert_own"
  on public.progreso_estados
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "progreso_estados_update_own"
  on public.progreso_estados
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "progreso_estados_delete_own"
  on public.progreso_estados
  for delete
  to authenticated
  using (user_id = (select auth.uid()));

-- ════════════════════════════════════════════════════════════════════
-- simulacro_resultados
-- ════════════════════════════════════════════════════════════════════

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

alter table public.simulacro_resultados enable row level security;

create policy "simulacro_resultados_select_own"
  on public.simulacro_resultados
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "simulacro_resultados_insert_own"
  on public.simulacro_resultados
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

-- Histórico inmutable desde el cliente: sin policies de UPDATE ni DELETE.

create index simulacro_resultados_user_fecha_idx
  on public.simulacro_resultados (user_id, fecha desc);
