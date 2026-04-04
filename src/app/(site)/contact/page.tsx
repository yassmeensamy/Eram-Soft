import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with EramSoft. Reach out for project inquiries, partnerships, or technical support.",
  alternates: { canonical: "https://www.eramsoft.com/contact" },
  openGraph: {
    title: "Contact Us | EramSoft",
    description:
      "Get in touch with EramSoft. Reach out for project inquiries, partnerships, or technical support.",
    url: "https://www.eramsoft.com/contact",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | EramSoft",
    description:
      "Get in touch with EramSoft for project inquiries, partnerships, or technical support.",
    images: [defaultOgImage.url],
  },
};
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
