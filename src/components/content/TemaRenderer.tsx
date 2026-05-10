import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/markdown";
import { cn } from "@/lib/utils";

/**
 * Renderiza el markdown de un tema con prose Direction B:
 * - cuerpo Newsreader serif 17px lh ≈ 1.65
 * - headings serif color ink, sin uppercase
 * - blockquotes como callouts paper-warm con borde terracota
 * - tablas con bordes rule, headers DM Sans uppercase
 */
export function TemaRenderer({
  md,
  className,
}: {
  md: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "prose prose-stone max-w-none",
        "prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-headings:scroll-mt-24",
        "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4",
        "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
        "prose-p:font-serif prose-p:text-ink prose-p:text-[17px] prose-p:leading-[1.7]",
        "prose-strong:text-ink prose-strong:font-semibold",
        "prose-a:text-terracotta-deep prose-a:no-underline prose-a:decoration-terracotta prose-a:underline-offset-2 hover:prose-a:underline",
        "prose-li:text-ink prose-li:font-serif prose-li:text-[17px] prose-li:leading-[1.7]",
        "prose-blockquote:bg-paper-warm prose-blockquote:border-l-[3px] prose-blockquote:border-l-terracotta prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-ink prose-blockquote:font-serif prose-blockquote:px-5 prose-blockquote:py-4",
        "prose-hr:border-rule",
        "prose-th:font-sans prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-th:text-ink-soft",
        "prose-td:border-rule",
        "prose-code:bg-paper-warm prose-code:text-ink prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:before:hidden prose-code:after:hidden",
        "marker:text-terracotta",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => (
            <h2 id={slugify(String(children))} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={slugify(String(children))} {...props}>
              {children}
            </h3>
          ),
        }}
      >
        {md}
      </ReactMarkdown>
    </article>
  );
}
