import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "rotatingWords",
      title: "Rotating Words",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate in the hero heading",
    }),
    defineField({ name: "headingPrefix", title: "Heading Prefix", type: "string", description: 'Text before the rotating word' }),
    defineField({ name: "headingSuffix", title: "Heading Suffix", type: "string", description: 'Text after the rotating word' }),
    defineField({ name: "bodyText", title: "Body Text", type: "text", rows: 3 }),
    defineField({ name: "ctaPrimaryText", title: "Primary CTA Text", type: "string" }),
    defineField({ name: "ctaPrimaryLink", title: "Primary CTA Link", type: "string" }),
    defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text", type: "string" }),
    defineField({ name: "ctaSecondaryLink", title: "Secondary CTA Link", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Hero Section" };
    },
  },
});
