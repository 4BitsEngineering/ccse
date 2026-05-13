import type { Metadata } from "next";
import { Newsreader, DM_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// trim() + strip de barras finales: defensivo contra env vars
// guardadas con saltos de línea u otros whitespace.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://www.preparacionccse.es";

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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CCSE",
  legalName: "4Bits Engineering",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Plataforma para preparar la prueba CCSE del Instituto Cervantes.",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
