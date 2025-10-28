/**
 * Supabase Client Configuration
 *
 * This file sets up the Supabase client for database operations.
 *
 * Usage:
 * - Use `supabase` for client-side operations (respects RLS policies)
 * - Use `supabaseAdmin` for server-side operations (bypasses RLS)
 *
 * Security:
 * - Client instance uses anon key (safe for browser)
 * - Admin instance uses service role key (server-side only)
 * - Never expose service role key to client
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// ============================================================================
// ENVIRONMENT VARIABLES VALIDATION
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Service role key is optional (only needed for server-side operations)
if (typeof window === 'undefined' && !supabaseServiceRoleKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY not set. Admin operations will fail.');
}

// ============================================================================
// CLIENT INSTANCE (Public - respects RLS)
// ============================================================================

/**
 * Public Supabase client for client-side operations
 *
 * Features:
 * - Uses anon key (safe for browser)
 * - Respects Row Level Security policies
 * - Use for: Reading public data, form submissions
 *
 * Example:
 * ```ts
 * const { data, error } = await supabase
 *   .from('feedback')
 *   .select('*')
 *   .eq('published_on_website', true);
 * ```
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need session persistence for public forms
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'amante-restaurant-website',
    },
  },
});

// ============================================================================
// ADMIN INSTANCE (Private - bypasses RLS)
// ============================================================================

/**
 * Admin Supabase client for server-side operations
 *
 * Features:
 * - Uses service role key (bypasses RLS)
 * - Full database access
 * - Use for: API routes, server actions, admin operations
 *
 * SECURITY WARNING:
 * - Only use in server-side code
 * - Never expose to client
 * - Never import in client components
 *
 * Example (API route):
 * ```ts
 * // app/api/reservations/route.ts
 * import { supabaseAdmin } from '@/lib/supabase';
 *
 * export async function POST(request: Request) {
 *   const { data, error } = await supabaseAdmin
 *     .from('reservations')
 *     .insert(reservationData);
 * }
 * ```
 */
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'x-application-name': 'amante-restaurant-website-admin',
        },
      },
    })
  : null;

// ============================================================================
// HELPER FUNCTION: GET SERVER-SIDE CLIENT
// ============================================================================

/**
 * Get server-side Supabase client (with admin privileges)
 *
 * Use this in API routes and server actions to ensure you have admin access.
 * Throws error if service role key is not configured.
 *
 * @returns Supabase admin client
 * @throws Error if service role key is missing
 *
 * Example:
 * ```ts
 * export async function POST(request: Request) {
 *   const supabase = getServerClient();
 *   const { data, error } = await supabase.from('reservations').insert(...);
 * }
 * ```
 */
export function getServerClient() {
  if (!supabaseAdmin) {
    throw new Error(
      'Supabase admin client not initialized. Check SUPABASE_SERVICE_ROLE_KEY environment variable.'
    );
  }
  return supabaseAdmin;
}

// ============================================================================
// STORAGE HELPERS
// ============================================================================

/**
 * Upload file to Supabase Storage
 *
 * @param bucket - Storage bucket name (e.g., 'resumes')
 * @param path - File path in bucket
 * @param file - File to upload
 * @returns Public URL of uploaded file
 *
 * Example:
 * ```ts
 * const file = formData.get('resume') as File;
 * const url = await uploadFile('resumes', `${Date.now()}-${file.name}`, file);
 * ```
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob
): Promise<string> {
  const client = getServerClient();

  const { error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = client.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

/**
 * Delete file from Supabase Storage
 *
 * @param bucket - Storage bucket name
 * @param path - File path in bucket
 *
 * Example:
 * ```ts
 * await deleteFile('resumes', 'old-resume.pdf');
 * ```
 */
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const client = getServerClient();

  const { error } = await client.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
}

// ============================================================================
// CONNECTION TEST
// ============================================================================

/**
 * Test database connection
 *
 * Use this to verify Supabase is configured correctly.
 *
 * @returns True if connection successful, throws error otherwise
 *
 * Example:
 * ```ts
 * try {
 *   await testConnection();
 *   console.log('Database connected!');
 * } catch (error) {
 *   console.error('Database connection failed:', error);
 * }
 * ```
 */
export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('reservations').select('id').limit(1);

    if (error) throw error;

    return true;
  } catch (error) {
    throw new Error(
      `Supabase connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Re-export Database type for convenience
export type { Database } from '@/types/database';

// Export table types
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Export specific table types for easy access
export type Reservation = Tables['reservations']['Row'];
export type ReservationInsert = Tables['reservations']['Insert'];
export type ReservationUpdate = Tables['reservations']['Update'];

export type PrivateEvent = Tables['private_events']['Row'];
export type PrivateEventInsert = Tables['private_events']['Insert'];
export type PrivateEventUpdate = Tables['private_events']['Update'];

export type Banquet = Tables['banquets']['Row'];
export type BanquetInsert = Tables['banquets']['Insert'];
export type BanquetUpdate = Tables['banquets']['Update'];

export type ContactSubmission = Tables['contact_submissions']['Row'];
export type ContactSubmissionInsert = Tables['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Tables['contact_submissions']['Update'];

export type Feedback = Tables['feedback']['Row'];
export type FeedbackInsert = Tables['feedback']['Insert'];
export type FeedbackUpdate = Tables['feedback']['Update'];

export type CareerApplication = Tables['career_applications']['Row'];
export type CareerApplicationInsert = Tables['career_applications']['Insert'];
export type CareerApplicationUpdate = Tables['career_applications']['Update'];

export type NewsletterSubscription = Tables['newsletter_subscriptions']['Row'];
export type NewsletterSubscriptionInsert = Tables['newsletter_subscriptions']['Insert'];

export type Event = Tables['events']['Row'];
export type EventInsert = Tables['events']['Insert'];
export type EventUpdate = Tables['events']['Update'];
