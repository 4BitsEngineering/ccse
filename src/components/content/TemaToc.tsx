import type { TocItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function TemaToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Índice del tema" className="text-sm">
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Índice
      </h2>
      <ol className="space-y-1 list-none border-l border-rule pl-4">
        {items.map((it, i) => (
          <li key={i} className={cn(it.level === 3 && "pl-3")}>
            <a
              href={`#${it.slug}`}
              className="block py-1 font-serif text-[14.5px] text-ink-soft hover:text-terracotta-deep leading-snug"
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
