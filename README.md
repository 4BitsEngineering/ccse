# CCSE — Web de preparación para la prueba CCSE

Plataforma web de pago para preparar la prueba **CCSE** (Conocimientos Constitucionales y Socioculturales de España) del Instituto Cervantes, requisito para obtener la nacionalidad española por residencia.

## Estado

**Pre-bootstrap.** Solo hay documentación de planificación. El código de la web aún no se ha generado.

Próximo paso: validar el plan (`PROJECT.md` + ADRs en `docs/adr/`) y, una vez aprobado, ejecutar el bootstrap de Next.js descrito en `docs/bootstrap.md`.

## Origen del contenido

El contenido pedagógico (5 temas en castellano B1 + banco de 300 preguntas razonadas + 5 simulacros + PDFs) **nace en otro repo** y se sincroniza aquí mediante un script:

- Repo de origen: `4BitsEngineering/oposiciones` (carpeta `CCSE_Nacionalidad_Espanola/`).
- Sincronización: `npm run sync-content` (ver `docs/adr/0004-content-sync-script.md`).

Esta web es solo la capa de distribución: estudio, práctica, simulacros, paywall, tracking de progreso.

## Documentación

- [`PROJECT.md`](PROJECT.md) — brief del producto, propuesta de valor, stack, modelo de negocio.
- [`ROADMAP.md`](ROADMAP.md) — plan de entrega en sprints.
- [`docs/adr/`](docs/adr/) — decisiones arquitectónicas grabadas.
- [`docs/bootstrap.md`](docs/bootstrap.md) — comandos para arrancar el repo Next.js.
- [`docs/repo-structure.md`](docs/repo-structure.md) — estructura objetivo del código.

## Licencia

Privado. Propiedad de 4Bits Engineering. El manual oficial CCSE 2026 del Instituto Cervantes es de dominio público (descarga gratuita en `examenes.cervantes.es`); los apuntes y razonamientos son obra derivada y propiedad del proyecto.
