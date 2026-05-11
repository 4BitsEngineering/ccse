# Handoff: Rediseño visual CCSE

App de preparación del examen CCSE (Conocimientos Constitucionales y Socioculturales de España) para nacionalidad española.

---

## Sobre los archivos de este paquete

Los archivos HTML/JSX incluidos son **referencias de diseño** creadas como prototipos en HTML + React (vía Babel en navegador). **No son código de producción para copiar tal cual.**

El objetivo es **recrear estos diseños en el entorno existente del proyecto** (Next.js + shadcn/ui + Tailwind, según el codebase actual) usando sus patrones y librerías. Si quieres reemplazar shadcn por algo más expresivo (recomendado para mantener el carácter editorial), está bien — pero respeta tokens y proporciones.

## Fidelidad

**Alta fidelidad (hifi).** Colores finales, tipografías reales (Google Fonts), spacing, ratios y microcomposición están definidos. Lo que NO está incluido:
- Animaciones de transición (sólo descritas).
- Lógica real de estado (timers, persistencia, scoring).
- Imágenes reales (todas son placeholders SVG o composiciones tipográficas).

## Las 3 direcciones

El archivo `Visualizacion CCSE.html` muestra tres direcciones estéticas lado a lado, cada una con 7 pantallas en frame móvil 390×844. Elige UNA antes de implementar (o mezcla deliberadamente).

### Dirección A — "Manuscrito"
Manual editorial premium. Tipografía serif con tinta oscura sobre papel crema. Numeración romana. Sello oficial. Sensación de documento oficial respetuoso.
- **Tipografías:** Cormorant Garamond (display), Lora (cuerpo), Inter (UI mínima).
- **Paleta:** crema #F4EEDF / tinta #1F1A12 / borgoña #6B1F1F / ocre #B88A3E.
- **Carácter:** sobrio, atemporal, evoca papel y libro.

### Dirección B — "Tierra"
Cálido y humano. Terracota + ocre + crema oscuro. Serif moderno (display) + sans humanista (cuerpo). Cintas y elementos curvos. Recuerda que hay personas migrando detrás de la app.
- **Tipografías:** Fraunces (display) o similar, Source Sans 3 (cuerpo).
  *Nota: Fraunces está en la lista de "evitar"; sustituir por **Newsreader** o **Bricolage Grotesque** + serif emparejada.*
- **Paleta:** crema #F5EDDD / terracota #C8553D / ocre #D4A04C / tinta cálida #3A2A1F.
- **Carácter:** cercano, motivador, mediterráneo sin caer en tópicos.

### Dirección C — "Plaza"
Académico sereno. Azul piedra + ocre tenue + crema. Retícula visible (puntos), líneas finas, números monoespaciados. Biblioteca/museo.
- **Tipografías:** Spectral (serif), IBM Plex Sans (UI), IBM Plex Mono (números).
- **Paleta:** crema #EFE9DC / azul piedra #2D4A5E / ocre #B88A3E / tinta #1A2230.
- **Carácter:** confiable, serio, no aburrido — silencioso.

---

## Pantallas (las 7, comunes a las 3 direcciones)

### 1. Landing
Hero + propuesta + 3 pilares + CTA + precio. **Sin scroll real en el mock** — todo cabe en 844px.
- Logotipo / monograma arriba.
- Título grande (60–72px display).
- Subtítulo cuerpo 15–17px.
- 3 "pilares" en columna o grid 1×3 con número + título corto + 1 línea.
- CTA primario sólido + secundario fantasma.
- Línea de precio + microcopy de confianza.

### 2. Dashboard (alumno)
Saludo personal + 1 métrica destacada + accesos rápidos + lectura activa.
- Header: "Buenos días, [nombre]" + racha de días.
- Tarjeta grande: % de progreso global con barra o anillo.
- 3–4 accesos: Practicar, Simulacro, Estudiar, Repaso de errores.
- Sección "continuar leyendo": tema actual con indicador de avance.

### 3. Práctica de preguntas
Pregunta única, sin distracciones. 4 opciones tappables. Feedback inmediato con explicación.
- Top: progreso (3 / 25) + categoría.
- Pregunta: 18–22px, generosa.
- 4 botones de respuesta, mínimo 56px de alto.
- Tras responder: opción correcta verde, incorrecta roja sutil, panel con explicación.
- Botón "Siguiente" fijo abajo.

### 4. Simulacro
Examen real: 25 preguntas, 45 min, sin feedback mientras se hace.
- Top: cronómetro grande + barra de progreso (X/25).
- Pregunta y opciones IDÉNTICAS a Práctica pero sin colores de feedback.
- Botones: "Anterior" / "Marcar" / "Siguiente".
- Modal de envío al final.

### 5. Resultado
Pantalla emocional. ¿Apruebo o no?
- Marca grande: "Aprobado" / "No aprobado" + score (e.g. 21/25).
- Indicador visual (escudo, sello, anillo lleno).
- Desglose por categoría (5 categorías oficiales del CCSE: Gobierno, Geografía, Historia, Cultura, Derechos).
- CTA: "Revisar fallos" / "Otro simulacro".

