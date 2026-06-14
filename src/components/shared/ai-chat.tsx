"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { generateAssistantReply, newMessage, starterPrompts } from "@/lib/ai";
import type { ChatMessage } from "@/lib/types";

export function AiChat({ className }: { className?: string }) {
  const [lang, setLang] = React.useState<"en" | "tw">("en");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    newMessage(
      "assistant",
      "Akwaaba! 👋 I'm your Ashanti Connect assistant. Ask me anything about government services, reporting issues, opportunities, or projects — in English or Twi.",
    ),
  ]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>(starterPrompts);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, newMessage("user", q)]);
    setInput("");
    setTyping(true);
    setSuggestions([]);
    setTimeout(() => {
      const reply = generateAssistantReply(q, lang);
      setMessages((m) => [...m, newMessage("assistant", reply.content)]);
      setSuggestions(reply.suggestions);
      setTyping(false);
    }, 750);
  };

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card", className)}>
      <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Sparkles className="h-4 w-4 text-gold-300" />
          </span>
          <div>
            <div className="text-sm font-semibold">Ashanti Assistant</div>
            <div className="flex items-center gap-1 text-xs text-primary-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · Bilingual
            </div>
          </div>
        </div>
        <div className="flex rounded-lg bg-white/10 p-0.5 text-xs font-medium">
          {(["en", "tw"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                lang === l ? "bg-white text-primary" : "text-primary-foreground/80",
              )}
            >
              {l === "en" ? "EN" : "TW"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-2.5", m.role === "user" && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  m.role === "user" ? "bg-gold/15 text-gold-700" : "bg-primary/10 text-primary",
                )}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </span>
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-secondary text-foreground",
                )}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === "en" ? "Ask anything…" : "Bisa biribiara…"}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || typing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
