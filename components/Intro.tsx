import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Intro() {
  const { intro } = site;
  return (
    <Section tone="light" labelledBy="intro-heading">
      <div className="grid-12 gap-y-8" data-reveal>
        <Eyebrow className="col-span-full">{intro.eyebrow}</Eyebrow>
        <h2 id="intro-heading" className="type-display col-span-full -mt-2 md:col-span-7">
          {intro.heading}
        </h2>
        {/* Body sits in columns 8–12, its last line on the heading's last baseline. */}
        <div className="col-span-full max-w-[60ch] space-y-4 md:col-span-5 md:col-start-8 md:[align-self:last_baseline]">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="type-intro text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
