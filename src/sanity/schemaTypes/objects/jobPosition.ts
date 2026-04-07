import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobPosition",
  title: "Job Position",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "type", title: "Type", type: "string", validation: (r) => r.required() }),
    defineField({ name: "details", title: "Details", type: "text", rows: 6, validation: (r) => r.required() }),
  ],
});
