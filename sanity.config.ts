import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const SINGLETONS = [
  "heroSection",
  "aboutPage",
  "careersPage",
  "contactPage",
  "footerConfig",
  "siteSettings",
] as const;

const SINGLETON_TITLES: Record<(typeof SINGLETONS)[number], string> = {
  heroSection: "Hero Section",
  aboutPage: "About Page",
  careersPage: "Careers Page",
  contactPage: "Contact Page",
  footerConfig: "Footer",
  siteSettings: "Site Settings",
};

export default defineConfig({
  name: "eram-soft",
  title: "Eram Soft CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...SINGLETONS.map((type) =>
              S.listItem()
                .title(SINGLETON_TITLES[type])
                .id(type)
                .child(
                  S.document().schemaType(type).documentId(type)
                )
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETONS.includes(item.getId() as (typeof SINGLETONS)[number])
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "new document" menu
    templates: (templates) =>
      templates.filter(
        (t) => !SINGLETONS.includes(t.schemaType as (typeof SINGLETONS)[number])
      ),
  },
  document: {
    // Disable Duplicate / Delete actions for singleton documents
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType as (typeof SINGLETONS)[number])
        ? input.filter(
            ({ action }) => action !== "duplicate" && action !== "delete"
          )
        : input,
  },
  basePath: "/studio",
});
