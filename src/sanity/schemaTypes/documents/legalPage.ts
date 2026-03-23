import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: { list: ["privacy", "terms"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "content", title: "Content", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageType" },
  },
});
