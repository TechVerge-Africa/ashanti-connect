import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Gauge,
  MessagesSquare,
  Sparkles,
  User,
  BarChart3,
  ShieldCheck,
  Languages,
  Bell,
  MapPin,
  Workflow,
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
  { icon: User, title: "Report & be heard", desc: "Submit issues with photos, video, and GPS in under a minute. Every report gets a tracking number." },
  { icon: Workflow, title: "Automatic routing", desc: "AI classifies and routes each issue to the right department with the right priority — instantly." },
  { icon: MessagesSquare, title: "Two-way conversations", desc: "Every issue becomes a dialogue between citizens and officers, with full history kept visible." },
  { icon: BarChart3, title: "Radical transparency", desc: "Track budgets, contractors, timelines, and completion rates on every regional project." },
  { icon: Languages, title: "Built for everyone", desc: "Mobile-first, accessible, and multilingual — fully usable in English and Twi." },
  { icon: Gauge, title: "Data-driven leadership", desc: "Executive dashboards turn millions of signals into clear, actionable decisions." },
];

const steps = [
  { n: "01", title: "Report", desc: "A citizen reports a damaged road with a photo and location." },
  { n: "02", title: "Route", desc: "AI triage assigns it to Roads & Highways with high priority." },
  { n: "03", title: "Resolve", desc: "The officer schedules an inspection and updates progress." },
  { n: "04", title: "Reflect", desc: "Leadership sees the trend and reallocates crews where needed." },
];

