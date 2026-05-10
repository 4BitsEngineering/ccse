# Estructura objetivo del repo CCSE

Foto del repo cuando los Sprints 0-4 estén completos. Esta es la referencia para el bootstrap y para revisar PRs.

```
ccse/
├── .env.local                              ← no versionado
├── .env.example                            ← versionado, plantilla
├── .gitignore
├── README.md
├── PROJECT.md
├── ROADMAP.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
│
├── docs/
│   ├── adr/
│   │   ├── 0001-stack-nextjs-vercel.md
│   │   ├── 0002-auth-clerk-stub.md
│   │   ├── 0003-stripe-one-shot-365.md
│   │   ├── 0004-content-sync-script.md
│   │   ├── 0005-progreso-localstorage-stub.md
│   │   └── 0006-paywall-strategy.md
│   ├── bootstrap.md
│   └── repo-structure.md
│
├── content/                                ← sincronizado desde OPOSICIONES/
│   ├── banco_300.json
│   ├── temas/
│   │   ├── 01_gobierno_legislacion_participacion.md
│   │   ├── 02_derechos_deberes_fundamentales.md
│   │   ├── 03_organizacion_territorial_geografia.md
│   │   ├── 04_cultura_historia_espana.md
│   │   └── 05_sociedad_espanola.md
│   └── simulacros/
│       └── 01..05.md
│
├── public/
│   ├── og/                                 ← imágenes Open Graph
│   ├── pdfs/                               ← descargas premium (5 PDFs)
│   └── favicon.ico
│
├── scripts/
│   └── sync-content.ts                     ← copia desde OPOSICIONES/CCSE_Nacionalidad_Espanola/
│
└── src/
    ├── app/
    │   ├── layout.tsx                      ← root: Clerk provider, fonts, globals
    │   ├── globals.css
    │   ├── page.tsx                        ← landing pública
    │   ├── middleware.ts                   ← Clerk auth + entitlement guard sobre (app)/
    │   │
    │   ├── (public)/
    │   │   ├── tarea/[n]/
    │   │   │   └── preview/
    │   │   │       └── page.tsx            ← preview SEO de cada tarea (1 entera + 4 parciales)
    │   │   ├── pregunta/[id]/
    │   │   │   └── page.tsx                ← 300 URLs canónicas, half-paywall
    │   │   ├── demo/
    │   │   │   └── page.tsx                ← 10 preguntas mezcladas, sin login
    │   │   ├── precio/
    │   │   │   └── page.tsx
    │   │   ├── faq/
    │   │   │   └── page.tsx
    │   │   ├── cambios/
    │   │   │   └── page.tsx                ← changelog público
    │   │   └── legal/
    │   │       ├── condiciones/page.tsx
    │   │       ├── privacidad/page.tsx
    │   │       └── cookies/page.tsx
    │   │
    │   ├── (app)/                          ← protegido
    │   │   ├── layout.tsx                  ← navbar autenticada, sidebar
    │   │   ├── dashboard/page.tsx
    │   │   ├── estudiar/[tarea]/page.tsx
    │   │   ├── practicar/[tarea]/page.tsx
    │   │   ├── simulacro/
    │   │   │   ├── page.tsx                ← lista + "nuevo aleatorio"
    │   │   │   └── [id]/page.tsx
    │   │   ├── repaso/page.tsx
    │   │   ├── progreso/page.tsx
    │   │   └── cuenta/page.tsx             ← perfil, expiración, renovar
    │   │
    │   ├── sign-in/[[...sign-in]]/page.tsx
    │   ├── sign-up/[[...sign-up]]/page.tsx
    │   │
    │   └── api/
    │       ├── stripe/
    │       │   ├── checkout/route.ts       ← POST: crea sesión y redirige
    │       │   └── webhook/route.ts        ← POST: actualiza entitlement
    │       └── progreso/route.ts           ← GET/PUT — stub para futura sync remota
    │
    ├── components/
    │   ├── ui/                             ← shadcn-generated
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Sidebar.tsx
    │   ├── content/
    │   │   ├── PreguntaCard.tsx            ← detecta a/b/c vs V/F
    │   │   ├── TemaRenderer.tsx            ← markdown + índice flotante
    │   │   ├── GlosarioPopover.tsx
    │   │   └── ChangelogList.tsx
    │   ├── practica/
    │   │   ├── FlashcardDeck.tsx
    │   │   └── FeedbackPanel.tsx
    │   ├── simulacro/
    │   │   ├── SimulacroTimer.tsx
    │   │   ├── SimulacroNavigator.tsx
    │   │   └── ResultadosSimulacro.tsx
    │   ├── progreso/
    │   │   ├── BarraTarea.tsx
    │   │   └── HistoricoSimulacros.tsx
    │   ├── paywall/
    │   │   ├── PaywallGate.tsx
    │   │   └── PreviewCTA.tsx
    │   └── marketing/
    │       ├── Hero.tsx
    │       ├── PilaresValor.tsx
    │       ├── PrecioCard.tsx
    │       └── FaqAccordion.tsx
    │
    ├── lib/
    │   ├── content.ts                      ← carga + Zod del JSON
    │   ├── auth.ts                         ← capa aislada sobre Clerk
    │   ├── entitlement.ts                  ← hasActiveEntitlement, expiresIn
    │   ├── progreso.ts                     ← interfaz ProgresoStore + 2 impl
    │   ├── srs.ts                          ← Leitner 4 cajas
    │   ├── stripe.ts                       ← cliente y helpers
    │   ├── seo.ts                          ← metadata helpers
    │   └── utils.ts                        ← cn, formateadores
    │
    ├── types/
    │   ├── banco.ts                        ← tipos derivados del schema JSON
    │   ├── progreso.ts
    │   └── entitlement.ts
    │
    └── data/
        └── pilares.ts                      ← copy de marketing centralizado
```

## Convenciones

- **App Router por grupos**: `(public)` indexable, `(app)` autenticado. Cada grupo con su `layout.tsx`.
- **Server Components por defecto**. `'use client'` solo en componentes que lo requieran (timer, formularios, hooks de cliente).
- **Carga del JSON**: en RSC vía `lib/content.ts`, nunca pasar el JSON entero al cliente. Solo se hidrata el subset necesario.
- **Tipos**: derivados con Zod (`z.infer<typeof PreguntaSchema>`), no escritos a mano.
- **Estilos**: Tailwind utility-first. Componentes complejos con `class-variance-authority` (incluido por shadcn).
- **Paths absolutos**: `@/components/...`, `@/lib/...`. Nada de `../../..`.
