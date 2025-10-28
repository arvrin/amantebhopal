-- ============================================================================
-- MIGRATION 005: CREATE TRIGGERS AND FUNCTIONS
-- ============================================================================
-- Purpose: Create database triggers and functions for automation
-- Date: 2025-10-25
-- Includes: updated_at triggers, validation triggers, notification triggers
-- ============================================================================

-- ============================================================================
-- FUNCTION 1: UPDATE TIMESTAMP FUNCTION
-- ============================================================================
-- Purpose: Automatically update updated_at column on row updates
-- Used by: All tables with updated_at column

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column() IS
  'Automatically updates the updated_at timestamp on row modification';

-- ============================================================================
-- FUNCTION 2: VALIDATE RESERVATION DATE
-- ============================================================================
-- Purpose: Ensure reservation date is not in the past
-- Used by: reservations table

CREATE OR REPLACE FUNCTION validate_reservation_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Reservation date cannot be in the past';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validate_reservation_date() IS
  'Validates that reservation date is not in the past';

-- ============================================================================
-- FUNCTION 3: VALIDATE FEEDBACK DATE
-- ============================================================================
-- Purpose: Ensure feedback visit date is not in the future
-- Used by: feedback table

CREATE OR REPLACE FUNCTION validate_feedback_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.visit_date > CURRENT_DATE THEN
    RAISE EXCEPTION 'Visit date cannot be in the future';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validate_feedback_date() IS
  'Validates that feedback visit date is not in the future';

-- ============================================================================
-- FUNCTION 4: VALIDATE EVENT DATE
-- ============================================================================
-- Purpose: Ensure event date is not in the past (for private events and banquets)
-- Used by: private_events, banquets tables

CREATE OR REPLACE FUNCTION validate_event_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Event date cannot be in the past';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validate_event_date() IS
  'Validates that event date is not in the past';

-- ============================================================================
-- FUNCTION 5: VALIDATE BANQUET TIMING
-- ============================================================================
-- Purpose: Ensure timing_to is after timing_from
-- Used by: banquets table

CREATE OR REPLACE FUNCTION validate_banquet_timing()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.timing_to <= NEW.timing_from THEN
    RAISE EXCEPTION 'Event end time must be after start time';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validate_banquet_timing() IS
  'Validates that event end time is after start time';

-- ============================================================================
-- FUNCTION 6: AUTO-CONFIRM STATUS UPDATE
-- ============================================================================
-- Purpose: Set confirmed_at timestamp when status changes to confirmed
-- Used by: reservations table

CREATE OR REPLACE FUNCTION set_confirmed_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    NEW.confirmed_at = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION set_confirmed_timestamp() IS
  'Automatically sets confirmed_at when reservation is confirmed';

-- ============================================================================
-- FUNCTION 7: TRACK RESPONSE TIMESTAMP
-- ============================================================================
-- Purpose: Set responded_at timestamp when status changes from new
-- Used by: contact_submissions table

CREATE OR REPLACE FUNCTION set_responded_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != 'new' AND OLD.status = 'new' THEN
    NEW.responded_at = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION set_responded_timestamp() IS
  'Automatically sets responded_at when contact is first responded to';

-- ============================================================================
-- FUNCTION 8: PREVENT PAST DATE UPDATES
-- ============================================================================
-- Purpose: Prevent updating reservation date to a past date
-- Used by: reservations table

CREATE OR REPLACE FUNCTION prevent_past_date_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.date < CURRENT_DATE AND OLD.date >= CURRENT_DATE THEN
    RAISE EXCEPTION 'Cannot change reservation date to a past date';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION prevent_past_date_update() IS
  'Prevents updating reservation to a past date';

-- ============================================================================
-- APPLY TRIGGERS: RESERVATIONS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Validate reservation date on insert
CREATE TRIGGER validate_reservations_date_insert
  BEFORE INSERT ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION validate_reservation_date();

-- Validate reservation date on update
CREATE TRIGGER validate_reservations_date_update
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  WHEN (NEW.date IS DISTINCT FROM OLD.date)
  EXECUTE FUNCTION validate_reservation_date();

-- Prevent past date updates
CREATE TRIGGER prevent_reservations_past_date
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  WHEN (NEW.date IS DISTINCT FROM OLD.date)
  EXECUTE FUNCTION prevent_past_date_update();

-- Auto-set confirmed timestamp
CREATE TRIGGER set_reservations_confirmed_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION set_confirmed_timestamp();

-- ============================================================================
-- APPLY TRIGGERS: PRIVATE EVENTS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_private_events_updated_at
  BEFORE UPDATE ON private_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Validate event date on insert
