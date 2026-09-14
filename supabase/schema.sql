-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR LINKEDIN STRATEGY & NEWSLETTER APP
-- Execute this SQL script in the Supabase Dashboard -> SQL Editor
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE: linkedin_strategies
CREATE TABLE IF NOT EXISTS linkedin_strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Hook', 'Algorithme', 'Planning', 'Format', 'Engagement', 'Copywriting')),
  tags TEXT[] DEFAULT '{}',
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  examples TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for full text & tag searching
CREATE INDEX IF NOT EXISTS idx_linkedin_strategies_category ON linkedin_strategies(category);
CREATE INDEX IF NOT EXISTS idx_linkedin_strategies_tags ON linkedin_strategies USING GIN(tags);

-- 2. TABLE: newsletter_issues
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_number INT NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  subject_line TEXT NOT NULL,
  preview_text TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  content_markdown TEXT NOT NULL DEFAULT '',
  articles JSONB DEFAULT '[]'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for newsletter querying
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_status ON newsletter_issues(status);

-- 3. TABLE: newsletter_subscribers (Optional)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allow public read access to strategies and newsletters
ALTER TABLE linkedin_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access Strategies" ON linkedin_strategies FOR SELECT USING (true);
CREATE POLICY "Public Insert Strategies" ON linkedin_strategies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Strategies" ON linkedin_strategies FOR UPDATE USING (true);
CREATE POLICY "Public Delete Strategies" ON linkedin_strategies FOR DELETE USING (true);

CREATE POLICY "Public Read Access Newsletters" ON newsletter_issues FOR SELECT USING (true);
CREATE POLICY "Public Insert Newsletters" ON newsletter_issues FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Newsletters" ON newsletter_issues FOR UPDATE USING (true);
CREATE POLICY "Public Delete Newsletters" ON newsletter_issues FOR DELETE USING (true);

CREATE POLICY "Public Subscribers Access" ON newsletter_subscribers FOR ALL USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_linkedin_strategies_modtime
  BEFORE UPDATE ON linkedin_strategies
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_newsletter_issues_modtime
  BEFORE UPDATE ON newsletter_issues
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
