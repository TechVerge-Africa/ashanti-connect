import Link from "next/link";
import {
  ArrowRight, Building2, Gauge, MessagesSquare, Sparkles,
  User, BarChart3, ShieldCheck, Languages, Bell, MapPin,
  Workflow, CheckCircle2, TrendingUp, FileText, Clock,
} from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon";
import { departments, opportunities, projects } from "@/lib/data";
import { categoryLabels } from "@/lib/constants";
import { compactNumber, formatCurrency } from "@/lib/utils";

const features = [
  { icon: User, title: "Report & be heard", desc: "Submit issues with photos, video, and GPS in under a minute. Every report gets a tracking number.", size: "lg" },
  { icon: Workflow, title: "Automatic routing", desc: "AI classifies and routes each issue to the right department with the right priority — instantly.", size: "sm" },
  { icon: MessagesSquare, title: "Two-way conversations", desc: "Every issue becomes a dialogue between citizens and officers, with full history kept visible.", size: "sm" },
  { icon: BarChart3, title: "Radical transparency", desc: "Track budgets, contractors, timelines, and completion rates on every regional project.", size: "sm" },
  { icon: Languages, title: "Built for everyone", desc: "Mobile-first, accessible, and multilingual — fully usable in English and Twi.", size: "sm" },
  { icon: Gauge, title: "Data-driven leadership", desc: "Executive dashboards turn millions of signals into clear, actionable decisions.", size: "lg" },
];

const steps = [
  { n: "01", title: "Report", desc: "A citizen reports a damaged road with a photo and location.", icon: FileText },
  { n: "02", title: "Route", desc: "AI triage assigns it to Roads & Highways with high priority.", icon: Workflow },
  { n: "03", title: "Resolve", desc: "The officer schedules an inspection and updates progress.", icon: CheckCircle2 },
  { n: "04", title: "Reflect", desc: "Leadership sees the trend and reallocates crews where needed.", icon: TrendingUp },
];

