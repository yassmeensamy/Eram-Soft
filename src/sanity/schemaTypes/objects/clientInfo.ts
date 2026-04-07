import { defineType, defineField } from "sanity";

export default defineType({
  name: "clientInfo",
  title: "Client Info",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "industry", title: "Industry", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) =>
        r.custom((items?: string[]) =>
          items && items.some((i) => !i || !i.trim()) ? "Service entries cannot be empty" : true
        ),
    }),
  ],
});
