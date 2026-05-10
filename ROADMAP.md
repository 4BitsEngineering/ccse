# ROADMAP.md — Plan de entrega del MVP CCSE

5 sprints, 4-5 semanas de calendario a ritmo razonable. El criterio de "done" de cada sprint es deployable en Vercel y demostrable.

---

## Sprint 0 — Bootstrap (1-2 días)

**Objetivo**: repo desplegado en Vercel con el esqueleto de Next.js, integraciones en sandbox, y un smoke test que valide la lectura del JSON.

**Entregables**:
- `npx create-next-app@latest` con TypeScript, Tailwind, App Router, ESLint, sin `src/` (lo añadimos manual para forzar la estructura).
- Reorganización a la estructura de `docs/repo-structure.md`.
- Tailwind + shadcn/ui inicializados.
- Clerk sandbox conectado, página de login mínima funcional.
- Stripe en modo test, claves en `.env.local`.
- `scripts/sync-content.ts` ejecutado al menos una vez, `content/` poblado.
- `lib/content.ts` con validador Zod del JSON. Test: render de 1 pregunta hardcoded en `/`.
- Vercel project creado y vinculado, deploy del esqueleto funcionando.

**Definition of done**: visitas la URL Vercel y ves "1 pregunta CCSE renderizada con sus opciones". El validador Zod no levanta errores.

---

## Sprint 1 — Producto cerrado, sin pago (4-6 días)

**Objetivo**: tener el producto end-to-end funcionando para un usuario logueado, con paywall **desactivado** para QA. Stripe aún no entra en este sprint.

**Entregables**:
- Landing pública (`/`) con hero, 5 pilares de valor, precio, "cómo funciona", FAQ, CTA a demo.
- Demo (`/demo`) con 10 preguntas mezcladas y feedback al final, sin login.
- Auth completa con Clerk: registro, login, perfil mínimo.
- `/dashboard` con "continuar donde lo dejaste" (placeholder hasta el sprint 3).
- `/estudiar/[tarea]` para las 5 tareas: render markdown con índice flotante, glosario inline básico (tooltip por término marcado en MD).
- `/practicar/[tarea]`: flashcards de las preguntas de esa tarea, una a una, con `PreguntaCard` mostrando feedback inmediato.
- `/simulacro/[id]` con timer de 45 min, una pregunta a la vez sin feedback, pantalla de resultados con desglose por tarea y enlaces a las falladas.
- `PreguntaCard` detecta a/b/c vs V/F desde el campo `opciones` y renderiza acordemente.

**Definition of done**: un usuario registrado puede hacer un ciclo completo "leer tema 1 → practicar tarea 1 → hacer simulacro 1 → ver resultados" sin bugs.

---

## Sprint 2 — Pago + paywall (3-5 días)

**Objetivo**: monetización activa. Solo paga, accede.

**Entregables**:
- Producto y price creados en Stripe (one-shot, 9,99 €, EUR).
- `/api/stripe/checkout/route.ts`: crea sesión de Checkout y redirige.
- `/api/stripe/webhook/route.ts`: verifica firma, procesa `checkout.session.completed`, escribe `entitlement: { plan: "anual_2026", expiresAt: <ISO 365 días> }` en `clerkClient.users.updateUserMetadata({ publicMetadata })`.
- `lib/entitlement.ts` con función `hasActiveEntitlement(user)`.
- `middleware.ts` que protege `(app)/` con dos condiciones: Clerk autenticado **y** entitlement activo. Si autenticado pero sin entitlement, redirige a `/precio`.
- `PaywallGate` para previews: `/tarea/[n]/preview` muestra primera mitad del tema y CTA. `/pregunta/[id]` (300 URLs SEO) muestra enunciado + opciones, oculta explicación.
- `/precio` con descripción, botón "comprar 9,99 €" → Checkout.
- `/cuenta` con "tu acceso expira en X días" y botón "renovar".

**Definition of done**: pago en Stripe test → webhook → metadata → puedes entrar a `(app)/`. Sin pago, redirige a `/precio`. El test E2E manual con tarjeta de Stripe pasa.

---

## Sprint 3 — Persistencia y diferenciación (5-7 días)

**Objetivo**: las funciones que justifican volver al producto día tras día.

**Entregables**:
- `ProgresoStore` con dos implementaciones:
  - `LocalStorageStore` (activa en MVP).
  - `RemoteStore` (interfaz lista, sin implementación todavía).
- Marcado de cada pregunta con estado: `no_vista | vista | acertada | fallada | dominada` y `lastSeenAt`.
- `lib/srs.ts` con Leitner de 4 cajas. Algoritmo simple: pregunta fallada → caja 1; tras N aciertos consecutivos → sube de caja; cajas más bajas se revisan más a menudo.
- `/repaso` con cola Leitner generada al cargar la página.
- `/progreso` con barras por tarea y línea de simulacros realizados.
- Búsqueda y filtros del banco en `/practicar`: texto libre, tarea, dificultad, "solo falladas".
- "Continuar donde lo dejaste" del dashboard ya operativo.

**Definition of done**: un usuario que ha hecho 50 preguntas las ve todas reflejadas en `/progreso`. La cola de `/repaso` prioriza falladas. Recargar la página no pierde el estado.

---

## Sprint 4 — Pulido y lanzamiento (3-5 días)

**Objetivo**: producto presentable y trazable.

**Entregables**:
- Modo oscuro con toggle persistente.
- Accesibilidad WCAG AA básica: contraste, focus rings, ARIA, navegación por teclado en simulacro.
- SEO: sitemap automático, metadata por página, OG images dinámicas, schema.org `Quiz` y `Question` en `/pregunta/[id]`, robots.txt.
- Páginas legales: condiciones, privacidad, cookies, RGPD básico (consent banner si hay analítica con cookies).
- Email transaccional con Resend o similar para: bienvenida, confirmación de pago, recordatorio a 11 meses.
- `/cambios` (changelog público de actualizaciones del banco).
- Plausible y Vercel Analytics activos en producción.
- Test E2E con Playwright del flujo crítico: registro → demo → pago → estudio → simulacro → ver resultados.

**Definition of done**: dominio configurado, certificado HTTPS, primer usuario real puede comprar y usar la web sin incidencias durante 7 días.

---

## Sprint posterior al lanzamiento (no MVP)

- Multilingüe en explicaciones del banco (EN primero, después AR/RO/ZH).
- Migración de Clerk a la instancia central de auth.
- Migración de `LocalStorageStore` a `RemoteStore` con backend propio o central.
- PWA + notificaciones push.
- Audios del Cervantes embebidos.
