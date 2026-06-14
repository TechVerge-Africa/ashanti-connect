import Link from "next/link";
import { MapPin, MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import {
  categoryIcons,
  categoryLabels,
  priorityLabels,
  priorityVariant,
  statusLabels,
  statusVariant,
} from "@/lib/constants";
import { cn, relativeTime } from "@/lib/utils";
import type { Report } from "@/lib/types";

export function StatusBadge({ status }: { status: Report["status"] }) {
  return <Badge variant={statusVariant[status]}>{statusLabels[status]}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Report["priority"] }) {
  return <Badge variant={priorityVariant[priority]}>{priorityLabels[priority]}</Badge>;
}

export function ReportTimeline({ report }: { report: Report }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {report.timeline.map((e, i) => {
        const last = i === report.timeline.length - 1;
        return (
          <li key={e.id} className="relative">
            <span
              className={cn(
                "absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-card",
                last ? "bg-gold-500" : "bg-primary",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={e.status} />
              <span className="text-xs text-muted-foreground">{relativeTime(e.timestamp)}</span>
            </div>
            <div className="mt-1.5 font-medium text-foreground">{e.title}</div>
            <p className="text-sm text-muted-foreground">{e.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">by {e.actor}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function ReportRow({ report, hrefBase }: { report: Report; hrefBase: string }) {
  return (
    <Link
      href={`${hrefBase}/${report.id}`}
      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={categoryIcons[report.category]} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{report.trackingNumber}</span>
          <StatusBadge status={report.status} />
          <PriorityBadge priority={report.priority} />
        </div>
        <h3 className="mt-1 truncate font-semibold text-foreground">{report.title}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{categoryLabels[report.category]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {report.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" /> {report.upvotes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" /> {report.conversation.length}
          </span>
          <span>{relativeTime(report.updatedAt)}</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-gold-500"
            style={{ width: `${report.progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
