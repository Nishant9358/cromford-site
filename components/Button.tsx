import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "small";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans text-[15px] font-medium leading-5 whitespace-nowrap transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-70";

const variants: Record<Variant, string> = {
  primary: "bg-derwent text-on-derwent hover:bg-ink hover:text-surface",
  secondary: "border border-ink text-ink hover:bg-derwent-soft",
};

const sizes: Record<Size, string> = {
  default: "h-12 px-6",
  small: "h-10 px-4",
};

type Style = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "default", className = "" }: Style) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = Style & {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

/** A link styled as a button. */
export function ButtonLink({ href, children, onClick, ...style }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={buttonClasses(style)}>
      {children}
    </Link>
  );
}

type ButtonProps = Style & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} {...rest} className={buttonClasses({ variant, size, className })} />;
}
