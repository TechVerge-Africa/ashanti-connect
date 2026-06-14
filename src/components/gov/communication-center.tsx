"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Conversation } from "@/components/reports/conversation";
import { StatusBadge } from "@/components/reports/report-bits";
import { Icon } from "@/components/shared/icon";
import { Input } from "@/components/ui/input";
import { categoryIcons } from "@/lib/constants";
import { cn, relativeTime } from "@/lib/utils";
import type { Report } from "@/lib/types";

export function CommunicationCenter({ reports }: { reports: Report[] }) {
  const [activeId, setActiveId] = React.useState(reports[0]?.id);
  const [query, setQuery] = React.useState("");

  const filtered = reports.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.reporter.toLowerCase().includes(query.toLowerCase()),
  );
  const active = reports.find((r) => r.id === activeId) ?? reports[0];

  return (
    <Card className="grid h-[calc(100vh-220px)] min-h-[520px] grid-cols-1 overflow-hidden p-0 md:grid-cols-[320px_1fr]">
      <div className="flex flex-col border-r border-border">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations…"
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((r) => {
            const last = r.conversation[r.conversation.length - 1];
            return (
              <button
                key={r.id}
                onClick={() => setActiveId(r.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors hover:bg-secondary/40",
                  active?.id === r.id && "bg-secondary/60",
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={categoryIcons[r.category]} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">{r.reporter}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {relativeTime(r.updatedAt)}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{r.title}</span>
                  {last && <span className="mt-0.5 block truncate text-xs text-muted-foreground/80">{last.body}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        {active && (
          <>
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <div className="text-sm font-semibold text-foreground">{active.title}</div>
                <div className="font-mono text-xs text-muted-foreground">{active.trackingNumber} · {active.reporter}</div>
              </div>
              <StatusBadge status={active.status} />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Conversation key={active.id} messages={active.conversation} as="officer" />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
