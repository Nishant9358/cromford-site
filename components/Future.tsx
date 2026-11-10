import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Future() {
  const { future } = site;
  return (
    <Section tone="derwent" labelledBy="future-heading">
      <div className="grid-12 gap-y-8" data-reveal>
        <div className="col-span-full md:col-span-6">
          <Eyebrow>{future.eyebrow}</Eyebrow>
          <h2 id="future-heading" className="type-display mt-6">
            {future.heading}
          </h2>
        </div>
        <p className="type-intro col-span-full max-w-[60ch] text-ink-muted md:col-span-5 md:col-start-8 md:mt-10">
          {future.body}
        </p>
      </div>
      <p className="type-heading-1 mt-16 border-t border-line pt-8 md:mt-24" data-reveal>
        {future.closing}
      </p>
    </Section>
  );
}
