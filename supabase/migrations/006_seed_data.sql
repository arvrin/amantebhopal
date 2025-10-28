-- ============================================================================
-- MIGRATION 006: SEED DATA (OPTIONAL - FOR TESTING)
-- ============================================================================
-- Purpose: Insert sample data for testing and development
-- Date: 2025-10-25
-- WARNING: This is for development/testing only. Remove before production!
-- ============================================================================

-- ============================================================================
-- IMPORTANT: PRODUCTION DEPLOYMENT
-- ============================================================================
-- When deploying to production:
-- 1. Comment out or delete this entire file
-- 2. OR run migrations 001-005 only
-- 3. This seed data is for testing the database structure only
-- ============================================================================

-- ============================================================================
-- SEED DATA: RESERVATIONS
-- ============================================================================

INSERT INTO reservations (
  date, time, party_size, space_preference, occasion,
  name, phone, email, special_requests, agree_to_sms, status
) VALUES
  -- Upcoming reservations
  (CURRENT_DATE + 2, '7:00 PM', 4, 'Rooftop Restaurant', 'Birthday',
   'Rahul Sharma', '+919876543210', 'rahul@example.com',
   'Window seat preferred, birthday cake arrangement', true, 'pending'),

  (CURRENT_DATE + 3, '1:00 PM', 2, 'Café', 'Anniversary',
   'Priya Verma', '+919876543211', 'priya@example.com',
   'Quiet corner table please', true, 'confirmed'),

  (CURRENT_DATE + 5, '9:00 PM', 6, 'Lounge', NULL,
   'Amit Patel', '+919876543212', 'amit@example.com',
   NULL, true, 'pending'),

  (CURRENT_DATE + 7, '7:00 PM', 8, 'Rooftop Restaurant', 'Business',
   'Sneha Kapoor', '+919876543213', 'sneha@example.com',
   'Private area for business discussion', true, 'confirmed'),

  (CURRENT_DATE + 10, '11:00 PM', 3, 'Any', NULL,
   'Vikram Singh', '+919876543214', 'vikram@example.com',
   'Late night drinks', true, 'pending');

-- ============================================================================
-- SEED DATA: PRIVATE EVENTS
-- ============================================================================

INSERT INTO private_events (
  event_type, event_date, guest_count, budget_range, space_preference,
  name, phone, email, company, requirements, preferred_contact, status
) VALUES
  ('Corporate', CURRENT_DATE + 15, 30, '₹1L-2L', 'Private Dining',
   'Anjali Gupta', '+919876543215', 'anjali@techsolutions.com', 'Tech Solutions Pvt Ltd',
   'Need AV equipment, projector, vegetarian catering, corporate atmosphere',
   'Email', 'pending'),

  ('Birthday', CURRENT_DATE + 20, 25, '₹50k-1L', 'Rooftop Restaurant',
   'Rohan Malhotra', '+919876543216', 'rohan@example.com', NULL,
   'Birthday party setup, DJ, cake arrangement, photo booth',
   'WhatsApp', 'contacted'),

  ('Anniversary', CURRENT_DATE + 25, 15, '₹2L-5L', 'Private Dining',
   'Kavita Sharma', '+919876543217', 'kavita@example.com', NULL,
   'Elegant setup, live music, special menu, romantic ambiance',
   'Phone', 'quoted'),

  ('Proposal', CURRENT_DATE + 30, 2, '₹50k-1L', 'Rooftop Restaurant',
   'Arjun Mehta', '+919876543218', 'arjun@example.com', NULL,
   'Private corner, special decoration, photographer, surprise setup',
   'WhatsApp', 'confirmed');

-- ============================================================================
-- SEED DATA: BANQUETS
-- ============================================================================

