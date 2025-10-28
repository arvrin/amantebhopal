-- ============================================================================
-- MIGRATION 001: CREATE TABLES
-- ============================================================================
-- Purpose: Create all database tables for Amante Restaurant website
-- Date: 2025-10-25
-- Tables: reservations, private_events, banquets, contact_submissions,
--         feedback, career_applications, newsletter_subscriptions, events
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE 1: RESERVATIONS (Table Bookings)
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

-- Comments for private_events
COMMENT ON TABLE private_events IS 'Stores private event enquiry requests';
COMMENT ON COLUMN private_events.event_type IS 'Type of private event';
COMMENT ON COLUMN private_events.budget_range IS 'Expected budget range';
COMMENT ON COLUMN private_events.requirements IS 'Detailed event requirements';

-- ============================================================================
-- TABLE 3: BANQUETS (Banquet/Wedding Booking Enquiries)
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

-- Comments for banquets
COMMENT ON TABLE banquets IS 'Stores banquet and large event enquiries';
COMMENT ON COLUMN banquets.guest_count IS 'Number of guests (minimum 50)';
COMMENT ON COLUMN banquets.requirements IS 'Array of service requirements';
COMMENT ON COLUMN banquets.request_type IS 'Whether customer wants site visit, quote, or both';

-- ============================================================================
-- TABLE 4: CONTACT SUBMISSIONS (General Contact Form)
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

-- Comments for contact_submissions
COMMENT ON TABLE contact_submissions IS 'Stores general contact form submissions';
COMMENT ON COLUMN contact_submissions.inquiry_type IS 'Type of inquiry/reason for contact';

-- ============================================================================
-- TABLE 5: FEEDBACK (Customer Feedback & Reviews)
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

-- Comments for feedback
COMMENT ON TABLE feedback IS 'Stores customer feedback and reviews';
COMMENT ON COLUMN feedback.can_share_publicly IS 'Customer permission to use as testimonial';
COMMENT ON COLUMN feedback.featured IS 'Admin flag for featured testimonials';

-- ============================================================================
-- TABLE 6: CAREER APPLICATIONS (Job Applications)
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

-- Comments for career_applications
COMMENT ON TABLE career_applications IS 'Stores job application submissions';
COMMENT ON COLUMN career_applications.resume_url IS 'URL to resume file in Supabase Storage';
COMMENT ON COLUMN career_applications.experience_years IS 'Years of relevant experience';

-- ============================================================================
-- PHASE 2 TABLES (Newsletter & Events)
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

COMMENT ON TABLE newsletter_subscriptions IS 'Newsletter email subscriptions';

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

COMMENT ON TABLE events IS 'Restaurant events calendar for public display';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Migration 001 completed successfully!';
  RAISE NOTICE 'Created 8 tables: reservations, private_events, banquets, contact_submissions, feedback, career_applications, newsletter_subscriptions, events';
END $$;
