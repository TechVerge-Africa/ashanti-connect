"use client";

import * as React from "react";
import { Building2, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { categoryLabels } from "@/lib/constants";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Project } from "@/lib/types";

const statusConfig: Record<Project["status"], { label: string; variant: "success" | "warning" | "info" | "secondary" }> = {
  completed: { label: "Completed", variant: "success" },
  ongoing: { label: "Ongoing", variant: "info" },
  delayed: { label: "Delayed", variant: "warning" },
  planning: { label: "Planning", variant: "secondary" },
};

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = React.useState<string>("all");
  const filters = ["all", "ongoing", "completed", "delayed", "planning"] as const;

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const avgCompletion = Math.round(projects.reduce((s, p) => s + p.completion, 0) / projects.length);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Total committed budget" value={formatCurrency(totalBudget)} />
        <SummaryCard label="Funds disbursed" value={formatCurrency(totalSpent)} accent />
        <SummaryCard label="Average completion" value={`${avgCompletion}%`} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {f === "all" ? "All projects" : f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {filtered.map((p) => {
          const status = statusConfig[p.status];
          return (
            <Card key={p.id} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{categoryLabels[p.category]}</Badge>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-primary">{p.completion}%</div>
                  <div className="text-xs text-muted-foreground">complete</div>
                </div>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

              <Progress value={p.completion} className="mt-4" indicatorClassName="bg-gradient-to-r from-primary to-gold-500" />

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Detail icon={MapPin} label="District" value={p.district} />
                <Detail icon={Building2} label="Contractor" value={p.contractor} />
                <Detail label="Budget" value={formatCurrency(p.budget)} />
                <Detail label="Spent" value={formatCurrency(p.spent)} />
                <Detail icon={Calendar} label="Start" value={formatDate(p.startDate)} />
                <Detail icon={Calendar} label="Target end" value={formatDate(p.endDate)} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card className={cn("p-5", accent && "border-primary/30 bg-primary/[0.03]")}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-foreground">{value}</div>
    </Card>
  );
}

function Detail({
  icon: IconCmp,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
        {IconCmp && <IconCmp className="h-3 w-3" />} {label}
      </div>
      <div className="mt-0.5 font-medium text-foreground">{value}</div>
    </div>
  );
}
