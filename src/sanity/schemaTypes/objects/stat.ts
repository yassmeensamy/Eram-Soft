import { defineType, defineField } from "sanity";

export default defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "suffix", title: "Suffix", type: "string", description: "e.g. +, %", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
  ],
});
