import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectFeature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string", description: "Icon identifier (e.g. compass, map, bell)" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});
