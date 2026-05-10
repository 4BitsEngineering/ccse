export interface TocItem {
  level: 2 | 3;
  text: string;
  slug: string;
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractToc(md: string): TocItem[] {
  const lines = md.split("\n");
  const out: TocItem[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) {
      out.push({
        level: m[1].length as 2 | 3,
        text: m[2].trim(),
        slug: slugify(m[2]),
      });
    }
  }
  return out;
}
