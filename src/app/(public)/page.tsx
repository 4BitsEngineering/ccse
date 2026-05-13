import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { Pilares } from "@/components/marketing/Pilares";
import { ComoFunciona } from "@/components/marketing/ComoFunciona";
import { Precio } from "@/components/marketing/Precio";
import { Faq } from "@/components/marketing/Faq";
import { LandingFooter } from "@/components/marketing/LandingFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SOFTWARE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CCSE — preparación del examen del Instituto Cervantes",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "Plataforma online para preparar la prueba CCSE: 300 preguntas oficiales con explicación razonada, apuntes en español B1, simulacros con cronómetro y repaso espaciado.",
  inLanguage: "es",
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
} as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_JSON_LD) }}
      />
      <Hero />
      <Pilares />
      <ComoFunciona />
      <Precio />
      <Faq />
      <LandingFooter />
    </>
  );
}
