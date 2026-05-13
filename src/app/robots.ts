import type { MetadataRoute } from "next";

// trim() + strip de barras finales: defensivo contra env vars
// guardadas con saltos de línea u otros whitespace.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://www.preparacionccse.es";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cuenta", "/dashboard", "/repaso", "/progreso"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