INSERT INTO banquets (
  event_type, event_date, alternate_date, guest_count, timing_from, timing_to,
  requirements, name, phone, email, city, hear_about_us,
  additional_notes, request_type, status
) VALUES
  ('Wedding', CURRENT_DATE + 180, CURRENT_DATE + 187, 300, '18:00', '23:00',
   ARRAY['Catering', 'Decoration', 'Photography', 'DJ', 'Valet', 'Accommodation'],
   'Vikram Singh', '+919876543219', 'vikram.wedding@example.com', 'Bhopal',
   'Referral', 'Looking for traditional Rajasthani theme with modern touch',
   'Both', 'pending'),

  ('Reception', CURRENT_DATE + 90, NULL, 200, '19:00', '00:00',
   ARRAY['Catering', 'Decoration', 'DJ', 'Valet'],
   'Neha Agarwal', '+919876543220', 'neha@example.com', 'Indore',
   'Instagram', 'Need vegetarian and Jain food options',
   'Quote', 'quote_sent'),

  ('Corporate Event', CURRENT_DATE + 45, CURRENT_DATE + 52, 150, '09:00', '17:00',
   ARRAY['Catering', 'Photography', 'AV Equipment'],
   'Rajesh Kumar', '+919876543221', 'rajesh@corporate.com', 'Mumbai',
   'Google', 'Annual company conference, need professional setup',
   'Site Visit', 'site_visit_scheduled'),

  ('Sangeet', CURRENT_DATE + 120, NULL, 250, '17:00', '23:00',
   ARRAY['Decoration', 'DJ', 'Photography', 'Valet'],
   'Pooja Malhotra', '+919876543222', 'pooja@example.com', 'Delhi',
   'Wedding Planner', 'Mehendi and Sangeet combined event',
   'Both', 'confirmed');

-- ============================================================================
-- SEED DATA: CONTACT SUBMISSIONS
-- ============================================================================

INSERT INTO contact_submissions (
  inquiry_type, name, phone, email, message, status
) VALUES
  ('General', 'Amit Sharma', '+919876543223', 'amit@example.com',
   'Do you offer catering services for outdoor events?', 'new'),

  ('Event', 'Sonia Patel', '+919876543224', 'sonia@example.com',
   'I would like to know about hosting a baby shower event. What packages do you offer?',
   'in_progress'),

  ('Corporate', 'Manish Jain', '+919876543225', 'manish@company.com',
   'Interested in monthly corporate lunch packages for our team of 20-25 people.',
   'new'),

  ('Feedback', 'Ritu Verma', '+919876543226', 'ritu@example.com',
   'Had an amazing experience at your rooftop restaurant last week. The food and service were exceptional!',
   'resolved');

-- ============================================================================
-- SEED DATA: FEEDBACK
-- ============================================================================

INSERT INTO feedback (
  visit_date, space_visited, overall_rating, food_rating, service_rating,
  ambiance_rating, value_rating, what_you_loved, improvements,
  would_recommend, name, email, can_share_publicly, featured
) VALUES
  (CURRENT_DATE - 1, 'Rooftop Restaurant', 5, 5, 4, 5, 4,
   'Amazing food and beautiful ambiance! The sunset view from rooftop is breathtaking. Butter chicken was the best I have ever had.',
   'Service could be slightly faster during peak hours.',
   'Definitely', 'Priya Verma', 'priya@example.com', true, true),

  (CURRENT_DATE - 3, 'Café & Bakery', 5, 5, 5, 5, 5,
   'The pastries are divine! Coffee was perfect. Cozy atmosphere, great for working or casual meetings.',
   'Could use more charging points for laptops.',
   'Definitely', 'Rahul Sharma', 'rahul@example.com', true, true),

  (CURRENT_DATE - 7, 'Lounge', 4, 4, 5, 5, 4,
   'Excellent cocktails and relaxed vibe. Perfect for evening hangouts with friends.',
   'Music volume was a bit high, made conversation difficult.',
   'Probably', 'Sneha Kapoor', 'sneha@example.com', true, false),

  (CURRENT_DATE - 10, 'Private Dining', 5, 5, 5, 5, 4,
   'Hosted our anniversary dinner here. The private dining experience was exceptional. Staff was very attentive.',
   NULL,
   'Definitely', 'Amit & Kavita', 'amit@example.com', true, true),

  (CURRENT_DATE - 15, 'Club', 4, 3, 4, 5, 3,
   'Great ambiance and music. Good for parties and celebrations.',
   'Food options could be more diverse. Drinks are excellent though.',
   'Probably', 'Vikram Singh', 'vikram@example.com', false, false);

-- ============================================================================
-- SEED DATA: CAREER APPLICATIONS
-- ============================================================================

