"use client";

import * as React from "react";
import { Bookmark, CalendarClock, MapPin, Search, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/shared/icon";
import { opportunityIcons, opportunityLabels } from "@/lib/constants";
import { cn, compactNumber, formatDate } from "@/lib/utils";
import type { Opportunity, OpportunityType } from "@/lib/types";

const types: (OpportunityType | "all")[] = [
  "all",
  "job",
  "scholarship",
  "grant",
  "internship",
  "training",
  "entrepreneurship",
];

export function OpportunitiesExplorer({
  opportunities,
  enableSave = false,
}: {
  opportunities: Opportunity[];
  enableSave?: boolean;
}) {
  const [type, setType] = React.useState<(typeof types)[number]>("all");
  const [query, setQuery] = React.useState("");
  const [saved, setSaved] = React.useState<Set<string>>(new Set());

  const filtered = opportunities.filter((o) => {
    const matchesType = type === "all" || o.type === type;
    const matchesQuery =
      !query ||
      o.title.toLowerCase().includes(query.toLowerCase()) ||
      o.organization.toLowerCase().includes(query.toLowerCase()) ||
      o.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesType && matchesQuery;
  });

  const toggleSave = (id: string) =>
    setSaved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search opportunities, organizations, or tags…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition-colors",
              type === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {t === "all" ? "All" : opportunityLabels[t]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => (
          <Card key={o.id} className={cn("flex flex-col p-6", o.featured && "ring-1 ring-gold/40")}>
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-700">
                <Icon name={opportunityIcons[o.type]} className="h-5 w-5" />
              </span>
              <div className="flex items-center gap-2">
                {o.featured && <Badge variant="gold">Featured</Badge>}
                {enableSave && (
                  <button
                    onClick={() => toggleSave(o.id)}
                    aria-label="Save opportunity"
                    className={cn(
                      "rounded-lg border border-border p-1.5 transition-colors",
                      saved.has(o.id) ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    <Bookmark className={cn("h-4 w-4", saved.has(o.id) && "fill-current")} />
                  </button>
                )}
              </div>
            </div>

            <Badge variant="secondary" className="mt-3 w-fit capitalize">
              {opportunityLabels[o.type]}
            </Badge>
            <h3 className="mt-2 font-display text-base font-semibold">{o.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{o.organization}</p>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.description}</p>

            {o.reward && (
              <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                <Trophy className="h-4 w-4" /> {o.reward}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {o.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5" /> {formatDate(o.deadline)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{compactNumber(o.applicants)} applied</span>
              <Button size="sm" variant="outline">
                Apply
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No opportunities match your search.
        </div>
      )}
    </div>
  );
}
