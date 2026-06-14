import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Development Projects",
  description: "Track regional development projects — budgets, contractors, timelines, and completion.",
};

export default function ProjectsPage() {
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
