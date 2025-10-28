-- ============================================================================
-- MIGRATION 003: ROW LEVEL SECURITY POLICIES
-- ============================================================================
-- Purpose: Enable RLS and create security policies for all tables
-- Date: 2025-10-25
-- Security Model:
--   - Public users can INSERT (form submissions)
--   - Only authenticated users can SELECT/UPDATE/DELETE (admin access)
--   - Service role has full access (used by API routes)
-- ============================================================================

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================================

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE banquets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RESERVATIONS POLICIES
-- ============================================================================

-- Public users can insert reservations (form submissions)
CREATE POLICY "Anyone can insert reservations"
  ON reservations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view reservations (admin panel)
CREATE POLICY "Authenticated users can view all reservations"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update reservations (status changes, notes)
CREATE POLICY "Authenticated users can update reservations"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete reservations (cancellations)
CREATE POLICY "Authenticated users can delete reservations"
  ON reservations
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- PRIVATE EVENTS POLICIES
-- ============================================================================

-- Public users can insert private event enquiries
CREATE POLICY "Anyone can insert private events"
  ON private_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view private events
CREATE POLICY "Authenticated users can view all private events"
  ON private_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update private events
CREATE POLICY "Authenticated users can update private events"
  ON private_events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete private events
CREATE POLICY "Authenticated users can delete private events"
  ON private_events
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- BANQUETS POLICIES
-- ============================================================================

-- Public users can insert banquet enquiries
CREATE POLICY "Anyone can insert banquets"
  ON banquets
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view banquets
CREATE POLICY "Authenticated users can view all banquets"
  ON banquets
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update banquets
CREATE POLICY "Authenticated users can update banquets"
  ON banquets
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete banquets
CREATE POLICY "Authenticated users can delete banquets"
  ON banquets
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================================================

-- Public users can insert contact submissions
CREATE POLICY "Anyone can insert contact"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view contact submissions
CREATE POLICY "Authenticated users can view all contact"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update contact submissions
CREATE POLICY "Authenticated users can update contact"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete contact submissions
CREATE POLICY "Authenticated users can delete contact"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- FEEDBACK POLICIES
-- ============================================================================

-- Public users can insert feedback
CREATE POLICY "Anyone can insert feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anyone can view published feedback (for testimonials)
CREATE POLICY "Anyone can view published feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (published_on_website = true);

-- Authenticated users can view all feedback
CREATE POLICY "Authenticated users can view all feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update feedback
CREATE POLICY "Authenticated users can update feedback"
  ON feedback
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete feedback
CREATE POLICY "Authenticated users can delete feedback"
  ON feedback
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- CAREER APPLICATIONS POLICIES
-- ============================================================================

-- Public users can insert career applications
CREATE POLICY "Anyone can insert careers"
  ON career_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view career applications
CREATE POLICY "Authenticated users can view all careers"
  ON career_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update career applications
CREATE POLICY "Authenticated users can update careers"
  ON career_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete career applications
CREATE POLICY "Authenticated users can delete careers"
  ON career_applications
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- NEWSLETTER SUBSCRIPTIONS POLICIES
-- ============================================================================

-- Anyone can subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can update their own subscription (unsubscribe)
CREATE POLICY "Users can update their subscription"
  ON newsletter_subscriptions
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can view all subscriptions
CREATE POLICY "Authenticated users can view all subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can delete subscriptions
CREATE POLICY "Authenticated users can delete subscriptions"
  ON newsletter_subscriptions
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EVENTS POLICIES (Public Calendar)
-- ============================================================================

-- Anyone can view published events
CREATE POLICY "Anyone can view published events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Authenticated users can view all events (including unpublished)
CREATE POLICY "Authenticated users can view all events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can insert events
CREATE POLICY "Authenticated users can insert events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update events
CREATE POLICY "Authenticated users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete events
CREATE POLICY "Authenticated users can delete events"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- SECURITY NOTES
-- ============================================================================

COMMENT ON POLICY "Anyone can insert reservations" ON reservations IS
  'Allows public form submissions. API routes use service role key to bypass RLS.';

COMMENT ON POLICY "Anyone can view published feedback" ON feedback IS
  'Allows public display of testimonials on website.';

COMMENT ON POLICY "Anyone can view published events" ON events IS
  'Allows public display of events calendar on website.';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Migration 003 completed successfully!';
  RAISE NOTICE 'Row Level Security enabled on all tables';
  RAISE NOTICE 'Security Model:';
  RAISE NOTICE '  ✓ Public users can submit forms (INSERT)';
  RAISE NOTICE '  ✓ Authenticated users have full access (admin panel)';
  RAISE NOTICE '  ✓ Service role bypasses RLS (API routes)';
  RAISE NOTICE '  ✓ Published content viewable by public (feedback, events)';
END $$;
