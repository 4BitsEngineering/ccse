import { cn } from "@/lib/utils";

interface UnderlineProps {
  width?: number;
  className?: string;
  /** override stroke color. Defaults to terracotta token. */
  color?: string;
}

/**
 * Subrayado dibujado a mano — acento editorial de Direction B.
 * Va debajo de h1/h2 que tienen una palabra clave en itálica.
 * Curva suave de Bezier en SVG, ancho ajustable.
 */
export function Underline({ width = 140, className, color }: UnderlineProps) {
  const stroke = color ?? "var(--terracotta)";
  return (
    <svg
      width={width}
      height="6"
      viewBox="0 0 140 6"
      aria-hidden
      className={cn("block -mt-1", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M2 4 Q 40 1, 80 3 T 138 2"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
