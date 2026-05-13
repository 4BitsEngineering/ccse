-- Mover tablas de aplicación de public → ccse.
--
-- Motivo: Supabase retira (30-may-2026) los grants por defecto del
-- schema public. En lugar de mantener grants explícitos en public,
-- aislamos nuestras tablas en un schema propio (ccse) con grants
-- mínimos y RLS estricta. Ver docs/runbooks/migracion-schema-ccse.md.
--
-- ALTER TABLE ... SET SCHEMA mueve la tabla con TODOS sus objetos
-- dependientes: datos, foreign keys (incluido el FK cross-schema a
-- auth.users), índices, constraints, policies y triggers.

-- ════════════════════════════════════════════════════════════════════
-- 1. Schema ccse
-- ════════════════════════════════════════════════════════════════════

create schema if not exists ccse;

comment on schema ccse is
  'Tablas de aplicación CCSE. Aisladas de public para evitar grants '
  'por defecto y exposición de extensiones.';

-- ════════════════════════════════════════════════════════════════════
-- 2. Grants base
-- ════════════════════════════════════════════════════════════════════
-- Patrón Supabase-native: grants amplios sobre el schema, RLS hace de
-- frontera real. anon no recibe grants de tabla (no tiene policies que
-- le permitan nada de todos modos); sólo USAGE del schema para que
-- PostgREST pueda introspeccionar.

grant usage on schema ccse to anon, authenticated, service_role;

-- authenticated: permisos de DML; RLS filtra por user_id en cada tabla.
grant select, insert, update, delete
  on all tables in schema ccse
  to authenticated;
grant usage, select
  on all sequences in schema ccse
  to authenticated;

-- service_role bypassa RLS — lo usa el webhook de Stripe y el
-- admin client (mock-purchase). Full access.
grant all privileges on all tables in schema ccse to service_role;
grant all privileges on all sequences in schema ccse to service_role;
grant all privileges on all functions in schema ccse to service_role;

-- Default privileges: aplican a objetos FUTUROS creados en el schema.
-- Sin esto, cada migración nueva tendría que volver a granteear.
alter default privileges in schema ccse
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema ccse
  grant usage, select on sequences to authenticated;
alter default privileges in schema ccse
  grant all privileges on tables to service_role;
alter default privileges in schema ccse
  grant all privileges on sequences to service_role;
alter default privileges in schema ccse
  grant all privileges on functions to service_role;

-- ════════════════════════════════════════════════════════════════════
-- 3. Mover tablas
-- ════════════════════════════════════════════════════════════════════
-- Idempotente: solo mueve si la tabla sigue en public. Esto permite
-- que la migración se vuelva a aplicar sin error si ya fue ejecutada
-- (p.ej. al rehidratar local con `supabase db reset`).

do $$
begin
  if exists (
    select 1 from pg_tables
    where schemaname = 'public' and tablename = 'entitlements'
  ) then
    alter table public.entitlements set schema ccse;
  end if;

  if exists (
    select 1 from pg_tables
    where schemaname = 'public' and tablename = 'progreso_estados'
  ) then
    alter table public.progreso_estados set schema ccse;
  end if;

  if exists (
    select 1 from pg_tables
    where schemaname = 'public' and tablename = 'simulacro_resultados'
  ) then
    alter table public.simulacro_resultados set schema ccse;
  end if;
end $$;

-- ════════════════════════════════════════════════════════════════════
-- 4. Forzar reload de PostgREST
-- ════════════════════════════════════════════════════════════════════
-- Supabase normalmente lo hace tras DDL, pero al exponer un schema
-- nuevo conviene asegurarlo. No falla si el listener no está.

notify pgrst, 'reload schema';
