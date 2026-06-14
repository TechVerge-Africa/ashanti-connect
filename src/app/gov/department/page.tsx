import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { ReportsTrendChart } from "@/components/charts/charts";
import { trendData, reports, departments } from "@/lib/data";
import { relativeTime } from "@/lib/utils";

export default function DepartmentDashboardPage() {
  const dept = departments[0];
  const assigned = reports.filter((r) => ["assigned", "in_progress", "escalated"].includes(r.status));

  const team = [
    { name: "Kwabena Mensah", role: "Field Officer", cases: 14, load: 78 },
    { name: "Ama Boateng", role: "Inspector", cases: 9, load: 52 },
    { name: "Yaw Darko", role: "Engineer", cases: 11, load: 64 },
    { name: "Efua Asante", role: "Coordinator", cases: 6, load: 38 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{dept.name} · Dashboard</h1>
        <p className="text-sm text-muted-foreground">Performance, workload, and resolution metrics.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Tasks" value={dept.openCases} icon="ClipboardList" hint="active" />
        <StatCard label="Resolution Rate" value={`${dept.resolutionRate}%`} icon="CheckCircle2" delta={2} goodWhen="up" accent="gold" />
        <StatCard label="Avg Response" value={`${dept.avgResponseHours}h`} icon="Clock" delta={-6} goodWhen="down" />
        <StatCard label="Active Projects" value={dept.activeProjects} icon="FolderKanban" hint="ongoing" accent="gold" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Reports vs resolutions</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsTrendChart data={trendData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team workload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {team.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-foreground">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role} · {m.cases} cases</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{m.load}%</span>
                </div>
                <Progress value={m.load} className="mt-1.5 h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assigned.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{r.trackingNumber}</span>
                  <Badge variant="outline">{r.district}</Badge>
                </div>
                <div className="mt-0.5 truncate font-medium text-foreground">{r.title}</div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{r.progress}% done</span>
                <span>{relativeTime(r.updatedAt)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
