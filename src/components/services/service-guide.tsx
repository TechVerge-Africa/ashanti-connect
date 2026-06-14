"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatCurrency } from "@/lib/utils";
import type { ChatMessage, Service } from "@/lib/types";

let idCounter = 0;
const mk = (role: ChatMessage["role"], content: string): ChatMessage => ({
  id: `g-${++idCounter}`,
  role,
  content,
});

function answerFor(service: Service, question: string): string {
  const q = question.toLowerCase();

  const faq = service.faqs.find((f) => {
    const words = f.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    return words.some((w) => q.includes(w));
  });
  if (faq) return faq.answer;

  if (/(cost|fee|price|much|pay)/.test(q)) {
    return service.fees
      .map((f) => `• ${f.label}: ${f.amount === 0 ? "Free" : formatCurrency(f.amount)}${f.note ? ` (${f.note})` : ""}`)
      .join("\n");
  }
  if (/(document|need|bring|require|carry)/.test(q)) {
    return `You'll need:\n${service.requiredDocuments.map((d) => `• ${d}`).join("\n")}`;
  }
  if (/(how long|time|days|when|fast|duration)/.test(q)) {
    return `Processing time: ${service.processingTime}.`;
  }
  if (/(where|office|location|centre|center)/.test(q)) {
    return `You can access this at:\n${service.offices.map((o) => `• ${o}`).join("\n")}`;
  }
  if (/(step|how do|how to|process|apply|start)/.test(q)) {
    return service.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.description}`).join("\n");
  }
  return `${service.tagline} For "${service.name}", I can help with fees, required documents, processing time, offices, and the application steps. Try asking one of the suggested questions.`;
}

export function ServiceGuide({ service }: { service: Service }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    mk("assistant", `Akwaaba! 👋 Ask me anything about ${service.name} — fees, documents, processing time, or how to apply.`),
  ]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  const suggestions = [
    "What documents do I need?",
    "How much does it cost?",
    "How long does it take?",
    "What are the steps?",
  ];

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, mk("user", q)]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, mk("assistant", answerFor(service, q))]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="flex h-[440px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center gap-2.5 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
          <Sparkles className="h-4 w-4 text-gold-300" />
        </span>
        <div>
          <div className="text-sm font-semibold">AI Service Guide</div>
          <div className="flex items-center gap-1 text-xs text-primary-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> {service.name}
          </div>
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
                  "max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
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

      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {s}
          </button>
        ))}
      </div>

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
          placeholder={`Ask about ${service.name}…`}
        />
        <Button type="submit" size="icon" disabled={!input.trim() || typing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
