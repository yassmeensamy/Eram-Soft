import { sanityFetch } from "@/sanity/lib/fetch";
import { projectsListQuery } from "@/sanity/lib/queries";
import type { SanityProjectListItem } from "@/sanity/lib/types";
import ProjectsPageClient from "./ProjectsPageClient";

export default async function ProjectsPage() {
  const projects = await sanityFetch<SanityProjectListItem[]>({
    query: projectsListQuery,
    tags: ["project"],
  });
  return <ProjectsPageClient projects={projects} />;
}
