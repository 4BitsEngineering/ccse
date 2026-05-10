import { cn } from "@/lib/utils";

interface SealProps {
  size?: number;
  className?: string;
  /** override stroke/inner-fill color. Defaults to terracotta token. */
  color?: string;
  /** decorative-only (no aria role). True by default. */
  decorative?: boolean;
}

/**
 * Sello concéntrico — monograma editorial de CCSE (Direction B).
 * Tres círculos: dos anillos finos + uno interior sólido.
 * Color: terracota por defecto, override para over-dark CTAs.
 */
export function Seal({
  size = 32,
  className,
  color,
  decorative = true,
}: SealProps) {
  const stroke = color ?? "var(--terracotta)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      aria-hidden={decorative}
      className={cn("shrink-0", className)}
    >
      <circle
        cx="19"
        cy="19"
        r="17"
        fill="none"
        stroke={stroke}
        strokeWidth="0.6"
      />
      <circle
        cx="19"
        cy="19"
        r="12"
        fill="none"
        stroke={stroke}
        strokeWidth="0.6"
      />
      <circle cx="19" cy="19" r="5" fill={stroke} />
    </svg>
  );
}
