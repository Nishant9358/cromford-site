"use client";

import { useEffect } from "react";

/**
 * Fades [data-reveal] elements up by 8px the first time they scroll into view.
 * Elements already on screen when the page loads are shown without animation,
 * so only the hero animates on load. Does nothing under prefers-reduced-motion.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const viewport = window.innerHeight;

    for (const el of elements) {
      if (el.getBoundingClientRect().top < viewport) el.classList.add("is-revealed");
    }
    root.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of elements) {
      if (!el.classList.contains("is-revealed")) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}
