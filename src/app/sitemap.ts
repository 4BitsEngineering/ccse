import type { MetadataRoute } from "next";
import { loadBanco } from "@/lib/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ccse";

const TAREAS = [1, 2, 3, 4, 5] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const banco = loadBanco();
  const now = new Date().toISOString();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/demo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/precio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const tareasPreview: MetadataRoute.Sitemap = TAREAS.map((n) => ({
    url: `${BASE_URL}/tarea/${n}/preview`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const preguntas: MetadataRoute.Sitemap = banco.preguntas.map((p) => ({
    url: `${BASE_URL}/pregunta/${p.id_oficial}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...estaticas, ...tareasPreview, ...preguntas];
}
