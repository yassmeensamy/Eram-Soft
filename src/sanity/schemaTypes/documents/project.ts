import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      readOnly: ({ value }) => !!value?.current,
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) =>
        r.custom((items?: string[]) =>
          items && items.some((i) => !i || !i.trim()) ? "Tech entries cannot be empty" : true
        ),
    }),
    defineField({ name: "image", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "platform", title: "Platform", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "teamSize", title: "Team Size", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["Live", "In Progress", "Completed"] } }),
    defineField({ name: "challenge", title: "Challenge", type: "text", rows: 5 }),
    defineField({ name: "solution", title: "Solution", type: "text", rows: 5 }),
    defineField({ name: "client", title: "Client Info", type: "clientInfo" }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "projectFeature" }] }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "testimonial", title: "Testimonial", type: "projectTestimonial" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
