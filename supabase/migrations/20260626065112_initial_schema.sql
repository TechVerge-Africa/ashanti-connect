-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Districts Table
CREATE TABLE IF NOT EXISTS districts (
  id text PRIMARY KEY,
  name text NOT NULL,
  capital text NOT NULL,
  population integer NOT NULL,
  health_score integer NOT NULL,
  open_reports integer NOT NULL,
  resolved_reports integer NOT NULL,
  avg_resolution_days numeric NOT NULL,
  satisfaction integer NOT NULL
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  icon text,
  lead text,
  active_projects integer NOT NULL DEFAULT 0,
  open_cases integer NOT NULL DEFAULT 0,
  resolution_rate integer NOT NULL DEFAULT 0,
  avg_response_hours integer NOT NULL DEFAULT 0
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  agency text NOT NULL,
  category text NOT NULL,
  icon text,
  tagline text,
  description text,
  channels text[] DEFAULT '{}'::text[],
  processing_time text,
  popular boolean DEFAULT false,
  fees jsonb DEFAULT '[]'::jsonb,
  required_documents text[] DEFAULT '{}'::text[],
  eligibility jsonb DEFAULT '[]'::jsonb,
  steps jsonb DEFAULT '[]'::jsonb,
  faqs jsonb DEFAULT '[]'::jsonb,
  offices text[] DEFAULT '{}'::text[]
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  status text NOT NULL,
  progress integer NOT NULL DEFAULT 0,
  district text NOT NULL,
  location text NOT NULL,
  coordinates_lat numeric,
  coordinates_lng numeric,
  budget bigint,
  spent bigint,
  image text,
  likes integer DEFAULT 0,
  contractor text,
  contractor_details jsonb DEFAULT '{}'::jsonb,
  start_date text,
  end_date text,
  updates jsonb DEFAULT '[]'::jsonb,
  timeline jsonb DEFAULT '[]'::jsonb,
  embedding vector(768)
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id text PRIMARY KEY,
  tracking_number text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  status text NOT NULL,
  priority text NOT NULL,
  district text NOT NULL,
  location text NOT NULL,
  coordinates_lat numeric NOT NULL,
  coordinates_lng numeric NOT NULL,
  department text NOT NULL,
  reporter text,
  reporter_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  progress integer NOT NULL DEFAULT 0,
  upvotes integer NOT NULL DEFAULT 0,
  attachments jsonb DEFAULT '[]'::jsonb,
  timeline jsonb DEFAULT '[]'::jsonb,
  conversation jsonb DEFAULT '[]'::jsonb,
  ai_classification jsonb DEFAULT '{}'::jsonb,
  embedding vector(768)
);

-- TechVerger Members Table
CREATE TABLE IF NOT EXISTS techverger_members (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  specialization text NOT NULL,
  github_link text,
  motivation text,
  membership_key text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for performance at scale
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_department ON reports(department);
CREATE INDEX IF NOT EXISTS idx_reports_tracking_number ON reports(tracking_number);
CREATE INDEX IF NOT EXISTS idx_techverger_members_email ON techverger_members(email);

-- Vector indexes for similarity searching
CREATE INDEX IF NOT EXISTS idx_projects_embedding ON projects USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_reports_embedding ON reports USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- RPC for Matching Projects
CREATE OR REPLACE FUNCTION match_projects (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  title text,
  description text,
  category text,
  status text,
  progress int,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    projects.id,
    projects.title,
    projects.description,
    projects.category,
    projects.status,
    projects.progress,
    1 - (projects.embedding <=> query_embedding) AS similarity
  FROM projects
  WHERE 1 - (projects.embedding <=> query_embedding) > match_threshold
  ORDER BY projects.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RPC for Matching Reports
CREATE OR REPLACE FUNCTION match_reports (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  tracking_number text,
  title text,
  description text,
  category text,
  status text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    reports.id,
    reports.tracking_number,
    reports.title,
    reports.description,
    reports.category,
    reports.status,
    1 - (reports.embedding <=> query_embedding) AS similarity
  FROM reports
  WHERE 1 - (reports.embedding <=> query_embedding) > match_threshold
  ORDER BY reports.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
