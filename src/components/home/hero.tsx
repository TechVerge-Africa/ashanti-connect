"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, MessageSquarePlus, Send,
  Zap, TrendingUp, Users, MapPin, Clock, ClipboardList,
  UserCheck, Wrench, Search, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Stats ticker data (duplicated for seamless loop) ── */
const STATS = [
  { value: "532K+", label: "Active Citizens" },
  { value: "12,450", label: "Issues Resolved" },
  { value: "43", label: "Active Projects" },
  { value: "87%", label: "Satisfaction Rate" },
  { value: "18", label: "Districts Connected" },
  { value: "532K+", label: "Active Citizens" },
  { value: "12,450", label: "Issues Resolved" },
  { value: "43", label: "Active Projects" },
  { value: "87%", label: "Satisfaction Rate" },
  { value: "18", label: "Districts Connected" },
];

/* ── Rotating typewriter prompts ── */
const PROMPTS = [
  "Let's build Ashanti together...",
  "Report an issue in your community...",
  "Let's hear your voice...",
  "Find opportunities near you...",
  "Track projects in your district...",
  "What would you like to know today?",
];

/* ── Quick-fill suggestion chips ── */
const CHIPS = [
  { label: "Report a road issue", query: "How do I report a road issue?" },
  { label: "Find opportunities", query: "What opportunities are near me?" },
  { label: "Track my report", query: "How do I track my report?" },
];

/* ── Live activity mock data (uses SVG icons — no emoji) ── */
const ACTIVITY = [
  { Icon: ClipboardList, title: "Road issue reported", time: "2 min ago", color: "text-blue-400", bg: "bg-blue-500/10" },
  { Icon: UserCheck, title: "Assigned to Roads Dept.", time: "8 min ago", color: "text-gold-400", bg: "bg-gold-500/10" },
  { Icon: Wrench, title: "Inspection scheduled", time: "Today, 10:00 AM", color: "text-orange-400", bg: "bg-orange-500/10" },
  { Icon: CheckCircle2, title: "Issue resolved", time: "Today, 2:45 PM", color: "text-primary", bg: "bg-primary/10", isDone: true },
];

/* ── Carousel Slides Data ── */
const CAROUSEL_SLIDES = [
  {
    title: "Smart Kumasi Initiative",
    category: "Regional Development",
    image: "/kumasi_digital.png",
    description: "Deploying high-speed fiber connectivity, smart transit routing, and solar grid nodes across the metropolitan area.",
    metrics: "District coverage: 92% | Completion: Q4 2026",
    link: "/projects/smart-kumasi"
  },
  {
    title: "Ashanti Smart Highway",
    category: "Infrastructure",
    image: "/road_construction.png",
    description: "Upgrading major transit corridors with modern multi-lane asphalt, solar streetlights, and integrated emergency drainage.",
    metrics: "Completion: 74% | Active Workers: 340+",
    link: "/projects/smart-highway"
  },
  {
    title: "Citizen Portal Rollout",
    category: "Digital Governance",
    image: "/digital_governance.png",
    description: "Connecting over 18 district assemblies to a single dashboard for rapid citizen issue reporting and feedback.",
    metrics: "Active Users: 532K+ | Resolution Rate: 91.8%",
    link: "/portal"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  })
};

/* ═══════════════════════════════════════════════
   Hook: rotating typewriter — pauses when active
═══════════════════════════════════════════════ */
type Phase = "typing" | "pausing" | "erasing";

function useRotatingTypewriter(prompts: string[], paused: boolean) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const promptIdx = useRef(0);
  const charIdx = useRef(0);

  useEffect(() => {
    if (paused) return; // freeze while user is interacting

    const current = prompts[promptIdx.current];

    if (phase === "typing") {
      if (charIdx.current < current.length) {
        const t = setTimeout(() => {
          setText(current.slice(0, charIdx.current + 1));
          charIdx.current++;
        }, 50);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("erasing"), 2000);
        return () => clearTimeout(t);
      }
    }

    if (phase === "erasing") {
      if (charIdx.current > 0) {
        const t = setTimeout(() => {
          charIdx.current--;
          setText(current.slice(0, charIdx.current));
        }, 28);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          promptIdx.current = (promptIdx.current + 1) % prompts.length;
          setPhase("typing");
        }, 300);
        return () => clearTimeout(t);
      }
    }
  }, [phase, text, prompts, paused]);

  return { animatedText: text, isErasing: phase === "erasing" };
}

/* ═══════════════════════════════════════════════
   Animation variants
═══════════════════════════════════════════════ */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ═══════════════════════════════════════════════
   Main Hero component
