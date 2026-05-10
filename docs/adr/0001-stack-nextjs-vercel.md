# ADR 0001 — Stack Next.js + Vercel

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

Necesitamos una web con:
- Páginas públicas indexables para SEO (landing, previews de tareas, URLs por pregunta).
- Áreas privadas con interactividad alta (simulacro con cronómetro, flashcards con feedback inmediato).
- Despliegue barato y rápido.
- Stack que el equipo pueda mantener sin sobrecargo operativo.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Next.js 15 + Vercel** | SSR/SSG/RSC, edge runtime barato, ecosistema React enorme, despliegue automático, ya conocido | Más complejo que SSG puro |
| Astro + Vercel | Excelente para landings y SEO | Fricción al añadir interactividad rica (simulacros con timer, flashcards). Forzar React-islands en todas las rutas privadas anula la ventaja |
| Remix | Modelo de datos limpio | Ecosistema menor, más distancia con el "default" de Vercel, más coste mental para mantener a futuro |
| SvelteKit | Bundle pequeño, sintaxis agradable | Menos recursos compartibles con otros proyectos del equipo, menos talento para futuras manos |

## Decisión

**Next.js 15 con App Router + Vercel.**

Cubre los dos modos (SEO público + app interactiva privada) sin compromiso. Es el camino más recto y con menor coste mental para el equipo. Vercel lo trata como ciudadano de primera, ergo despliegue, edge functions, OG image dynamic y analytics vienen sin trabajo extra.

## Consecuencias

- **Positivas**: deploy automático en cada push, previews por PR, edge runtime gratuito, RSC para servir contenido estático del JSON sin bundle al cliente.
- **Negativas**: hay que mantener disciplina con la diferencia entre Server Components y Client Components — la barrera más común de bugs en App Router.
- **Acción**: mantener `'use client'` solo en componentes que lo necesiten (timer, formularios, gráficos). Todo el render del banco y los temas en RSC.