const workspaces = [
  { icon: User, title: "Citizens", href: "/portal", desc: "Report issues, track responses, access opportunities, and join the conversation.", color: "from-primary-500 to-primary-700" },
  { icon: Building2, title: "Government Operations", href: "/gov", desc: "Manage, assign, escalate, and resolve citizen issues with full accountability.", color: "from-gold-500 to-gold-700" },
  { icon: Gauge, title: "Regional Leadership", href: "/executive", desc: "Monitor regional health, district performance, and AI-generated intelligence.", color: "from-primary-700 to-primary-900" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Two-way model */}
      <section className="container py-20">
        <SectionHeading
          align="center"
          eyebrow="A new model of governance"
          title="From one-way announcements to a two-way ecosystem"
          description="Government websites broadcast. Ashanti Connect creates a continuous loop where citizens are heard and government is accountable — every interaction tracked end to end."
        />
        <div className="mx-auto mt-12 grid max-w-4xl items-center gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="border-dashed p-6">
              <Badge variant="secondary">Old model</Badge>
              <div className="mt-4 flex items-center justify-center gap-3 py-6 text-muted-foreground">
                <span className="rounded-lg bg-secondary px-4 py-2 font-medium">Government</span>
                <ArrowRight className="h-5 w-5" />
                <span className="rounded-lg bg-secondary px-4 py-2 font-medium">Citizens</span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Information flows in one direction. No feedback, no accountability.
              </p>
            </Card>
          </Reveal>
          <Reveal index={1}>
            <Card className="border-primary/30 bg-primary/[0.03] p-6 shadow-glow">
              <Badge variant="gold">Ashanti Connect</Badge>
              <div className="mt-4 flex items-center justify-center gap-3 py-6">
                <span className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">
                  Government
                </span>
                <div className="flex flex-col text-primary">
                  <ArrowRight className="h-5 w-5" />
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </div>
                <span className="rounded-lg bg-gold px-4 py-2 font-medium text-gold-foreground">
                  Citizens
                </span>
              </div>
              <p className="text-center text-sm text-foreground">
                Continuous dialogue. Every action measurable, visible, and accountable.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Platform capabilities"
            title="Everything a region needs, in one civic OS"
            description="A complete toolkit for citizens, district assemblies, departments, and leadership — designed to scale to millions."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} index={i % 3}>
                <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Every action triggers a measurable workflow"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i}>
              <div className="relative">
                <div className="font-display text-5xl font-extrabold text-primary/15">{s.n}</div>
                <h3 className="-mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute right-0 top-6 hidden h-5 w-5 text-border md:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Departments preview */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Departments"
              title="Connected to every service that matters"
            />
            <Button asChild variant="outline">
              <Link href="/departments">
                View all departments <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.slice(0, 8).map((d, i) => (
              <Reveal key={d.id} index={i % 4}>
                <Link href={`/departments`}>
                  <Card className="h-full p-5 transition-all hover:-translate-y-1 hover:shadow-card">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold-700">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold">{d.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {d.activeProjects} active projects · {d.resolutionRate}% resolved
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects transparency */}
      <section className="container py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Project transparency"
            title="Watch development happen in real time"
            description="Budgets, contractors, timelines, and completion — open for every citizen to see."
          />
          <Button asChild variant="outline">
            <Link href="/projects">
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} index={i}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{categoryLabels[p.category]}</Badge>
                  <span className="text-xs text-muted-foreground">{p.district}</span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{p.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                    <div className="font-semibold text-foreground">{formatCurrency(p.budget)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Complete</div>
                    <div className="font-display text-xl font-bold text-primary">{p.completion}%</div>
                  </div>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-gold-500"
                    style={{ width: `${p.completion}%` }}
                  />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI band */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge variant="gold" className="bg-gold/20 text-gold-200">
                  <Sparkles className="h-3.5 w-3.5" /> AI Layer
                </Badge>
                <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
                  Intelligence woven through every layer
                </h2>
                <p className="mt-4 max-w-lg text-primary-100/85">
                  A bilingual assistant answers citizen questions instantly. Smart classification
                  routes reports automatically. Sentiment analysis measures satisfaction. And
                  executive intelligence turns it all into weekly insight.
                </p>
                <Button asChild size="lg" variant="gold" className="mt-7">
                  <Link href="/assistant">
                    Try the AI Assistant <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Sparkles, t: "Citizen Assistant", d: "Instant answers in English & Twi" },
                  { icon: Workflow, t: "Smart Classification", d: "Category, location, priority" },
                  { icon: Bell, t: "Sentiment Analysis", d: "Real-time satisfaction signals" },
                  { icon: BarChart3, t: "Executive Intelligence", d: "Weekly trend summaries" },
                ].map((c) => (
                  <div key={c.t} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <c.icon className="h-5 w-5 text-gold-300" />
                    <div className="mt-2 text-sm font-semibold">{c.t}</div>
                    <div className="text-xs text-primary-100/70">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities preview */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Opportunity hub" title="Opportunities that change lives" />
            <Button asChild variant="outline">
              <Link href="/opportunities">
                Explore all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {opportunities.filter((o) => o.featured).concat(opportunities[2]).slice(0, 3).map((o, i) => (
              <Reveal key={o.id} index={i}>
                <Card className="flex h-full flex-col p-6">
                  <Badge variant="gold">{o.type}</Badge>
                  <h3 className="mt-3 font-display text-base font-semibold">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {o.location}
                    </span>
                    <span>{compactNumber(o.applicants)} applied</span>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workspaces */}
      <section className="container py-20">
        <SectionHeading
          align="center"
          eyebrow="Built for everyone"
          title="One platform, three powerful workspaces"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {workspaces.map((w, i) => (
            <Reveal key={w.title} index={i}>
              <Link href={w.href}>
                <Card className="group h-full overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lifted">
                  <div className={`bg-gradient-to-br ${w.color} p-6 text-white`}>
                    <w.icon className="h-8 w-8" />
                    <h3 className="mt-4 font-display text-xl font-bold">{w.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Enter workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-50 to-gold-50 px-6 py-14 text-center">
          <div className="mx-auto max-w-2xl">
            <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Be part of a smarter Ashanti Region
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join millions of citizens building a more transparent, accountable, and responsive
              region — one report at a time.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/portal">
                  Enter Citizen Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
