# ADR 0003 — Stripe Checkout one-shot, 9,99 € por 365 días

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

Necesitamos un modelo de pago alineado con la naturaleza del producto:
- El examen CCSE es un objetivo concreto: la persona estudia para aprobarlo y luego deja de necesitar la web.
- El manual oficial cambia un 25 % cada año. La membresía debe estar atada al ciclo del manual.
- El usuario es no técnico y desconfía de las suscripciones automáticas; la fricción de "cancelar" daña la reputación.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Pago único, acceso 365 días desde la compra** | Sin churn de suscripción. Mensaje cristalino. Encaja con el ciclo anual del manual | Ingreso menos predecible que la suscripción |
| Suscripción mensual | Ingreso recurrente | El caso de uso es breve (1-3 meses estudiando), churn alto, gestión activa, mala fama |
| Pago único de por vida | Mensaje aún más simple | No casa con el ciclo del manual: regalas actualizaciones de los siguientes manuales gratis. Pierdes monetización del usuario que vuelve por nuevo manual |
| Freemium con compras pequeñas | Más combinaciones | Más fricción por compra. Mal encaje con perfil no técnico |

## Decisión

**Pago único de 9,99 € que da acceso a la totalidad de la plataforma durante 365 días desde la fecha de compra (rolling).**

### Reglas de producto

1. **Cómputo del año**: 365 días naturales desde el `checkout.session.completed`. No año natural.
2. **Contenido durante el año**: la web sirve **siempre el manual vigente del Cervantes**. Si el usuario compra en marzo de 2026 y el manual 2027 sale en diciembre de 2026, en enero de 2027 ya está estudiando con el manual 2027 hasta que expire su año.
3. **Sin renovación automática**. El usuario debe volver a comprar pasados los 365 días. Email recordatorio a los 11 meses con CTA de re-compra.
4. **Sin reembolso**. La convocatoria fallida del CCSE ya está cubierta por el propio Cervantes dentro de un margen de 18 meses. Lo dejamos claro en FAQ.
5. **Política de erratas**: silenciosa. Cuando se detecta una errata, se corrige en frío y se anota en `/cambios`. Sin emails masivos ni interrupciones.

## Implementación

- Stripe Product: "CCSE — Acceso 1 año".
- Stripe Price: one-shot, 9,99 €, EUR.
- Checkout en `mode: 'payment'`. **No subscription**.
- Webhook escucha `checkout.session.completed`:
  ```ts
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      entitlement: {
        plan: 'anual',
        purchaseAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        manualVersion: '2026'
      }
    }
  });
  ```
- `lib/entitlement.ts:hasActiveEntitlement(user)` lee `publicMetadata.entitlement.expiresAt` y compara con `Date.now()`.
- Cron job (Vercel Cron, semanal) que detecta usuarios con `expiresAt` a 11 meses y dispara recordatorio por email.

## Consecuencias

- **Positivas**: cero gestión de suscripciones, cero quejas por cobros automáticos no deseados. Modelo cristalino. Alineado con el ciclo natural del producto.
- **Negativas**: ingreso menos recurrente; cada año hay que reconquistar al usuario que sigue activo (raro, pero posible si fracasa el primer examen y prepara el segundo).
- **Riesgo**: usuario compra y luego suspende → siente que "perdió" el dinero. Mitigación: la convocatoria del Cervantes incluye 2ª oportunidad gratis dentro de 18 meses, lo comunicamos claro en FAQ.
