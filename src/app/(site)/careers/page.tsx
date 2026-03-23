import { sanityFetch } from "@/sanity/lib/fetch";
import { careersPageQuery } from "@/sanity/lib/queries";
import type { SanityCareersPage } from "@/sanity/lib/types";
import CareersPageClient from "./CareersPageClient";

export default async function CareersPage() {
  const careersData = await sanityFetch<SanityCareersPage>({
    query: careersPageQuery,
    tags: ["careers"],
  });

  return <CareersPageClient careersData={careersData} />;
}
