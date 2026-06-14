"use client";

import { Check, TriangleAlert, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function OfficerActions({ tracking }: { tracking: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Assigned to you", { description: tracking })}
      >
        <UserPlus className="h-4 w-4" /> Assign
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.warning("Escalated", { description: `${tracking} sent to RCC` })}
      >
        <TriangleAlert className="h-4 w-4" /> Escalate
      </Button>
      <Button size="sm" onClick={() => toast.success("Marked resolved", { description: tracking })}>
        <Check className="h-4 w-4" /> Resolve
      </Button>
    </div>
  );
}
