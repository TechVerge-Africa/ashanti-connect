"use client";

import * as React from "react";
import { MessageSquare, Radio, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, initials, relativeTime } from "@/lib/utils";
import type { PollOption, TownHallTopic } from "@/lib/types";

const statusConfig: Record<TownHallTopic["status"], { label: string; variant: "info" | "success" | "warning" }> = {
  open: { label: "Open for input", variant: "info" },
  answered: { label: "Answered", variant: "success" },
  scheduled: { label: "Live session", variant: "warning" },
};

export function TownHall({ topics }: { topics: TownHallTopic[] }) {
  return (
    <div className="space-y-5">
      {topics.map((t) => (
        <TopicCard key={t.id} topic={t} />
      ))}
    </div>
  );
}

function TopicCard({ topic }: { topic: TownHallTopic }) {
  const [upvotes, setUpvotes] = React.useState(topic.upvotes);
  const [voted, setVoted] = React.useState(false);
  const status = statusConfig[topic.status];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{topic.category}</Badge>
            <Badge variant={status.variant}>
              {topic.status === "scheduled" && <Radio className="h-3 w-3" />} {status.label}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{relativeTime(topic.createdAt)}</span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold">{topic.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>

        {topic.poll && <Poll poll={topic.poll} />}

        {topic.officialResponse && (
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.03] p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gold/15 text-gold-700">
                  {initials(topic.officialResponse.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {topic.officialResponse.author}
                  <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-700">
                    OFFICIAL
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{topic.officialResponse.role}</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground">{topic.officialResponse.body}</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <Button
            size="sm"
            variant={voted ? "default" : "outline"}
            onClick={() => {
              setUpvotes((u) => (voted ? u - 1 : u + 1));
              setVoted((v) => !v);
            }}
          >
            <ThumbsUp className="h-4 w-4" /> {upvotes}
          </Button>
          <Button size="sm" variant="ghost">
            <MessageSquare className="h-4 w-4" /> {topic.comments} comments
          </Button>
          {topic.status === "scheduled" && (
            <Button size="sm" variant="gold" className="ml-auto">
              Join live session
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Poll({ poll }: { poll: NonNullable<TownHallTopic["poll"]> }) {
  const [voted, setVoted] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<PollOption[]>(poll.options);
  const total = options.reduce((s, o) => s + o.votes, 0);

  const vote = (id: string) => {
    if (voted) return;
    setOptions((opts) => opts.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o)));
    setVoted(id);
  };

  return (
    <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
      <div className="text-sm font-medium text-foreground">{poll.question}</div>
      <div className="mt-3 space-y-2">
        {options.map((o) => {
          const pct = total ? Math.round((o.votes / total) * 100) : 0;
          const isChoice = voted === o.id;
          return (
            <button
              key={o.id}
              onClick={() => vote(o.id)}
              disabled={!!voted}
              className={cn(
                "relative w-full overflow-hidden rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                isChoice ? "border-primary" : "border-border",
                !voted && "hover:border-primary/50",
              )}
            >
              {voted && (
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 -z-0",
                    isChoice ? "bg-primary/15" : "bg-secondary",
                  )}
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between">
                <span className={cn("font-medium", isChoice && "text-primary")}>{o.label}</span>
                {voted && <span className="text-xs text-muted-foreground">{pct}%</span>}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {voted ? `${total.toLocaleString()} votes · thank you for voting` : `${total.toLocaleString()} votes · tap to vote`}
      </div>
    </div>
  );
}
