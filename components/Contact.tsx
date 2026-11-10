import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Contact() {
  const { contact } = site;
  return (
    <Section tone="light" id="contact" labelledBy="contact-heading">
      <div className="grid-12 gap-y-12">
        <div className="col-span-full lg:col-span-5" data-reveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contact-heading" className="type-display mt-6">
            {contact.heading}
          </h2>
          <p className="type-intro mt-6 max-w-[40ch] text-ink-muted">{contact.text}</p>

          {/* TODO: confirm the hello@cromford.in inbox exists and is monitored before launch. */}
          <p className="mt-10 border-t border-line pt-6">
            <span className="type-small block">{contact.emailLabel}</span>
            <a href={`mailto:${site.email}`} className="text-link mt-1 inline-block text-[18px] leading-7">
              {site.email}
            </a>
          </p>
        </div>

        <div className="col-span-full lg:col-span-6 lg:col-start-7" data-reveal>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
