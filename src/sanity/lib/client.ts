import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  // Disabled so content changes show up on the next page refresh.
  // Sanity's CDN caches responses for up to 60 seconds even after publish.
  useCdn: false,
});