### 6. Progreso
Estadísticas de estudio en el tiempo.
- KPIs: días seguidos, preguntas respondidas, % acierto, simulacros completados.
- Gráfica de barras/línea: % acierto por semana.
- Mapa de calor de actividad diaria.
- Listado por categoría con barras de dominio.

### 7. Estudiar (lectura)
Vista de lectura de temas. Tipografía optimizada.
- Top minimalista: título de tema + breadcrumb a sección.
- Cuerpo: serif grande, line-height 1.6+, max-width controlado.
- Marcadores laterales o inline para "concepto clave".
- Footer de sección: "Hacer 5 preguntas de este tema".

---

## Tokens de diseño

### Tipografía (variables CSS)
```css
/* Dirección A */
--font-display: 'Cormorant Garamond', 'EB Garamond', Georgia, serif;
--font-body:    'Lora', Georgia, serif;
--font-ui:      'Inter', system-ui, sans-serif;

/* Dirección B */
--font-display: 'Newsreader', 'Source Serif 4', Georgia, serif;
--font-body:    'Source Sans 3', system-ui, sans-serif;

/* Dirección C */
--font-display: 'Spectral', Georgia, serif;
--font-body:    'IBM Plex Sans', system-ui, sans-serif;
--font-mono:    'IBM Plex Mono', ui-monospace, monospace;
```

### Escala tipográfica (móvil 390px)
- Display XL: 56–72px / line-height 1.05 / -0.02em letter-spacing
- Display L: 40–48px / 1.1
- H1: 28–32px / 1.2
- H2: 22–24px / 1.3
- Body: 16–17px / 1.55
- Small: 13–14px / 1.45
- Caption: 11–12px tracked +0.06em uppercase

### Spacing
Base 4px. Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.

### Radius
- A (Manuscrito): 2px (casi recto, sello editorial). Tarjetas 6px.
- B (Tierra): 14px / 20px / 24px. Pill 999px.
- C (Plaza): 4px / 8px. Más rectilíneo.

### Sombras
Direcciones A y C: muy sutiles, `0 1px 0 rgba(0,0,0,.04)` + bordes 1px.
Dirección B: más cálidas, `0 8px 24px -8px rgba(80,40,20,.15)`.

### Mínimos de accesibilidad
- Target táctil: 44px mínimo, 56px ideal.
- Contraste texto cuerpo: ≥ 7:1 sobre fondo crema.
- Font cuerpo: 16px mínimo.

---

## Interacciones (resumen)

- **Tap en opción** (Práctica): escala 0.97 al press, 200ms ease-out. Tras responder: fade del color de feedback en 280ms.
- **Cronómetro** (Simulacro): pulso sutil en últimos 5 min (filtro hue + opacity).
- **Cambio de pantalla**: fade + slide 8px lateral, 240ms ease-out.
- **Modal envío simulacro**: fade en backdrop 200ms, scale 0.96→1 en card.
- **Barra de progreso**: animar `width` con 600ms ease-out al montar.

## Estado (qué guardar)

- Usuario: nombre, idioma origen, racha, último login.
- Progreso por categoría: { categoria, intentos, aciertos }.
- Errores recientes (cola FIFO de últimas 20 preguntas falladas).
- Simulacros pasados: { fecha, score, tiempo, respuestas }.
- Estado de simulacro activo (si lo hay): preguntas, índice, marcadas, tiempo restante. **Persistir en localStorage** para sobrevivir refresh.

---

## Datos / contenido

El archivo `data.js` incluye preguntas reales del banco CCSE oficial usadas en los mocks. En producción: cargar las 300 preguntas oficiales del Instituto Cervantes (banco público).

## Audiencia y tono

- Mayoría latinoamericana en España, 25–50 años, no técnicos.
- Tono cálido, motivador, respetuoso. Recuerda que es un examen con peso emocional (camino a la nacionalidad).
- Evitar jerga legal innecesaria. Si aparece, explicar inline.
- Evitar tópicos visuales: nada de banderas literales, toros, flamenco, gradientes SaaS.

## Archivos en este bundle

| Archivo | Qué es |
|---|---|
| `Visualizacion CCSE.html` | Punto de entrada. Carga las 3 direcciones en un design canvas con pan/zoom. |
| `design-canvas.jsx` | Componente de canvas (no de producción — sólo para presentar). |
| `ios-frame.jsx` | Bezel iPhone para los mocks (no de producción). |
| `direction-a.jsx` | Dirección "Manuscrito" — todas las pantallas. |
| `direction-b.jsx` | Dirección "Tierra" — todas las pantallas. |
| `direction-c.jsx` | Dirección "Plaza" — todas las pantallas. |
| `app.jsx` | Ensamblaje del canvas. |
| `data.js` | Preguntas y datos de ejemplo. |

Para implementar: abre `Visualizacion CCSE.html` como referencia visual, luego inspecciona el `.jsx` de la dirección elegida para extraer colores, tipografías y estructura. **No portees el JSX directamente** — reescríbelo en el patrón del codebase (componentes shadcn, Tailwind classes, etc.).

## Cómo abrir las referencias

```bash
# Servir localmente (necesario porque carga JSX via fetch)
npx serve .
# Abre http://localhost:3000/Visualizacion%20CCSE.html
```

O abre el HTML directamente en un navegador moderno desde el filesystem si el navegador permite fetch de archivos locales.
