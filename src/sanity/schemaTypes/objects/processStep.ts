import { defineType, defineField } from "sanity";

export default defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({ name: "phase", title: "Phase", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});
