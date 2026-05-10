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
      <nav className="mb-8 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <Link href="/" className="text-zinc-500 hover:underline">
          ← Inicio
        </Link>
        <span className="text-zinc-300 dark:text-zinc-700">|</span>
        {PAGS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="text-zinc-700 dark:text-zinc-300 hover:underline"
          >
            {p.label}
          </Link>
        ))}
      </nav>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </article>
    </main>
  );
}
