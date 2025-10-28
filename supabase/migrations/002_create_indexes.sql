-- ============================================================================
-- MIGRATION 002: CREATE INDEXES
-- ============================================================================
-- Purpose: Create indexes for optimized query performance
-- Date: 2025-10-25
-- Indexes for: reservations, private_events, banquets, contact_submissions,
--              feedback, career_applications, newsletter_subscriptions, events
-- ============================================================================

-- ============================================================================
-- RESERVATIONS INDEXES
-- ============================================================================

-- Index on reservation date for date-based queries
CREATE INDEX idx_reservations_date ON reservations(date);

-- Index on status for filtering by status
CREATE INDEX idx_reservations_status ON reservations(status);

-- Index on phone for customer lookup
CREATE INDEX idx_reservations_phone ON reservations(phone);

-- Index on email for customer lookup
CREATE INDEX idx_reservations_email ON reservations(email);

-- Index on created_at for sorting recent reservations
CREATE INDEX idx_reservations_created_at ON reservations(created_at DESC);

-- Composite index for date + time queries (finding available slots)
CREATE INDEX idx_reservations_date_time ON reservations(date, time);

-- Composite index for date + status (upcoming confirmed reservations)
CREATE INDEX idx_reservations_date_status ON reservations(date, status);

-- ============================================================================
-- PRIVATE EVENTS INDEXES
-- ============================================================================

-- Index on event date for date-based queries
CREATE INDEX idx_private_events_event_date ON private_events(event_date);

-- Index on status for filtering
CREATE INDEX idx_private_events_status ON private_events(status);

-- Index on phone for customer lookup
CREATE INDEX idx_private_events_phone ON private_events(phone);

-- Index on email for customer lookup
CREATE INDEX idx_private_events_email ON private_events(email);

-- Index on created_at for sorting
CREATE INDEX idx_private_events_created_at ON private_events(created_at DESC);

-- Index on event_type for analytics
CREATE INDEX idx_private_events_event_type ON private_events(event_type);

-- Composite index for date + status
CREATE INDEX idx_private_events_date_status ON private_events(event_date, status);

-- ============================================================================
-- BANQUETS INDEXES
-- ============================================================================

-- Index on event date for date-based queries
CREATE INDEX idx_banquets_event_date ON banquets(event_date);

-- Index on status for filtering
CREATE INDEX idx_banquets_status ON banquets(status);

-- Index on phone for customer lookup
CREATE INDEX idx_banquets_phone ON banquets(phone);

-- Index on email for customer lookup
CREATE INDEX idx_banquets_email ON banquets(email);

-- Index on created_at for sorting
CREATE INDEX idx_banquets_created_at ON banquets(created_at DESC);

-- Index on city for geographic analytics
CREATE INDEX idx_banquets_city ON banquets(city);

-- Index on event_type for analytics
CREATE INDEX idx_banquets_event_type ON banquets(event_type);

-- Index on hear_about_us for marketing analytics
CREATE INDEX idx_banquets_hear_about_us ON banquets(hear_about_us);

-- Composite index for date + status
CREATE INDEX idx_banquets_date_status ON banquets(event_date, status);

-- ============================================================================
-- CONTACT SUBMISSIONS INDEXES
-- ============================================================================

-- Index on status for filtering
CREATE INDEX idx_contact_status ON contact_submissions(status);

-- Index on inquiry_type for filtering
CREATE INDEX idx_contact_inquiry_type ON contact_submissions(inquiry_type);

-- Index on created_at for sorting
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);

-- Index on email for customer lookup
CREATE INDEX idx_contact_email ON contact_submissions(email);

-- Composite index for status + created_at (pending items by date)
CREATE INDEX idx_contact_status_created ON contact_submissions(status, created_at DESC);

-- ============================================================================
-- FEEDBACK INDEXES
-- ============================================================================

-- Index on visit_date for date-based queries
CREATE INDEX idx_feedback_visit_date ON feedback(visit_date DESC);

-- Index on overall_rating for filtering high/low ratings
CREATE INDEX idx_feedback_overall_rating ON feedback(overall_rating);

-- Index on space_visited for space-specific feedback
CREATE INDEX idx_feedback_space_visited ON feedback(space_visited);

-- Index on can_share_publicly for testimonial selection
CREATE INDEX idx_feedback_can_share_publicly ON feedback(can_share_publicly);

-- Index on featured for homepage testimonials
CREATE INDEX idx_feedback_featured ON feedback(featured);

-- Index on created_at for sorting
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- Index on published_on_website for displaying testimonials
CREATE INDEX idx_feedback_published ON feedback(published_on_website);

-- Composite index for public testimonials (featured + can_share)
CREATE INDEX idx_feedback_public_featured ON feedback(can_share_publicly, featured, overall_rating DESC);

-- ============================================================================
-- CAREER APPLICATIONS INDEXES
-- ============================================================================

-- Index on position for filtering by job type
CREATE INDEX idx_careers_position ON career_applications(position);

-- Index on status for filtering
CREATE INDEX idx_careers_status ON career_applications(status);

-- Index on email for applicant lookup
CREATE INDEX idx_careers_email ON career_applications(email);

-- Index on created_at for sorting
CREATE INDEX idx_careers_created_at ON career_applications(created_at DESC);

-- Index on experience_years for filtering by experience
CREATE INDEX idx_careers_experience_years ON career_applications(experience_years);

-- Index on current_city for location-based filtering
CREATE INDEX idx_careers_current_city ON career_applications(current_city);

-- Composite index for position + status
CREATE INDEX idx_careers_position_status ON career_applications(position, status);

-- ============================================================================
-- NEWSLETTER SUBSCRIPTIONS INDEXES
-- ============================================================================

-- Index on email (already unique, but for performance)
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);

-- Index on subscribed for active subscribers
CREATE INDEX idx_newsletter_subscribed ON newsletter_subscriptions(subscribed);

-- Index on created_at for analytics
CREATE INDEX idx_newsletter_created_at ON newsletter_subscriptions(created_at DESC);

-- ============================================================================
-- EVENTS INDEXES
-- ============================================================================

-- Index on event_date for date-based queries
CREATE INDEX idx_events_event_date ON events(event_date);

-- Index on published for displaying published events only
CREATE INDEX idx_events_published ON events(published);

-- Index on event_type for filtering
CREATE INDEX idx_events_event_type ON events(event_type);

-- Index on space for space-specific events
CREATE INDEX idx_events_space ON events(space);

-- Composite index for upcoming published events
CREATE INDEX idx_events_upcoming ON events(event_date, published) WHERE published = true;

-- Index on created_at for sorting
CREATE INDEX idx_events_created_at ON events(created_at DESC);

-- ============================================================================
-- PERFORMANCE ANALYSIS INDEXES
-- ============================================================================

-- Full-text search index on feedback text (for future search feature)
CREATE INDEX idx_feedback_text_search ON feedback USING gin(to_tsvector('english', what_you_loved || ' ' || COALESCE(improvements, '')));

-- Full-text search index on contact message
CREATE INDEX idx_contact_text_search ON contact_submissions USING gin(to_tsvector('english', message));

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Migration 002 completed successfully!';
  RAISE NOTICE 'Created indexes for all tables with optimizations for:';
  RAISE NOTICE '  - Date-based queries';
  RAISE NOTICE '  - Status filtering';
  RAISE NOTICE '  - Customer lookups';
  RAISE NOTICE '  - Analytics queries';
  RAISE NOTICE '  - Full-text search (feedback, contact)';
END $$;
