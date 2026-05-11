# PROJECT.md — Web CCSE

> Brief consolidado del producto y de las decisiones técnicas. Vivo. Cuando una decisión cambie, se refleja aquí y se añade un ADR en `docs/adr/`.

## 1. Qué es y para quién

Plataforma web de pago para preparar la prueba **CCSE** del Instituto Cervantes (requisito para la nacionalidad española por residencia).

**Perfil del usuario**:
- Persona extranjera con español A2-B1 (el A2 es requisito previo de nacionalidad para no hispanohablantes).
- Examen reservado en horizonte de 1-3 meses.
- Estudia mayoritariamente desde **móvil**, en ratos sueltos.
- Bajo nivel técnico esperado: la UI debe ser muy literal y muy intuitiva.

**Mercado**: ~50.000 personas/año se presentan al CCSE (cifra del Cervantes para los últimos años). Renovación natural cada año por el ciclo del manual.

## 2. Propuesta de valor — los 5 pilares

Lo que justifica pagar 4,99 € frente a la app oficial gratuita y a los blogs:

1. **Apuntes en castellano B1 estructurados** — no existen gratis.
2. **Cada pregunta razonada**: explicación + por qué falla cada distractor + mnemotécnico + dificultad + página del manual.
3. **Simulacro real** (45 min, 25 preguntas, distribución 60/40, sin penalización) con feedback al final.
4. **Repaso espaciado** automatizado de las preguntas falladas.
5. **Tracking de progreso** entre sesiones (P1) y multilingüe en explicaciones (P2).

La landing tiene que comunicar estos 5 puntos en los primeros 5 segundos.

## 3. Modelo de negocio

| Concepto | Decisión |
|---|---|
| Precio | **4,99 €** |
| Modalidad | **Pago único, acceso 365 días desde la compra** (no suscripción) |
| Stripe | Checkout en modo `payment` (one-shot), price único en EUR |
| Renovación | Email recordatorio a los 11 meses con link de re-compra. Sin renovación automática |
| Reembolso | No (la convocatoria fallida ya está cubierta por el Cervantes dentro de 18 meses) |
| Contenido durante el año | **Se actualiza al manual vigente automáticamente**. Si compras en marzo de 2026 y sale el manual 2027 en diciembre, en enero de 2027 ya estás viendo el material 2027 hasta que expire tu año |
| Política de erratas | Correcciones silenciosas en frío. Changelog público en `/cambios` |

Detalle en [`docs/adr/0003-stripe-one-shot-365.md`](docs/adr/0003-stripe-one-shot-365.md).

## 4. Stack técnico

| Capa | Elección |
|---|---|
| Framework | **Next.js 16 (App Router, Turbopack)** + TypeScript estricto |
| Hosting | **Vercel** |
| Estilos | Tailwind CSS v4 + **shadcn/ui** (componentes accesibles base) |
| Render markdown | `react-markdown` + `remark-gfm` (no MDX — no necesitamos JSX en los temas) |
| Validación | Zod (sobre `banco_300.json` en el build) |
| Auth | **Supabase Auth + Edge Functions** ([ADR 0007](docs/adr/0007-auth-supabase-edge-functions.md)). Hasta que esté cableado, paywall mockeado en `localStorage` |
| Pago | **Stripe Checkout** con webhook que marca `entitlement.expires_at` en una tabla de Supabase |
| Persistencia progreso | **localStorage** en el MVP, mismo módulo `lib/progreso.ts` se reescribirá contra Supabase cuando llegue auth |
| Analítica | Vercel Analytics + Speed Insights + Plausible (pendiente) |
| Tipografía | `next/font` con Geist Sans / Mono (default Next 16) |

ADRs detallados en `docs/adr/`.

## 5. Funcionalidades del MVP

### P0 — sin esto no es producto

- Landing pública con hero, beneficios, precio, FAQ.
- **Demo libre**: 10 preguntas mezcladas, con explicación al final, sin login.
- Auth (registro/login con Clerk).
- Paywall: contenido premium bloqueado salvo `entitlement` activo.
- `/estudiar/[tarea]` — render del markdown con índice flotante y glosario inline.
- `/practicar/[tarea]` — flashcards con feedback inmediato (correcto/incorrecto + explicación + mnemotécnico).
- `/simulacro/[id]` — 25 preguntas, cronómetro 45 min, sin feedback hasta el final, pantalla de resultados.
- `/dashboard` — "continuar donde lo dejaste" + porcentaje preparación.

