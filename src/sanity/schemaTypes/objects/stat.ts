import { defineType, defineField } from "sanity";

export default defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "number" }),
    defineField({ name: "suffix", title: "Suffix", type: "string", description: "e.g. +, %" }),
    defineField({ name: "label", title: "Label", type: "string" }),
  ],
});
