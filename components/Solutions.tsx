import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Solutions() {
  const { solutions } = site;
  return (
    <Section tone="light" id="solutions" labelledBy="solutions-heading" className="border-t border-line">
      <div data-reveal>
        <Eyebrow>{solutions.eyebrow}</Eyebrow>
        <h2 id="solutions-heading" className="type-display mt-6">
          {solutions.heading}
        </h2>
      </div>

      {/* Columns separated by vertical hairlines on desktop; stacked with horizontal rules below. */}
      <div className="mt-12 grid border-t border-line md:mt-16 lg:grid-cols-3">
        {solutions.services.map((service) => (
          <article
            key={service.number}
            data-reveal
            aria-labelledby={`service-${service.number}`}
            className="border-b border-line py-10 last:border-b-0 lg:border-b-0 lg:border-l lg:px-8 lg:pt-10 lg:pb-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
          >
            <p className="type-mono text-derwent">{service.number}</p>
            <h3 id={`service-${service.number}`} className="type-heading-2 mt-4">
              {service.title}
            </h3>
            <p className="mt-3 max-w-[40ch] text-ink-muted">{service.description}</p>
            <ul className="mt-8 border-b border-line">
              {service.items.map((item) => (
                <li key={item} className="border-t border-line py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="type-small mt-12 lg:mt-16">
        {solutions.note}{" "}
        <Link href={solutions.noteLink.href} className="text-link font-medium">
          {solutions.noteLink.label}
        </Link>
      </p>
    </Section>
  );
}
