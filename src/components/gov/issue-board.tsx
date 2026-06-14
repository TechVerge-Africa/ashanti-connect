"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/shared/icon";
import { PriorityBadge, StatusBadge } from "@/components/reports/report-bits";
import { categoryIcons, categoryLabels, statusLabels } from "@/lib/constants";
import { relativeTime } from "@/lib/utils";
import type { Report, ReportStatus } from "@/lib/types";

const tabs: { value: ReportStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "submitted", label: "New" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated", label: "Escalated" },
  { value: "resolved", label: "Resolved" },
];

export function IssueBoard({ reports }: { reports: Report[] }) {
  const [tab, setTab] = React.useState<ReportStatus | "all">("all");
  const [statuses, setStatuses] = React.useState<Record<string, ReportStatus>>(
    Object.fromEntries(reports.map((r) => [r.id, r.status])),
  );

  const setStatus = (r: Report, status: ReportStatus, label: string) => {
    setStatuses((s) => ({ ...s, [r.id]: status }));
    toast.success(`${label}`, { description: `${r.trackingNumber} → ${statusLabels[status]}` });
  };

  const rows = reports.filter((r) => tab === "all" || statuses[r.id] === tab);

  const counts = tabs.map((t) => ({
    ...t,
    count: t.value === "all" ? reports.length : reports.filter((r) => statuses[r.id] === t.value).length,
  }));

  return (
    <div>
      <Tabs value={tab} onValueChange={(v) => setTab(v as ReportStatus | "all")}>
        <TabsList className="flex-wrap">
          {counts.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
              <span className="ml-1.5 rounded-full bg-foreground/10 px-1.5 text-xs">{t.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="mt-5 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-border bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Issue</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => {
                const status = statuses[r.id];
                return (
                  <tr key={r.id} className="group bg-card transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <Link href={`/gov/issues/${r.id}`} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon name={categoryIcons[r.category]} className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block font-mono text-xs text-muted-foreground">{r.trackingNumber}</span>
                          <span className="block max-w-[260px] truncate font-medium text-foreground group-hover:text-primary">
                            {r.title}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{categoryLabels[r.category]}</td>
                    <td className="px-4 py-3">
                      <PriorityBadge priority={r.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{relativeTime(r.updatedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setStatus(r, "assigned", "Assigned")}>
                            Assign to me
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatus(r, "in_progress", "Marked in progress")}>
                            Mark in progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatus(r, "escalated", "Escalated")}>
                            Escalate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatus(r, "resolved", "Resolved")}>
                            Resolve
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/gov/issues/${r.id}`} className="flex items-center gap-2">
                              <ArrowUpRight className="h-4 w-4" /> Open details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">No issues in this view.</div>
        )}
      </Card>
    </div>
  );
}
