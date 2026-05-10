import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ccse";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CCSE — preparación del examen del Instituto Cervantes",
    template: "%s",
  },
  description:
    "Plataforma para preparar la prueba CCSE del Instituto Cervantes: 300 preguntas razonadas, 5 temas en español B1, simulacros con cronómetro y descargas en PDF. 9,99 € por 365 días.",
  applicationName: "CCSE",
  authors: [{ name: "4Bits Engineering" }],
  keywords: [
    "CCSE",
    "Instituto Cervantes",
    "nacionalidad española",
    "prueba CCSE",
    "examen CCSE",
    "preparación CCSE",
    "Constitución española",
    "manual CCSE 2026",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "CCSE",
    title: "CCSE — preparación del examen del Instituto Cervantes",
    description:
      "300 preguntas razonadas, simulacros con cronómetro y apuntes en español B1. 9,99 € durante un año.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CCSE — preparación del examen del Instituto Cervantes",
    description:
      "300 preguntas razonadas, simulacros con cronómetro y apuntes en español B1.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
