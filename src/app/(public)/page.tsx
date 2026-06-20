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
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="A new model of governance"
            title="From one-way announcements to a two-way ecosystem"
            description="Government websites broadcast. Ashanti Connect creates a continuous loop where citizens are heard and government is accountable — every interaction tracked end to end."
          />
          <div className="mx-auto mt-8 sm:mt-10 md:mt-12 grid max-w-4xl items-center gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="border-dashed p-3 sm:p-4 md:p-6">
                <Badge variant="secondary" className="text-xs sm:text-xs">Old model</Badge>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 text-muted-foreground">
                  <span className="rounded-lg bg-secondary px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-medium text-xs sm:text-sm">Government</span>
                  <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 hidden sm:block" />
                  <ArrowRight className="h-4 w-4 sm:hidden rotate-90" />
                  <span className="rounded-lg bg-secondary px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-medium text-xs sm:text-sm">Citizens</span>
                </div>
                <p className="text-center text-xs sm:text-xs md:text-sm text-muted-foreground">
                  Information flows in one direction. No feedback, no accountability.
                </p>
              </Card>
            </Reveal>
            <Reveal index={1}>
              <Card className="border-primary/30 bg-primary/[0.03] p-3 sm:p-4 md:p-6 shadow-glow">
                <Badge variant="gold" className="text-xs sm:text-xs">Ashanti Connect</Badge>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6">
                  <span className="rounded-lg bg-primary px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-medium text-primary-foreground text-xs sm:text-sm">
                    Government
                  </span>
                  <div className="flex flex-row sm:flex-col text-primary gap-2 sm:gap-0">
                    <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 hidden sm:block" />
                    <ArrowRight className="h-4 w-4 sm:hidden rotate-90" />
                    <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 hidden sm:block rotate-180" />
                    <ArrowRight className="h-4 w-4 sm:hidden -rotate-90" />
                  </div>
                  <span className="rounded-lg bg-gold px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-medium text-gold-foreground text-xs sm:text-sm">
                    Citizens
                  </span>
                </div>
                <p className="text-center text-xs sm:text-xs md:text-sm text-foreground">
                  Continuous dialogue. Every action measurable, visible, and accountable.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-secondary/40 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Platform capabilities"
            title="Everything a region needs, in one civic OS"
            description="A complete toolkit for citizens, district assemblies, departments, and leadership — designed to scale to millions."
          />
          <div className="mt-8 sm:mt-10 md:mt-12 grid gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} index={i % 3}>
                <Card className="group h-full p-3 sm:p-4 md:p-5 lg:p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                  </span>
                  <h3 className="mt-2.5 sm:mt-3 md:mt-4 font-display text-base sm:text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-xs md:text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Every action triggers a measurable workflow"
          />
          <div className="mt-8 sm:mt-10 md:mt-12 grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} index={i}>
                <div className="relative">
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary/15">{s.n}</div>
                  <h3 className="-mt-2 sm:-mt-3 md:-mt-4 font-display text-base sm:text-lg md:text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-xs md:text-sm text-muted-foreground">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute right-0 top-5 hidden h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-border md:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments preview */}
      <section className="w-full bg-secondary/40 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <SectionHeading
              eyebrow="Departments"
              title="Connected to every service that matters"
            />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href="/departments">
                View all departments <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {departments.slice(0, 8).map((d, i) => (
              <Reveal key={d.id} index={i % 4}>
                <Link href={`/departments`}>
                  <Card className="h-full p-3 sm:p-4 md:p-5 transition-all hover:-translate-y-1 hover:shadow-card">
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gold/15 text-gold-700">
                      <Icon name={d.icon} className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                    </span>
                    <h3 className="mt-2 sm:mt-2.5 md:mt-3 text-xs sm:text-sm font-semibold">{d.name}</h3>
                    <p className="mt-0.5 sm:mt-1 text-xs text-muted-foreground">
                      {d.activeProjects} active · {d.resolutionRate}% resolved
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects transparency */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <SectionHeading
              eyebrow="Project transparency"
              title="Watch development happen in real time"
              description="Budgets, contractors, timelines, and completion — open for every citizen to see."
            />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href="/projects">
                All projects <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} index={i}>
                <Card className="flex h-full flex-col p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-xs">{categoryLabels[p.category]}</Badge>
                    <span className="text-xs text-muted-foreground truncate">{p.district}</span>
                  </div>
                  <h3 className="mt-2 sm:mt-2.5 md:mt-3 font-display text-sm sm:text-base font-semibold">{p.name}</h3>
                  <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                      <div className="font-semibold text-foreground text-xs sm:text-sm">{formatCurrency(p.budget)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Complete</div>
                      <div className="font-display text-lg sm:text-xl font-bold text-primary">{p.completion}%</div>
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-3 h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-gold-500"
                      style={{ width: `${p.completion}%` }}
                    />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI band */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-2xl md:rounded-3xl bg-primary px-4 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-14 text-primary-foreground">
            <div className="absolute -right-24 sm:-right-32 md:-right-40 lg:-right-48 -top-24 sm:-top-32 md:-top-40 lg:-top-48 h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-96 lg:w-96 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2">
              <div>
                <Badge variant="gold" className="bg-gold/20 text-gold-200 text-xs sm:text-xs">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> AI Layer
                </Badge>
                <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-balance">
                  Intelligence woven through every layer
                </h2>
                <p className="mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm md:text-base text-primary-100/85 leading-relaxed">
                  A bilingual assistant answers citizen questions instantly. Smart classification
                  routes reports automatically. Sentiment analysis measures satisfaction. And
                  executive intelligence turns it all into weekly insight.
                </p>
                <Button asChild size="sm" variant="gold" className="mt-4 sm:mt-5 md:mt-6 lg:mt-7">
                  <Link href="/assistant">
                    Try the AI Assistant <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-2">
                {[
                  { icon: Sparkles, t: "Citizen Assistant", d: "Instant answers in English & Twi" },
                  { icon: Workflow, t: "Smart Classification", d: "Category, location, priority" },
                  { icon: Bell, t: "Sentiment Analysis", d: "Real-time satisfaction signals" },
                  { icon: BarChart3, t: "Executive Intelligence", d: "Weekly trend summaries" },
                ].map((c) => (
                  <div key={c.t} className="rounded-lg sm:rounded-lg md:rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3 md:p-4 backdrop-blur">
                    <c.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-gold-300" />
                    <div className="mt-1.5 sm:mt-2 text-xs sm:text-xs md:text-sm font-semibold">{c.t}</div>
                    <div className="text-xs text-primary-100/70">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities preview */}
      <section className="w-full bg-secondary/40 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <SectionHeading eyebrow="Opportunity hub" title="Opportunities that change lives" />
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href="/opportunities">
                Explore all <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 md:grid-cols-3">
            {opportunities.filter((o) => o.featured).concat(opportunities[2]).slice(0, 3).map((o, i) => (
              <Reveal key={o.id} index={i}>
                <Card className="flex h-full flex-col p-3 sm:p-4 md:p-5 lg:p-6">
                  <Badge variant="gold" className="text-xs w-fit">{o.type}</Badge>
                  <h3 className="mt-2 sm:mt-2.5 md:mt-3 font-display text-sm sm:text-base font-semibold">{o.title}</h3>
                  <p className="mt-1.5 sm:mt-2 flex-1 text-xs sm:text-xs md:text-sm text-muted-foreground">{o.description}</p>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" /> {o.location}
                    </span>
                    <span className="flex-shrink-0">{compactNumber(o.applicants)} applied</span>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workspaces */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Built for everyone"
            title="One platform, three powerful workspaces"
          />
          <div className="mt-8 sm:mt-10 md:mt-12 grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
            {workspaces.map((w, i) => (
              <Reveal key={w.title} index={i}>
                <Link href={w.href}>
                  <Card className="group h-full overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lifted">
                    <div className={`bg-gradient-to-br ${w.color} p-4 sm:p-5 md:p-6 text-white`}>
                      <w.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                      <h3 className="mt-2.5 sm:mt-3 md:mt-4 font-display text-lg sm:text-lg md:text-xl font-bold">{w.title}</h3>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <p className="text-xs sm:text-xs md:text-sm text-muted-foreground">{w.desc}</p>
                      <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-xs md:text-sm font-semibold text-primary">
                        Enter workspace <ArrowRight className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-18 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-2xl md:rounded-3xl border border-border bg-gradient-to-br from-primary-50 to-gold-50 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-14 text-center">
            <div className="mx-auto max-w-2xl">
              <ShieldCheck className="mx-auto h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-primary" />
              <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                Be part of a smarter Ashanti Region
              </h2>
              <p className="mt-2.5 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-muted-foreground">
                Join millions of citizens building a more transparent, accountable, and responsive
                region — one report at a time.
              </p>
              <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col justify-center gap-2 sm:gap-3 sm:flex-row">
                <Button asChild size="sm" className="sm:size-md">
                  <Link href="/portal">
                    Enter Citizen Portal <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="sm:size-md">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
