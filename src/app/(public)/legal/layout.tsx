import Link from "next/link";

const PAGS = [
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/condiciones", label: "Condiciones" },
  { href: "/legal/cookies", label: "Cookies" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        {PAGS.map((p, i) => (
          <span key={p.href} className="flex items-center gap-5">
            {i > 0 && <span className="text-rule">·</span>}
            <Link href={p.href} className="text-ink-soft hover:text-ink">
              {p.label}
            </Link>
          </span>
        ))}
      </nav>
      <article
        className="prose prose-stone max-w-none
          prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink
          prose-p:font-serif prose-p:text-ink prose-p:text-[16px] prose-p:leading-relaxed
          prose-a:text-terracotta-deep prose-a:no-underline prose-a:decoration-terracotta hover:prose-a:underline
          prose-li:text-ink prose-li:font-serif
          prose-strong:text-ink
          marker:text-terracotta"
      >
        {children}
      </article>
    </main>
  );
}
