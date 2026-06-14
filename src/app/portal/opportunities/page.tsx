import { OpportunitiesExplorer } from "@/components/opportunities/opportunities-explorer";
import { opportunities } from "@/lib/data";

export default function PortalOpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Opportunity Hub</h1>
        <p className="text-sm text-muted-foreground">
          Discover and save jobs, scholarships, grants, internships, training, and more.
        </p>
      </div>
      <OpportunitiesExplorer opportunities={opportunities} enableSave />
    </div>
  );
}
