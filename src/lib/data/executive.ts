import type { AiInsight, ExecutiveMetric, IssueCategory, TrendPoint } from "@/lib/types";

export const executiveMetrics: ExecutiveMetric[] = [
  { label: "Regional Health Score", value: 78, unit: "/100", delta: 3.2, trend: "up", goodWhen: "up" },
  { label: "Avg Resolution Time", value: 5.4, unit: "days", delta: -8.1, trend: "down", goodWhen: "down" },
  { label: "Citizen Satisfaction", value: 74, unit: "%", delta: 2.6, trend: "up", goodWhen: "up" },
  { label: "Open Reports", value: 747, delta: -4.5, trend: "down", goodWhen: "down" },
  { label: "Resolution Rate", value: 81, unit: "%", delta: 1.9, trend: "up", goodWhen: "up" },
  { label: "Projects On Track", value: 68, unit: "%", delta: -2.3, trend: "down", goodWhen: "up" },
];

export const trendData: TrendPoint[] = [
  { label: "Jan", reports: 820, resolved: 610, satisfaction: 68 },
  { label: "Feb", reports: 910, resolved: 700, satisfaction: 69 },
  { label: "Mar", reports: 1040, resolved: 860, satisfaction: 71 },
  { label: "Apr", reports: 980, resolved: 840, satisfaction: 72 },
  { label: "May", reports: 1120, resolved: 980, satisfaction: 73 },
  { label: "Jun", reports: 1190, resolved: 1060, satisfaction: 74 },
];

export const concernsByCategory: { category: IssueCategory; label: string; count: number; share: number }[] = [
  { category: "roads", label: "Roads", count: 1820, share: 28 },
  { category: "sanitation", label: "Sanitation", count: 1480, share: 23 },
  { category: "water", label: "Water", count: 1170, share: 18 },
  { category: "electricity", label: "Electricity", count: 840, share: 13 },
  { category: "education", label: "Education", count: 560, share: 9 },
  { category: "healthcare", label: "Healthcare", count: 390, share: 6 },
  { category: "security", label: "Security", count: 195, share: 3 },
];

export const aiInsights: AiInsight[] = [
  {
    id: "ai-1",
    headline: "Road complaints increased by 12% this week",
    detail: "Spike concentrated around Kumasi Metropolitan after recent rains. Recommend pre-positioning repair crews.",
    severity: "watch",
    metricDelta: "+12%",
  },
  {
    id: "ai-2",
    headline: "Three districts account for 58% of unresolved cases",
    detail: "Asante Akim Central, Bekwai, and Mampong are driving the regional backlog. Targeted support advised.",
    severity: "alert",
    metricDelta: "58%",
  },
  {
    id: "ai-3",
    headline: "Citizen sentiment improved after faster water responses",
    detail: "Positive sentiment up 6 points in Kumasi following 48-hour tanker deployment SLA.",
    severity: "info",
    metricDelta: "+6 pts",
  },
  {
    id: "ai-4",
    headline: "Sanitation resolution time trending above target",
    detail: "Average 9.1 days vs 5-day target. Waste-to-compost plant delays are a contributing factor.",
    severity: "watch",
    metricDelta: "9.1d",
  },
];

export const executiveSummary =
  "This week the Ashanti Region resolved 1,060 citizen issues (+8% week-on-week) while satisfaction rose to 74%. Road and sanitation complaints remain the top two concerns, with three districts driving more than half of the open backlog. Faster water response SLAs are improving sentiment in Kumasi. Recommend reallocating field crews toward Asante Akim Central and addressing sanitation delays linked to the compost plant timeline.";
