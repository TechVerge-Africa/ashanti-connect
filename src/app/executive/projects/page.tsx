import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { projects } from "@/lib/data";

export default function ExecutiveProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Project Oversight</h1>
        <p className="text-sm text-muted-foreground">
          Monitor delivery, budgets, and completion across all regional projects.
        </p>
      </div>
      <ProjectsExplorer projects={projects} />
    </div>
  );
}