INSERT INTO career_applications (
  position, full_name, email, phone, current_city,
  experience_years, current_position, expected_salary,
  resume_url, portfolio_url, why_amante, available_to_join, status
) VALUES
  ('Chef', 'Arjun Patel', 'arjun.chef@example.com', '+919876543227', 'Mumbai',
   5, 'Sous Chef at The Oberoi', 50000,
   'https://placeholder-resume-url.com/arjun-patel.pdf',
   'https://linkedin.com/in/arjunpatel',
   'I am passionate about innovative cuisine and have been following Amante reputation for exceptional dining. Would love to bring my expertise in fusion cooking.',
   CURRENT_DATE + 30, 'received'),

  ('Bartender', 'Meera Joshi', 'meera@example.com', '+919876543228', 'Bhopal',
   3, 'Head Bartender at The Park', 35000,
   'https://placeholder-resume-url.com/meera-joshi.pdf',
   'https://instagram.com/meera_mixologist',
   'Amante modern approach to cocktails aligns perfectly with my creative style. I specialize in molecular mixology and craft cocktails.',
   CURRENT_DATE + 15, 'screening'),

  ('Server', 'Rohit Kumar', 'rohit@example.com', '+919876543229', 'Indore',
   2, 'Server at Marriott', 25000,
   'https://placeholder-resume-url.com/rohit-kumar.pdf',
   NULL,
   'I have a passion for hospitality and creating memorable dining experiences. Amante reputation for excellence is inspiring.',
   CURRENT_DATE + 45, 'interview_scheduled'),

  ('Manager', 'Divya Sharma', 'divya@example.com', '+919876543230', 'Delhi',
   8, 'Assistant Manager at Taj Hotels', 80000,
   'https://placeholder-resume-url.com/divya-sharma.pdf',
   'https://linkedin.com/in/divyasharma',
   'With extensive experience in fine dining management, I am excited about the opportunity to contribute to Amante growth and success.',
   CURRENT_DATE + 60, 'selected');

-- ============================================================================
-- SEED DATA: NEWSLETTER SUBSCRIPTIONS
-- ============================================================================

INSERT INTO newsletter_subscriptions (email, name, subscribed) VALUES
  ('subscriber1@example.com', 'Aarav Gupta', true),
  ('subscriber2@example.com', 'Ishita Reddy', true),
  ('subscriber3@example.com', 'Karan Mehta', true),
  ('subscriber4@example.com', 'Ananya Patel', true),
  ('unsubscribed@example.com', 'Former Subscriber', false);

-- ============================================================================
-- SEED DATA: EVENTS (Calendar)
-- ============================================================================

INSERT INTO events (
  title, description, event_type, event_date, start_time, end_time,
  space, image_url, is_recurring, published
) VALUES
  ('Live Jazz Night', 'Enjoy smooth jazz with our live band every Friday evening',
   'Live Music', CURRENT_DATE + 5, '20:00', '23:00',
   'Lounge', 'https://placeholder-image-url.com/jazz.jpg', true, true),

  ('Sunday Brunch Special', 'Unlimited brunch buffet with live cooking stations',
   'Special Menu', CURRENT_DATE + 7, '11:00', '15:00',
   'Rooftop Restaurant', 'https://placeholder-image-url.com/brunch.jpg', true, true),

  ('Wine Tasting Evening', 'Premium wine tasting with expert sommelier',
   'Tasting Event', CURRENT_DATE + 12, '19:00', '22:00',
   'Private Dining', 'https://placeholder-image-url.com/wine.jpg', false, true),

  ('DJ Night - Bollywood Beats', 'Dance to the best Bollywood hits with our resident DJ',
   'DJ Night', CURRENT_DATE + 14, '21:00', '01:00',
   'Club', 'https://placeholder-image-url.com/dj.jpg', false, true),

  ('Chef Special Tasting Menu', 'Experience our chef creative 7-course tasting menu',
   'Special Menu', CURRENT_DATE + 20, '19:30', '22:30',
   'Rooftop Restaurant', 'https://placeholder-image-url.com/tasting.jpg', false, true);

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
DECLARE
  reservation_count INTEGER;
  event_count INTEGER;
  feedback_count INTEGER;
  career_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO reservation_count FROM reservations;
  SELECT COUNT(*) INTO event_count FROM private_events;
  SELECT COUNT(*) INTO feedback_count FROM feedback;
  SELECT COUNT(*) INTO career_count FROM career_applications;

  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Migration 006 completed successfully!';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Sample data inserted for testing:';
  RAISE NOTICE '  ✓ Reservations: % records', reservation_count;
  RAISE NOTICE '  ✓ Private Events: % records', event_count;
  RAISE NOTICE '  ✓ Banquets: 4 records';
  RAISE NOTICE '  ✓ Contact: 4 records';
  RAISE NOTICE '  ✓ Feedback: % records', feedback_count;
  RAISE NOTICE '  ✓ Careers: % records', career_count;
  RAISE NOTICE '  ✓ Newsletter: 5 records';
  RAISE NOTICE '  ✓ Events: 5 records';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'WARNING: This is SAMPLE DATA for testing only!';
  RAISE NOTICE 'DELETE this migration before production deployment!';
  RAISE NOTICE '============================================================';
END $$;
