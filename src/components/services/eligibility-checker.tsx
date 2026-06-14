"use client";

import * as React from "react";
import { CheckCircle2, Circle, PartyPopper, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EligibilityCriterion } from "@/lib/types";

export function EligibilityChecker({ criteria }: { criteria: EligibilityCriterion[] }) {
  const [checked, setChecked] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setChecked((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allMet = criteria.every((c) => checked.has(c.id));
  const someMet = checked.size > 0;

  return (
    <div>
      <ul className="space-y-2">
        {criteria.map((c) => {
          const isChecked = checked.has(c.id);
          return (
            <li key={c.id}>
              <button
                onClick={() => toggle(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                  isChecked
                    ? "border-primary/40 bg-primary/5 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40",
                )}
              >
                {isChecked ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                )}
                {c.label}
              </button>
            </li>
          );
        })}
      </ul>

      {someMet && (
        <div
          className={cn(
            "mt-4 flex items-start gap-2.5 rounded-lg border p-3 text-sm",
            allMet
              ? "border-success/30 bg-success/10 text-success"
              : "border-gold/40 bg-gold/10 text-gold-700",
          )}
        >
          {allMet ? (
            <PartyPopper className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <p>
            {allMet
              ? "You meet all the requirements. You're ready to apply."
              : "Tick every box above to confirm you're eligible before applying."}
          </p>
        </div>
      )}

      <Button className="mt-4 w-full" disabled={!allMet}>
        {allMet ? "Start application" : "Confirm eligibility to continue"}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Application flow is coming in the next release.
      </p>
    </div>
  );
}
