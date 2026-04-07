import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      options: { list: ["homepage", "contact", "both"] },
      description: "Where this FAQ appears",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      validation: (r) =>
        r.required().custom(async (value, context) => {
          if (value === undefined || value === null) return "Order is required";
          const { document, getClient } = context;
          if (!document) return true;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document._id.replace(/^drafts\./, "");
          const ctx = (document as { context?: string }).context;
          // Conflict if another FAQ shares the same orderRank AND overlaps in context.
          // "both" overlaps with "homepage", "contact", and "both".
          const overlapping =
            ctx === "both" ? ["homepage", "contact", "both"] : [ctx, "both"];
          const count = await client.fetch<number>(
            `count(*[_type == "faqItem" && !(_id in [$id, $draftId]) && orderRank == $value && context in $contexts])`,
            { id, draftId: `drafts.${id}`, value, contexts: overlapping }
          );
          return count > 0
            ? "Another FAQ in the same context already uses this order value"
            : true;
        }),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "context" },
  },
});
