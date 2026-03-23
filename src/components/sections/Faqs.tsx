"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import AmbientEffects from "@/components/ui/AmbientEffects";
import FaqAccordion from "@/components/ui/FaqAccordion";
import "./faqs.css";

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faqs({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="faq-section dark-section section-top-glow relative py-20 md:py-28">
      <AmbientEffects />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 lg:px-16">
        <SectionHeader
          label="FAQ"
          title="Frequently Asked"
          accentWord="Questions"
          subtitle="Everything you need to know about working with us."
        />

        <FaqAccordion items={faqs.map(f => ({ q: f.question, a: f.answer }))} classPrefix="faq" />
      </div>
    </section>
  );
}
