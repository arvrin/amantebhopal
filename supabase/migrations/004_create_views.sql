-- ============================================================================
-- MIGRATION 004: CREATE UTILITY VIEWS
-- ============================================================================
-- Purpose: Create database views for common queries and analytics
-- Date: 2025-10-25
-- Views: Recent reservations, feedback stats, upcoming reservations,
--        dashboard summaries, performance metrics
-- ============================================================================

-- ============================================================================
-- VIEW 1: RECENT RESERVATIONS SUMMARY
-- ============================================================================
-- Purpose: Show recent reservations for admin dashboard
-- Used by: Admin panel dashboard

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

COMMENT ON VIEW recent_reservations_summary IS
  'Last 30 days of reservations for dashboard display';

-- ============================================================================
-- VIEW 2: UPCOMING RESERVATIONS
-- ============================================================================
-- Purpose: Show upcoming confirmed reservations
-- Used by: Daily operations, restaurant staff

CREATE OR REPLACE VIEW upcoming_reservations AS
SELECT
  id,
  date,
  time,
  name,
  phone,
  party_size,
  space_preference,
  special_requests,
  status,
  confirmed_by,
  confirmed_at
FROM reservations
WHERE date >= CURRENT_DATE
  AND status IN ('confirmed', 'pending')
ORDER BY date ASC, time ASC;

COMMENT ON VIEW upcoming_reservations IS
  'Upcoming reservations sorted by date and time';

-- ============================================================================
-- VIEW 3: FEEDBACK STATISTICS BY SPACE
-- ============================================================================
-- Purpose: Calculate average ratings for each space
-- Used by: Performance analytics, management reports

CREATE OR REPLACE VIEW feedback_statistics AS
SELECT
  space_visited,
  COUNT(*) as total_reviews,
  ROUND(AVG(overall_rating), 2) as avg_overall_rating,
  ROUND(AVG(food_rating), 2) as avg_food_rating,
  ROUND(AVG(service_rating), 2) as avg_service_rating,
  ROUND(AVG(ambiance_rating), 2) as avg_ambiance_rating,
  ROUND(AVG(value_rating), 2) as avg_value_rating,
  COUNT(*) FILTER (WHERE overall_rating = 5) as five_star_count,
  COUNT(*) FILTER (WHERE overall_rating = 4) as four_star_count,
  COUNT(*) FILTER (WHERE overall_rating = 3) as three_star_count,
  COUNT(*) FILTER (WHERE overall_rating = 2) as two_star_count,
  COUNT(*) FILTER (WHERE overall_rating = 1) as one_star_count,
  COUNT(*) FILTER (WHERE would_recommend = 'Definitely') as definitely_recommend,
  COUNT(*) FILTER (WHERE can_share_publicly = true) as shareable_reviews
FROM feedback
GROUP BY space_visited;

COMMENT ON VIEW feedback_statistics IS
  'Aggregate feedback statistics by space for analytics';

-- ============================================================================
-- VIEW 4: OVERALL FEEDBACK STATISTICS
-- ============================================================================
-- Purpose: Overall restaurant performance metrics
-- Used by: Management dashboard, performance reports

CREATE OR REPLACE VIEW overall_feedback_statistics AS
SELECT
  COUNT(*) as total_reviews,
  ROUND(AVG(overall_rating), 2) as avg_overall_rating,
  ROUND(AVG(food_rating), 2) as avg_food_rating,
  ROUND(AVG(service_rating), 2) as avg_service_rating,
  ROUND(AVG(ambiance_rating), 2) as avg_ambiance_rating,
  ROUND(AVG(value_rating), 2) as avg_value_rating,
  COUNT(*) FILTER (WHERE overall_rating >= 4) * 100.0 / COUNT(*) as positive_review_percentage,
  COUNT(*) FILTER (WHERE would_recommend IN ('Definitely', 'Probably')) * 100.0 / COUNT(*) as recommendation_rate,
  COUNT(*) FILTER (WHERE can_share_publicly = true) as testimonial_count,
  COUNT(*) FILTER (WHERE featured = true) as featured_count
FROM feedback;

COMMENT ON VIEW overall_feedback_statistics IS
  'Overall restaurant performance metrics across all spaces';

-- ============================================================================
-- VIEW 5: FEATURED TESTIMONIALS
-- ============================================================================
-- Purpose: Get published testimonials for website display
-- Used by: Homepage, testimonials section

CREATE OR REPLACE VIEW featured_testimonials AS
SELECT
  id,
  visit_date,
  space_visited,
  overall_rating,
  what_you_loved,
  name,
  created_at
FROM feedback
WHERE can_share_publicly = true
  AND published_on_website = true
  AND overall_rating >= 4
ORDER BY
  featured DESC,
  overall_rating DESC,
  created_at DESC;

COMMENT ON VIEW featured_testimonials IS
  'Published customer testimonials for website display';

-- ============================================================================
-- VIEW 6: PENDING ITEMS DASHBOARD
-- ============================================================================
-- Purpose: Show all pending items requiring attention
-- Used by: Admin dashboard overview

CREATE OR REPLACE VIEW pending_items_dashboard AS
SELECT
  'reservation' as item_type,
  id::text,
  name as customer_name,
  email as customer_email,
  phone as customer_phone,
  created_at,
  status
FROM reservations
WHERE status = 'pending'

UNION ALL

SELECT
  'private_event' as item_type,
  id::text,
  name as customer_name,
  email as customer_email,
  phone as customer_phone,
  created_at,
  status
FROM private_events
WHERE status = 'pending'

UNION ALL

SELECT
  'banquet' as item_type,
  id::text,
  name as customer_name,
  email as customer_email,
  phone as customer_phone,
  created_at,
  status
FROM banquets
WHERE status = 'pending'