═══════════════════════════════════════════════ */
export function Hero() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  // Carousel State & Logic
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setSlideDirection(1);
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideDirection(-1);
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  // Auto-rotating timer
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  // Typewriter pauses when the bar is focused or has text
  const typewriterPaused = focused || query.length > 0;
  const { animatedText, isErasing } = useRotatingTypewriter(PROMPTS, typewriterPaused);

  // Whether to show overlay (animated placeholder) vs real input text
  const showOverlay = !focused && query.length === 0;

  const handleSubmit = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/assistant?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/assistant");
    }
  }, [query, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") {
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const fillChip = (chipQuery: string) => {
    setQuery(chipQuery);
    inputRef.current?.focus();
  };

  return (
    <section className="relative overflow-hidden" aria-label="Hero section" id="main-content">

      {/* ── Background depth scene ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute inset-0 opacity-100" style={{
          backgroundImage: `
            linear-gradient(hsl(38 92% 50% / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsl(38 92% 50% / 0.05) 1px, transparent 1px),
            linear-gradient(hsl(162 72% 46% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(162 72% 46% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px, 48px 48px, 12px 12px, 12px 12px",
        }} />
        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full ambient-orb-emerald" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full ambient-orb-gold" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
      </div>

      {/* ── Top badge ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-semibold text-primary badge-glow"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="hidden sm:inline">Connecting Citizens · Empowering the Ashanti Region</span>
          <span className="sm:hidden">Connecting · Empowering</span>
        </motion.div>
      </div>

      {/* ── Main grid ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-center max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* ── Left column ── */}
          <div className="space-y-6">

            {/* Headline */}
            <motion.div variants={item}>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-foreground">
                Let&apos;s build{" "}
                <span className="gradient-text">Ashanti</span>
                {" "}together.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={item} className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Report issues, track development, access opportunities, and connect
              directly with your government — in English or Twi.
            </motion.p>

            {/* ═══ AI Search Bar ═══ */}
            <motion.div variants={item} className="space-y-3">

              {/* Outer wrapper — click anywhere to focus */}
              <div
                className={`
                  relative rounded-2xl transition-all duration-300 cursor-text
                  ${focused
                    ? "ring-2 ring-primary/40 ring-offset-0 shadow-glow-emerald"
                    : "hover:shadow-glow-sm"
                  }
                `}
                onClick={() => inputRef.current?.focus()}
              >
                {/* Gradient border glow (focused state) */}
                <div
                  className={`absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-300 ${focused ? "opacity-100" : "opacity-0"}`}
                  style={{ background: "linear-gradient(135deg, hsl(162 72% 46% / 0.5), transparent 50%, hsl(38 92% 50% / 0.3))" }}
                  aria-hidden="true"
                />

                {/* Card body */}
                <div className={`
                  relative border rounded-2xl bg-secondary/50 backdrop-blur-sm overflow-hidden transition-all duration-300
                  ${focused ? "border-primary/40 bg-secondary/70" : "border-primary/20 hover:border-primary/35"}
                `}>

                  {/* Label row */}
                  <div className="flex items-center gap-2 px-4 pt-3.5 pb-2">
                    <Zap className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {focused || query ? "Ashanti AI" : "Ask Ashanti AI"}
                    </span>
                    {/* Keyboard hint */}
                    <AnimatePresence>
                      {focused && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          className="ml-auto text-[10px] text-muted-foreground/50 font-mono hidden sm:block"
                        >
                          Enter ↵ to send · Esc to clear
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input row */}
                  <div className="relative flex items-center gap-2 px-4 pb-3.5">

                    {/* Typewriter overlay — visible only when idle */}
                    <div
                      className={`
                        absolute inset-0 px-4 pb-3.5 flex items-center pointer-events-none
                        transition-opacity duration-200
                        ${showOverlay ? "opacity-100" : "opacity-0"}
                      `}
                      aria-hidden="true"
                    >
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-foreground/80 leading-snug truncate">
                        {animatedText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: isErasing ? 0.25 : 0.55, repeat: Infinity, ease: "easeInOut" }}
                          className="ml-0.5 inline-block w-0.5 h-4 sm:h-5 bg-primary align-middle rounded-full"
                        />
                      </span>
                    </div>

                    {/* Real input — always mounted, transparent placeholder */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyDown={handleKeyDown}
                      placeholder=""
                      aria-label="Ask Ashanti AI or search"
                      className={`
                        flex-1 min-w-0 bg-transparent outline-none
                        text-sm sm:text-base lg:text-lg font-semibold text-foreground leading-snug
                        placeholder:text-transparent caret-primary
                        transition-opacity duration-200
                        ${showOverlay ? "opacity-0" : "opacity-100"}
                      `}
                    />

                    {/* Clear button — appears when there's text */}
                    <AnimatePresence>
                      {query.length > 0 && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          onClick={(e) => { e.stopPropagation(); setQuery(""); inputRef.current?.focus(); }}
                          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.08] text-muted-foreground flex items-center justify-center hover:bg-white/[0.15] hover:text-foreground transition-colors cursor-pointer"
                          aria-label="Clear"
                        >
                          <X className="h-3 w-3" />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Send / Open button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                      className={`
                        flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center
                        transition-all duration-200 cursor-pointer
                        ${query.trim()
                          ? "bg-primary text-primary-foreground shadow-glow-sm hover:bg-primary/90 hover:shadow-glow-emerald"
                          : "bg-white/[0.06] text-muted-foreground hover:bg-white/[0.12] hover:text-foreground border border-white/[0.08]"
                        }
                      `}
                      aria-label={query.trim() ? "Send to AI" : "Open AI Assistant"}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {query.trim() ? (
                          <motion.span key="send" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <Send className="h-4 w-4" />
                          </motion.span>
                        ) : (
                          <motion.span key="search" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <Search className="h-4 w-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick-fill chips */}
              <div className="flex flex-wrap gap-2">
                {CHIPS.map((chip, i) => (
                  <motion.button
                    key={chip.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    onClick={() => fillChip(chip.query)}
                    className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    {chip.label}
                  </motion.button>
                ))}
              </div>

              {/* Powered by */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-primary flex-shrink-0" />
                <span>Powered by Ashanti AI — available in English &amp; Twi</span>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link href="/portal" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 shadow-glow-sm hover:shadow-glow-emerald cursor-pointer">
                Enter Citizen Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.18] cursor-pointer">
                <TrendingUp className="h-4 w-4 text-primary" />
                View Live Projects
              </Link>
            </motion.div>
          </div>

          {/* ── Right column — News & Projects Carousel ── */}
          <motion.div variants={item} className="relative w-full">
            <div 
              className="relative rounded-2xl glass-card border border-white/[0.08] p-1 overflow-hidden group/carousel"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.06] bg-black/20">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 max-w-[200px] mx-3 h-5 rounded-md bg-white/[0.05] border border-white/[0.06] flex items-center justify-center px-2">
                  <span className="text-[9px] text-muted-foreground font-mono truncate">ashanti.gov.gh/updates</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full font-medium">Live Feed</span>
                </div>
              </div>

              {/* Viewport for slides */}
              <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-black/40 rounded-xl">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={activeSlide}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* The Slide Image */}
                    <img 
                      src={CAROUSEL_SLIDES[activeSlide].image} 
                      alt={CAROUSEL_SLIDES[activeSlide].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Subtle Overlay to make text legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          {CAROUSEL_SLIDES[activeSlide].category}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                          {CAROUSEL_SLIDES[activeSlide].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-sans line-clamp-2">
                          {CAROUSEL_SLIDES[activeSlide].description}
                        </p>
                      </div>

                      {/* Glass metrics drawer */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-2.5 flex items-center justify-between gap-3 text-[10px] sm:text-xs text-gray-300 font-medium">
                        <span className="truncate">{CAROUSEL_SLIDES[activeSlide].metrics}</span>
                        <Link 
                          href={CAROUSEL_SLIDES[activeSlide].link}
                          className="flex items-center gap-1 text-primary hover:text-primary-foreground hover:bg-primary/20 px-2 py-1 rounded-md transition-all shrink-0 cursor-pointer"
                        >
                          Details <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right navigation arrows (appear on hover) */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/10 bg-black/40 text-white flex items-center justify-center hover:bg-primary hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/10 bg-black/40 text-white flex items-center justify-center hover:bg-primary hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Indicators / Dots */}
                <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
                  {CAROUSEL_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideDirection(idx > activeSlide ? 1 : -1);
                        setActiveSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ambient gold/emerald glows to ground the carousel */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10 pointer-events-none" />
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats marquee ticker ── */}
      <div className="w-full overflow-hidden border-y border-white/[0.06] bg-secondary/20 backdrop-blur-sm py-3" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-0">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <div className="flex items-center gap-2.5 text-sm whitespace-nowrap">
                <span className="font-bold text-primary font-display">{stat.value}</span>
                <span className="text-muted-foreground text-xs">{stat.label}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-primary/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
