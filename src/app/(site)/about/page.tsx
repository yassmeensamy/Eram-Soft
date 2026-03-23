import { sanityFetch } from "@/sanity/lib/fetch";
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
