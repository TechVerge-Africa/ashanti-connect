"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowRight, Sparkles, ChevronRight, ChevronDown,
  Building2, Info, LayoutGrid, HardHat, Compass, Newspaper,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { publicNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const navGroups = {
  explore: [
    { label: "About", href: "/about", icon: Info, desc: "Our mission & vision" },
    { label: "Services", href: "/services", icon: LayoutGrid, desc: "What we offer" },
    { label: "Departments", href: "/departments", icon: Building2, desc: "18 connected departments" },
  ],
  community: [
    { label: "Projects", href: "/projects", icon: HardHat, desc: "Development tracker" },
    { label: "Opportunities", href: "/opportunities", icon: Compass, desc: "Jobs & grants" },
    { label: "News & Events", href: "/news", icon: Newspaper, desc: "Latest updates" },
  ],
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isGroupActive = (group: { href: string }[]) =>
    group.some((l) => isActive(l.href));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || open ? "top-0" : "top-0",
        )}
      >
        {/* Floating pill container */}
        <div className={cn(
          "mx-4 mt-3 rounded-2xl transition-all duration-300",
          scrolled || open
            ? "glass-nav shadow-glass"
            : "bg-transparent border border-transparent",
        )}>
          <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-5">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Ashanti Connect home"
              className="shrink-0 relative group"
            >
              <div className={cn(
                "absolute -inset-2 rounded-xl transition-all duration-300",
                "group-hover:bg-primary/5",
              )} />
              <Logo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main navigation">
              <div className="inline-flex items-center gap-0.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-1 backdrop-blur-sm">

                {/* Home */}
                <Link
                  href="/"
                  aria-current={isActive("/") ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive("/")
                      ? "bg-primary text-primary-foreground shadow-glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                  )}
                >
                  Home
                </Link>

                {/* Explore Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("explore")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer",
                      isGroupActive(navGroups.explore)
                        ? "bg-primary text-primary-foreground shadow-glow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                    )}
                    aria-expanded={activeDropdown === "explore"}
                    aria-haspopup="true"
                  >
                    Explore
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === "explore" && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "explore" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 z-50"
                      >
                        <div className="glass-card rounded-xl p-1.5 min-w-[220px] border border-white/[0.08]">
                          {navGroups.explore.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={cn(
                                "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group/item",
                                isActive(link.href)
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground hover:bg-white/[0.06] hover:text-foreground",
                              )}
                            >
                              <span className={cn(
                                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                isActive(link.href) ? "bg-primary/15 text-primary" : "bg-white/[0.06] text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary",
                              )}>
                                <link.icon className="h-3.5 w-3.5" />
                              </span>
                              <div>
                                <div className="text-sm font-medium leading-none">{link.label}</div>
                                <div className="mt-0.5 text-xs text-muted-foreground">{link.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Community Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("community")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer",
                      isGroupActive(navGroups.community)
                        ? "bg-primary text-primary-foreground shadow-glow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                    )}
                    aria-expanded={activeDropdown === "community"}
                    aria-haspopup="true"
                  >
                    Community
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === "community" && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "community" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 z-50"
                      >
                        <div className="glass-card rounded-xl p-1.5 min-w-[220px] border border-white/[0.08]">
                          {navGroups.community.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={cn(
                                "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group/item",
                                isActive(link.href)
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground hover:bg-white/[0.06]",
                              )}
                            >
                              <span className={cn(
                                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                isActive(link.href) ? "bg-primary/15 text-primary" : "bg-white/[0.06] text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary",
                              )}>
                                <link.icon className="h-3.5 w-3.5" />
                              </span>
                              <div>
                                <div className="text-sm font-medium leading-none">{link.label}</div>
                                <div className="mt-0.5 text-xs text-muted-foreground">{link.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contact */}
                <Link
                  href="/contact"
                  aria-current={isActive("/contact") ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive("/contact")
                      ? "bg-primary text-primary-foreground shadow-glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
                  )}
                >
                  Contact
                </Link>
              </div>
            </nav>

            {/* Desktop CTA buttons */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI Assistant
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 shadow-glow-sm hover:shadow-glow-emerald cursor-pointer"
              >
                Citizen Portal
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.08] lg:hidden cursor-pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 top-[72px] z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Drawer panel */}
              <motion.nav
                className="absolute right-0 top-0 flex h-[calc(100dvh-72px)] w-[88%] max-w-sm flex-col border-l border-white/[0.08] glass-card"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                aria-label="Mobile navigation"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Explore group */}
                  <div>
                    <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Explore
                    </p>
                    <div className="space-y-0.5">
                      {navGroups.explore.map((link) => {
                        const active = isActive(link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-white/[0.06]",
                            )}
                          >
                            <span className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0",
                              active ? "bg-primary/15 text-primary" : "bg-white/[0.06] text-muted-foreground",
                            )}>
                              <link.icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1">{link.label}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Community group */}
                  <div>
                    <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Community
                    </p>
                    <div className="space-y-0.5">
                      {navGroups.community.map((link) => {
                        const active = isActive(link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-white/[0.06]",
                            )}
                          >
                            <span className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0",
                              active ? "bg-primary/15 text-primary" : "bg-white/[0.06] text-muted-foreground",
                            )}>
                              <link.icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1">{link.label}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA area */}
                <div className="border-t border-white/[0.08] p-4 space-y-2.5">
                  <Link
                    href="/assistant"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08] cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Assistant
                  </Link>
                  <Link
                    href="/portal"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-glow-sm cursor-pointer"
                  >
                    Enter Citizen Portal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
