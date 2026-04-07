import { createClient } from "next-sanity";

/**
 * Write-enabled Sanity client — server-side ONLY.
 * Requires SANITY_API_WRITE_TOKEN with Editor or Write permissions.
 * Never import this from a client component.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
