import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heroTagline", title: "Hero Tagline", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroAccent", title: "Hero Accent Word", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "stats", title: "Stats", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "values", title: "Core Values", type: "array", of: [{ type: "value" }] }),
    defineField({ name: "visionTitle", title: "Vision Title", type: "string" }),
    defineField({ name: "visionText", title: "Vision Text", type: "text", rows: 4 }),
    defineField({ name: "missionTitle", title: "Mission Title", type: "string" }),
    defineField({ name: "missionText", title: "Mission Text", type: "text", rows: 4 }),
    defineField({ name: "foundedYear", title: "Founded Year", type: "string" }),
    defineField({ name: "clientRetention", title: "Client Retention", type: "string" }),
    defineField({ name: "portfolioTag", title: "Portfolio Tag", type: "string" }),
    defineField({ name: "portfolioTitle", title: "Portfolio Title", type: "string" }),
    defineField({ name: "portfolioAccent", title: "Portfolio Accent Word", type: "string" }),
    defineField({ name: "portfolioDescription", title: "Portfolio Description", type: "text", rows: 3 }),
    defineField({ name: "portfolioButtonText", title: "Portfolio Button Text", type: "string" }),
    defineField({ name: "portfolioFile", title: "Portfolio File (PDF)", type: "file" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
