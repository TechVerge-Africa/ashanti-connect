import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ConcernsBarChart,
  ReportsTrendChart,
  SatisfactionChart,
} from "@/components/charts/charts";
import { InsightCard } from "@/components/executive/insight-card";
import {
  concernsByCategory,
  districts,
  executiveMetrics,
  executiveSummary,
  aiInsights,
  trendData,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ExecutiveDashboard() {
  const ranked = [...districts].sort((a, b) => b.healthScore - a.healthScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-muted-foreground">Ashanti Region · Real-time regional intelligence</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/executive/intelligence">
            <Sparkles className="h-4 w-4" /> AI Intelligence
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {executiveMetrics.map((m) => {
          const positive = m.goodWhen === "down" ? m.delta < 0 : m.delta > 0;
          return (
            <Card key={m.label} className="p-5">
              <div className="text-xs font-medium text-muted-foreground">{m.label}</div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">
                {m.value}
                {m.unit && <span className="text-base font-semibold text-muted-foreground">{m.unit}</span>}
              </div>
              <div
                className={cn(
                  "mt-1 inline-flex items-center gap-0.5 text-xs font-medium",
                  positive ? "text-success" : "text-destructive",
                )}
              >
                {m.delta > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {Math.abs(m.delta)}%
              </div>
            </Card>
          );
        })}
      </div>

      {/* Executive summary */}
      <Card className="border-primary/30 bg-primary/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-gold-600" /> AI Executive Summary · This week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{executiveSummary}</p>
        </CardContent>
      </Card>

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
            <CardTitle>Citizen satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <SatisfactionChart data={trendData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top citizen concerns</CardTitle>
          </CardHeader>
          <CardContent>
            <ConcernsBarChart data={concernsByCategory} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>District performance</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/executive/districts">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {ranked.slice(0, 6).map((d, i) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.openReports} open · {d.avgResolutionDays}d avg</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-gradient-to-r from-primary to-gold-500" style={{ width: `${d.healthScore}%` }} />
                  </span>
                  <span className="w-8 text-right text-sm font-semibold text-primary">{d.healthScore}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Latest AI insights</CardTitle>
          <Badge variant="gold">Auto-generated</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {aiInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
