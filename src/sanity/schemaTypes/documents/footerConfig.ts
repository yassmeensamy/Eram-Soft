import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerConfig",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "brandDescription", title: "Brand Description", type: "text", rows: 3 }),
    defineField({ name: "columns", title: "Link Columns", type: "array", of: [{ type: "linkColumn" }] }),
    defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Config" };
    },
  },
});
