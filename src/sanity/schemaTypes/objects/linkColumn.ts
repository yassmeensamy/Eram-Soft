import { defineType, defineField } from "sanity";

export default defineType({
  name: "linkColumn",
  title: "Link Column",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "URL", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
  ],
});
