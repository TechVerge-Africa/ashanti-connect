import type { Metadata } from "next";
import { Languages, Lightbulb, ShieldCheck, Zap } from "lucide-react";
import { AiChat } from "@/components/shared/ai-chat";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Ask the Ashanti Connect assistant anything about government services — in English or Twi.",
};

const points = [
  { icon: Languages, title: "Bilingual", desc: "Fluent in English and Twi." },
  { icon: Zap, title: "Instant answers", desc: "Service guidance in seconds." },
  { icon: Lightbulb, title: "Smart recommendations", desc: "Opportunities tailored to you." },
  { icon: ShieldCheck, title: "Private & secure", desc: "Your conversations stay protected." },
];

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Assistant"
        title="Your guide to government, available 24/7"
        description="Get instant help with services, reporting, opportunities, and regional information — a ChatGPT-like experience for civic life."
      />
      <section className="container grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <AiChat className="h-[600px]" />
        <div className="space-y-4">
          {points.map((p) => (
            <div key={p.title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-foreground">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            This assistant currently runs on a knowledge base of the platform. When connected to
            OpenAI with RAG over live regional data, it will answer from real-time reports,
            projects, and policies.
          </div>
        </div>
      </section>
    </>
  );
}
