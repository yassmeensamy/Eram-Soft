import { defineType, defineField } from "sanity";

export default defineType({
  name: "value",
  title: "Core Value",
  type: "object",
  fields: [
    defineField({ name: "num", title: "Number", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "desc", title: "Description", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "iconKey", title: "Icon Key", type: "string", description: "Maps to SVG icon in code (e.g. settings, users, shield-check, bolt)", validation: (r) => r.required() }),
  ],
});
