import { defineType, defineField } from "sanity";

export default defineType({
  name: "perk",
  title: "Perk",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "string" }),
    defineField({ name: "iconKey", title: "Icon Key", type: "string", description: "Maps to SVG icon in code" }),
  ],
});
