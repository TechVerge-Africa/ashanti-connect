import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  delta,
  goodWhen,
  hint,
  accent = "primary",
}: {
  label: string;
  value: React.ReactNode;
  icon?: string;
  delta?: number;
  goodWhen?: "up" | "down";
  hint?: string;
  accent?: "primary" | "gold";
}) {
  const positive =
    delta === undefined
      ? undefined
      : goodWhen === "down"
        ? delta < 0
        : delta > 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && (
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              accent === "gold" ? "bg-gold/15 text-gold-700" : "bg-primary/10 text-primary",
            )}
          >
            <Icon name={icon} className="h-[18px] w-[18px]" />
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-success" : "text-destructive",
            )}
          >
            {delta > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  );
}
