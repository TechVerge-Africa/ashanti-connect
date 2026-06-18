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
      {/* Background gradient - Responsive */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-secondary opacity-40" />
      <div
        className="absolute -right-32 sm:-right-40 md:-right-48 lg:-right-56 top-0 -z-10 h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      {/* Top badge - Fully responsive */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-5 lg:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-border bg-secondary/50 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-xs sm:text-xs md:text-xs font-semibold text-primary"
        >
          <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">Connecting Citizens. Empowering Communities.</span>
          <span className="sm:hidden">Connecting. Empowering.</span>
        </motion.div>
      </div>

      {/* Main container - Responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-16">
        {/* Main grid - Fully responsive */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2 items-start max-w-7xl mx-auto">
          {/* Left column */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {/* Headline - Progressive scaling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                Let's build Ashanti{" "}
                <span className="text-primary">together.</span>
              </h1>
            </motion.div>

            {/* Description - Responsive text size */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-sm md:text-base lg:text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              Report issues, track development, access opportunities, and connect directly with your government.
            </motion.p>

            {/* Input Field - Fully responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <div className="relative group">
                <div className="relative border border-primary/40 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-secondary/60 p-2.5 sm:p-3 md:p-3.5 lg:p-4 hover:border-primary/60 transition-all duration-300 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center justify-between gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                        <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4 text-primary flex-shrink-0" />
                        <span className="text-xs sm:text-xs md:text-xs lg:text-xs text-muted-foreground truncate">Ask Ashanti AI</span>
                      </div>
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-foreground min-h-[1rem] sm:min-h-[1.2rem] md:min-h-[1.4rem] lg:min-h-[1.75rem] leading-snug break-words pr-2">
                        <span>{displayedText}</span>
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="ml-0.5 inline-block w-0.5 h-3 sm:h-3.5 md:h-4 lg:h-5 bg-primary align-middle"
                          />
                        )}
                      </div>
                    </div>

                    <button
                      className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      aria-label="Send"
                    >
                      <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4.5 md:w-4.5 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Suggestion chips - Responsive */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full border border-border bg-secondary/40 text-xs sm:text-xs md:text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-secondary/80 transition-all duration-300 whitespace-normal sm:whitespace-normal"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Powered by text - Responsive */}
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-xs md:text-xs text-muted-foreground">
                <Zap className="h-3 w-3 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-3.5 lg:w-3.5 text-primary flex-shrink-0" />
                <span>Powered by Ashanti AI</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Hand image and activity cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            {/* Desktop layout - Hand image with activity cards */}
            <div className="hidden lg:block relative">
              {/* Hand image */}
              <div className="relative rounded-2xl overflow-hidden bg-secondary/40 border border-border/50 mb-4">
                <Image
                  src="/hand-typing.png"
                  alt="Person typing on keyboard"
                  width={500}
                  height={400}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Activity cards - positioned absolutely for overlapping effect */}
              <div className="space-y-2 absolute -left-24 top-20 w-56">
                {activityUpdates.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                    className="bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-lg sm:rounded-lg md:rounded-xl p-2.5 sm:p-3 flex items-start gap-2 sm:gap-3 hover:bg-secondary/95 transition-colors"
                  >
                    <span className="text-base sm:text-lg flex-shrink-0">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.isDone && (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tablet/Mobile layout */}
            <div className="lg:hidden space-y-3 sm:space-y-4 md:space-y-5">
              {/* Hand image - Responsive height */}
              <div className="relative rounded-lg sm:rounded-lg md:rounded-xl overflow-hidden bg-secondary/40 border border-border/50 h-40 sm:h-48 md:h-56 lg:h-64">
                <Image
                  src="/hand-typing.png"
                  alt="Person typing on keyboard"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tablet/Mobile stats cards - Responsive grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                {[
                  { label: "500K+", text: "Active Citizens" },
                  { label: "12,450", text: "Issues Resolved" },
                  { label: "87", text: "Active Projects" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary/60 border border-border/50 rounded-lg sm:rounded-lg md:rounded-xl p-2 sm:p-2.5 md:p-3 text-center"
                  >
                    <p className="text-sm sm:text-base md:text-lg font-bold text-primary">{stat.label}</p>
                    <p className="text-xs sm:text-xs md:text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Stats bar - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block mt-10 md:mt-12 lg:mt-16 rounded-xl md:rounded-2xl bg-white/5 border border-border/30 backdrop-blur-sm p-5 md:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-lg md:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm font-semibold text-foreground mt-1 md:mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 md:mt-1 line-clamp-2">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tablet/Mobile feature cards - Fully responsive */}
      <div className="lg:hidden w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
          {[
            { icon: MessageCircle, title: "Report an Issue", text: "Let us know" },
            { icon: CheckCircle2, title: "Track Progress", text: "Stay updated" },
            { icon: Zap, title: "Opportunities", text: "Find & grow" },
            { icon: "🏛️", title: "Town Hall Events", text: "Join the conversation" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-secondary/60 border border-border/50 rounded-lg sm:rounded-lg md:rounded-xl p-2.5 sm:p-3 md:p-4 text-center hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              {typeof feature.icon === "string" ? (
                <span className="text-lg sm:text-xl md:text-2xl block mb-1 sm:mb-1.5 md:mb-2">{feature.icon}</span>
              ) : (
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary mx-auto mb-1 sm:mb-1.5 md:mb-2" />
              )}
              <p className="font-semibold text-xs sm:text-xs md:text-sm text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 sm:mt-0.5 md:mt-1">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
