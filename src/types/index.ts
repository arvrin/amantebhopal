// ============================================================================
// AMANTE RESTAURANT - TYPESCRIPT TYPE DEFINITIONS
// ============================================================================
// Central type definitions for the entire application
// ============================================================================

// ----------------------------------------------------------------------------
// FORM DATA TYPES
// ----------------------------------------------------------------------------

/**
 * Table Reservation Form Data
 * Used for /reservations page
 */
export interface ReservationFormData {
  date: string; // ISO date format: "YYYY-MM-DD"
  time: '11:00 AM' | '1:00 PM' | '3:00 PM' | '7:00 PM' | '9:00 PM' | '11:00 PM';
  partySize: number; // 1-20
  spacePreference: 'Rooftop Restaurant' | 'Lounge' | 'Café' | 'Any';
  occasion?: string; // Optional: Birthday, Anniversary, etc.
  name: string;
  phone: string; // Format: +91XXXXXXXXXX
  email: string;
  specialRequests?: string;
  agreeToSMS: boolean;
}

/**
 * Private Event Enquiry Form Data
 * Used for /private-events page
 */
export interface PrivateEventFormData {
  eventType: 'Birthday' | 'Anniversary' | 'Corporate' | 'Proposal' | 'Celebration' | 'Other';
  eventDate: string; // ISO date format
  guestCount: number;
  budgetRange: '₹50k-1L' | '₹1L-2L' | '₹2L-5L' | '₹5L+';
  spacePreference: 'Private Dining' | 'Rooftop Restaurant' | 'Banquet Hall' | 'Lounge' | 'Any';
  name: string;
  phone: string;
  email: string;
  company?: string; // Optional, for corporate events
  requirements: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
}

/**
 * Banquet Booking Form Data
 * Used for /banquets page
 */
export interface BanquetFormData {
  eventType: 'Wedding' | 'Reception' | 'Sangeet' | 'Corporate Event' | 'Conference' | 'Exhibition' | 'Other';
  eventDate: string;
  alternateDate?: string;
  guestCount: number; // Minimum 50
  timingFrom: string; // HH:MM format
  timingTo: string; // HH:MM format
  requirements: string[]; // Array of: Catering, Decoration, Photography, DJ, etc.
  name: string;
  phone: string;
  email: string;
  city: string;
  hearAboutUs: 'Google' | 'Instagram' | 'Facebook' | 'Referral' | 'Wedding Planner' | 'Walk-in' | 'Other';
  additionalNotes?: string;
  requestType: 'Site Visit' | 'Quote' | 'Both';
}

/**
 * Contact Form Data
 * Used for /contact page
 */
