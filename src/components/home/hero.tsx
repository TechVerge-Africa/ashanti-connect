"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const stats = [
  { value: "4.9M+", label: "Citizens served" },
  { value: "43", label: "Districts connected" },
  { value: "81%", label: "Issues resolved" },
  { value: "5.4d", label: "Avg. response" },
];

const prompts = [
  "What is happening today in your area?",
  "Let&apos;s build Ashanti together",
  "Let&apos;s hear your voice",
  "Know what is going on",
  "Report an issue near you",
  "Track your community&apos;s progress",
];

export function Hero() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const prompt = prompts[currentPromptIndex];
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      timeout = setTimeout(() => {
        if (currentIndex < prompt.length) {
          setDisplayedText((prev) => prev + prompt[currentIndex]);
          currentIndex++;
        } else {
          setIsTyping(false);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
        setDisplayedText("");
        setIsTyping(true);
      }, 2500);
    }

    return () => clearTimeout(timeout);
  }, [currentPromptIndex, displayedText, isTyping]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-background" />
      <div
        className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
        aria-hidden
      />

      <div className="container py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ashanti Connect
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Your voice <span className="gradient-text">powers progress</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Report issues. Track progress. Shape decisions. One platform connecting 4.9 million citizens with the Ashanti Region government.
          </motion.p>

          {/* AI-like Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 mx-auto max-w-2xl"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/50 dark:bg-card rounded-2xl border border-border/50 p-6 backdrop-blur-sm shadow-lg hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  {/* Hand Animation */}
                  <motion.div
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                    className="text-3xl flex-shrink-0"
                  >
                    ✋
                  </motion.div>

                  {/* Typing Field */}
                  <div className="flex-1">
                    <label htmlFor="hero-input" className="sr-only">
                      Search or ask a question
                    </label>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground mb-1">Ask or report:</div>
                      <div className="h-8 font-display text-xl font-semibold text-foreground tracking-tight">
                        <span>{displayedText}</span>
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="ml-1 inline-block w-0.5 h-6 bg-primary"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Input Icon */}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary flex-shrink-0"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Subtext */}
            <p className="mt-4 text-sm text-muted-foreground">
              Questions answered instantly. Issues routed to the right department. Progress tracked transparently.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row justify-center"
          >
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/portal/report">
                Report an Issue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/portal/track">Track Progress</Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
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
      </div>

      {/* Stats bar */}
      <div className="border-y border-border bg-card/40 backdrop-blur-sm">
        <div className="container grid grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-6 text-center sm:px-6">
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
