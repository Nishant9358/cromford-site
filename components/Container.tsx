import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Max content width 1200px, 24px side gutters (16px on phones). */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1248px] px-4 md:px-6 ${className}`}>{children}</div>
  );
}
