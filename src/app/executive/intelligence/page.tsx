import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusPieChart, ConcernsBarChart } from "@/components/charts/charts";
import { InsightCard } from "@/components/executive/insight-card";
import { aiInsights, concernsByCategory, executiveSummary, reports } from "@/lib/data";
import { statusLabels } from "@/lib/constants";
import type { ReportStatus } from "@/lib/types";

export default function IntelligencePage() {
  const statusCounts = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(statusCounts).map(([k, v]) => ({
    name: statusLabels[k as ReportStatus],
    value: v,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">AI Intelligence</h1>
        <p className="text-sm text-muted-foreground">
          Automated analysis of regional signals — trends, anomalies, and recommendations.
        </p>
      </div>

      <Card className="border-primary/30 bg-primary/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-gold-600" /> Weekly Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{executiveSummary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Concerns by category</CardTitle>
            <Badge variant="secondary">Region-wide</Badge>
          </CardHeader>
          <CardContent>
            <ConcernsBarChart data={concernsByCategory} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Report status mix</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={pieData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
