-- ============================================================================
-- AMANTE RESTAURANT WEBSITE - DATABASE SCHEMA
-- ============================================================================
-- Database: PostgreSQL (via Supabase)
-- Version: 1.0
-- Date: 2025-10-24
-- Author: System Architect Agent
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE 1: RESERVATIONS (Table Bookings)
-- ============================================================================
-- Purpose: Store table reservation requests from customers
-- Related Form: /reservations
-- Related API: POST /api/reservations
-- ============================================================================

CREATE TABLE reservations (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Reservation details
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL CHECK (time IN ('11:00 AM', '1:00 PM', '3:00 PM', '7:00 PM', '9:00 PM', '11:00 PM')),
  party_size INTEGER NOT NULL CHECK (party_size >= 1 AND party_size <= 20),
  space_preference VARCHAR(50) CHECK (space_preference IN ('Rooftop Restaurant', 'Lounge', 'Café', 'Any')),
  occasion VARCHAR(100), -- Optional: Birthday, Anniversary, Business, etc.

  -- Customer information
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL, -- Format: +91XXXXXXXXXX
  email VARCHAR(100) NOT NULL,
  special_requests TEXT,
  agree_to_sms BOOLEAN DEFAULT false,

  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),

  -- Admin notes (for future admin panel)
  admin_notes TEXT,
  confirmed_by VARCHAR(100), -- Staff member who confirmed
  confirmed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for reservations
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_phone ON reservations(phone);
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_reservations_created_at ON reservations(created_at DESC);

-- Updated_at trigger for reservations
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for reservations
COMMENT ON TABLE reservations IS 'Stores table reservation requests from customers';
COMMENT ON COLUMN reservations.id IS 'Unique reservation identifier';
COMMENT ON COLUMN reservations.date IS 'Requested reservation date';
COMMENT ON COLUMN reservations.time IS 'Requested time slot';
COMMENT ON COLUMN reservations.party_size IS 'Number of guests (1-20)';
COMMENT ON COLUMN reservations.space_preference IS 'Preferred dining space';
COMMENT ON COLUMN reservations.occasion IS 'Special occasion if any';
COMMENT ON COLUMN reservations.status IS 'Current status of reservation';

-- ============================================================================
-- TABLE 2: PRIVATE EVENTS (Private Event Enquiries)
-- ============================================================================
-- Purpose: Store private event enquiry requests
-- Related Form: /private-events
-- Related API: POST /api/private-events
-- ============================================================================

CREATE TABLE private_events (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Event details
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('Birthday', 'Anniversary', 'Corporate', 'Proposal', 'Celebration', 'Other')),
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count >= 1),
  budget_range VARCHAR(50) CHECK (budget_range IN ('₹50k-1L', '₹1L-2L', '₹2L-5L', '₹5L+')),
  space_preference VARCHAR(50) CHECK (space_preference IN ('Private Dining', 'Rooftop Restaurant', 'Banquet Hall', 'Lounge', 'Any')),

  -- Customer information
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company VARCHAR(100), -- Optional, for corporate events
  requirements TEXT, -- Detailed requirements
  preferred_contact VARCHAR(20) CHECK (preferred_contact IN ('Phone', 'WhatsApp', 'Email')),

  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'confirmed', 'cancelled', 'completed')),

  -- Admin data (for future admin panel)
  admin_notes TEXT,
  quote_sent_at TIMESTAMP WITH TIME ZONE,
  quote_amount DECIMAL(10, 2),
  assigned_to VARCHAR(100), -- Events manager assigned

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for private_events
CREATE INDEX idx_private_events_event_date ON private_events(event_date);
CREATE INDEX idx_private_events_status ON private_events(status);
CREATE INDEX idx_private_events_phone ON private_events(phone);
CREATE INDEX idx_private_events_email ON private_events(email);
CREATE INDEX idx_private_events_created_at ON private_events(created_at DESC);

-- Updated_at trigger for private_events
CREATE TRIGGER update_private_events_updated_at
  BEFORE UPDATE ON private_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for private_events
COMMENT ON TABLE private_events IS 'Stores private event enquiry requests';
COMMENT ON COLUMN private_events.event_type IS 'Type of private event';
COMMENT ON COLUMN private_events.budget_range IS 'Expected budget range';
COMMENT ON COLUMN private_events.requirements IS 'Detailed event requirements';

