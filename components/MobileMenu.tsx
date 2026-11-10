"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

type MobileMenuProps = {
  open: boolean;
  /** Close and return focus to the menu button. */
  onClose: () => void;
  /** Close after following a link (focus moves to the target instead). */
  onNavigate: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen menu for small screens, with a focus trap and Esc to close. */
export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(width >= 64rem)");
    const onBreakpoint = () => desktop.matches && onCloseRef.current();

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="theme-light fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface text-ink lg:hidden"
    >
      <Container className="flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" className="-m-1.5 p-1.5" aria-label="Cromford, home" onClick={onNavigate}>
          <Logo tone="ink" eager />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-ink"
        >
          <span className="sr-only">Close menu</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 5l14 14M19 5 5 19" />
          </svg>
        </button>
      </Container>

      <Container className="flex flex-1 flex-col py-8">
        <nav aria-label="Primary">
          <ul>
            {site.nav.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-baseline gap-4 py-5 type-display text-ink hover:text-derwent"
                >
                  <span className="type-mono text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10">
          <ButtonLink href={site.headerCta.href} variant="secondary" onClick={onNavigate}>
            {site.headerCta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
