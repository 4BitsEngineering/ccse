"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TabItem {
  href: string;
  label: string;
}

/**
 * Tab bar inferior sticky. Se usa en ambos layouts (public y app)
 * para que el header superior pueda quedarse idéntico entre zonas
 * y la navegación contextual viva siempre en el mismo sitio.
 */
export function BottomTabs({ items }: { items: TabItem[] }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-rule bg-paper/85 backdrop-blur"
    >
      <ul className="mx-auto max-w-6xl flex">
        {items.map((it) => {
          const isActive =
            pathname === it.href ||
            (it.href !== "/" && pathname.startsWith(it.href + "/")) ||
            (it.href !== "/" && pathname === it.href);
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  isActive
                    ? "text-terracotta"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "block w-1.5 h-1.5 rounded-full",
                    isActive ? "bg-terracotta" : "bg-transparent",
                  )}
                />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
