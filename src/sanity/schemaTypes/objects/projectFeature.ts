import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectFeature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string", description: "Icon identifier (e.g. compass, map, bell)", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (r) => r.required() }),
  ],
});
