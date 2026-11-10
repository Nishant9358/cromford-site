import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { HeroVisual } from "@/components/HeroVisual";
import { site } from "@/content/site";

export function Hero() {
  const { hero } = site;
  return (
    <section aria-labelledby="hero-heading" className="theme-dark bg-surface text-ink">
      <Container className="pt-16 pb-10 md:pt-24 lg:pt-32">
        <div className="grid-12 items-center gap-y-16">
          <div className="col-span-full lg:col-span-6">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="hero-heading" className="type-display-xl mt-6 max-w-[12ch] text-ink">
              {hero.headline}
            </h1>
            <p className="type-intro mt-6 max-w-[34rem] text-ink-muted">{hero.subheadline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-full md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
            <HeroVisual className="mx-auto max-w-[480px]" />
          </div>
        </div>

        <p className="type-mono mt-16 border-t border-line pt-6 text-ink-muted lg:mt-24">{hero.meta}</p>
      </Container>
    </section>
  );
}
