# ADR 0004 — Sincronización del contenido vía script

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

El contenido pedagógico (banco de 300 preguntas, 5 temas, 5 simulacros) **nace en otro repo**: `4BitsEngineering/oposiciones`, en la carpeta `CCSE_Nacionalidad_Espanola/`. Se genera y revisa allí mediante un flujo de agentes (Profesor, Revisor, Razonador) y se audita con un parser pymupdf.

La web es solo la capa de distribución: necesita ese contenido en un formato consumible. La frecuencia de actualización es:
- **Anual**: cuando el Cervantes publica el manual nuevo (~25 % preguntas renovadas).
- **Puntual**: cuando se detecta una errata.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **Script de sync que copia desde un path local** | Simple, sin dependencias externas, transparente, versionado en este repo, audit trail por commit | Requiere clonar el repo origen localmente para sincronizar |
| Submódulo git del repo origen | Versionado fuerte | El repo origen tiene además otras oposiciones y material de terceros (manuales con derechos). Acoplas todo |
| Publicar el banco como paquete privado en GitHub Packages | Distribución limpia | Sobre-ingeniería para 1 update/año. Más superficie operativa |
| API HTTP del repo origen sirviendo el JSON | Sync automático sin manual | Requiere infraestructura del lado origen. Sobre-ingeniería para baja frecuencia |
| Monorepo (oposiciones + ccse) | Cero copia, fuente única | Mezcla un proyecto comercial con uno educativo. CI/CD entre dos productos muy distintos |

## Decisión

**Script de sincronización local: `scripts/sync-content.ts`.**

El contenido se commitea en este repo bajo `content/`. El script se ejecuta manualmente cuando hay actualización del banco.

### Comportamiento del script

1. Lee `SOURCE_PATH` (variable de entorno o argumento; default a `../oposiciones/CCSE_Nacionalidad_Espanola`).
2. Copia:
   - `${SOURCE}/preguntas_oficiales/banco_300.json` → `content/banco_300.json`
   - `${SOURCE}/temas/01..05_*.md` → `content/temas/`
   - `${SOURCE}/tests/simulacro_01..05.md` → `content/simulacros/`
3. Ejecuta el validador Zod sobre `content/banco_300.json`. Si falla, aborta sin escribir nada.
4. Imprime un diff resumido (preguntas nuevas, modificadas, eliminadas).
5. Imprime la versión del manual leída (debería actualizarse en `package.json` → `contentManualVersion`).

### Política de versionado

- El contenido se commitea aquí.
- `package.json` lleva un campo `contentManualVersion: "2026"` que se actualiza con cada sync.
- Cada sync mayor (manual nuevo) genera un tag `content-2026.0`, `content-2026.1`, etc.

## Consecuencias

- **Positivas**: cero infraestructura adicional. Trazable. Reversible (cada update es un commit).
- **Negativas**: requiere acción humana 1-3 veces al año. Si el operador olvida correr el script, el contenido se queda atrás. Mitigación: alarma manual en calendario para cada release del manual del Cervantes (típicamente diciembre).
- **Acción**: documentar el comando exacto en `docs/bootstrap.md` y en el README del repo.
