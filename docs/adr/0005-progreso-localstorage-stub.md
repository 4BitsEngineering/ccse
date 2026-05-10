# ADR 0005 — Progreso del usuario en localStorage durante el MVP

**Estado**: aceptada · **Fecha**: 2026-05-10

## Contexto

El usuario que paga necesita ver su progreso entre sesiones: qué preguntas ha visto, cuáles ha fallado, qué simulacros ha hecho. Estas son funcionalidades P1 imprescindibles para diferenciarse de la app gratuita del Cervantes.

Persistir progreso requiere algún mecanismo. Tenemos restricciones:
- Sin DB propia (decisión de no levantar Postgres/Supabase para el MVP).
- La instancia central de 4Bits aún no expone endpoints para datos de usuario.
- Lanzamiento rápido prima sobre arquitectura perfecta.

## Opciones consideradas

| Opción | Pro | Contra |
|---|---|---|
| **localStorage en el navegador** | Cero infraestructura. Sin latencia. Sin coste. Inmediato | Sin sync entre dispositivos. Borrado de cookies/datos del navegador = perder progreso |
| Vercel KV (Redis serverless) | Sync entre dispositivos. Latencia baja desde Edge | Coste por operación. Otra dependencia para un MVP |
| Supabase / Neon (Postgres) | Modelo de datos correcto, sync entre dispositivos | Otra dependencia. Sobre-ingeniería para un MVP. Acoplamiento |
| `clerkClient.privateMetadata` | Sin DB extra (ya tenemos Clerk) | Tamaño limitado por usuario (~16 KB). Lectura/escritura por API, latencia perceptible |
| Esperar a la instancia central | Cero deuda técnica | Bloquea el MVP por dependencia externa con calendario incierto |

## Decisión

**localStorage** durante el MVP, con interfaz `ProgresoStore` aislada para permitir swap futuro sin tocar UI.

### Interfaz

```ts
interface ProgresoStore {
  getEstadoPregunta(id: string): EstadoPregunta | null;
  setEstadoPregunta(id: string, estado: EstadoPregunta): Promise<void>;
  getEstadoTodas(): Map<string, EstadoPregunta>;
  registrarSimulacro(resultado: SimulacroResultado): Promise<void>;
  getHistorialSimulacros(): SimulacroResultado[];
}
```

Implementaciones:
- `LocalStorageStore` (activa en MVP).
- `RemoteStore` (interfaz lista, pendiente cuando llegue la central o decidamos backend propio).

Las claves en localStorage se versionan: `ccse:v1:user:<userId>:progreso`. Si cambia el schema, bumpeamos a `v2` y migramos al cargar.

### Comunicación al usuario

En la página `/cuenta` y al activar el tracking se muestra: "Tu progreso se guarda en este dispositivo. Si usas otro, empezarás de cero hasta que actualicemos esto."

Es honesto, evita expectativas falsas, y es una limitación temporal explícita.

## Plan de migración

1. Implementar `RemoteStore` contra el endpoint que decida la central (o un Vercel KV temporal si la central tarda demasiado).
2. Al cargar la web, si hay progreso en local y el usuario nunca ha sincronizado, ofrecer un botón "subir tu progreso a tu cuenta".
3. Sustituir `LocalStorageStore` por `RemoteStore` y dejar el local solo como fallback offline.

## Consecuencias

- **Positivas**: lanzamiento rápido. Sin coste. Sin latencia. Sin fallos de red afectando la UX.
- **Negativas**: multidispositivo no funciona. Borrar cookies = perder progreso.
- **Mitigación**: dejarlo claro en la UI. Migración planeada antes del primer aniversario.
