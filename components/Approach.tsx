import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Approach() {
  const { approach } = site;
  return (
    <Section tone="dark" id="approach" labelledBy="approach-heading">
      <div className="grid-12" data-reveal>
        <div className="col-span-full md:col-span-8">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 id="approach-heading" className="type-display mt-6">
            {approach.heading}
          </h2>
        </div>
      </div>

      {/* One hairline runs through every marker: vertical on phones, horizontal from lg. */}
      <ol
        data-reveal
        className="steps relative mt-12 grid gap-10 md:mt-16 lg:grid-cols-4 lg:gap-6 before:absolute before:top-1.5 before:bottom-1.5 before:left-[5.5px] before:w-px before:bg-line lg:before:top-[5.5px] lg:before:right-0 lg:before:bottom-auto lg:before:left-0 lg:before:h-px lg:before:w-auto"
      >
        {approach.steps.map((step) => (
          <li key={step.number} className="step relative pl-10 lg:pt-12 lg:pl-0 lg:pr-6">
            <span aria-hidden="true" className="step-marker absolute top-0 left-0 block size-3" />
            <p className="type-mono text-ink-muted">{step.number}</p>
            <h3 className="type-heading-1 mt-3">{step.title}</h3>
            <p className="mt-3 max-w-[32ch] text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
