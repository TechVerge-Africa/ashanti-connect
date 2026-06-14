import { TrackExplorer } from "@/components/reports/track-explorer";
import { reports } from "@/lib/data";

export default function TrackReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Track Reports</h1>
        <p className="text-sm text-muted-foreground">
          Follow every report like a parcel — status, department, progress, and conversations.
        </p>
      </div>
      <TrackExplorer reports={reports} hrefBase="/portal/track" />
    </div>
  );
}