-- ============================================================================
-- TABLE 3: BANQUETS (Banquet/Wedding Booking Enquiries)
-- ============================================================================
-- Purpose: Store large event and wedding enquiries
-- Related Form: /banquets (form on banquets page)
-- Related API: POST /api/banquets
-- ============================================================================

CREATE TABLE banquets (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Event details
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('Wedding', 'Reception', 'Sangeet', 'Corporate Event', 'Conference', 'Exhibition', 'Other')),
  event_date DATE NOT NULL,
  alternate_date DATE, -- Backup date option
  guest_count INTEGER NOT NULL CHECK (guest_count >= 50), -- Minimum 50 for banquets
  timing_from TIME NOT NULL,
  timing_to TIME NOT NULL,

  -- Requirements (stored as JSON array or comma-separated)
  requirements TEXT[], -- Array of: Catering, Decoration, Photography, DJ, Valet, Accommodation, etc.

  -- Customer information
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  city VARCHAR(100), -- Customer's city
  hear_about_us VARCHAR(50), -- Marketing: Google, Instagram, Referral, Wedding Planner, etc.
  additional_notes TEXT,
  request_type VARCHAR(20) CHECK (request_type IN ('Site Visit', 'Quote', 'Both')),

  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'site_visit_scheduled', 'quote_sent', 'negotiating', 'confirmed', 'cancelled', 'completed')),

  -- Admin data
  admin_notes TEXT,
  site_visit_date TIMESTAMP WITH TIME ZONE,
  quote_sent_at TIMESTAMP WITH TIME ZONE,
  quote_amount DECIMAL(12, 2), -- Larger amounts for banquets
  advance_paid DECIMAL(12, 2) DEFAULT 0,
  assigned_to VARCHAR(100), -- Banquet manager assigned

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for banquets
CREATE INDEX idx_banquets_event_date ON banquets(event_date);
CREATE INDEX idx_banquets_status ON banquets(status);
CREATE INDEX idx_banquets_phone ON banquets(phone);
CREATE INDEX idx_banquets_email ON banquets(email);
CREATE INDEX idx_banquets_created_at ON banquets(created_at DESC);
CREATE INDEX idx_banquets_city ON banquets(city);

-- Updated_at trigger for banquets
CREATE TRIGGER update_banquets_updated_at
  BEFORE UPDATE ON banquets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for banquets
COMMENT ON TABLE banquets IS 'Stores banquet and large event enquiries';
COMMENT ON COLUMN banquets.guest_count IS 'Number of guests (minimum 50)';
COMMENT ON COLUMN banquets.requirements IS 'Array of service requirements';
COMMENT ON COLUMN banquets.request_type IS 'Whether customer wants site visit, quote, or both';

-- ============================================================================
-- TABLE 4: CONTACT SUBMISSIONS (General Contact Form)
-- ============================================================================
-- Purpose: Store general contact form submissions
-- Related Form: /contact
-- Related API: POST /api/contact
-- ============================================================================

CREATE TABLE contact_submissions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Submission details
  inquiry_type VARCHAR(50) NOT NULL CHECK (inquiry_type IN ('Reservation', 'Event', 'General', 'Corporate', 'Jobs', 'Press', 'Issue', 'Feedback')),

  -- Customer information
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,

  -- Status tracking
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),

  -- Admin data
  admin_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by VARCHAR(100),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for contact_submissions
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_inquiry_type ON contact_submissions(inquiry_type);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_email ON contact_submissions(email);

-- Updated_at trigger for contact_submissions
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for contact_submissions
COMMENT ON TABLE contact_submissions IS 'Stores general contact form submissions';
COMMENT ON COLUMN contact_submissions.inquiry_type IS 'Type of inquiry/reason for contact';

-- ============================================================================
-- TABLE 5: FEEDBACK (Customer Feedback & Reviews)
-- ============================================================================
-- Purpose: Store customer feedback and reviews
-- Related Form: /feedback
-- Related API: POST /api/feedback
-- ============================================================================

