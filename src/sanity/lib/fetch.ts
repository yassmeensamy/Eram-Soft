import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
  /** Accepted for backwards compatibility but unused — fetches always hit Sanity fresh. */
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    // Always hit Sanity fresh so page refreshes show newly published content.
    cache: "no-store",
  });
}
