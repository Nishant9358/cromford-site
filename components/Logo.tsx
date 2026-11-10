import Image from "next/image";

/** The supplied lockup SVGs are 312 × 48. */
const RATIO = 312 / 48;

type LogoProps = {
  /** "ink" on light sections, "mill" on dark sections. Never recolour. */
  tone: "ink" | "mill";
  height?: number;
  eager?: boolean;
  className?: string;
};

export function Logo({ tone, height = 28, eager = false, className = "" }: LogoProps) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src={`/brand/logo/cromford-lockup-${tone}.svg`}
      alt="Cromford"
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={`block ${className}`}
      style={{ width, height }}
    />
  );
}
