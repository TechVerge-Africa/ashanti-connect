import type { IssueCategory, OpportunityType, Priority, ReportStatus } from "@/lib/types";

export const categoryLabels: Record<IssueCategory, string> = {
  roads: "Roads",
  water: "Water",
  electricity: "Electricity",
  security: "Security",
  sanitation: "Sanitation",
  education: "Education",
  healthcare: "Healthcare",
  agriculture: "Agriculture",
};

export const categoryIcons: Record<IssueCategory, string> = {
  roads: "Construction",
  water: "Droplets",
  electricity: "Zap",
  security: "ShieldCheck",
  sanitation: "Trash2",
  education: "GraduationCap",
  healthcare: "HeartPulse",
  agriculture: "Wheat",
};

export const statusLabels: Record<ReportStatus, string> = {
  submitted: "Submitted",
  acknowledged: "Acknowledged",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  reopened: "Reopened",
  escalated: "Escalated",
};

export const statusVariant: Record<
  ReportStatus,
  "default" | "secondary" | "success" | "warning" | "info" | "destructive"
> = {
  submitted: "secondary",
  acknowledged: "info",
  assigned: "info",
  in_progress: "warning",
  resolved: "success",
  reopened: "warning",
  escalated: "destructive",
};

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const priorityVariant: Record<Priority, "secondary" | "info" | "warning" | "destructive"> = {
  low: "secondary",
  medium: "info",
  high: "warning",
  critical: "destructive",
};

export const opportunityLabels: Record<OpportunityType, string> = {
  job: "Job",
  scholarship: "Scholarship",
  grant: "Grant",
  internship: "Internship",
  training: "Training",
  entrepreneurship: "Enterprise",
};

export const opportunityIcons: Record<OpportunityType, string> = {
  job: "Briefcase",
  scholarship: "GraduationCap",
  grant: "BadgeDollarSign",
  internship: "Users",
  training: "BookOpen",
  entrepreneurship: "Rocket",
};
