import { sanityFetch } from "@/sanity/lib/fetch";
import { projectBySlugQuery, projectsListQuery } from "@/sanity/lib/queries";
import type { SanityProject, SanityProjectListItem } from "@/sanity/lib/types";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    sanityFetch<SanityProject | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ["project"],
    }),
    sanityFetch<SanityProjectListItem[]>({
      query: projectsListQuery,
      tags: ["project"],
    }),
  ]);

  if (!project) notFound();

  return <ProjectDetailClient project={project} allProjects={allProjects} />;
}
