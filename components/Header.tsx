"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { site } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`theme-light sticky top-0 z-40 border-b bg-surface text-ink transition-colors duration-200 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-m-1.5 p-1.5" aria-label="Cromford, home">
          <Logo tone="ink" eager />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] leading-5 font-medium text-ink transition-colors hover:text-derwent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href={site.headerCta.href} variant="secondary" size="small">
            {site.headerCta.label}
          </ButtonLink>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }}
        onNavigate={() => setMenuOpen(false)}
      />
    </header>
  );
}
