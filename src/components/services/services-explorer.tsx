"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Clock, Search, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/shared/icon";
import { serviceCategoryIcons, serviceCategoryLabels } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Service, ServiceCategory } from "@/lib/types";

export function ServicesExplorer({
  services,
  basePath = "/services",
}: {
  services: Service[];
  basePath?: string;
}) {
  const [category, setCategory] = React.useState<ServiceCategory | "all">("all");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(() => {
    const present = new Set(services.map((s) => s.category));
    return (Object.keys(serviceCategoryLabels) as ServiceCategory[]).filter((c) => present.has(c));
  }, [services]);

  const filtered = services.filter((s) => {
    const matchesCategory = category === "all" || s.category === category;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.agency.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const popular = services.filter((s) => s.popular);

  return (
    <div>
      {!query && category === "all" && popular.length > 0 && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Sparkles className="h-4 w-4 text-gold-600" /> Popular services
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {popular.map((s) => (
              <Link
                key={s.id}
                href={`${basePath}/${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={s.icon} className="h-4 w-4 text-primary" />
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services — e.g. passport, Ghana Card, tax…"
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            category === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            <Icon name={serviceCategoryIcons[c]} className="h-4 w-4" />
            {serviceCategoryLabels[c]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "service" : "services"}
      </p>

      <div className="mt-3 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link key={s.id} href={`${basePath}/${s.slug}`} className="group">
            <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lifted">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                {s.popular && <Badge variant="gold">Popular</Badge>}
              </div>
              <Badge variant="secondary" className="mt-3 w-fit">
                {serviceCategoryLabels[s.category]}
              </Badge>
              <h3 className="mt-2 font-display text-base font-semibold">{s.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.tagline}</p>
              <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {s.agency}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {s.processingTime}
                </span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View & apply
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No services match your search. Try a different term or category.
        </div>
      )}
    </div>
  );
}
