/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { createClient } from "@/lib/supabase/server";
import { districts as mockDistricts } from "./districts";
import { departments as mockDepartments } from "./departments";
import { reports as mockReports } from "./reports";
import { opportunities as mockOpportunities } from "./opportunities";
import { news as mockNews, events as mockEvents } from "./content";
import { projects as mockProjects } from "./projects";
import { townHallTopics as mockTownHallTopics } from "./townhall";
import { services as mockServices } from "./services";

import type { 
  District, 
  Department, 
  Report, 
  Project, 
  Service, 
  Opportunity, 
  NewsArticle, 
  GovEvent, 
  TownHallTopic 
} from "@/lib/types";

// ── Database Mapping Utilities ──

function mapDbDistrict(db: any): District {
  return {
    id: db.id,
    name: db.name,
    capital: db.capital,
    population: Number(db.population),
    healthScore: Number(db.health_score),
    openReports: Number(db.open_reports),
    resolvedReports: Number(db.resolved_reports),
    avgResolutionDays: Number(db.avg_resolution_days),
    satisfaction: Number(db.satisfaction),
  };
}

function mapDbDepartment(db: any): Department {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    category: db.category,
    description: db.description,
    icon: db.icon,
    lead: db.lead,
    activeProjects: Number(db.active_projects),
    openCases: Number(db.open_cases),
    resolutionRate: Number(db.resolution_rate),
    avgResponseHours: Number(db.avg_response_hours),
  };
}

function mapDbReport(db: any): Report {
  return {
    id: db.id,
    trackingNumber: db.tracking_number,
    title: db.title,
    description: db.description,
    category: db.category,
    status: db.status,
    priority: db.priority,
    district: db.district,
    location: db.location,
    coordinates: { lat: Number(db.coordinates_lat), lng: Number(db.coordinates_lng) },
    department: db.department,
    reporter: db.reporter,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
    progress: Number(db.progress),
    upvotes: Number(db.upvotes),
    attachments: db.attachments || [],
    timeline: db.timeline || [],
    conversation: db.conversation || [],
    aiClassification: db.ai_classification || {},
  };
}

function mapDbProject(db: any): Project {
  return {
    id: db.id,
    name: db.title, // maps title (db) to name (frontend)
    category: db.category,
    district: db.district,
    contractor: db.contractor,
    budget: Number(db.budget),
    spent: Number(db.spent),
    completion: Number(db.progress), // maps progress (db) to completion (frontend)
    startDate: db.start_date,
    endDate: db.end_date,
    status: db.status,
    description: db.description,
    image: db.image,
    contractorDetails: db.contractor_details || {},
    updates: db.updates || [],
    timeline: db.timeline || [],
    likes: Number(db.likes || 0),
  };
}

function mapDbService(db: any): Service {
  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    agency: db.agency,
    category: db.category,
    icon: db.icon,
    tagline: db.tagline,
    description: db.description,
    channels: db.channels || [],
    processingTime: db.processing_time,
    popular: db.popular,
    fees: db.fees || [],
    requiredDocuments: db.required_documents || [],
    eligibility: db.eligibility || [],
    steps: db.steps || [],
    faqs: db.faqs || [],
    offices: db.offices || [],
  };
}

// ── Live Supabase Queries ──

export async function getReports(): Promise<Report[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getReports error:", error.message);
      return mockReports;
    }
    return data.map(mapDbReport);
  } catch (e: any) {
    console.error("getReports exception:", e.message);
    return mockReports;
  }
}

export async function getReportByTracking(tracking: string): Promise<Report | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("tracking_number", tracking)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase getReportByTracking error:", error.message);
      return mockReports.find((r) => r.trackingNumber.toLowerCase() === tracking.toLowerCase()) ?? null;
    }
    return mapDbReport(data);
  } catch (e: any) {
    console.error("getReportByTracking exception:", e.message);
    return mockReports.find((r) => r.trackingNumber.toLowerCase() === tracking.toLowerCase()) ?? null;
  }
}

export async function getReportById(id: string): Promise<Report | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase getReportById error:", error.message);
      return mockReports.find((r) => r.id === id) ?? null;
    }
    return mapDbReport(data);
  } catch (e: any) {
    console.error("getReportById exception:", e.message);
    return mockReports.find((r) => r.id === id) ?? null;
  }
}

export async function getDepartments(): Promise<Department[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("departments").select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getDepartments error:", error.message);
      return mockDepartments;
    }
    return data.map(mapDbDepartment);
  } catch (e: any) {
    console.error("getDepartments exception:", e.message);
    return mockDepartments;
  }
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase getDepartmentBySlug error:", error.message);
      return mockDepartments.find((d) => d.slug === slug) ?? null;
    }
    return mapDbDepartment(data);
  } catch (e: any) {
    console.error("getDepartmentBySlug exception:", e.message);
    return mockDepartments.find((d) => d.slug === slug) ?? null;
  }
}

export async function getDistricts(): Promise<District[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("districts").select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getDistricts error:", error.message);
      return mockDistricts;
    }
    return data.map(mapDbDistrict);
  } catch (e: any) {
    console.error("getDistricts exception:", e.message);
    return mockDistricts;
  }
}

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("opportunities").select("*");
    if (error || !data || data.length === 0) return mockOpportunities;
    return data;
  } catch {
    return mockOpportunities;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getProjects error:", error.message);
      return mockProjects;
    }
    return data.map(mapDbProject);
  } catch (e: any) {
    console.error("getProjects exception:", e.message);
    return mockProjects;
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("news").select("*");
    if (error || !data || data.length === 0) return mockNews;
    return data;
  } catch {
    return mockNews;
  }
}

export async function getEvents(): Promise<GovEvent[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("events").select("*");
    if (error || !data || data.length === 0) return mockEvents;
    return data;
  } catch {
    return mockEvents;
  }
}

export async function getTownHallTopics(): Promise<TownHallTopic[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("townhall_topics").select("*");
    if (error || !data || data.length === 0) return mockTownHallTopics;
    return data;
  } catch {
    return mockTownHallTopics;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("services").select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getServices error:", error.message);
      return mockServices;
    }
    return data.map(mapDbService);
  } catch (e: any) {
    console.error("getServices exception:", e.message);
    return mockServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase getServiceBySlug error:", error.message);
      return mockServices.find((s) => s.slug === slug) ?? null;
    }
    return mapDbService(data);
  } catch (e: any) {
    console.error("getServiceBySlug exception:", e.message);
    return mockServices.find((s) => s.slug === slug) ?? null;
  }
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("category", category);

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase getServicesByCategory error:", error.message);
      return mockServices.filter((s) => s.category === category);
    }
    return data.map(mapDbService);
  } catch (e: any) {
    console.error("getServicesByCategory exception:", e.message);
    return mockServices.filter((s) => s.category === category);
  }
}
