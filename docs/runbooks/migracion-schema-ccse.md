# Migración: tablas a schema `ccse`

**Fecha objetivo**: antes del 30-may-2026 (Supabase retira los grants por
defecto de `public`).

**Riesgo**: bajo. Stripe está en modo test, no hay compras reales que
proteger; los datos de `progreso_estados` y `simulacro_resultados` son
de cuentas de prueba. Aun así, hacemos backup.

**Estrategia**: mover las 3 tablas vía `ALTER TABLE … SET SCHEMA` (preserva
datos, FKs, índices, policies y RLS) + actualizar los 4 clientes Supabase
con `db: { schema: 'ccse' }` para que las llamadas `.from(…)` existentes
no necesiten cambiar.

---

## Cambios ya en repo

| Archivo | Cambio |
| --- | --- |
| `supabase/migrations/20260513120000_move_to_ccse_schema.sql` | Crea schema `ccse`, fija grants y mueve las 3 tablas. Idempotente. |
| `supabase/config.toml` | `[api].schemas` añade `"ccse"` + `extra_search_path`. Solo afecta a entorno local. |
| `src/lib/supabase/server.ts` | `db: { schema: 'ccse' }` |
| `src/lib/supabase/client.ts` | `db: { schema: 'ccse' }` |
| `src/lib/supabase/admin.ts` | `db: { schema: 'ccse' }` |
| `supabase/functions/stripe-webhook/index.ts` | `db: { schema: 'ccse' }` |

`proxy.ts` y `actions.ts` no se tocan: sólo usan `supabase.auth.*`.

---

## Orden de aplicación en producción

> ⚠️ No usamos Docker local: todo se hace contra el remoto vía CLI.
> Vercel autodeploya desde `main`. La ventana entre los pasos 2 y 4 es
> el único momento en el que la app está rota (la migración mueve las
> tablas pero el código en Vercel aún apunta a `public`, y PostgREST
> aún no expone `ccse`). Hay que ejecutar 2 → 3 → 4 seguidos.

### 1. Backup (datos test, pero por si acaso)

```powershell
npx supabase db dump --linked --data-only -f backup-pre-ccse.sql
npx supabase db dump --linked --schema-only -f schema-pre-ccse.sql
```

### 2. Aplicar la migración al remoto

```powershell
npx supabase db push --linked
```

Esto crea el schema `ccse`, fija grants y mueve las 3 tablas. En este
momento las `.from(…)` desde la app actual (que aún apunta a `public`)
empezarán a fallar.

### 3. Exponer `ccse` en el Dashboard

`config.toml` solo afecta a entorno local — el remoto se configura en
la UI:

1. https://supabase.com/dashboard/project/sbtpydttrswiljnskrsq/settings/api
2. Sección **Data API Settings** → campo **Exposed schemas**.
3. Añadir `ccse` a la lista (queda `public, graphql_public, ccse`).
4. Guardar. PostgREST recarga su catálogo en 2-3 s.

### 4. Deploy de la app

```powershell
git push origin main
```

Vercel autodeploya. Los clientes con `db.schema: 'ccse'` empiezan a
hablar con `ccse.*` y la app vuelve a verde.

### 5. Redeploy del Edge Function

La edge function `stripe-webhook` también lleva el cambio (cliente
Deno con `db.schema: 'ccse'`). Hay que redeployarla:

```powershell
npx supabase functions deploy stripe-webhook --project-ref sbtpydttrswiljnskrsq
```

### 6. Smoke test

- `GET /api/me/entitlement` con sesión → devuelve fila sin error.
- `GET /api/me/progreso` con sesión → devuelve estados y simulacros.
- Compra mock (`POST /api/me/entitlement/mock-purchase`) → escribe en
  `ccse.entitlements`.
- Comprobar en Stripe test → disparar `checkout.session.completed` con
  el webhook → fila aparece en `ccse.entitlements`.

---

## Rollback

Si la migración rompe algo después del paso 3 y necesitamos volver:

```sql
-- Mover de vuelta a public (idempotente). Los grants y policies
-- viajan con la tabla — sólo perderemos los nuevos default privileges
-- de ccse, que son irrelevantes si volvemos a public.
alter table ccse.entitlements set schema public;
alter table ccse.progreso_estados set schema public;
alter table ccse.simulacro_resultados set schema public;
```

Luego revertir los commits de los clientes (volver a sin `db.schema`).

---

## Notas y trampas conocidas

- **Grants por defecto en `public`**: este es el origen del problema.
  Tras la migración podríamos hacer `revoke all on schema public from
  anon, authenticated;` pero conviene esperar a la fecha de Supabase
  para no chocarnos con sus propios grants automáticos. Tras el 30-may
  añadir un commit con el `revoke`.
- **`auth.users` cross-schema FK**: las 3 tablas tienen FK a
  `auth.users(id) on delete cascade`. Los FKs cross-schema funcionan
  sin más en Postgres; `set schema` los preserva.
- **`gen types`**: el repo todavía no genera tipos `Database<...>`. Si
  los añadimos a futuro: `npx supabase gen types typescript --linked
  --schema ccse,auth > src/lib/supabase/types.ts`.
- **PostgREST cache**: tras DDL Supabase recarga el catálogo
  automáticamente; la migración además emite `notify pgrst, 'reload
  schema'`. Si tras el push las llamadas a la API devuelven 404
  durante más de 30 s, hay algo mal en "Exposed schemas".
- **Realtime, Storage, GraphQL**: no los usamos sobre `public`. Si se
  añaden a futuro habrá que repetir el patrón (suscripciones REALTIME
  necesitan que el publication cubra `ccse`).

---

## Después de migrar — pendientes

- [ ] Confirmar (psql) que `public.entitlements`, `public.progreso_estados`
      y `public.simulacro_resultados` ya no existen.
- [ ] Tras el 30-may: commit que haga `revoke all on schema public from
      anon, authenticated;` y deje `public` limpio.
- [ ] Actualizar ADR-0007 con una nota apuntando a esta migración.
