import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ccse";

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