const workspaces = [
  { icon: User, title: "Citizens", href: "/portal", desc: "Report issues, track responses, access opportunities, and join the conversation.", accent: "from-primary/20 via-primary/10 to-transparent", border: "border-primary/20", glow: "hover:shadow-glow-emerald" },
  { icon: Building2, title: "Government Operations", href: "/gov", desc: "Manage, assign, escalate, and resolve citizen issues with full accountability.", accent: "from-gold-500/20 via-gold-500/10 to-transparent", border: "border-gold-500/20", glow: "hover:shadow-glow-gold" },
  { icon: Gauge, title: "Regional Leadership", href: "/executive", desc: "Monitor regional health, district performance, and AI-generated intelligence.", accent: "from-blue-500/20 via-blue-500/10 to-transparent", border: "border-blue-500/20", glow: "" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ─── Two-way model ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="A new model of governance"
            title="From one-way announcements to a two-way ecosystem"
            description="Government websites broadcast. Ashanti Connect creates a continuous loop where citizens are heard and government is accountable — every interaction tracked end to end."
          />
          <div className="mx-auto mt-10 grid max-w-4xl items-center gap-4 md:grid-cols-2">
            <Reveal>
              <div className="glass-card rounded-2xl border border-white/[0.07] p-6">
                <Badge variant="secondary" className="text-xs opacity-70">Old model</Badge>
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 text-muted-foreground">
                  <span className="rounded-xl bg-secondary/60 border border-white/[0.06] px-4 py-2 text-sm font-medium">Government</span>
                  <div className="flex flex-col sm:flex-row items-center gap-1 text-border">
                    <ArrowRight className="h-5 w-5 hidden sm:block" />
                    <ArrowRight className="h-5 w-5 sm:hidden rotate-90" />
                  </div>
                  <span className="rounded-xl bg-secondary/60 border border-white/[0.06] px-4 py-2 text-sm font-medium">Citizens</span>
                </div>
                <p className="text-center text-xs text-muted-foreground/70">Information flows in one direction. No feedback, no accountability.</p>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="glass-card rounded-2xl border border-primary/25 p-6 shadow-glow-emerald relative overflow-hidden">
                {/* Subtle glow accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="relative">
                  <Badge variant="gold" className="text-xs">Ashanti Connect</Badge>
                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
                    <span className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow-sm">Government</span>
                    <div className="flex flex-col sm:flex-row items-center gap-1 text-primary">
                      <ArrowRight className="h-5 w-5 hidden sm:block" />
                      <ArrowRight className="h-5 w-5 rotate-180 hidden sm:block" />
                      <ArrowRight className="h-5 w-5 sm:hidden rotate-90" />
                      <ArrowRight className="h-5 w-5 sm:hidden -rotate-90" />
                    </div>
                    <span className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-gold-foreground">Citizens</span>
                  </div>
                  <p className="text-center text-sm text-foreground/80">Continuous dialogue. Every action measurable, visible, and accountable.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Features — Bento Grid ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-secondary/30 kente-texture" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Platform capabilities"
            title="Everything a region needs, in one civic OS"
            description="A complete toolkit for citizens, district assemblies, departments, and leadership — designed to scale to millions."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} index={i % 3}>
                <div className="group glass-card rounded-2xl border border-white/[0.07] p-5 sm:p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-primary/20 cursor-default">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow-sm">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Every action triggers a measurable workflow"
          />
          <div className="mt-12 relative">
            {/* Connector line — desktop */}
            <div className="absolute hidden md:block top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} index={i}>
                  <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Step number circle */}
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl glass-card border border-white/[0.08] mb-4 group">
                      <span className="font-display text-2xl font-extrabold text-primary/40 group-hover:text-primary transition-colors duration-300">{s.n}</span>
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "var(--glow-sm-emerald)" }} />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Departments ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 kente-texture" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading eyebrow="Departments" title="Connected to every service that matters" />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-white/[0.1] hover:border-primary/30 hover:bg-primary/5">
              <Link href="/departments">
                View all departments <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {departments.slice(0, 8).map((d, i) => (
              <Reveal key={d.id} index={i % 4}>
                <Link href="/departments" className="block">
                  <div className="group glass-card rounded-2xl border border-white/[0.07] p-4 sm:p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/25 hover:shadow-glow-gold cursor-pointer">
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 transition-all duration-200 group-hover:bg-gold-500/20">
                      <Icon name={d.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground font-display">{d.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {d.activeProjects} active · {d.resolutionRate}% resolved
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Project transparency"
              title="Watch development happen in real time"
              description="Budgets, contractors, timelines, and completion — open for every citizen to see."
            />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-white/[0.1] hover:border-primary/30 hover:bg-primary/5">
              <Link href="/projects">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} index={i}>
                <div className="group glass-card rounded-2xl border border-white/[0.07] p-5 sm:p-6 flex flex-col h-full hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-xs border-white/[0.1] text-muted-foreground">{categoryLabels[p.category]}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />{p.district}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">{p.name}</h3>
                  <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-2 mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Budget</div>
                        <div className="text-sm font-semibold text-foreground">{formatCurrency(p.budget)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-0.5">Complete</div>
                        <div className="font-display text-2xl font-extrabold text-primary">{p.completion}%</div>
                      </div>
                    </div>
                    {/* Animated shimmer progress bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
                      <div
                        className="h-full rounded-full shimmer transition-all duration-1000"
                        style={{
                          width: `${p.completion}%`,
                          background: "linear-gradient(90deg, hsl(162 72% 46%), hsl(38 92% 50%))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Band ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-1">
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, hsl(162 72% 46% / 0.3) 0%, transparent 40%, hsl(38 92% 50% / 0.2) 100%)" }} aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[20px] bg-[hsl(160_40%_5%)] kente-texture px-6 sm:px-10 md:px-12 py-10 sm:py-12 lg:py-14">
              {/* Ambient orbs inside the band */}
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full ambient-orb-gold opacity-30 pointer-events-none" aria-hidden="true" />
              <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full ambient-orb-emerald opacity-20 pointer-events-none" aria-hidden="true" />

              <div className="relative grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
                    <Sparkles className="h-3.5 w-3.5" /> AI Layer
                  </span>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance leading-tight">
                    Intelligence woven through every layer
                  </h2>
                  <p className="mt-4 max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
                    A bilingual assistant answers citizen questions instantly. Smart classification routes reports automatically. Sentiment analysis measures satisfaction. And executive intelligence turns it all into weekly insight.
                  </p>
                  <Link
                    href="/assistant"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-all duration-200 hover:bg-gold/90 shadow-glow-gold cursor-pointer"
                  >
                    Try the AI Assistant <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-3 grid-cols-2">
                  {[
                    { icon: Sparkles, t: "Citizen Assistant", d: "Instant answers in English & Twi" },
                    { icon: Workflow, t: "Smart Classification", d: "Category, location, priority" },
                    { icon: Bell, t: "Sentiment Analysis", d: "Real-time satisfaction signals" },
                    { icon: BarChart3, t: "Executive Intelligence", d: "Weekly trend summaries" },
                  ].map((c) => (
                    <div key={c.t} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-sm hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-200">
                      <c.icon className="h-5 w-5 text-gold-400" />
                      <div className="mt-2.5 text-sm font-semibold text-foreground font-display">{c.t}</div>
                      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Opportunities ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 kente-texture" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading eyebrow="Opportunity hub" title="Opportunities that change lives" />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-white/[0.1] hover:border-primary/30 hover:bg-primary/5">
              <Link href="/opportunities">
                Explore all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-3">
            {opportunities.filter((o) => o.featured).concat(opportunities[2]).slice(0, 3).map((o, i) => (
              <Reveal key={o.id} index={i}>
                <div className="group glass-card rounded-2xl border border-white/[0.07] p-5 sm:p-6 flex flex-col h-full hover:border-gold-500/20 hover:shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5">
                  <Badge variant="gold" className="text-xs w-fit">{o.type}</Badge>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{o.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-white/[0.05] pt-4">
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary/60" /> {o.location}
                    </span>
                    <span className="flex-shrink-0 font-medium text-foreground/70">{compactNumber(o.applicants)} applied</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Workspaces ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Built for everyone"
            title="One platform, three powerful workspaces"
          />
          <div className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-3">
            {workspaces.map((w, i) => (
              <Reveal key={w.title} index={i}>
                <Link href={w.href} className="block h-full">
                  <div className={`group glass-card rounded-2xl border ${w.border} h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 ${w.glow} cursor-pointer`}>
                    {/* Gradient header */}
                    <div className={`relative bg-gradient-to-br ${w.accent} p-5 pb-8`}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] border border-white/[0.1]">
                        <w.icon className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-foreground">{w.title}</h3>
                    </div>
                    {/* Content */}
                    <div className="p-5 -mt-4">
                      <div className="rounded-xl bg-background/40 border border-white/[0.06] p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                        Enter workspace <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-1">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, hsl(162 72% 46% / 0.25) 0%, transparent 50%, hsl(38 92% 50% / 0.15) 100%)" }} aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-background via-secondary/30 to-background text-center px-6 sm:px-10 py-12 sm:py-16 lg:py-20">
              {/* Mesh bg */}
              <div className="absolute inset-0 bg-mesh-emerald opacity-60 pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 kente-texture opacity-50 pointer-events-none" aria-hidden="true" />

              <div className="relative mx-auto max-w-2xl">
                {/* Animated shield icon */}
                <div className="relative inline-flex mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-ring" aria-hidden="true" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-foreground">
                  Be part of a smarter{" "}
                  <span className="gradient-text">Ashanti Region</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Join millions of citizens building a more transparent, accountable, and responsive region — one report at a time.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/portal"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 shadow-glow-emerald cursor-pointer"
                  >
                    Enter Citizen Portal <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.18] cursor-pointer"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
