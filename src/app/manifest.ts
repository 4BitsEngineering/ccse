import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CCSE — preparación del examen del Instituto Cervantes",
    short_name: "CCSE",
    description:
      "Prepara la prueba CCSE: 300 preguntas razonadas, simulacros con cronómetro, apuntes en español B1.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    lang: "es-ES",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
