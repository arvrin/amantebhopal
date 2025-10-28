/**
 * Database Utility Functions
 *
 * Common database operations and helpers for all tables.
 * These functions provide a consistent interface for database interactions
 * with proper error handling and TypeScript types.
 */

import { getServerClient } from './supabase';
import type {
  Reservation,
  ReservationInsert,
  PrivateEvent,
  PrivateEventInsert,
  Banquet,
  BanquetInsert,
  ContactSubmission,
  ContactSubmissionInsert,
  Feedback,
  FeedbackInsert,
  CareerApplication,
  CareerApplicationInsert,
  NewsletterSubscriptionInsert,
} from './supabase';

// ============================================================================
// TYPES
// ============================================================================

export interface DatabaseResult<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// GENERIC CRUD OPERATIONS
// ============================================================================

/**
 * Insert a single record into any table
 *
 * @param table - Table name
 * @param data - Data to insert
 * @returns Inserted record or error
 *
 * Example:
 * ```ts
 * const result = await insertRecord('reservations', {
 *   date: '2025-11-15',
 *   time: '7:00 PM',
 *   name: 'John Doe',
 *   // ... other fields
 * });
 * ```
 */
export async function insertRecord<T extends Record<string, any>>(
  table: string,
  data: T
): Promise<DatabaseResult<T>> {
  try {
    const supabase = getServerClient();

    const { data: result, error } = await supabase
      .from(table)
      .insert(data as any)
      .select()
      .single();

    if (error) throw error;

    return { data: result as T, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Update a record by ID
 *
 * @param table - Table name
 * @param id - Record ID
 * @param data - Data to update
 * @returns Updated record or error
 */
export async function updateRecord<T extends Record<string, any>>(
  table: string,
  id: string,
  data: Partial<T>
): Promise<DatabaseResult<T>> {
  try {
    const supabase = getServerClient();

    const { data: result, error } = await supabase
      .from(table)
      // @ts-ignore - Generic table operations require dynamic typing
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data: result as T, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Delete a record by ID
 *
 * @param table - Table name
 * @param id - Record ID
 * @returns Success status
 */
export async function deleteRecord(
  table: string,
  id: string
): Promise<DatabaseResult<null>> {
  try {
    const supabase = getServerClient();

    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get a record by ID
 *
 * @param table - Table name
 * @param id - Record ID
 * @returns Record or error
 */
export async function getRecordById<T>(
  table: string,
  id: string
): Promise<DatabaseResult<T>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as T, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get all records from a table with pagination
 *
 * @param table - Table name
 * @param params - Pagination parameters
 * @returns Paginated results
 */
export async function getAllRecords<T>(
  table: string,
  params: PaginationParams = {}
): Promise<DatabaseResult<PaginatedResult<T>>> {
  try {
    const supabase = getServerClient();
    const page = params.page || 1;
    const limit = params.limit || 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      data: {
        data: data as T[],
        count: count || 0,
        page,
        limit,
        totalPages,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// RESERVATIONS
// ============================================================================

/**
 * Create a new reservation
 */
export async function createReservation(
  data: ReservationInsert
): Promise<DatabaseResult<Reservation>> {
  return insertRecord<Reservation>('reservations', data as any);
}

/**
 * Get reservations by date
 */
export async function getReservationsByDate(
  date: string
): Promise<DatabaseResult<Reservation[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('date', date)
      .order('time', { ascending: true });

    if (error) throw error;

    return { data: data as Reservation[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get reservations by status
 */
export async function getReservationsByStatus(
  status: string
): Promise<DatabaseResult<Reservation[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('status', status)
      .order('date', { ascending: true });

    if (error) throw error;

    return { data: data as Reservation[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  id: string,
  status: string,
  confirmedBy?: string
): Promise<DatabaseResult<Reservation>> {
  const updateData: any = { status };
  if (confirmedBy && status === 'confirmed') {
    updateData.confirmed_by = confirmedBy;
  }

  return updateRecord<Reservation>('reservations', id, updateData);
}

// ============================================================================
// PRIVATE EVENTS
// ============================================================================

/**
 * Create a new private event enquiry
 */
export async function createPrivateEvent(
  data: PrivateEventInsert
): Promise<DatabaseResult<PrivateEvent>> {
  return insertRecord<PrivateEvent>('private_events', data as any);
}

/**
 * Get private events by status
 */
export async function getPrivateEventsByStatus(
  status: string
): Promise<DatabaseResult<PrivateEvent[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('private_events')
      .select('*')
      .eq('status', status)
      .order('event_date', { ascending: true });

    if (error) throw error;

    return { data: data as PrivateEvent[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// BANQUETS
// ============================================================================

/**
 * Create a new banquet enquiry
 */
export async function createBanquet(
  data: BanquetInsert
): Promise<DatabaseResult<Banquet>> {
  return insertRecord<Banquet>('banquets', data as any);
}

/**
 * Get banquets by status
 */
export async function getBanquetsByStatus(
  status: string
): Promise<DatabaseResult<Banquet[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('banquets')
      .select('*')
      .eq('status', status)
      .order('event_date', { ascending: true });

    if (error) throw error;

    return { data: data as Banquet[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// CONTACT SUBMISSIONS
// ============================================================================

/**
 * Create a new contact submission
 */
export async function createContactSubmission(
  data: ContactSubmissionInsert
): Promise<DatabaseResult<ContactSubmission>> {
  return insertRecord<ContactSubmission>('contact_submissions', data as any);
}

/**
 * Get contact submissions by status
 */
export async function getContactSubmissionsByStatus(
  status: string
): Promise<DatabaseResult<ContactSubmission[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as ContactSubmission[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// FEEDBACK
// ============================================================================

/**
 * Create new feedback
 */
export async function createFeedback(
  data: FeedbackInsert
): Promise<DatabaseResult<Feedback>> {
  return insertRecord<Feedback>('feedback', data as any);
}

/**
 * Get published testimonials
 */
export async function getPublishedTestimonials(
  limit: number = 10
): Promise<DatabaseResult<Feedback[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('published_on_website', true)
      .eq('can_share_publicly', true)
      .gte('overall_rating', 4)
      .order('featured', { ascending: false })
      .order('overall_rating', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data: data as Feedback[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get feedback statistics for a space
 */
export async function getFeedbackStatsBySpace(
  space: string
): Promise<DatabaseResult<any>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('feedback_statistics')
      .select('*')
      .eq('space_visited', space)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// CAREER APPLICATIONS
// ============================================================================

/**
 * Create a new career application
 */
export async function createCareerApplication(
  data: CareerApplicationInsert
): Promise<DatabaseResult<CareerApplication>> {
  return insertRecord<CareerApplication>('career_applications', data as any);
}

/**
 * Get career applications by position
 */
export async function getCareerApplicationsByPosition(
  position: string
): Promise<DatabaseResult<CareerApplication[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('career_applications')
      .select('*')
      .eq('position', position)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as CareerApplication[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// NEWSLETTER
// ============================================================================

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(
  email: string,
  name?: string
): Promise<DatabaseResult<any>> {
  const data: NewsletterSubscriptionInsert = {
    email,
    name: name || null,
    subscribed: true,
  };

  return insertRecord('newsletter_subscriptions', data);
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(
  email: string
): Promise<DatabaseResult<any>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      // @ts-ignore - Supabase type inference limitation
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// ANALYTICS & VIEWS
// ============================================================================

/**
 * Get pending items count
 */
export async function getPendingItemsCount(): Promise<
  DatabaseResult<Array<{ form_type: string; pending_count: number }>>
> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase.rpc('get_pending_count');

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get today's reservations
 */
export async function getTodaysReservations(): Promise<DatabaseResult<any[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase.rpc('get_todays_reservations');

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get overall feedback statistics
 */
export async function getOverallFeedbackStats(): Promise<DatabaseResult<any>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('overall_feedback_statistics')
      .select('*')
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// ============================================================================
// SEARCH & FILTERING
// ============================================================================

/**
 * Search records by email
 */
export async function searchByEmail<T>(
  table: string,
  email: string
): Promise<DatabaseResult<T[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .ilike('email', `%${email}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as T[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Search records by phone
 */
export async function searchByPhone<T>(
  table: string,
  phone: string
): Promise<DatabaseResult<T[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .ilike('phone', `%${phone}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as T[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Search records by name
 */
export async function searchByName<T>(
  table: string,
  name: string
): Promise<DatabaseResult<T[]>> {
  try {
    const supabase = getServerClient();

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .ilike('name', `%${name}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as T[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
