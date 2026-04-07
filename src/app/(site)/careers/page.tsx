import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { sanityFetch } from "@/sanity/lib/fetch";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join EramSoft — explore open positions and build your career with a leading software development company.",
  alternates: { canonical: "https://www.eramsoft.com/careers" },
  openGraph: {
    title: "Careers | EramSoft",
    description:
      "Join EramSoft — explore open positions and build your career with a leading software development company.",
    url: "https://www.eramsoft.com/careers",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | EramSoft",
    description:
      "Join EramSoft — explore open positions and build your career.",
    images: [defaultOgImage.url],
  },
};
import { careersPageQuery } from "@/sanity/lib/queries";
import type { SanityCareersPage } from "@/sanity/lib/types";

const CareersPageClient = dynamic(() => import("./CareersPageClient"));

export default async function CareersPage() {
  const careersData = await sanityFetch<SanityCareersPage>({
    query: careersPageQuery,
    tags: ["careersPage"],
  });

  return <CareersPageClient careersData={careersData} />;
}
