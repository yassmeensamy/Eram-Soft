import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectTestimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
  ],
});
