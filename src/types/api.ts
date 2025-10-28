/**
 * API Type Definitions
 *
 * Comprehensive type definitions for all API routes, requests, and responses.
 * This file ensures type safety across the entire API layer.
 */

import type {
  ReservationFormData,
  PrivateEventFormData,
  BanquetFormData,
  ContactFormData,
  FeedbackFormData,
  CareerFormData,
} from './index';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Standard API error object
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

/**
 * API response type (success or error)
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * Reservation API request body
 */
export type ReservationRequest = ReservationFormData;

/**
 * Private event API request body
 */
export type PrivateEventRequest = PrivateEventFormData;

/**
 * Banquet API request body
 */
export type BanquetRequest = BanquetFormData;

/**
 * Contact API request body
 */
export type ContactRequest = ContactFormData;

/**
 * Feedback API request body
 */
export type FeedbackRequest = FeedbackFormData;

/**
 * Career application API request body
 */
export type CareerRequest = CareerFormData;

/**
 * Newsletter subscription request
 */
export interface NewsletterRequest {
  email: string;
  name?: string;
}

/**
 * Newsletter unsubscribe request
 */
export interface NewsletterUnsubscribeRequest {
  email: string;
}

// ============================================================================
// RESPONSE DATA TYPES
// ============================================================================

/**
 * Form submission response data
 */
export interface FormSubmissionResponse {
  id: string;
  message: string;
}

/**
 * Reservation response data
 */
export interface ReservationResponse extends FormSubmissionResponse {
  reservationDate: string;
  reservationTime: string;
  partySize: number;
}

/**
 * Private event response data
 */
export interface PrivateEventResponse extends FormSubmissionResponse {
  eventDate: string;
  eventType: string;
  guestCount: number;
}

/**
 * Banquet response data
 */
export interface BanquetResponse extends FormSubmissionResponse {
  eventDate: string;
  eventType: string;
  guestCount: number;
  requestType: string;
}

/**
 * Contact submission response data
 */
export interface ContactResponse extends FormSubmissionResponse {
  inquiryType: string;
}

/**
 * Feedback submission response data
 */
export interface FeedbackResponse extends FormSubmissionResponse {
  overallRating: number;
}

/**
 * Career application response data
 */
export interface CareerResponse extends FormSubmissionResponse {
  position: string;
  resumeUrl: string;
}

/**
 * Newsletter subscription response data
 */
export interface NewsletterResponse {
  id: string;
  message: string;
  email: string;
}

/**
 * Events list response data
 */
export interface EventsListResponse {
  events: EventData[];
  count: number;
}

/**
 * Single event data
 */
export interface EventData {
  id: string;
  title: string;
  description: string | null;
  eventType: string | null;
  eventDate: string;
  startTime: string | null;
  endTime: string | null;
  space: string | null;
  imageUrl: string | null;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response data
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Date range filter
 */
export interface DateRangeFilter {
  from: string;
  to: string;
}

/**
 * Reservation filters
 */
export interface ReservationFilters {
  status?: string[];
  dateRange?: DateRangeFilter;
  spacePreference?: string[];
}

/**
 * Event filters
 */
export interface EventFilters {
  eventType?: string[];
  dateRange?: DateRangeFilter;
  space?: string[];
  published?: boolean;
}

/**
 * Feedback filters
 */
export interface FeedbackFilters {
  rating?: number[];
  spaceVisited?: string[];
  dateRange?: DateRangeFilter;
  featured?: boolean;
  canSharePublicly?: boolean;
}

// ============================================================================
// ERROR CODES
// ============================================================================

/**
 * Standard API error codes
 */
export enum ApiErrorCode {
  // Validation errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_FIELD = 'MISSING_FIELD',

  // Authentication errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Authorization errors (403)
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Not found errors (404)
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // Rate limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Server errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EMAIL_ERROR = 'EMAIL_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR',

  // Service errors (503)
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

// ============================================================================
// REQUEST CONTEXT TYPES
// ============================================================================

/**
 * Client information extracted from request
 */
export interface ClientInfo {
  id: string;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
}

/**
 * Request metadata for logging
 */
export interface RequestMetadata {
  method: string;
  url: string;
  duration: number;
  timestamp: string;
  client: ClientInfo;
}

// ============================================================================
// FILE UPLOAD TYPES
// ============================================================================

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * File upload error
 */
export interface FileUploadError {
  field: string;
  error: string;
  maxSize?: number;
  allowedTypes?: string[];
}

// ============================================================================
// BATCH OPERATION TYPES
// ============================================================================

/**
 * Batch operation result
 */
export interface BatchOperationResult<T> {
  success: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
  totalProcessed: number;
  totalSuccess: number;
  totalFailed: number;
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

/**
 * Webhook payload
 */
export interface WebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
  signature?: string;
}

/**
 * Webhook response
 */
export interface WebhookResponse {
  received: boolean;
  processed: boolean;
  message?: string;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if response is an error
 */
export function isApiError(response: ApiResponse): response is ApiErrorResponse {
  return response.success === false;
}

/**
 * Type guard to check if response is successful
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Extract data type from API response
 */
export type ExtractApiData<T extends ApiResponse> = T extends ApiSuccessResponse<infer D>
  ? D
  : never;

/**
 * Make API request parameters optional
 */
export type OptionalApiParams<T> = Partial<T>;

/**
 * API route handler return type
 */
export type ApiHandler<T = any> = () => Promise<ApiResponse<T>>;
