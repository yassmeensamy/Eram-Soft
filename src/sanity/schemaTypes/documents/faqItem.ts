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
    }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "question", subtitle: "context" },
  },
});
