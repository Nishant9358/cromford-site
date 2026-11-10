import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export type Tone = "light" | "dark" | "derwent";

const toneClass: Record<Tone, string> = {
  light: "theme-light",
  dark: "theme-dark",
  derwent: "theme-derwent",
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
};

/** Full-bleed themed band with the standard section padding (64 / 96 / 128px). */
export function Section({
  children,
  tone = "light",
  id,
  labelledBy,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClass[tone]} bg-surface py-16 text-ink md:py-24 lg:py-32 ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
