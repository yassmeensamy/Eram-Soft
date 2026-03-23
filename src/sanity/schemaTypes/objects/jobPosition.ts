import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobPosition",
  title: "Job Position",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Type", type: "string" }),
    defineField({ name: "details", title: "Details", type: "text", rows: 6 }),
  ],
});
