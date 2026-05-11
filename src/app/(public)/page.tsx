import { Hero } from "@/components/marketing/Hero";
import { Pilares } from "@/components/marketing/Pilares";
import { ComoFunciona } from "@/components/marketing/ComoFunciona";
import { Precio } from "@/components/marketing/Precio";
import { Faq } from "@/components/marketing/Faq";
import { LandingFooter } from "@/components/marketing/LandingFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <Pilares />
      <ComoFunciona />
      <Precio />
      <Faq />
      <LandingFooter />
    </>
  );
}
