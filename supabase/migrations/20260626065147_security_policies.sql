-- Enable Row Level Security (RLS)
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE techverger_members ENABLE ROW LEVEL SECURITY;

-- 1. Districts Policies
CREATE POLICY "Allow public read access to districts"
  ON districts FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2. Departments Policies
CREATE POLICY "Allow public read access to departments"
  ON departments FOR SELECT
  TO anon, authenticated
  USING (true);

-- 3. Services Policies
CREATE POLICY "Allow public read access to services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Projects Policies
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. Reports Policies
CREATE POLICY "Allow public read access to reports"
  ON reports FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow reporters to update their own reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = reporter_id)
  WITH CHECK (auth.uid() = reporter_id);

-- 6. TechVerger Members Policies
CREATE POLICY "Allow public read access to members"
  ON techverger_members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow members to insert their own profile"
  ON techverger_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow members to update their own profile"
  ON techverger_members FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
