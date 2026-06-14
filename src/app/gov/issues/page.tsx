import { IssueBoard } from "@/components/gov/issue-board";
import { reports } from "@/lib/data";

export default function IssueManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Issue Management</h1>
        <p className="text-sm text-muted-foreground">
          Triage, assign, escalate, and resolve citizen reports with full accountability.
        </p>
      </div>
      <IssueBoard reports={reports} />
    </div>
  );
}
