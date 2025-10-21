-- Drop existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;

-- Disable RLS
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