UNION ALL

SELECT
  'contact' as item_type,
  id::text,
  name as customer_name,
  email as customer_email,
  phone as customer_phone,
  created_at,
  status
FROM contact_submissions
WHERE status = 'new'

UNION ALL

SELECT
  'career' as item_type,
  id::text,
  full_name as customer_name,
  email as customer_email,
  phone as customer_phone,
  created_at,
  status
FROM career_applications
WHERE status = 'received'

ORDER BY created_at DESC;

COMMENT ON VIEW pending_items_dashboard IS
  'All pending submissions across all forms for admin dashboard';

-- ============================================================================
-- VIEW 7: RESERVATION ANALYTICS
-- ============================================================================
-- Purpose: Reservation trends and analytics
-- Used by: Business intelligence, capacity planning

CREATE OR REPLACE VIEW reservation_analytics AS
SELECT
  date,
  COUNT(*) as total_reservations,
  SUM(party_size) as total_guests,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_count,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_count,
  COUNT(*) FILTER (WHERE space_preference = 'Rooftop Restaurant') as rooftop_count,
  COUNT(*) FILTER (WHERE space_preference = 'Lounge') as lounge_count,
  COUNT(*) FILTER (WHERE space_preference = 'Café') as cafe_count,
  ROUND(AVG(party_size), 2) as avg_party_size
FROM reservations
WHERE date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY date
ORDER BY date DESC;

COMMENT ON VIEW reservation_analytics IS
  'Daily reservation analytics for last 90 days';

-- ============================================================================
-- VIEW 8: CAREER APPLICATIONS SUMMARY
-- ============================================================================
-- Purpose: Summary of career applications by position and status
-- Used by: HR dashboard, recruitment analytics

CREATE OR REPLACE VIEW career_applications_summary AS
SELECT
  position,
  COUNT(*) as total_applications,
  COUNT(*) FILTER (WHERE status = 'received') as new_applications,
  COUNT(*) FILTER (WHERE status = 'screening') as in_screening,
  COUNT(*) FILTER (WHERE status = 'interview_scheduled') as interviews_scheduled,
  COUNT(*) FILTER (WHERE status = 'selected') as selected,
  COUNT(*) FILTER (WHERE status = 'joined') as joined,
  ROUND(AVG(experience_years), 1) as avg_experience,
  ROUND(AVG(expected_salary), 0) as avg_expected_salary
FROM career_applications
GROUP BY position
ORDER BY total_applications DESC;

COMMENT ON VIEW career_applications_summary IS
  'Career applications analytics by position';

-- ============================================================================
-- VIEW 9: MONTHLY SUBMISSIONS SUMMARY
-- ============================================================================
-- Purpose: Monthly submission trends across all forms
-- Used by: Business analytics, growth tracking

CREATE OR REPLACE VIEW monthly_submissions_summary AS
WITH monthly_data AS (
  SELECT
    DATE_TRUNC('month', created_at) as month,
    'reservations' as form_type,
    COUNT(*) as submission_count
  FROM reservations
  GROUP BY DATE_TRUNC('month', created_at)

  UNION ALL

  SELECT
    DATE_TRUNC('month', created_at) as month,
    'private_events' as form_type,
    COUNT(*) as submission_count
  FROM private_events
  GROUP BY DATE_TRUNC('month', created_at)

  UNION ALL

  SELECT
    DATE_TRUNC('month', created_at) as month,
    'banquets' as form_type,
    COUNT(*) as submission_count
  FROM banquets
  GROUP BY DATE_TRUNC('month', created_at)

  UNION ALL

  SELECT
    DATE_TRUNC('month', created_at) as month,
    'contact' as form_type,
    COUNT(*) as submission_count
  FROM contact_submissions
  GROUP BY DATE_TRUNC('month', created_at)

  UNION ALL

  SELECT
    DATE_TRUNC('month', created_at) as month,
    'feedback' as form_type,
    COUNT(*) as submission_count
  FROM feedback
  GROUP BY DATE_TRUNC('month', created_at)

  UNION ALL

  SELECT
    DATE_TRUNC('month', created_at) as month,
    'careers' as form_type,
    COUNT(*) as submission_count
  FROM career_applications
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
  month,
  form_type,
  submission_count
FROM monthly_data
WHERE month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months')
ORDER BY month DESC, form_type;

COMMENT ON VIEW monthly_submissions_summary IS
  'Monthly submission trends for all forms (last 12 months)';

-- ============================================================================
-- VIEW 10: EVENT CALENDAR PUBLIC
-- ============================================================================
-- Purpose: Upcoming published events for public calendar display
-- Used by: Public website events page

CREATE OR REPLACE VIEW event_calendar_public AS
SELECT
  id,
  title,
  description,
  event_type,
  event_date,
  start_time,
  end_time,
  space,
  image_url
FROM events
WHERE published = true
  AND event_date >= CURRENT_DATE
ORDER BY event_date ASC, start_time ASC;

COMMENT ON VIEW event_calendar_public IS
  'Upcoming published events for public display';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Migration 004 completed successfully!';
  RAISE NOTICE 'Created 10 utility views:';
  RAISE NOTICE '  ✓ recent_reservations_summary';
  RAISE NOTICE '  ✓ upcoming_reservations';
  RAISE NOTICE '  ✓ feedback_statistics';
  RAISE NOTICE '  ✓ overall_feedback_statistics';
  RAISE NOTICE '  ✓ featured_testimonials';
  RAISE NOTICE '  ✓ pending_items_dashboard';
  RAISE NOTICE '  ✓ reservation_analytics';
  RAISE NOTICE '  ✓ career_applications_summary';
  RAISE NOTICE '  ✓ monthly_submissions_summary';
  RAISE NOTICE '  ✓ event_calendar_public';
END $$;
