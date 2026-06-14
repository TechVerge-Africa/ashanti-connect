// Central data access layer.
// Every accessor is async so the swap to Supabase (or any API) is a drop-in:
// replace the body with a `supabase.from(...).select()` call and the call sites
// (server components / React Query hooks) stay unchanged.

import { districts } from "./districts";
import { departments } from "./departments";
import { reports } from "./reports";
import { opportunities } from "./opportunities";
import { news, events } from "./content";
import { projects } from "./projects";
import { townHallTopics } from "./townhall";
import {
  aiInsights,
  concernsByCategory,
  executiveMetrics,
  executiveSummary,
  trendData,
} from "./executive";

export {
  districts,
  departments,
  reports,
  opportunities,
  news,
  events,
  projects,
  townHallTopics,
  aiInsights,
  concernsByCategory,
  executiveMetrics,
  executiveSummary,
  trendData,
};

const delay = (ms = 0) => new Promise((r) => setTimeout(r, ms));

export async function getReports() {
  await delay();
  return reports;
}

export async function getReportByTracking(tracking: string) {
  await delay();
  return reports.find((r) => r.trackingNumber.toLowerCase() === tracking.toLowerCase()) ?? null;
}

export async function getReportById(id: string) {
  await delay();
  return reports.find((r) => r.id === id) ?? null;
}

export async function getDepartments() {
  await delay();
  return departments;
}

export async function getDepartmentBySlug(slug: string) {
  await delay();
  return departments.find((d) => d.slug === slug) ?? null;
}

export async function getDistricts() {
  await delay();
  return districts;
}

export async function getOpportunities() {
  await delay();
  return opportunities;
}

export async function getProjects() {
  await delay();
  return projects;
}

export async function getNews() {
  await delay();
  return news;
}

export async function getEvents() {
  await delay();
  return events;
}

export async function getTownHallTopics() {
  await delay();
  return townHallTopics;
}
