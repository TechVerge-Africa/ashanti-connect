"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Calendar, MapPin, Search, ArrowUpRight, 
  TrendingUp, Wallet, Percent, ShieldCheck, Construction, 
  Droplets, Zap, Trash2, GraduationCap, HeartPulse, Wheat,
  FolderKanban, Clock, CheckCircle2, AlertTriangle, AlertCircle,
  HelpCircle, Sparkles, Filter, X, Heart, Star, Check, Mail, 
  UserCheck
} from "lucide-react";
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

export function ProjectsExplorer({ projects: initialProjects }: { projects: Project[] }) {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [likedProjects, setLikedProjects] = React.useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = React.useState<"overview" | "timeline" | "updates">("overview");

  React.useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const categories = ["all", "roads", "water", "education", "healthcare", "electricity", "sanitation"];
  const statuses = ["all", "ongoing", "completed", "delayed", "planning"];

  // Handle Project Liking
  const handleLike = (projectId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyLiked = likedProjects[projectId];
    setLikedProjects(prev => ({
      ...prev,
      [projectId]: !isCurrentlyLiked
    }));

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const baseLikes = p.likes || 0;
        return {
          ...p,
          likes: isCurrentlyLiked ? Math.max(0, baseLikes - 1) : baseLikes + 1
        };
      }
      return p;
    }));

    // If modal is open, sync the selected project state
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => {
        if (!prev) return null;
        const baseLikes = prev.likes || 0;
        return {
          ...prev,
          likes: isCurrentlyLiked ? Math.max(0, baseLikes - 1) : baseLikes + 1
        };
      });
    }
  };

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
              const isLiked = likedProjects[p.id] || false;

              // Generate contractor shortcode
              const contractorShort = p.contractor.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { setSelectedProject(p); setActiveTab("overview"); }}
                  className="group relative rounded-2xl border border-white/[0.08] bg-card/60 backdrop-blur-md p-0 transition-all duration-300 hover:border-primary/45 hover:shadow-glow-emerald-sm overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Aspect Ratio Image Container */}
                  <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-white/[0.06]">
                    {p.image ? (
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                        <FolderKanban className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Hover Glow Light Overlay */}
                    <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1.5 border-black/40 bg-black/60 backdrop-blur-md text-xs font-semibold uppercase tracking-wider py-1 px-2.5 text-white">
                        <CatIcon className="h-3.5 w-3.5 text-primary" />
                        {categoryLabels[p.category as keyof typeof categoryLabels]}
                      </Badge>
                      <Badge className={cn("flex items-center gap-1 py-1 px-2.5 text-xs font-semibold uppercase tracking-wider border backdrop-blur-md bg-black/50", status.color, status.borderColor)}>
                        <StatusIcon className="h-3.5 w-3.5 shrink-0" />
                        {status.label}
                      </Badge>
                    </div>

                    {/* Floating Support Hearts */}
                    <button 
                      onClick={(e) => handleLike(p.id, e)}
                      className={cn(
                        "absolute right-4 top-4 h-9 w-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 hover:scale-110",
                        isLiked 
                          ? "bg-red-500/25 border-red-500 text-red-400" 
                          : "bg-black/65 border-white/10 text-muted-foreground hover:text-white"
                      )}
                    >
                      <Heart className={cn("h-4.5 w-4.5", isLiked && "fill-red-500 text-red-400")} />
                    </button>

                    {/* Left Bottom Overlapping Contractor Ring */}
                    <div className="absolute left-6 -bottom-5 flex items-center justify-center h-10 w-10 rounded-full border border-white/[0.08] bg-black/80 backdrop-blur-md shadow-md text-xs font-bold text-primary" title={`Contractor: ${p.contractor}`}>
                      {contractorShort}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 pt-7 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg sm:text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {p.name}
                        </h3>
                        <div className="text-right shrink-0">
                          <div className="font-display text-2xl font-black text-primary leading-none">{p.completion}%</div>
                          <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Complete</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    {/* Modern Completion Progress Bar */}
                    <div className="mt-5 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                        <span>Timeline Progress</span>
                        <span className="text-foreground">{p.completion}%</span>
                      </div>
                      <Progress 
                        value={p.completion} 
                        className="h-2 bg-secondary/80" 
                        indicatorClassName="bg-gradient-to-r from-primary via-primary to-gold border-r border-gold/45" 
                      />
                    </div>

                    {/* Details Row */}
                    <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 border-t border-white/[0.06] pt-5 text-xs">
                      <DetailItem icon={MapPin} label="District Assembly" value={p.district} />
                      <DetailItem icon={Building2} label="Lead Contractor" value={p.contractor} />
                      
                      <div>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          <Wallet className="h-3.5 w-3.5 text-primary shrink-0" /> Budget Allocation
                        </div>
                        <div className="font-bold text-foreground">{formatCurrency(p.budget)}</div>
                        <div className="text-[9px] text-muted-foreground mt-0.5">Disbursed: {spentPercent}% ({formatCurrency(p.spent)})</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          <Calendar className="h-3.5 w-3.5 text-gold shrink-0" /> Target Timeline
                        </div>
                        <div className="font-medium text-foreground">{formatDate(p.startDate)}</div>
                        <div className="text-[9px] text-muted-foreground mt-0.5">Target End: {formatDate(p.endDate)}</div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500/20" />
                        {p.likes || 0} Citizens Support
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(p);
                          setActiveTab("overview");
                        }}
                        className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-white transition-colors"
                      >
                        Oversight Details <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            {/* Modal Backdrop Close Trigger */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedProject(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0c1310] shadow-2xl shadow-emerald-950/20 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              
              {/* Header Image Section */}
              <div className="relative aspect-[21/9] w-full shrink-0">
                {selectedProject.image ? (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1310] via-black/40 to-transparent" />
                
                {/* Float Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 h-9 w-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:scale-105 transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Left Bottom Information */}
                <div className="absolute left-6 bottom-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-white/15 bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 text-white">
                      {categoryLabels[selectedProject.category as keyof typeof categoryLabels]}
                    </Badge>
                    <Badge className={cn("text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md bg-black/40", statusConfig[selectedProject.status]?.color, statusConfig[selectedProject.status]?.borderColor)}>
                      {statusConfig[selectedProject.status]?.label}
                    </Badge>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight pr-10">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>

              {/* Tab Navigation Menu */}
              <div className="flex border-b border-white/[0.06] bg-black/40 px-6 shrink-0">
                {(["overview", "timeline", "updates"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "relative py-4 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer mr-4 capitalize",
                      activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="modal-tab-indicator" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Modal Body (Scrollable Container) */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar text-sm">
                
                {/* 1. Overview Tab content */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">Project Scope Description</h4>
                      <p className="text-foreground leading-relaxed text-sm bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Progress Rings & Financial Meters */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="border border-white/[0.06] rounded-xl bg-black/20 p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Completion Rate</span>
                          <div className="text-3xl font-black text-foreground">{selectedProject.completion}%</div>
                          <span className="text-[10px] text-muted-foreground font-medium block">Time Elapsed vs Goal</span>
                        </div>
                        {/* Circular SVG Ring */}
                        <div className="relative h-16 w-16">
                          <svg className="h-full w-full -rotate-90">
                            <circle cx="32" cy="32" r="28" className="stroke-white/[0.04] fill-none" strokeWidth="6" />
                            <circle 
                              cx="32" cy="32" r="28" 
                              className="stroke-primary fill-none transition-all duration-500" 
                              strokeWidth="6" 
                              strokeDasharray={`${2 * Math.PI * 28}`}
                              strokeDashoffset={`${2 * Math.PI * 28 * (1 - selectedProject.completion / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary">
                            {selectedProject.completion}%
                          </div>
                        </div>
                      </div>

                      <div className="border border-white/[0.06] rounded-xl bg-black/20 p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Fund Disbursement</span>
                          <div className="text-3xl font-black text-gold">
                            {Math.round((selectedProject.spent / selectedProject.budget) * 100)}%
                          </div>
                          <span className="text-[10px] text-muted-foreground font-medium block">
                            Spent: {formatCurrency(selectedProject.spent)}
                          </span>
                        </div>
                        {/* Circular SVG Ring */}
                        <div className="relative h-16 w-16">
                          <svg className="h-full w-full -rotate-90">
                            <circle cx="32" cy="32" r="28" className="stroke-white/[0.04] fill-none" strokeWidth="6" />
                            <circle 
                              cx="32" cy="32" r="28" 
                              className="stroke-gold fill-none transition-all duration-500" 
                              strokeWidth="6" 
                              strokeDasharray={`${2 * Math.PI * 28}`}
                              strokeDashoffset={`${2 * Math.PI * 28 * (1 - (selectedProject.spent / selectedProject.budget))}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gold">
                            {Math.round((selectedProject.spent / selectedProject.budget) * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Box */}
                    <div className="grid gap-4 sm:grid-cols-2 border border-white/[0.06] rounded-xl bg-black/10 p-5">
                      <DetailItem icon={MapPin} label="District Area Office" value={selectedProject.district} />
                      <DetailItem icon={Calendar} label="Date Initiated" value={formatDate(selectedProject.startDate)} />
                      <DetailItem icon={Wallet} label="Total Cost Allocation" value={formatCurrency(selectedProject.budget)} />
                      <DetailItem icon={Clock} label="Target Delivery Completion" value={formatDate(selectedProject.endDate)} />
                    </div>

                    {/* Contractor detailed profile */}
                    {selectedProject.contractorDetails && (
                      <div className="border border-white/[0.07] bg-white/[0.01] rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block mb-0.5">Assigned Agency/Contractor</span>
                            <div className="flex items-center gap-1.5">
                              <h5 className="font-bold text-foreground text-base">
                                {selectedProject.contractorDetails.name}
                              </h5>
                              {selectedProject.contractorDetails.verified && (
                                <Badge variant="outline" className="text-[8px] font-extrabold uppercase bg-emerald-500/10 border-emerald-500/30 text-emerald-400 py-0 px-1.5 flex items-center gap-0.5">
                                  <UserCheck className="h-2 w-2" /> Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 font-bold text-gold text-sm bg-gold/5 border border-gold/15 rounded-lg py-1 px-2.5">
                            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                            {selectedProject.contractorDetails.rating.toFixed(1)}
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 text-xs text-muted-foreground pt-1">
                          <span className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            Completed {selectedProject.contractorDetails.completedCount} Projects in Ashanti
                          </span>
                          <span className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gold shrink-0" />
                            {selectedProject.contractorDetails.contactEmail}
                          </span>
                        </div>

                        <div className="pt-2">
                          <a 
                            href={`mailto:${selectedProject.contractorDetails.contactEmail}?subject=Oversight Inquiry: ${encodeURIComponent(selectedProject.name)}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white px-4 py-2 text-xs font-bold text-muted-foreground transition-all cursor-pointer w-full"
                          >
                            <Mail className="h-3.5 w-3.5 text-primary" /> Contact Construction Team
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Timeline Tab content */}
                {activeTab === "timeline" && (
                  <div className="space-y-4 py-2">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-4">Milestone Progress Tracking</h4>
                    
                    {selectedProject.timeline && selectedProject.timeline.length > 0 ? (
                      <div className="relative pl-6 border-l border-white/[0.07] ml-3 space-y-8">
                        {selectedProject.timeline.map((step, idx) => {
                          const isDone = step.status === "completed";
                          const isCurrent = step.status === "ongoing";
                          
                          return (
                            <div key={idx} className="relative">
                              {/* Connector Ring Anchor Point */}
                              <div className={cn(
                                "absolute -left-[31px] top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shadow-md",
                                isDone 
                                  ? "bg-emerald-500 border-emerald-500 text-white" 
                                  : isCurrent 
                                    ? "bg-[#0c1310] border-primary text-primary" 
                                    : "bg-secondary border-white/10 text-muted-foreground"
                              )}>
                                {isDone ? (
                                  <Check className="h-3 w-3 text-black stroke-[3px]" />
                                ) : isCurrent ? (
                                  <Clock className="h-2.5 w-2.5 animate-spin" />
                                ) : (
                                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                                )}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  <h5 className={cn(
                                    "font-bold text-sm",
                                    isDone ? "text-foreground" : isCurrent ? "text-primary" : "text-muted-foreground"
                                  )}>
                                    {step.phase}
                                  </h5>
                                  <Badge variant="outline" className={cn(
                                    "text-[8px] font-extrabold uppercase py-0 px-1.5",
                                    isDone 
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                      : isCurrent 
                                        ? "bg-primary/10 border-primary/30 text-primary" 
                                        : "bg-secondary border-border text-muted-foreground"
                                  )}>
                                    {step.status}
                                  </Badge>
                                </div>
                                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                                  {step.date ? `Target/Actual Date: ${formatDate(step.date)}` : "Pending Scheduled"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No detailed milestone timeline available for this project.
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Updates Tab content */}
                {activeTab === "updates" && (
                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Monthly Progress Feed Logs</h4>

                    {selectedProject.updates && selectedProject.updates.length > 0 ? (
                      <div className="space-y-4">
                        {selectedProject.updates.map((update, idx) => (
                          <div key={idx} className="border border-white/[0.06] rounded-xl bg-black/25 p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-foreground text-sm">
                                {update.title}
                              </h5>
                              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                {formatDate(update.date)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {update.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No progress updates logged yet.
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 border-t border-white/[0.06] bg-black/45 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleLike(selectedProject.id)}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all hover:scale-102 cursor-pointer",
                      likedProjects[selectedProject.id]
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08] text-foreground hover:text-white"
                    )}
                  >
                    <Heart className={cn("h-4.5 w-4.5", likedProjects[selectedProject.id] && "fill-red-500 text-red-400")} />
                    Support Project ({selectedProject.likes || 0})
                  </button>
                  
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" /> Verified Assembly Audit
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/portal/report?project=${encodeURIComponent(selectedProject.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-white border border-primary/20 hover:border-primary/45 px-4 py-2.5 rounded-xl transition-all cursor-pointer w-full sm:w-auto"
                  >
                    Report Concern <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all cursor-pointer w-full sm:w-auto shadow-glow-sm"
                  >
                    Close Oversight
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
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
      "relative rounded-2xl border border-white/[0.06] bg-card/60 backdrop-blur-md p-5 transition-all duration-300 overflow-hidden",
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
        <Icon className="h-3.5 w-3.5 text-primary shrink-0" /> {label}
      </div>
      <div className="font-semibold text-foreground truncate max-w-[200px]" title={value}>{value}</div>
    </div>
  );
}