export interface ContactFormData {
  inquiryType: 'Reservation' | 'Event' | 'General' | 'Corporate' | 'Jobs' | 'Press' | 'Issue' | 'Feedback';
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Feedback Form Data
 * Used for /feedback page
 */
export interface FeedbackFormData {
  visitDate: string; // ISO date format
  spaceVisited: 'Café & Bakery' | 'Rooftop Restaurant' | 'Lounge' | 'Club' | 'Private Dining' | 'Banquet';
  overallRating: 1 | 2 | 3 | 4 | 5;
  foodRating: 1 | 2 | 3 | 4 | 5;
  serviceRating: 1 | 2 | 3 | 4 | 5;
  ambianceRating: 1 | 2 | 3 | 4 | 5;
  valueRating: 1 | 2 | 3 | 4 | 5;
  whatYouLoved: string;
  improvements: string;
  wouldRecommend: 'Definitely' | 'Probably' | 'Maybe' | 'No';
  name?: string; // Optional
  email?: string; // Optional
  canSharePublicly: boolean;
}

/**
 * Career Application Form Data
 * Used for /careers page
 */
export interface CareerFormData {
  position: 'Chef' | 'Sous Chef' | 'Bartender' | 'Server' | 'Host' | 'Manager' | 'Housekeeping' | 'Kitchen Staff' | 'Security' | 'Other';
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experienceYears: number; // 0-50
  currentPosition: string;
  expectedSalary: number; // Monthly in INR
  portfolioUrl?: string;
  whyAmante: string;
  availableToJoin: string; // ISO date format
}

// ----------------------------------------------------------------------------
// DATABASE MODEL TYPES
// ----------------------------------------------------------------------------

/**
 * Base fields common to all database records
 */
interface BaseModel {
  id: string; // UUID
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/**
 * Reservation Status
 */
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

/**
 * Reservation Database Model
 */
export interface Reservation extends BaseModel {
  date: string;
  time: string;
  partySize: number;
  spacePreference: string;
  occasion?: string;
  name: string;
  phone: string;
  email: string;
  specialRequests?: string;
  agreeToSMS: boolean;
  status: ReservationStatus;
  adminNotes?: string;
  confirmedBy?: string;
  confirmedAt?: string;
}

/**
 * Private Event Status
 */
export type PrivateEventStatus = 'pending' | 'contacted' | 'quoted' | 'confirmed' | 'cancelled' | 'completed';

/**
 * Private Event Database Model
 */
export interface PrivateEvent extends BaseModel {
  eventType: string;
  eventDate: string;
  guestCount: number;
  budgetRange: string;
  spacePreference: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  requirements: string;
  preferredContact: string;
  status: PrivateEventStatus;
  adminNotes?: string;
  quoteSentAt?: string;
  quoteAmount?: number;
  assignedTo?: string;
}

/**
 * Banquet Status
 */
export type BanquetStatus = 'pending' | 'site_visit_scheduled' | 'quote_sent' | 'negotiating' | 'confirmed' | 'cancelled' | 'completed';

/**
 * Banquet Database Model
 */
export interface Banquet extends BaseModel {
  eventType: string;
  eventDate: string;
  alternateDate?: string;
  guestCount: number;
  timingFrom: string;
  timingTo: string;
  requirements: string[];
  name: string;
  phone: string;
  email: string;
  city: string;
  hearAboutUs: string;
  additionalNotes?: string;
  requestType: string;
  status: BanquetStatus;
  adminNotes?: string;
  siteVisitDate?: string;
  quoteSentAt?: string;
  quoteAmount?: number;
  advancePaid?: number;
  assignedTo?: string;
}

/**
 * Contact Submission Status
 */
export type ContactStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

/**
 * Contact Submission Database Model
 */
export interface ContactSubmission extends BaseModel {
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: ContactStatus;
  adminNotes?: string;
  respondedAt?: string;
  respondedBy?: string;
}

/**
 * Feedback Database Model
 */
export interface Feedback extends BaseModel {
  visitDate: string;
  spaceVisited: string;
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  ambianceRating: number;
  valueRating: number;
  whatYouLoved: string;
  improvements: string;
  wouldRecommend: string;
  name?: string;
  email?: string;
  canSharePublicly: boolean;
  featured: boolean;
  adminNotes?: string;
  publishedOnWebsite: boolean;
}

/**
 * Career Application Status
 */
export type CareerStatus = 'received' | 'screening' | 'interview_scheduled' | 'interviewed' | 'selected' | 'rejected' | 'offer_sent' | 'joined';

/**
 * Career Application Database Model
 */
export interface CareerApplication extends BaseModel {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experienceYears: number;
  currentPosition: string;
  expectedSalary: number;
  resumeUrl: string; // Supabase Storage URL
  portfolioUrl?: string;
  whyAmante: string;
  availableToJoin: string;
  status: CareerStatus;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  interviewScheduledAt?: string;
}

// ----------------------------------------------------------------------------
// API RESPONSE TYPES
// ----------------------------------------------------------------------------

/**
 * Standard API Success Response
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

/**
 * Standard API Error Response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

/**
 * API Response Type (Success or Error)
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Form Submission Success Response Data
 */
export interface FormSubmissionResponse {
  id: string;
  message: string;
}

// ----------------------------------------------------------------------------
// COMPONENT PROP TYPES
// ----------------------------------------------------------------------------

/**
 * Space Information
 */
export interface SpaceInfo {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  capacity: {
    seating: number;
    standing?: number;
  };
  timings: string;
  perfectFor: string[];
  highlights: string[];
  menuSpecialties: string;
  bookingType: 'reservation' | 'private-event' | 'banquet';
}

/**
 * Event Information
 */
export interface EventInfo {
  id: string;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: string;
  imageUrl: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  published: boolean;
}

/**
 * Testimonial
 */
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  spaceVisited: string;
  date: string;
  featured: boolean;
}

/**
 * Button Props
 */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * Form Field Props
 */
export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'time' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Select Field Props
 */
export interface SelectFieldProps extends Omit<FormFieldProps, 'type'> {
  options: Array<{
    value: string;
    label: string;
  }>;
}

/**
 * File Upload Props
 */
export interface FileUploadProps {
  label: string;
  name: string;
  accept: string;
  maxSize: number; // in bytes
  required?: boolean;
  error?: string;
  helpText?: string;
  disabled?: boolean;
}

/**
 * Modal Props
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

/**
 * Toast Notification Type
 */
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// ----------------------------------------------------------------------------
// UTILITY TYPES
// ----------------------------------------------------------------------------

/**
 * Make all properties optional
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/**
 * Extract keys of a type that match a certain type
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Page Props (Next.js 15 App Router)
 */
export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Layout Props (Next.js 15 App Router)
 */
export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}

