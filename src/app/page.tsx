import Link from "next/link";
import { Seal } from "@/components/ui/seal";
import { Hero } from "@/components/marketing/Hero";
import { Pilares } from "@/components/marketing/Pilares";
import { ComoFunciona } from "@/components/marketing/ComoFunciona";
import { Precio } from "@/components/marketing/Precio";
import { Faq } from "@/components/marketing/Faq";
import { LandingFooter } from "@/components/marketing/LandingFooter";

export default function Home() {
  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-lg font-medium tracking-wide"
          >
            <Seal size={28} />
            <span>CCSE</span>
          </Link>
          <span className="flex-1" />
          <nav className="flex items-center gap-x-5 text-sm text-ink-soft">
            <Link href="/demo" className="hover:text-ink">
              Demo
            </Link>
            <Link href="/dashboard" className="hover:text-ink">
              Estudiar
            </Link>
            <Link href="#precio" className="hover:text-ink">
              Precio
            </Link>
          </nav>
        </div>
      </header>
      <Hero />
      <Pilares />
      <ComoFunciona />
      <Precio />
      <Faq />
      <LandingFooter />
    </>
  );
}
