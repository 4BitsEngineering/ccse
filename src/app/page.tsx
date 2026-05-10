import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { Pilares } from "@/components/marketing/Pilares";
import { ComoFunciona } from "@/components/marketing/ComoFunciona";
import { Precio } from "@/components/marketing/Precio";
import { Faq } from "@/components/marketing/Faq";
import { LandingFooter } from "@/components/marketing/LandingFooter";

export default function Home() {
  return (
    <>
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            CCSE
          </Link>
          <nav className="flex items-center gap-x-5 text-sm">
            <Link
              href="/demo"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Demo
            </Link>
            <Link
              href="/dashboard"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
              Estudiar
            </Link>
            <Link
              href="#precio"
              className="text-zinc-700 dark:text-zinc-300 hover:underline"
            >
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
