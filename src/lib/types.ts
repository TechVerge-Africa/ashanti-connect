// Domain model for Ashanti Connect.
// This is the single source of truth for the data layer. The mock providers in
// `src/lib/data` implement these shapes today; swapping in Supabase later means
// re-implementing the same async accessors against real tables/views.

export type IssueCategory =
  | "roads"
  | "water"
  | "electricity"
  | "security"
  | "sanitation"
  | "education"
  | "healthcare"
  | "agriculture";

export type ReportStatus =
  | "submitted"
  | "acknowledged"
  | "assigned"
  | "in_progress"
  | "resolved"
  | "reopened"
  | "escalated";

export type Priority = "low" | "medium" | "high" | "critical";

export interface District {
  id: string;
  name: string;
  capital: string;
  population: number;
  healthScore: number; // 0-100
  openReports: number;
  resolvedReports: number;
  avgResolutionDays: number;
  satisfaction: number; // 0-100
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  category: IssueCategory;
  description: string;
  icon: string; // lucide icon name
  lead: string;
  activeProjects: number;
  openCases: number;
  resolutionRate: number; // 0-100
  avgResponseHours: number;
}

export interface TimelineEvent {
  id: string;
  status: ReportStatus;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface ConversationMessage {
  id: string;
  author: string;
  role: "citizen" | "officer" | "system";
  body: string;
  timestamp: string;
}

export interface Report {
  id: string;
  trackingNumber: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: ReportStatus;
  priority: Priority;
  district: string;
  location: string;
  coordinates: { lat: number; lng: number };
  department: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  progress: number; // 0-100
  upvotes: number;
  attachments: { type: "image" | "video" | "document"; name: string }[];
  timeline: TimelineEvent[];
  conversation: ConversationMessage[];
  aiClassification: {
    category: IssueCategory;
    department: string;
    priority: Priority;
    confidence: number;
    sentiment: "positive" | "neutral" | "negative";
  };
}

export type OpportunityType =
  | "job"
  | "scholarship"
  | "grant"
  | "internship"
  | "training"
  | "entrepreneurship";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  organization: string;
  location: string;
  description: string;
  deadline: string;
  reward?: string;
  tags: string[];
  applicants: number;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readMins: number;
  image?: string;
  featured?: boolean;
}

export interface GovEvent {
  id: string;
  title: string;
  type: "town_hall" | "launch" | "consultation" | "deadline";
  date: string;
  location: string;
  description: string;
  attendees: number;
  isLive?: boolean;
}

export interface Project {
  id: string;
  name: string;
  category: IssueCategory;
  district: string;
  contractor: string;
  budget: number;
  spent: number;
  completion: number; // 0-100
  startDate: string;
  endDate: string;
  status: "planning" | "ongoing" | "delayed" | "completed";
  description: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface TownHallTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: string;
  upvotes: number;
  comments: number;
  status: "open" | "answered" | "scheduled";
  poll?: { question: string; options: PollOption[]; totalVotes: number };
  officialResponse?: { author: string; role: string; body: string; timestamp: string };
}

export interface ExecutiveMetric {
  label: string;
  value: number;
  unit?: string;
  delta: number; // percentage change
  trend: "up" | "down" | "flat";
  goodWhen: "up" | "down";
}

export interface TrendPoint {
  label: string;
  reports: number;
  resolved: number;
  satisfaction: number;
}

export interface AiInsight {
  id: string;
  headline: string;
  detail: string;
  severity: "info" | "watch" | "alert";
  metricDelta?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  lang?: "en" | "tw";
}