CREATE TABLE feedback (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Visit details
  visit_date DATE NOT NULL,
  space_visited VARCHAR(50) CHECK (space_visited IN ('Café & Bakery', 'Rooftop Restaurant', 'Lounge', 'Club', 'Private Dining', 'Banquet')),

  -- Ratings (1-5 stars)
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  food_rating INTEGER NOT NULL CHECK (food_rating >= 1 AND food_rating <= 5),
  service_rating INTEGER NOT NULL CHECK (service_rating >= 1 AND service_rating <= 5),
  ambiance_rating INTEGER NOT NULL CHECK (ambiance_rating >= 1 AND ambiance_rating <= 5),
  value_rating INTEGER NOT NULL CHECK (value_rating >= 1 AND value_rating <= 5),

  -- Feedback text
  what_you_loved TEXT,
  improvements TEXT,
  would_recommend VARCHAR(20) CHECK (would_recommend IN ('Definitely', 'Probably', 'Maybe', 'No')),

  -- Customer information (optional for feedback)
  name VARCHAR(100),
  email VARCHAR(100),
  can_share_publicly BOOLEAN DEFAULT false, -- Permission to use as testimonial

  -- Admin data
  featured BOOLEAN DEFAULT false, -- Mark as featured testimonial
  admin_notes TEXT,
  published_on_website BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for feedback
CREATE INDEX idx_feedback_visit_date ON feedback(visit_date DESC);
CREATE INDEX idx_feedback_overall_rating ON feedback(overall_rating);
CREATE INDEX idx_feedback_space_visited ON feedback(space_visited);
CREATE INDEX idx_feedback_can_share_publicly ON feedback(can_share_publicly);
CREATE INDEX idx_feedback_featured ON feedback(featured);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- Updated_at trigger for feedback
CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for feedback
COMMENT ON TABLE feedback IS 'Stores customer feedback and reviews';
COMMENT ON COLUMN feedback.can_share_publicly IS 'Customer permission to use as testimonial';
COMMENT ON COLUMN feedback.featured IS 'Admin flag for featured testimonials';

-- ============================================================================
-- TABLE 6: CAREER APPLICATIONS (Job Applications)
-- ============================================================================
-- Purpose: Store job application submissions
-- Related Form: /careers
-- Related API: POST /api/careers
-- ============================================================================

CREATE TABLE career_applications (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Position applied for
  position VARCHAR(100) NOT NULL CHECK (position IN ('Chef', 'Sous Chef', 'Bartender', 'Server', 'Host', 'Manager', 'Housekeeping', 'Kitchen Staff', 'Security', 'Other')),

  -- Applicant information
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  current_city VARCHAR(100) NOT NULL,

  -- Experience details
  experience_years INTEGER NOT NULL CHECK (experience_years >= 0 AND experience_years <= 50),
  current_position VARCHAR(100),
  expected_salary INTEGER, -- Monthly salary expectation in INR

  -- Documents
  resume_url TEXT NOT NULL, -- Supabase Storage URL
  portfolio_url TEXT, -- Optional: LinkedIn, website, etc.

  -- Application details
  why_amante TEXT NOT NULL, -- Why do you want to work at Amante?
  available_to_join DATE,

  -- Status tracking
  status VARCHAR(20) DEFAULT 'received' CHECK (status IN ('received', 'screening', 'interview_scheduled', 'interviewed', 'selected', 'rejected', 'offer_sent', 'joined')),

  -- Admin data
  admin_notes TEXT,
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  interview_scheduled_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for career_applications
CREATE INDEX idx_careers_position ON career_applications(position);
CREATE INDEX idx_careers_status ON career_applications(status);
CREATE INDEX idx_careers_email ON career_applications(email);
CREATE INDEX idx_careers_created_at ON career_applications(created_at DESC);
CREATE INDEX idx_careers_experience_years ON career_applications(experience_years);

-- Updated_at trigger for career_applications
CREATE TRIGGER update_career_applications_updated_at
  BEFORE UPDATE ON career_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for career_applications
COMMENT ON TABLE career_applications IS 'Stores job application submissions';
COMMENT ON COLUMN career_applications.resume_url IS 'URL to resume file in Supabase Storage';
COMMENT ON COLUMN career_applications.experience_years IS 'Years of relevant experience';

-- ============================================================================
-- ADDITIONAL TABLES (Future Phase 2)
-- ============================================================================

-- Newsletter subscriptions (Phase 2)
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100),
  subscribed BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscribed ON newsletter_subscriptions(subscribed);

-- Events calendar (Phase 2)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- Live Music, DJ Night, Special Menu, etc.
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  space VARCHAR(50), -- Where the event is held
  image_url TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50), -- Weekly, Monthly, etc.
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_published ON events(published);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
-- Note: Enable RLS in Supabase dashboard for production
-- These policies ensure data security

