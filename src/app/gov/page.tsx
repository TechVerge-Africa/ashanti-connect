import Link from "next/link";
import { ArrowRight, Clock, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/shared/stat-card";
import { ReportRow } from "@/components/reports/report-bits";
import { reports, departments } from "@/lib/data";

export default function GovOverview() {
  const newReports = reports.filter((r) => r.status === "submitted").length;
  const assigned = reports.filter((r) => ["assigned", "in_progress"].includes(r.status)).length;
  const escalated = reports.filter((r) => r.status === "escalated").length;
  const resolved = reports.filter((r) => r.status === "resolved").length;

  const queue = reports
    .filter((r) => r.status !== "resolved")
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Operations Overview</h1>
          <p className="text-sm text-muted-foreground">Roads &amp; Highways · Kumasi Metropolitan</p>
        </div>
        <Button asChild variant="gold">
          <Link href="/gov/issues">
            <Inbox className="h-4 w-4" /> Open issue queue
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New Reports" value={newReports} icon="Inbox" hint="awaiting triage" accent="gold" />
        <StatCard label="Assigned" value={assigned} icon="ClipboardList" hint="in progress" />
        <StatCard label="Escalated" value={escalated} icon="TriangleAlert" hint="needs attention" accent="gold" />
        <StatCard label="Resolved" value={resolved} icon="CheckCircle2" delta={8} goodWhen="up" hint="this month" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Priority queue</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/gov/issues">
                Manage all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {queue.slice(0, 5).map((r) => (
              <ReportRow key={r.id} report={r} hrefBase="/gov/issues" />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departments.slice(0, 6).map((d) => (
              <div key={d.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{d.name}</span>
                  <span className="text-muted-foreground">{d.resolutionRate}%</span>
                </div>
                <Progress value={d.resolutionRate} className="mt-1.5 h-1.5" />
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {d.avgResponseHours}h avg response · {d.openCases} open
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
