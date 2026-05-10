# ADR 0002 — Clerk como stub de auth, migración futura a instancia central

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

El equipo planea una **instancia central** que centralice auth, panel del usuario y pago, compartida entre varios productos (CCSE, otros futuros). Esa instancia **no está lista** y CCSE quiere lanzarse antes que ella.

Necesitamos una solución de auth que:
- Permita lanzar el MVP en 2-3 semanas sin construir auth desde cero.
- Soporte el flujo email + password y, idealmente, magic link y proveedores OAuth (Google) sin trabajo extra.
- Tenga un mecanismo simple para asociar **entitlements** (acceso pagado, fecha de expiración) al usuario sin requerir DB propia.
- Sea fácilmente reemplazable por la instancia central cuando esté.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Clerk** | UI lista, magic link y OAuth out-of-the-box, `publicMetadata` y `privateMetadata` por usuario para entitlements sin DB, integración Next.js de primera clase | Coste por MAU si crece (gratis hasta 10k), vendor lock-in moderado |
| Auth.js (NextAuth) self-hosted | Cero proveedor externo, gratis | Sin UI, requiere DB para sesiones y entitlements desde el día 1 (más superficie) |
| Conectar a la instancia central desde el día 1 | Sin migración después | Bloquea el MVP hasta que la central tenga endpoints. Acopla CCSE al calendario de la central |
| Supabase Auth | DB + auth integrados | Acoplaríamos DB a Supabase aunque no la queramos para el resto |

## Decisión

**Clerk** como stub durante el MVP. Migración planificada a la instancia central cuando esté.

Aislamos toda la lógica de auth en `src/lib/auth.ts` con una interfaz mínima (`getCurrentUser()`, `requireAuth()`, `getUserEntitlement()`). Ningún componente de la web importa el SDK de Clerk directamente fuera de esa capa.

Los entitlements (plan, fecha de expiración) viven en `clerkClient.publicMetadata`. Esto evita levantar una DB para algo tan pequeño.

## Plan de migración

1. Cuando la instancia central exponga sus endpoints (auth + entitlement), implementar `lib/auth.ts` contra ellos sin tocar el resto del código.
2. Migrar usuarios existentes de Clerk a la central (export → import).
3. Apagar Clerk.

## Consecuencias

- **Positivas**: lanzamos el MVP en 2-3 semanas. Sin DB propia. Email + magic link gratis.
- **Negativas**: dependemos de Clerk durante 3-6 meses, hasta la migración. Coste si crecemos a >10k MAU antes de migrar (improbable).
- **Acción**: revisar coste de Clerk al alcanzar 5k usuarios. Empezar a planificar migración a la central a partir de ese hito.
