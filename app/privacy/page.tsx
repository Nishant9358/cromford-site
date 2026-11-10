import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

// TODO: have this privacy policy reviewed before launch.

export const metadata: Metadata = {
  title: site.privacy.title,
  description:
    "How Cromford handles the details you send through the contact form on cromford.in: what we collect, why, where it goes and how to ask for deletion.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  const { privacy } = site;
  return (
    <Section tone="light" labelledBy="privacy-heading" className="border-t border-line">
      <div className="grid-12">
        <div className="col-span-full md:col-span-10 lg:col-span-7 lg:col-start-3">
          <Eyebrow>{privacy.updated}</Eyebrow>
          <h1 id="privacy-heading" className="type-display mt-6">
            {privacy.title}
          </h1>
          <p className="type-intro mt-6 max-w-[60ch] text-ink-muted">{privacy.intro}</p>

          {privacy.sections.map((section) => (
            <section key={section.heading} className="mt-12 border-t border-line pt-8">
              <h2 className="type-heading-2">{section.heading}</h2>
              <div className="mt-4 max-w-[65ch] space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="type-small mt-16 border-t border-line pt-8">
            Questions about this policy?{" "}
            <a href={`mailto:${site.email}`} className="text-link">
              {site.email}
            </a>
            {" · "}
            <Link href="/" className="text-link">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
