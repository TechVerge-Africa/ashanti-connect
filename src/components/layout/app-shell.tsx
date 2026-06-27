"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/shared/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, initials } from "@/lib/utils";
import { workspaces, type NavLink } from "@/lib/navigation";

export interface AppUser {
  name: string;
  role: string;
}

export function AppShell({
  nav,
  workspaceLabel,
  accent = "primary",
  user,
  children,
}: {
  nav: NavLink[];
  workspaceLabel: string;
  accent?: "primary" | "gold";
  user: AppUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === nav[0].href ? pathname === href : pathname.startsWith(href);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <Link href="/">
          <Logo subtitle={false} />
        </Link>
        <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-3 py-4">
        <WorkspaceSwitcher current={workspaceLabel} />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 border",
                active
                  ? accent === "gold"
                    ? "bg-gold/10 text-gold border-gold/20 shadow-glow-gold"
                    : "bg-primary/10 text-primary border-primary/20 shadow-glow-sm"
                  : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {link.icon && (
                <span className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors shrink-0",
                  active
                    ? accent === "gold" ? "bg-gold/15 text-gold" : "bg-primary/15 text-primary"
                    : "bg-secondary/60 text-muted-foreground"
                )}>
                  <Icon name={link.icon} className="h-4 w-4" />
                </span>
              )}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">{user.name}</div>
            <div className="truncate text-xs text-muted-foreground">{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen bg-background overflow-hidden">
      {/* Background depth scene with Kente pattern & ambient glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-secondary/10 kente-texture opacity-[0.03]" />
        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full ambient-orb-emerald opacity-25" />
        <div className="absolute -left-24 bottom-24 h-80 w-80 rounded-full ambient-orb-gold opacity-15" />
      </div>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-secondary/35 backdrop-blur-xl lg:block">
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 z-50 w-[82%] max-w-xs border-r border-border/60 bg-secondary/50 backdrop-blur-xl shadow-lifted"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/50 bg-background/45 px-4 backdrop-blur-lg sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search reports, projects, people…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 hover:bg-secondary">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials(user.name)}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Back to public site</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function WorkspaceSwitcher({ current }: { current: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/30 px-3.5 py-2 text-sm font-medium hover:bg-secondary/60 hover:border-primary/20 transition-all duration-200 cursor-pointer shadow-sm">
        <span className="truncate">{current}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem] glass-card border border-border p-1.5">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wider">Switch workspace</DropdownMenuLabel>
        {workspaces.map((w) => (
          <DropdownMenuItem key={w.href} asChild className="focus:bg-secondary/60 rounded-lg p-2 cursor-pointer transition-colors duration-150">
            <Link href={w.href} className="flex items-start gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon name={w.icon} className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-semibold text-sm text-foreground">{w.label}</span>
                <span className="block text-[10px] text-muted-foreground leading-normal mt-0.5">{w.description}</span>
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
