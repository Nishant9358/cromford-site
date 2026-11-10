import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { SocialIcon } from "@/components/SocialIcon";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="theme-dark bg-surface-sunk text-ink">
      <Container className="py-16 md:py-24">
        <div className="grid-12 gap-y-12">
          <div className="col-span-full md:col-span-6">
            <Link href="/" className="-m-1.5 inline-block p-1.5" aria-label="Cromford, home">
              <Logo tone="mill" />
            </Link>
            <p className="mt-6 type-heading-1 font-display text-ink">{site.tagline}</p>
            <p className="mt-4 type-small">{site.disciplines}</p>
          </div>

          <nav aria-label="Footer" className="col-span-full md:col-span-3 md:col-start-8">
            <ul className="space-y-3">
              {site.footer.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] leading-5 text-ink hover:text-derwent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-full md:col-span-2 md:col-start-11">
            {/* TODO: replace the placeholder "#" hrefs in content/site.ts with the real profiles. */}
            <ul className="flex gap-2 md:justify-end" aria-label="Social">
              {site.footer.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex size-11 items-center justify-center rounded-control border border-line text-ink transition-colors hover:border-ink"
                  >
                    <SocialIcon name={item.label} />
                    <span className="sr-only">Cromford on {item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <p className="type-small">{site.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
