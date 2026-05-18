import type { MetadataRoute } from "next";

// trim() + strip de barras finales: defensivo contra env vars
// guardadas con saltos de línea u otros whitespace.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://www.preparacionccse.es";

const TAREAS = [1, 2, 3, 4, 5] as const;

// Las /pregunta/[id] quedan deliberadamente fuera del sitemap:
// inflaban 280 URLs thin-content y consumían el crawl budget de las
// páginas hub que sí queremos posicionar. Siguen siendo accesibles
// (notFound 404 sólo si el id no existe) y enlazadas desde los temas.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/demo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/precio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/examen-ccse-2026`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/manual-ccse-2026`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cambios`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE_URL}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/legal/condiciones`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const tareasPreview: MetadataRoute.Sitemap = TAREAS.map((n) => ({
    url: `${BASE_URL}/tarea/${n}/preview`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...estaticas, ...tareasPreview];
}