### P1 — diferenciación competitiva

- Tracking persistente por pregunta (no vista / vista / acertada / fallada / dominada).
- `/repaso` — cola Leitner de 4 cajas priorizando falladas.
- `/progreso` — dashboard con barras por tarea y curva de simulacros.
- Búsqueda y filtros del banco (texto, tarea, dificultad, "solo falladas").
- Modo oscuro.

### P2 — futuro con tracción

- Multilingüe en explicaciones (EN/AR/RO/ZH).
- PWA con notificaciones push para racha diaria.
- Audios oficiales del Cervantes embebidos.
- Comunidad o canal de dudas.

## 6. Estructura objetivo del repo

Ver detalle en [`docs/repo-structure.md`](docs/repo-structure.md).

Resumen:
- `content/` — copia versionada de `banco_300.json`, los 5 temas y los 5 simulacros, sincronizada desde el repo de origen.
- `src/app/(public)/` — landing, demos, previews públicas. Indexable.
- `src/app/(app)/` — área autenticada con paywall.
- `src/app/api/` — Stripe checkout, webhook, endpoints de progreso.
- `src/lib/` — carga de contenido (Zod), entitlement, progreso, SRS.
- `src/components/` — `PreguntaCard`, `SimulacroTimer`, `PaywallGate`, etc.
- `scripts/sync-content.ts` — copia el contenido desde `OPOSICIONES/`.

## 7. Sincronización del contenido

El contenido nace en `4BitsEngineering/oposiciones/CCSE_Nacionalidad_Espanola/` y se sincroniza aquí.

- Frecuencia: **1 vez al año** (cuando sale el manual nuevo) + correcciones puntuales tras erratas.
- Mecanismo: script `scripts/sync-content.ts` parametrizable (`SOURCE_PATH=<ruta local del repo OPOSICIONES>`).
- Qué copia:
  - `preguntas_oficiales/banco_300.json` → `content/banco_300.json`
  - `temas/01..05_*.md` → `content/temas/`
  - `tests/simulacro_01..05.md` → `content/simulacros/`
- Validación: tras copiar, el script ejecuta el validador Zod y aborta si el JSON no cumple el schema.
- Versionado: el contenido se commitea aquí. La versión del manual se etiqueta en `package.json` (`"contentManualVersion": "2026"`).

Detalle en [`docs/adr/0004-content-sync-script.md`](docs/adr/0004-content-sync-script.md).

## 8. Métricas de éxito (norte estrella)

| Métrica | Objetivo en 6 meses |
|---|---|
| Conversión demo → registro | ≥ 30 % |
| Conversión registro → pago | ≥ 15 % |
| % usuarios pagados que aprueban el examen | ≥ 80 % (autoreporte vía email post-examen) |
| Tiempo medio de uso por sesión | ≥ 12 min |
| Retención semana 2 (de quien paga) | ≥ 60 % |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| App oficial gratuita del Cervantes con las mismas 300 preguntas | Diferenciación clara: apuntes B1, mnemotécnicos, simulacro real, tracking. Comunicada en landing y en cada preview |
| Contenido obsoleto al cambiar el manual 2027 | Política explícita: "tu año cubre el manual vigente, automáticamente". Pipeline de regeneración del banco con auditoría pymupdf documentado en el repo origen |
| Migración de Clerk a la instancia central | Capa de auth aislada en `lib/auth.ts`. Decisión de no atar lógica de negocio a Clerk SDK directamente fuera de esa capa |
| Erratas detectadas tras el lanzamiento | Auditoría pymupdf antes de cada release del banco + changelog público + capacidad de hot-fix sin redeploy completo (revalidación on-demand de Vercel) |
| Multidispositivo roto en MVP por usar localStorage | Aviso explícito en condiciones del MVP: "el progreso es por dispositivo hasta que se habilite la sincronización en cuenta". Migración planificada en P1-P2 |
| Reclamaciones de derechos del manual | Las 300 preguntas son de dominio público (manual gratuito y accesible públicamente). Las explicaciones son obra original del proyecto. Apuntes basados en la fuente pública. Riesgo bajo, conservar trazabilidad de página/manual en cada item |
