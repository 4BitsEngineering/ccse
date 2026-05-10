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

/**
 * Parte el markdown a "mitad", buscando el primer H2 o H3 que cae
 * después del punto medio en líneas. Si no encuentra ninguno,
 * corta tal cual en el midpoint.
 *
 * Útil para previews públicas (/tarea/[n]/preview) donde queremos
 * dejar abierta la primera mitad y gatear el resto.
 */
export function splitMdAtMidpoint(md: string): {
  first: string;
  rest: string;
} {
  const lines = md.split("\n");
  if (lines.length < 6) return { first: md, rest: "" };
  const target = Math.floor(lines.length / 2);
  let cut = -1;
  for (let i = target; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      cut = i;
      break;
    }
  }
  if (cut === -1) {
    for (let i = target; i < lines.length; i++) {
      if (lines[i].startsWith("### ")) {
        cut = i;
        break;
      }
    }
  }
  if (cut === -1) cut = target;
  return {
    first: lines.slice(0, cut).join("\n"),
    rest: lines.slice(cut).join("\n"),
  };
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
