import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { defaultOgImage } from "@/lib/metadata";
import { projectsListQuery } from "@/sanity/lib/queries";
import type { SanityProjectListItem } from "@/sanity/lib/types";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of mobile apps, web platforms, and custom software solutions built for clients across the UAE and beyond.",
  alternates: { canonical: "https://www.eramsoft.com/projects" },
  openGraph: {
    title: "Projects | EramSoft",
    description:
      "Explore our portfolio of mobile apps, web platforms, and custom software solutions built for clients across the UAE and beyond.",
    url: "https://www.eramsoft.com/projects",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | EramSoft",
    description:
      "Explore our portfolio of mobile apps, web platforms, and custom software solutions.",
    images: [defaultOgImage.url],
  },
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<SanityProjectListItem[]>({
    query: projectsListQuery,
    tags: ["project"],
  });
  return <ProjectsPageClient projects={projects} />;
}
