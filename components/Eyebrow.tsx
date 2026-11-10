import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** Small uppercase label above a heading. Copy is written in sentence case; CSS sets the capitals. */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <p className={`type-eyebrow text-derwent ${className}`}>{children}</p>;
}
