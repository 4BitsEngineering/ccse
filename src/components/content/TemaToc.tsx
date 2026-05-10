import type { TocItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function TemaToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Índice del tema" className="text-sm">
      <h2 className="font-semibold mb-3 text-xs uppercase tracking-wide text-zinc-500">
        Índice
      </h2>
      <ol className="space-y-1 list-none">
        {items.map((it, i) => (
          <li key={i} className={cn(it.level === 3 && "pl-4")}>
            <a
              href={`#${it.slug}`}
              className="block py-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline leading-snug"
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
