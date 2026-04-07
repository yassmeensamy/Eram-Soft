import { defineType, defineField } from "sanity";

export default defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  fields: [
    defineField({ name: "perks", title: "Perks", type: "array", of: [{ type: "perk" }] }),
    defineField({ name: "positions", title: "Positions", type: "array", of: [{ type: "jobPosition" }] }),
  ],
  preview: {
    prepare() {
      return { title: "Careers Page" };
    },
  },
});
