"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4.9M+", label: "Citizens served" },
  { value: "43", label: "Districts connected" },
  { value: "81%", label: "Issues resolved" },
  { value: "5.4d", label: "Avg. response" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 via-background to-background" />
      <div className="absolute inset-0 -z-10 bg-kente-grid bg-[size:44px_44px] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />

      <div className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-600" />
            A smarter Ashanti Region, powered by digital innovation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            The digital <span className="gradient-text">operating system</span> for citizens &
            government
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Report issues, track government responses, access opportunities, and shape decisions —
            all in one trusted platform. Every citizen action triggers a measurable workflow. Every
            government action is visible and accountable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/portal/report">
                Report an Issue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portal/track">Track a Report</Link>
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> Secure & private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" /> English & Twi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> All 43 districts
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <HeroCard />
        </motion.div>
      </div>

      <div className="border-y border-border bg-card/60">
        <div className="container grid grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-6 text-center">
              <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 hidden rounded-xl border border-border bg-card p-3 shadow-card sm:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div className="text-xs">
            <div className="font-semibold text-foreground">Report resolved</div>
            <div className="text-muted-foreground">Streetlights restored</div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lifted">
        <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
          <div>
            <div className="text-xs uppercase tracking-wide text-primary-foreground/70">Tracking</div>
            <div className="font-display text-lg font-bold">ASH-2026-04821</div>
          </div>
          <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold-200">
            In Progress
          </span>
        </div>
        <div className="space-y-4 p-5">
          <div>
            <div className="text-sm font-semibold text-foreground">
              Pothole cluster on Sofoline road
            </div>
            <div className="text-xs text-muted-foreground">Roads &amp; Highways · Kumasi Metro</div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-gold-500" />
          </div>
          <ul className="space-y-3">
            {[
              { t: "Submitted", d: "2 Jun", done: true },
              { t: "Assigned to Roads & Highways", d: "2 Jun", done: true },
              { t: "Inspection completed", d: "8 Jun", done: true },
              { t: "Resurfacing in progress", d: "Now", done: false },
            ].map((step) => (
              <li key={step.t} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    step.done ? "bg-primary text-primary-foreground" : "border-2 border-gold-500 text-gold-600"
                  }`}
                >
                  {step.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />}
                </span>
                <span className="flex-1 text-foreground">{step.t}</span>
                <span className="text-xs text-muted-foreground">{step.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
