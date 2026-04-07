import { defineType, defineField } from "sanity";
import { uniqueOrderRank } from "../validation/uniqueOrderRank";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "comment", title: "Comment", type: "text", rows: 4 }),
    defineField({ name: "avatar", title: "Avatar Initials", type: "string", description: 'e.g. "SM"' }),
    defineField({ name: "color", title: "Color", type: "string" }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      validation: (r) => r.required().custom(uniqueOrderRank),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company" },
  },
});
