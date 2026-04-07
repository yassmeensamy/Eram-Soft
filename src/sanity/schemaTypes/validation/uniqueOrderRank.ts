import type { Rule } from "sanity";

// Validates that orderRank is unique across documents of the same _type.
// Usage: validation: (r) => r.required().custom(uniqueOrderRank)
export async function uniqueOrderRank(
  value: number | undefined,
  context: Parameters<Parameters<Rule["custom"]>[0]>[1]
) {
  if (value === undefined || value === null) return "Order is required";
  const { document, getClient } = context;
  if (!document) return true;
  const client = getClient({ apiVersion: "2024-01-01" });
  const id = document._id.replace(/^drafts\./, "");
  const params = { type: document._type, id, draftId: `drafts.${id}`, value };
  const query = `count(*[_type == $type && !(_id in [$id, $draftId]) && orderRank == $value])`;
  const count = await client.fetch<number>(query, params);
  return count > 0 ? "Another document already uses this order value" : true;
}
