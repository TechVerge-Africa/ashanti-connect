"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, initials, relativeTime } from "@/lib/utils";
import type { ConversationMessage } from "@/lib/types";

export function Conversation({
  messages,
  as,
}: {
  messages: ConversationMessage[];
  as: "citizen" | "officer";
}) {
  const [thread, setThread] = React.useState(messages);
  const [text, setText] = React.useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    setThread((t) => [
      ...t,
      {
        id: Math.random().toString(36).slice(2),
        author: as === "citizen" ? "You" : "You (Officer)",
        role: as,
        body,
        timestamp: new Date().toISOString(),
      },
    ]);
    setText("");
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {thread.map((m) => {
          const mine = m.role === as;
          return (
            <div key={m.id} className={cn("flex gap-3", mine && "flex-row-reverse")}>
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className={cn(
                    m.role === "officer" ? "bg-gold/15 text-gold-700" : "bg-primary/10 text-primary",
                  )}
                >
                  {initials(m.author)}
                </AvatarFallback>
              </Avatar>
              <div className={cn("max-w-[75%]", mine && "text-right")}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{m.author}</span>
                  {m.role === "officer" && (
                    <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-700">
                      OFFICIAL
                    </span>
                  )}
                  <span>{relativeTime(m.timestamp)}</span>
                </div>
                <div
                  className={cn(
                    "mt-1 inline-block rounded-2xl px-3.5 py-2.5 text-sm",
                    mine
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "rounded-tl-sm bg-secondary text-foreground",
                  )}
                >
                  {m.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={send} className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={as === "citizen" ? "Write a message…" : "Reply to citizen…"}
        />
        <Button type="submit" size="icon" disabled={!text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
