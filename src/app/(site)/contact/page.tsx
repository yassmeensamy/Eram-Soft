import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery, officesQuery, faqsQuery } from "@/sanity/lib/queries";
import type { SanityContactPage, SanityOffice, SanityFaqItem } from "@/sanity/lib/types";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const [contactData, offices, faqs] = await Promise.all([
    sanityFetch<SanityContactPage>({ query: contactPageQuery, tags: ["contact"] }),
    sanityFetch<SanityOffice[]>({ query: officesQuery, tags: ["office"] }),
    sanityFetch<SanityFaqItem[]>({ query: faqsQuery, params: { context: "contact" }, tags: ["faq"] }),
  ]);

  return <ContactPageClient contactData={contactData} offices={offices} faqs={faqs} />;
}
