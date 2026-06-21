import Link from "next/link";
import { ArrowRight, Bell, CheckCircle2, Siren, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { ReportRow } from "@/components/reports/report-bits";
import { reports, opportunities } from "@/lib/data";
import { relativeTime } from "@/lib/utils";

export default function CitizenDashboard() {
  const myReports = reports.slice(0, 4);
  const open = reports.filter((r) => r.status !== "resolved").length;
  const resolved = reports.filter((r) => r.status === "resolved").length;

  const activity = [
    { icon: CheckCircle2, text: "Your report ASH-2026-04655 was resolved", time: "2026-05-28T12:05:00Z" },
    { icon: Bell, text: "Roads & Highways replied to ASH-2026-04821", time: "2026-06-08T09:45:00Z" },
    { icon: Sparkles, text: "New opportunity matches your profile: Digital Skills Fellowship", time: "2026-06-10T09:00:00Z" },
    { icon: Siren, text: "You reported a water issue in Atonsu", time: "2026-06-09T06:50:00Z" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Akwaaba, Akosua 👋</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your community.</p>
        </div>
        <Button asChild>
          <Link href="/portal/report">
            <Siren className="h-4 w-4" /> Report an Issue
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open Reports" value={open} icon="FolderOpen" delta={-12} goodWhen="down" hint="vs last month" />
        <StatCard label="Resolved" value={resolved} icon="CheckCircle2" delta={8} goodWhen="up" hint="all time" accent="gold" />
        <StatCard label="Notifications" value={5} icon="Bell" hint="3 unread" />
        <StatCard label="Saved Opportunities" value={2} icon="Bookmark" hint="2 closing soon" accent="gold" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>My recent reports</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/portal/track">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {myReports.map((r) => (
              <ReportRow key={r.id} report={r} hrefBase="/portal/track" />
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <a.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{relativeTime(a.time)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gold/25 bg-gold/[0.02] shadow-glow-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Sparkles className="h-4 w-4 text-gold" /> For you
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {opportunities.slice(0, 2).map((o) => (
                <div key={o.id} className="rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/20 transition-all duration-200 p-3.5">
                  <Badge variant="gold" className="capitalize">{o.type}</Badge>
                  <p className="mt-2 text-sm font-semibold text-foreground">{o.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Closes {new Date(o.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full border-gold/25 hover:bg-gold/10 hover:text-gold transition-all duration-200">
                <Link href="/portal/opportunities">Explore opportunities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
