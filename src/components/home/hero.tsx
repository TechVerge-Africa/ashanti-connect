"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const stats = [
  { value: "532K+", label: "Active Citizens", sublabel: "Growing every day" },
  { value: "12,450", label: "Issues Resolved", sublabel: "Making impact together" },
  { value: "43", label: "Active Projects", sublabel: "Building our future" },
  { value: "87%", label: "Satisfaction Rate", sublabel: "Your voice matters" },
  { value: "18", label: "Districts Connected", sublabel: "One Ashanti Region" },
];

const suggestionChips = [
  "Let's build Ashanti together",
  "Let's hear your voice",
  "Know what is going on",
];

const activityUpdates = [
  { icon: "📋", title: "Road issue reported", time: "2 min ago" },
  { icon: "👥", title: "Assigned to Roads Dept.", time: "8 min ago" },
  { icon: "📋", title: "Inspection scheduled", time: "Today, 10:00 AM" },
  { icon: "✓", title: "Issue resolved", time: "Today, 2:45 PM", isDone: true },
];

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const mainPrompt = "What is happening today in your area?";

  useEffect(() => {
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      timeout = setTimeout(() => {
        if (currentIndex < mainPrompt.length) {
          setDisplayedText((prev) => prev + mainPrompt[currentIndex]);
          currentIndex++;
        } else {
          setIsTyping(false);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIsTyping(true);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping]);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-secondary opacity-40" />
      <div
        className="absolute -right-40 top-0 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      {/* Navigation bar tag */}
      <div className="container mt-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-primary"
        >
          <Zap className="h-3.5 w-3.5" />
          Connecting Citizens. Empowering Communities.
        </motion.div>
      </div>

      <div className="container py-12 lg:py-16">
        {/* Main content grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
          {/* Left column */}
          <div className="space-y-6">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                Let's build Ashanti{" "}
                <span className="text-primary">together.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              Report issues, track development, access opportunities, and connect directly with your government.
            </motion.p>

            {/* Input Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="relative group">
                <div className="relative border border-primary/40 rounded-2xl bg-secondary/60 p-4 hover:border-primary/60 transition-all duration-300 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">Ask Ashanti AI</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground min-h-[1.5rem]">
                        <span>{displayedText}</span>
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="ml-1 inline-block w-0.5 h-5 bg-primary align-middle"
                          />
                        )}
                      </div>
                    </div>

                    <button
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      aria-label="Send"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    className="px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-secondary/80 transition-all duration-300"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Powered by text */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" />
                Powered by Ashanti AI
              </div>
            </motion.div>
          </div>

          {/* Right column - Hand image and activity cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative lg:block"
          >
            {/* Hand image - hidden on mobile, shown on desktop */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden bg-secondary/40 border border-border/50 mb-4">
              <Image
                src="/hand-typing.png"
                alt="Person typing on keyboard"
                width={500}
                height={400}
                priority
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Activity cards - positioned absolutely for overlapping effect on desktop */}
            <div className="hidden lg:block space-y-2 absolute -left-24 top-20 w-56">
              {activityUpdates.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                  className="bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-xl p-3 flex items-start gap-3 hover:bg-secondary/95 transition-colors"
                >
                  <span className="text-lg flex-shrink-0">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.isDone && (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden space-y-4 mt-4">
              {/* Hand image on mobile - smaller and contained */}
              <div className="relative rounded-2xl overflow-hidden bg-secondary/40 border border-border/50 h-64">
                <Image
                  src="/hand-typing.png"
                  alt="Person typing on keyboard"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile stats cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "500K+", text: "Active Citizens" },
                  { label: "12,450", text: "Issues Resolved" },
                  { label: "87", text: "Active Projects" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary/60 border border-border/50 rounded-xl p-3 text-center"
                  >
                    <p className="text-lg font-bold text-primary">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block mt-16 rounded-2xl bg-white/5 border border-border/30 backdrop-blur-sm p-8"
        >
          <div className="grid grid-cols-5 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile feature cards */}
      <div className="lg:hidden mt-12 pb-12">
        <div className="container grid grid-cols-2 gap-3">
          {[
            { icon: MessageCircle, title: "Report an Issue", text: "Let us know" },
            { icon: CheckCircle2, title: "Track Progress", text: "Stay updated" },
            { icon: Zap, title: "Opportunities", text: "Find & grow" },
            { icon: "🏛️", title: "Town Hall Events", text: "Join the conversation" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-secondary/60 border border-border/50 rounded-xl p-4 text-center hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              {typeof feature.icon === "string" ? (
                <span className="text-2xl block mb-2">{feature.icon}</span>
              ) : (
                <feature.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              )}
              <p className="font-semibold text-sm text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