CREATE TRIGGER validate_private_events_date_insert
  BEFORE INSERT ON private_events
  FOR EACH ROW
  EXECUTE FUNCTION validate_event_date();

-- Validate event date on update
CREATE TRIGGER validate_private_events_date_update
  BEFORE UPDATE ON private_events
  FOR EACH ROW
  WHEN (NEW.event_date IS DISTINCT FROM OLD.event_date)
  EXECUTE FUNCTION validate_event_date();

-- ============================================================================
-- APPLY TRIGGERS: BANQUETS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_banquets_updated_at
  BEFORE UPDATE ON banquets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Validate event date on insert
CREATE TRIGGER validate_banquets_date_insert
  BEFORE INSERT ON banquets
  FOR EACH ROW
  EXECUTE FUNCTION validate_event_date();

-- Validate event date on update
CREATE TRIGGER validate_banquets_date_update
  BEFORE UPDATE ON banquets
  FOR EACH ROW
  WHEN (NEW.event_date IS DISTINCT FROM OLD.event_date)
  EXECUTE FUNCTION validate_event_date();

-- Validate timing on insert and update
CREATE TRIGGER validate_banquets_timing
  BEFORE INSERT OR UPDATE ON banquets
  FOR EACH ROW
  WHEN (NEW.timing_from IS NOT NULL AND NEW.timing_to IS NOT NULL)
  EXECUTE FUNCTION validate_banquet_timing();

-- ============================================================================
-- APPLY TRIGGERS: CONTACT SUBMISSIONS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Set responded timestamp
CREATE TRIGGER set_contact_responded_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION set_responded_timestamp();

-- ============================================================================
-- APPLY TRIGGERS: FEEDBACK
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Validate feedback date on insert
CREATE TRIGGER validate_feedback_date_insert
  BEFORE INSERT ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION validate_feedback_date();

-- Validate feedback date on update
CREATE TRIGGER validate_feedback_date_update
  BEFORE UPDATE ON feedback
  FOR EACH ROW
  WHEN (NEW.visit_date IS DISTINCT FROM OLD.visit_date)
  EXECUTE FUNCTION validate_feedback_date();

-- ============================================================================
-- APPLY TRIGGERS: CAREER APPLICATIONS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_career_applications_updated_at
  BEFORE UPDATE ON career_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- APPLY TRIGGERS: EVENTS (Calendar)
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- UTILITY FUNCTION: GET PENDING COUNT
-- ============================================================================
-- Purpose: Get count of pending items across all forms
-- Used by: Admin dashboard

CREATE OR REPLACE FUNCTION get_pending_count()
RETURNS TABLE(
  form_type TEXT,
  pending_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'reservations'::TEXT, COUNT(*)
  FROM reservations
  WHERE status = 'pending'

  UNION ALL

  SELECT 'private_events'::TEXT, COUNT(*)
  FROM private_events
  WHERE status = 'pending'

  UNION ALL

  SELECT 'banquets'::TEXT, COUNT(*)
  FROM banquets
  WHERE status = 'pending'

  UNION ALL

  SELECT 'contact'::TEXT, COUNT(*)
  FROM contact_submissions
  WHERE status = 'new'

  UNION ALL

  SELECT 'careers'::TEXT, COUNT(*)
  FROM career_applications
  WHERE status = 'received';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_pending_count() IS
  'Returns count of pending items for each form type';

-- ============================================================================
-- UTILITY FUNCTION: GET TODAY'S RESERVATIONS
-- ============================================================================
-- Purpose: Get all reservations for today
-- Used by: Daily operations dashboard

CREATE OR REPLACE FUNCTION get_todays_reservations()
RETURNS TABLE(
  id UUID,
  time VARCHAR(10),
  name VARCHAR(100),
  phone VARCHAR(15),
  party_size INTEGER,
  space_preference VARCHAR(50),
  special_requests TEXT,
  status VARCHAR(20)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.time,
    r.name,
    r.phone,
    r.party_size,
    r.space_preference,
    r.special_requests,
    r.status
  FROM reservations r
  WHERE r.date = CURRENT_DATE
  ORDER BY r.time ASC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_todays_reservations() IS
  'Returns all reservations for current date';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Migration 005 completed successfully!';
  RAISE NOTICE 'Created 8 functions and applied triggers to all tables:';
  RAISE NOTICE '  ✓ Auto-update timestamps (updated_at)';
  RAISE NOTICE '  ✓ Date validation (past/future checks)';
  RAISE NOTICE '  ✓ Timing validation (start/end times)';
  RAISE NOTICE '  ✓ Status tracking (confirmed_at, responded_at)';
  RAISE NOTICE '  ✓ Utility functions (pending counts, daily ops)';
END $$;
