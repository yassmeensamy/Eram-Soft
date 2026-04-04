import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EramSoft — our mission, values, and the team behind innovative software solutions for businesses worldwide.",
  alternates: { canonical: "https://www.eramsoft.com/about" },
  openGraph: {
    title: "About Us | EramSoft",
    description:
      "Learn about EramSoft — our mission, values, and the team behind innovative software solutions for businesses worldwide.",
    url: "https://www.eramsoft.com/about",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | EramSoft",
    description:
      "Learn about EramSoft — our mission, values, and the team behind innovative software solutions.",
    images: [defaultOgImage.url],
  },
};
import { aboutPageQuery, officesQuery } from "@/sanity/lib/queries";
import type { SanityAboutPage, SanityOffice } from "@/sanity/lib/types";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const [aboutData, offices] = await Promise.all([
    sanityFetch<SanityAboutPage>({ query: aboutPageQuery, tags: ["about"] }),
    sanityFetch<SanityOffice[]>({ query: officesQuery, tags: ["office"] }),
  ]);

  return <AboutPageClient aboutData={aboutData} offices={offices} />;
}
