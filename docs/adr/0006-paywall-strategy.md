# ADR 0006 — Estrategia de paywall: freemium con preview generosa

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

La conversión de un usuario que llega frío a la web depende de:
- **Confianza**: que entienda qué va a recibir.
- **Comprobación previa**: que pueda probar parte del producto antes de pagar.
- **SEO**: que las páginas indexables sean realmente útiles, no solo cebos.

Necesitamos decidir cuánto del contenido es público, cuánto es preview con paywall y cuánto es exclusivamente premium.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Hard paywall total** (todo bloqueado salvo landing) | Máximo incentivo a pagar | Conversión baja por falta de confianza. Cero valor SEO en páginas internas |
| **Freemium con preview generosa** (algunas tareas y preguntas con preview) | Confianza, SEO, demo real del valor | Hay que decidir bien qué se da y qué no |
| **Free total con donación** | Crecimiento masivo | No es modelo de negocio sostenible para 9,99 € |
| **Trial gratuito de 7 días con tarjeta** | Captura intent fuerte | Fricción de tarjeta antes de probar nada |

## Decisión

**Freemium con preview generosa más demo libre sin login.**

### Reparto contenido

| Recurso | Estado | Detalle |
|---|---|---|
| Landing, precio, FAQ, condiciones, cambios | **Público total** | SEO foundation |
| Demo de 10 preguntas mezcladas | **Público total, sin login** | Driver principal de conversión. Aleatorias del banco, balanceadas |
| Tarea 1 entera (lectura) | **Público total** | Comunica el nivel y enfoque del material |
| Tareas 2-5 | **Preview**: primera mitad pública + CTA "regístrate para leer el resto" | SEO + paywall |
| `/pregunta/[id]` para las 300 preguntas | **Half-paywall**: enunciado + opciones públicos, explicación + mnemotécnico + distractores razonados bloqueados | 300 URLs SEO. Captura búsquedas tipo "respuesta CCSE 1042" |
| Simulacro 1 | **Público con login pero sin pago**: hace el simulacro pero el resultado es solo aciertos/fallos sin explicaciones detalladas | Demuestra el formato examen real |
| Simulacros 2-5, repaso, progreso, búsqueda, filtros, modo oscuro, descargas PDF | **Premium** | Lo que justifica 9,99 € |

### Componente `PaywallGate`

```tsx
<PaywallGate fallback={<PreviewCTA />}>
  <ExplicacionRazonada />
</PaywallGate>
```

Si el usuario no está autenticado o no tiene entitlement activo, muestra `<PreviewCTA />` con CTA a `/precio`. Si tiene entitlement, muestra el contenido completo.

## Consecuencias

- **Positivas**: 300+ URLs SEO con valor real (no cloaking, no contenido duplicado). Demo gratis sin barrera baja la fricción al máximo. La tarea 1 entera demuestra el nivel B1 cuidado del material.
- **Negativas**: hay usuarios que se quedarán solo con la parte gratuita y no convertirán. Aceptable: la tarea 1 sola no aprueba el examen.
- **Riesgo**: scrappers indexando el medio-paywall. Mitigación: rate limiting en `/pregunta/[id]`, delays artificiales no.
- **Acción**: medir conversión demo → registro y registro → pago en Sprint 4. Si demo → registro < 20 %, revisar UX de la demo. Si registro → pago < 10 %, revisar comunicación de valor.
