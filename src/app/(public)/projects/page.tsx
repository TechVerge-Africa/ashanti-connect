import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getProjects } from "@/lib/data/server";

export const metadata: Metadata = {
  title: "Development Projects",
  description: "Track regional development projects — budgets, contractors, timelines, and completion.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        eyebrow="Project transparency"
        title="Development projects, open to all"
        description="Monitor every regional project in real time — budgets, contractors, timelines, and completion percentages. Transparency is a core principle."
      />
      <section className="container py-12">
        <ProjectsExplorer projects={projects} />
      </section>
    </>
  );
}
