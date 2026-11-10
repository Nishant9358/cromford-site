import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Philosophy() {
  const { philosophy } = site;
  return (
    <Section tone="light" id="about" labelledBy="about-heading">
      <h2 id="about-heading" className="type-display-xl max-w-[18ch] lg:max-w-none" data-reveal>
        {philosophy.heading}
      </h2>

      <div className="grid-12 mt-8 md:mt-12" data-reveal>
        <p className="type-intro col-span-full max-w-[60ch] text-ink-muted md:col-span-7 md:col-start-6">
          {philosophy.body}
        </p>
      </div>

      <ul className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-3" data-reveal>
        {philosophy.principles.map((principle) => (
          <li
            key={principle.label}
            className="border-b border-line py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
          >
            <Eyebrow>{principle.label}</Eyebrow>
            <p className="type-heading-3 mt-3 max-w-[28ch] font-normal">{principle.text}</p>
          </li>
        ))}
      </ul>

      <div className="grid-12 mt-16 gap-y-4 border-t border-line pt-8 md:mt-24" data-reveal>
        <div className="col-span-full md:col-span-3">
          <h3 className="type-heading-3">{philosophy.nameStory.title}</h3>
          <p aria-hidden="true" className="type-heading-1 mt-2 text-derwent">
            {philosophy.nameStory.year}
          </p>
        </div>
        <p className="type-small col-span-full max-w-[65ch] md:col-span-7 md:col-start-6">
          {philosophy.nameStory.text}
        </p>
      </div>
    </Section>
  );
}