// ----------------------------------------------------------------------------
// VALIDATION TYPES (for Zod schemas)
// ----------------------------------------------------------------------------

/**
 * Validation Error
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation Result
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

// ----------------------------------------------------------------------------
// EMAIL TYPES
// ----------------------------------------------------------------------------

/**
 * Email Template Props (React Email)
 */
export interface EmailTemplateProps {
  name: string;
  [key: string]: any; // Additional props based on template
}

/**
 * Email Send Result
 */
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ----------------------------------------------------------------------------
// CONTENT TYPES
// ----------------------------------------------------------------------------

/**
 * Menu Item (from existing menu.ts)
 */
export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  description?: string;
  price: number;
  category: string;
  subcategory?: string;
  dietary?: Array<'veg' | 'non-veg' | 'vegan' | 'gluten-free'>;
  spicyLevel?: 1 | 2 | 3;
  popular?: boolean;
  new?: boolean;
  imageUrl?: string;
}

/**
 * Menu Category
 */
export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

// ----------------------------------------------------------------------------
// NAVIGATION TYPES
// ----------------------------------------------------------------------------

/**
 * Navigation Link
 */
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/**
 * Breadcrumb Item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ----------------------------------------------------------------------------
// SEO TYPES
// ----------------------------------------------------------------------------

/**
 * SEO Metadata
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

// ----------------------------------------------------------------------------
// ANALYTICS TYPES
// ----------------------------------------------------------------------------

/**
 * Analytics Event
 */
export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Form Analytics
 */
export interface FormAnalytics {
  formType: string;
  submissionTime: number; // milliseconds
  completionRate: number; // percentage
  errors: string[];
}

// ----------------------------------------------------------------------------
// ERROR TYPES
// ----------------------------------------------------------------------------

/**
 * Application Error
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Validation Error Class
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Database Error Class
 */
export class DatabaseError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'DATABASE_ERROR', 500, details);
    this.name = 'DatabaseError';
  }
}

// ----------------------------------------------------------------------------
// CONFIGURATION TYPES
// ----------------------------------------------------------------------------

/**
 * Site Configuration
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  hours: {
    [key: string]: string;
  };
}

// ----------------------------------------------------------------------------
// TYPE GUARDS
// ----------------------------------------------------------------------------

/**
 * Check if response is API error
 */
export function isApiError(response: ApiResponse): response is ApiErrorResponse {
  return response.success === false;
}

/**
 * Check if response is API success
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

// ----------------------------------------------------------------------------
// RE-EXPORTS
// ----------------------------------------------------------------------------

// Re-export menu types if needed
export * from './menu';

// ============================================================================
// END OF TYPE DEFINITIONS
// ============================================================================
