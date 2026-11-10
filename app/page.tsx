import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Future } from "@/components/Future";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { JsonLd } from "@/components/JsonLd";
import { Philosophy } from "@/components/Philosophy";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Solutions } from "@/components/Solutions";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Intro />
      <Solutions />
      <Approach />
      <Philosophy />
      <Future />
      <Contact />
      <RevealOnScroll />
    </>
  );
}
