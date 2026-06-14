"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ReportRow } from "@/components/reports/report-bits";
import { statusLabels } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/lib/types";

const statusFilters: (ReportStatus | "all")[] = [
  "all",
  "submitted",
  "assigned",
  "in_progress",
  "escalated",
  "resolved",
];

export function TrackExplorer({ reports, hrefBase }: { reports: Report[]; hrefBase: string }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<(typeof statusFilters)[number]>("all");

  const filtered = reports.filter((r) => {
    const matchesStatus = status === "all" || r.status === status;
    const matchesQuery =
      !query ||
      r.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by tracking number, title, or location…"
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              status === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {s === "all" ? "All" : statusLabels[s]}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((r) => (
          <ReportRow key={r.id} report={r} hrefBase={hrefBase} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No reports match your search.
          </div>
        )}
      </div>
    </div>
  );
}
