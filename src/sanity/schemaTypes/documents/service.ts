import { defineType, defineField } from "sanity";
import { uniqueOrderRank } from "../validation/uniqueOrderRank";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number", type: "string", description: 'e.g. "01"' }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) =>
        r.custom((items?: string[]) =>
          items && items.some((i) => !i || !i.trim()) ? "Tag entries cannot be empty" : true
        ),
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      validation: (r) => r.required().custom(uniqueOrderRank),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "orderRank", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "number", media: "image" },
  },
});
