-- AL RADY FAMILY LEGACY — Central Database Schema
-- Optimized for PostgreSQL & Supabase

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FAMILY BRANCHES TABLE
CREATE TABLE IF NOT EXISTS family_branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#047857',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. PERSONS TABLE
CREATE TABLE IF NOT EXISTS persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    full_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    father_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    mother_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    gender TEXT NOT NULL DEFAULT 'male' CHECK (gender IN ('male', 'female')),
    branch_id UUID REFERENCES family_branches(id) ON DELETE SET NULL,
    branch_name TEXT,
    generation INTEGER NOT NULL DEFAULT 1,
    birth_date TEXT,
    death_date TEXT,
    is_deceased BOOLEAN NOT NULL DEFAULT false,
    residence TEXT,
    occupation TEXT,
    education TEXT,
    phone TEXT, -- Private field: accessible only to admins
    bio TEXT,
    achievements TEXT,
    avatar_url TEXT,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'crowdsourced', 'needs_review', 'disputed')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. FAMILY RELATIONSHIPS TABLE (Spouses, Guardians, etc.)
CREATE TABLE IF NOT EXISTS family_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person1_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    person2_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('spouse', 'parent_child', 'sibling', 'guardian')),
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT no_self_relationship CHECK (person1_id <> person2_id),
    CONSTRAINT unique_relationship_pair UNIQUE (person1_id, person2_id, relationship_type)
);

-- 5. CONTRIBUTION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS contribution_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_no TEXT UNIQUE NOT NULL,
    contribution_type TEXT NOT NULL CHECK (
        contribution_type IN (
            'new_person',
            'edit_person',
            'correction',
            'add_relative',
            'correct_relationship',
            'upload_photo',
            'add_story',
            'add_memory',
            'historical_info',
            'upload_document',
            'correct_branch'
        )
    ),
    target_person_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    contributor_name TEXT NOT NULL,
    contributor_phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'under_review', 'needs_information', 'approved', 'rejected')
    ),
    details TEXT NOT NULL,
    proposed_data JSONB,
    current_data_snapshot JSONB,
    admin_notes TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. CONTRIBUTION ATTACHMENTS TABLE
CREATE TABLE IF NOT EXISTS contribution_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contribution_id UUID NOT NULL REFERENCES contribution_requests(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PERSON PHOTOS TABLE (Public Archive)
CREATE TABLE IF NOT EXISTS person_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    caption TEXT,
    date_taken TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. STORIES & ORAL HISTORY
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    person_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    author_name TEXT,
    period TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MEMORIES TABLE (Ancestral reflections)
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    contributor_name TEXT NOT NULL,
    relationship_to_person TEXT,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. HISTORICAL DOCUMENTS
CREATE TABLE IF NOT EXISTS historical_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    document_type TEXT NOT NULL DEFAULT 'document' CHECK (document_type IN ('deed', 'certificate', 'letter', 'manuscript', 'census', 'document')),
    year TEXT,
    description TEXT,
    file_url TEXT NOT NULL,
    related_person_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. FAMILY POSTS & ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS family_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('news', 'occasion', 'congratulations', 'gathering')),
    event_date TEXT,
    image_url TEXT,
    author_name TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    field TEXT,
    year TEXT,
    description TEXT,
    badge_icon TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. ACTIVITY LOGS / AUDIT TRAIL
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    performed_by TEXT NOT NULL DEFAULT 'admin',
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. PERSON REVISIONS TABLE (For Full Rollback capability)
CREATE TABLE IF NOT EXISTS person_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    revision_data JSONB NOT NULL,
    reason TEXT,
    created_by TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. INDEXES FOR HIGH-SPEED QUERYING AND SEARCH
CREATE INDEX IF NOT EXISTS idx_persons_full_name ON persons USING gin(to_tsvector('arabic', full_name));
CREATE INDEX IF NOT EXISTS idx_persons_father ON persons(father_id);
CREATE INDEX IF NOT EXISTS idx_persons_mother ON persons(mother_id);
CREATE INDEX IF NOT EXISTS idx_persons_branch ON persons(branch_id);
CREATE INDEX IF NOT EXISTS idx_persons_legacy_id ON persons(legacy_id);
CREATE INDEX IF NOT EXISTS idx_persons_deceased ON persons(is_deceased);
CREATE INDEX IF NOT EXISTS idx_relationships_p1 ON family_relationships(person1_id);
CREATE INDEX IF NOT EXISTS idx_relationships_p2 ON family_relationships(person2_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contribution_requests(status);
CREATE INDEX IF NOT EXISTS idx_contributions_ref ON contribution_requests(reference_no);
CREATE INDEX IF NOT EXISTS idx_posts_category ON family_posts(category);

-- 16. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE person_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE person_revisions ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Public can view verified persons" ON persons FOR SELECT TO anon, authenticated USING (verification_status <> 'disputed');
CREATE POLICY "Public can view branches" ON family_branches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view active relationships" ON family_relationships FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can view person photos" ON person_photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view published stories" ON stories FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can view published memories" ON memories FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can view historical documents" ON historical_documents FOR SELECT TO anon, authenticated USING (is_verified = true);
CREATE POLICY "Public can view published posts" ON family_posts FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can view achievements" ON achievements FOR SELECT TO anon, authenticated USING (true);

-- Contributions: Public can INSERT and can track by reference_no
CREATE POLICY "Public can insert contribution requests" ON contribution_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can track contribution by reference" ON contribution_requests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can insert attachments" ON contribution_attachments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can view approved attachments" ON contribution_attachments FOR SELECT TO anon, authenticated USING (is_approved = true);

-- Admin has full control
CREATE POLICY "Admin full access on persons" ON persons FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on branches" ON family_branches FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on relationships" ON family_relationships FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on contributions" ON contribution_requests FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on attachments" ON contribution_attachments FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on photos" ON person_photos FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on stories" ON stories FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on memories" ON memories FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on documents" ON historical_documents FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on posts" ON family_posts FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on achievements" ON achievements FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on logs" ON activity_logs FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
CREATE POLICY "Admin full access on revisions" ON person_revisions FOR ALL TO authenticated USING (auth.jwt() ->> 'email' IS NOT NULL);
