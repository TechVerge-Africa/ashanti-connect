import { AlertTriangle, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AiInsight } from "@/lib/types";

const config = {
  alert: { icon: AlertTriangle, cls: "border-destructive/30 bg-destructive/5 text-destructive" },
  watch: { icon: TrendingUp, cls: "border-gold/40 bg-gold/5 text-gold-700" },
  info: { icon: Info, cls: "border-primary/30 bg-primary/5 text-primary" },
} as const;

export function InsightCard({ insight }: { insight: AiInsight }) {
  const c = config[insight.severity];
  const Ic = c.icon;
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border", c.cls)}>
          <Ic className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground">{insight.headline}</h4>
            {insight.metricDelta && (
              <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold", c.cls)}>
                {insight.metricDelta}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{insight.detail}</p>
        </div>
      </div>
    </div>
  );
}
