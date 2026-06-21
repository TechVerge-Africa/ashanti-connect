"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Calendar, MapPin, Search, ArrowUpRight, 
  TrendingUp, Wallet, Percent, ShieldCheck, Construction, 
  Droplets, Zap, Trash2, GraduationCap, HeartPulse, Wheat,
  FolderKanban, Clock, CheckCircle2, AlertTriangle, AlertCircle,
  HelpCircle, Sparkles, Filter, X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { categoryLabels } from "@/lib/constants";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Project } from "@/lib/types";

// Category to Icon mapping
const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  roads: Construction,
  water: Droplets,
  electricity: Zap,
  security: ShieldCheck,
  sanitation: Trash2,
  education: GraduationCap,
  healthcare: HeartPulse,
  agriculture: Wheat,
};

// Custom status badge config
const statusConfig: Record<Project["status"], { 
  label: string; 
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  borderColor: string;
}> = {
  completed: { 
    label: "Completed", 
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  },
  ongoing: { 
    label: "Ongoing", 
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/30"
  },
  delayed: { 
    label: "Delayed", 
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/30"
  },
  planning: { 
    label: "Planning", 
    icon: HelpCircle,
    color: "text-muted-foreground",
    bg: "bg-secondary/40",
    borderColor: "border-border"
  },
};

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const categories = ["all", "roads", "water", "education", "healthcare", "electricity", "sanitation"];
  const statuses = ["all", "ongoing", "completed", "delayed", "planning"];

  // Filter projects dynamically
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, categoryFilter, statusFilter]);

  // Overall statistics
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const avgCompletion = Math.round(projects.reduce((s, p) => s + p.completion, 0) / projects.length);
  const activeCount = projects.filter(p => p.status === "ongoing").length;

  return (
    <div className="space-y-10">
      
      {/* ── Summary KPI Dashboard ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard 
          label="Total committed budget" 
          value={formatCurrency(totalBudget)}
          desc={`${projects.length} Total Projects`}
          icon={Wallet}
          accent="emerald"
        />
        <SummaryCard 
          label="Funds disbursed" 
          value={formatCurrency(totalSpent)} 
          desc={`${Math.round((totalSpent / totalBudget) * 100)}% Disbursed`}
          icon={TrendingUp}
          accent="gold"
        />
        <SummaryCard 
          label="Average completion" 
          value={`${avgCompletion}%`}
          desc={`${activeCount} Active Ongoing`}
          icon={Percent}
          accent="primary"
        />
      </div>

      {/* ── Filter Controls Container ── */}
      <div className="relative rounded-2xl border border-white/[0.06] bg-secondary/20 p-5 backdrop-blur-md space-y-4">
        
        {/* Row 1: Search & Status Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, contractor, district, or keyword..."
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/30 pl-10 pr-9 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Status buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mr-2 hidden lg:inline-block">Status:</span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border whitespace-nowrap",
                  statusFilter === status
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/[0.15] hover:text-foreground",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Categories tabs */}
        <div className="border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:block" />
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mr-2 hidden sm:inline-block">Categories:</span>
            
            {categories.map((cat) => {
              const Icon = categoryIconMap[cat] || FolderKanban;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
                    categoryFilter === cat
                      ? "border-primary bg-primary text-primary-foreground shadow-glow-sm shadow-glow-emerald"
                      : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/[0.15] hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat === "all" ? "All Categories" : categoryLabels[cat as keyof typeof categoryLabels] || cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Projects Grid View ── */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-secondary/10 p-12 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">No Projects Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1 leading-relaxed">
              We couldn&apos;t find any projects matching your search criteria. Try modifying your filters or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
              className="mt-5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-glow-sm"
            >
              Reset All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {filteredProjects.map((p) => {
              const status = statusConfig[p.status] || statusConfig.planning;
              const StatusIcon = status.icon;
              const CatIcon = categoryIconMap[p.category] || FolderKanban;
              const spentPercent = Math.round((p.spent / p.budget) * 100);

              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-2xl border border-white/[0.08] bg-card p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm hover:shadow-glow-emerald overflow-hidden"
                >
                  {/* Subtle hover gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1.5 border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider py-1 px-2.5">
                        <CatIcon className="h-3 w-3 text-primary" />
                        {categoryLabels[p.category as keyof typeof categoryLabels]}
                      </Badge>
                      <Badge className={cn("flex items-center gap-1 py-1 px-2.5 text-xs font-semibold uppercase tracking-wider border", status.color, status.bg, status.borderColor)}>
                        <StatusIcon className="h-3 w-3 shrink-0" />
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <div className="font-display text-2xl font-black text-primary">{p.completion}%</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Complete</div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4 relative">
                    <h3 className="font-display text-lg sm:text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Custom Glowing Progress Bar */}
                  <div className="mt-5 relative">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-1.5">
                      <span>Timeline Progress</span>
                      <span className="text-foreground">{p.completion}%</span>
                    </div>
                    <Progress 
                      value={p.completion} 
                      className="h-2 bg-secondary/80" 
                      indicatorClassName="bg-gradient-to-r from-primary via-primary to-gold border-r border-gold/45" 
                    />
                  </div>

                  {/* Detail items grid */}
                  <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 border-t border-white/[0.06] pt-5 text-sm relative">
                    <DetailItem icon={MapPin} label="District Assembly" value={p.district} />
                    <DetailItem icon={Building2} label="Lead Contractor" value={p.contractor} />
                    
                    <div>
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        <Wallet className="h-3 w-3 text-primary" /> Budget Allocation
                      </div>
                      <div className="font-bold text-foreground">{formatCurrency(p.budget)}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Disbursed: {spentPercent}% ({formatCurrency(p.spent)})</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        <Calendar className="h-3 w-3 text-gold" /> Targeted Timeline
                      </div>
                      <div className="font-medium text-foreground">{formatDate(p.startDate)}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Target Completion: {formatDate(p.endDate)}</div>
                    </div>
                  </div>

                  {/* Action Bar Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 relative">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      Audited by Assembly
                    </span>
                    <Link
                      href={`/portal/report?project=${encodeURIComponent(p.id)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary/20 border border-primary/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Report Concern <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Summary Card design
function SummaryCard({ 
  label, 
  value, 
  desc, 
  icon: Icon, 
  accent 
}: { 
  label: string; 
  value: string; 
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "emerald" | "gold" | "primary"; 
}) {
  const accentConfig = {
    emerald: {
      border: "hover:border-emerald-500/30",
      glow: "hover:shadow-glow-emerald",
      iconClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    gold: {
      border: "hover:border-gold/30",
      glow: "hover:shadow-glow-gold",
      iconClass: "text-gold bg-gold/10 border-gold/20"
    },
    primary: {
      border: "hover:border-primary/30",
      glow: "hover:shadow-glow-emerald",
      iconClass: "text-primary bg-primary/10 border-primary/20"
    }
  };

  const currentAccent = accentConfig[accent || "primary"];

  return (
    <div className={cn(
      "relative rounded-2xl border border-white/[0.06] bg-card p-5 transition-all duration-300 overflow-hidden",
      currentAccent.border,
      currentAccent.glow
    )}>
      {/* Light glow backdrops */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{label}</span>
          <div className="mt-2 font-display text-2xl sm:text-3xl font-black text-foreground">{value}</div>
          {desc && <span className="text-xs text-muted-foreground mt-1.5 block font-medium">{desc}</span>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border", currentAccent.iconClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

// Metadata Detail item
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
        <Icon className="h-3 w-3 text-primary shrink-0" /> {label}
      </div>
      <div className="font-semibold text-foreground truncate max-w-[200px]" title={value}>{value}</div>
    </div>
  );
}