-- Enable RLS on all tables
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE banquets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Public insert policy (allow anyone to submit forms)
CREATE POLICY "Anyone can insert reservations" ON reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert private events" ON private_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert banquets" ON banquets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert feedback" ON feedback
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert careers" ON career_applications
  FOR INSERT WITH CHECK (true);

-- Admin read policy (only authenticated users can read - for future admin panel)
-- For now, we'll handle this via service role key in API routes

-- ============================================================================
-- UTILITY VIEWS (For Admin Dashboard - Phase 2)
-- ============================================================================

-- View: Recent reservations summary
CREATE OR REPLACE VIEW recent_reservations_summary AS
SELECT
  id,
  date,
  time,
  name,
  phone,
  party_size,
  space_preference,
  status,
  created_at
FROM reservations
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY created_at DESC;

-- View: Feedback statistics
CREATE OR REPLACE VIEW feedback_statistics AS
SELECT
  space_visited,
  COUNT(*) as total_reviews,
  ROUND(AVG(overall_rating), 2) as avg_overall_rating,
  ROUND(AVG(food_rating), 2) as avg_food_rating,
  ROUND(AVG(service_rating), 2) as avg_service_rating,
  ROUND(AVG(ambiance_rating), 2) as avg_ambiance_rating,
  ROUND(AVG(value_rating), 2) as avg_value_rating
FROM feedback
GROUP BY space_visited;

-- View: Upcoming reservations
CREATE OR REPLACE VIEW upcoming_reservations AS
SELECT
  id,
  date,
  time,
  name,
  phone,
  party_size,
  space_preference,
  status
FROM reservations
WHERE date >= CURRENT_DATE AND status != 'cancelled'
ORDER BY date ASC, time ASC;

-- ============================================================================
-- SAMPLE DATA (For Testing - Remove in Production)
-- ============================================================================

-- Sample reservation
INSERT INTO reservations (date, time, party_size, space_preference, occasion, name, phone, email, special_requests, status)
VALUES
  (CURRENT_DATE + 2, '7:00 PM', 4, 'Rooftop Restaurant', 'Birthday', 'Rahul Sharma', '+919876543210', 'rahul@example.com', 'Window seat preferred', 'pending');

-- Sample feedback
INSERT INTO feedback (visit_date, space_visited, overall_rating, food_rating, service_rating, ambiance_rating, value_rating, what_you_loved, would_recommend, name, email, can_share_publicly)
VALUES
  (CURRENT_DATE - 1, 'Rooftop Restaurant', 5, 5, 4, 5, 4, 'Amazing food and beautiful ambiance!', 'Definitely', 'Priya Verma', 'priya@example.com', true);

-- ============================================================================
-- DATABASE MAINTENANCE QUERIES
-- ============================================================================

-- Delete old test/cancelled reservations (run periodically)
-- DELETE FROM reservations WHERE status = 'cancelled' AND created_at < CURRENT_DATE - INTERVAL '90 days';

-- Archive old completed reservations (Phase 2)
-- CREATE TABLE reservations_archive AS SELECT * FROM reservations WHERE status = 'completed' AND date < CURRENT_DATE - INTERVAL '1 year';

-- ============================================================================
-- BACKUP & RESTORE NOTES
-- ============================================================================
-- Supabase provides automatic backups
-- Manual backup command: pg_dump -U postgres -h [host] [database] > backup.sql
-- Restore command: psql -U postgres -h [host] [database] < backup.sql

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
-- To apply this schema:
-- 1. Create a Supabase project
-- 2. Go to SQL Editor in Supabase dashboard
-- 3. Copy and paste this entire file
-- 4. Execute the SQL
-- 5. Verify all tables are created in Table Editor
-- ============================================================================
