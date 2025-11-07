/**
 * Form Validation Schemas
 *
 * Zod validation schemas for all form submissions.
 * These ensure data integrity and provide type safety.
 */

import { z } from 'zod';

// ============================================================================
// COMMON VALIDATORS
// ============================================================================

/**
 * Indian phone number validator
 * Format: +91XXXXXXXXXX (10 digits after +91, starting with 6-9)
 */
const indianPhoneSchema = z
  .string()
  .regex(/^\+91[6-9]\d{9}$/, 'Phone number must be in format +91XXXXXXXXXX');

/**
 * Email validator with length limit
 */
const emailSchema = z.string().email('Invalid email format').max(100);

/**
 * Name validator
 */
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name cannot exceed 100 characters')
  .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters, spaces, and common punctuation');

/**
 * Future date validator
 */
const futureDateSchema = z.string().refine(
  (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  },
  { message: 'Date must be today or in the future' }
);

/**
 * Past or present date validator
 */
const pastOrPresentDateSchema = z.string().refine(
  (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDate <= today;
  },
  { message: 'Date cannot be in the future' }
);

// ============================================================================
// 1. RESERVATION SCHEMA
// ============================================================================

export const reservationSchema = z.object({
  date: futureDateSchema,
  time: z.enum(['11:00 AM', '1:00 PM', '3:00 PM', '7:00 PM', '9:00 PM', '11:00 PM'], {
    message: 'Please select a valid time slot',
  }),
  partySize: z
    .number()
    .int('Party size must be a whole number')
    .min(1, 'Party size must be at least 1')
    .max(20, 'For parties larger than 20, please contact us directly'),
  spacePreference: z.enum(['Rooftop Restaurant', 'Lounge', 'Café', 'Any'], {
    message: 'Please select a valid space',
  }),
  occasion: z.string().max(100).optional(),
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema,
  specialRequests: z.string().max(500, 'Special requests cannot exceed 500 characters').optional(),
  agreeToSMS: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive SMS notifications',
  }),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

// ============================================================================
// 2. PRIVATE EVENTS SCHEMA
// ============================================================================

export const privateEventSchema = z.object({
  eventType: z.enum(['Birthday', 'Anniversary', 'Corporate', 'Proposal', 'Celebration', 'Other'], {
    message: 'Please select a valid event type',
  }),
  eventDate: futureDateSchema,
  guestCount: z
    .number()
    .int('Guest count must be a whole number')
    .min(1, 'Guest count must be at least 1')
    .max(500, 'For events larger than 500 guests, please use banquet enquiry'),
  budgetRange: z.enum(['₹50k-1L', '₹1L-2L', '₹2L-5L', '₹5L+'], {
    message: 'Please select a budget range',
  }),
  spacePreference: z.enum(['Private Dining', 'Rooftop Restaurant', 'Banquet Hall', 'Lounge', 'Any'], {
    message: 'Please select a valid space',
  }),
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema,
  company: z.string().max(100, 'Company name cannot exceed 100 characters').optional(),
  requirements: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your requirements')
    .max(1000, 'Requirements cannot exceed 1000 characters'),
  preferredContact: z.enum(['Phone', 'WhatsApp', 'Email'], {
    message: 'Please select a preferred contact method',
  }),
});

export type PrivateEventFormData = z.infer<typeof privateEventSchema>;

// ============================================================================
// 3. CONTACT SCHEMA
// ============================================================================

export const contactSchema = z.object({
  inquiryType: z.enum(
    ['Reservation', 'Event', 'General', 'Corporate', 'Jobs', 'Press', 'Issue', 'Feedback'],
    {
      message: 'Please select an inquiry type',
    }
  ),
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema,
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ============================================================================
// 5. FEEDBACK SCHEMA
// ============================================================================

const ratingSchema = z
  .number()
  .int('Rating must be a whole number')
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating cannot exceed 5');

export const feedbackSchema = z.object({
  visitDate: pastOrPresentDateSchema,
  spaceVisited: z.enum(
    ['Café & Bakery', 'Rooftop Restaurant', 'Lounge', 'Club', 'Private Dining', 'Banquet'],
    {
      message: 'Please select the space you visited',
    }
  ),
  overallRating: ratingSchema,
  foodRating: ratingSchema,
  serviceRating: ratingSchema,
  ambianceRating: ratingSchema,
  valueRating: ratingSchema,
  whatYouLoved: z
    .string()
    .min(10, 'Please share at least 10 characters about what you loved')
    .max(500, 'This field cannot exceed 500 characters'),
  improvements: z.string().max(500, 'This field cannot exceed 500 characters').optional(),
  wouldRecommend: z.enum(['Definitely', 'Probably', 'Maybe', 'No'], {
    message: 'Please select a recommendation option',
  }),
  name: z.string().max(100).optional(),
  email: z.string().email('Invalid email format').max(100).optional().or(z.literal('')),
  canSharePublicly: z.boolean(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

// ============================================================================
// 6. CAREER APPLICATION SCHEMA
// ============================================================================

export const careerSchema = z.object({
  position: z.enum(
    [
      'Chef',
      'Sous Chef',
      'Bartender',
      'Server',
      'Host',
      'Manager',
      'Housekeeping',
      'Kitchen Staff',
      'Security',
      'Other',
    ],
    {
      message: 'Please select a position',
    }
  ),
  fullName: nameSchema,
  email: emailSchema,
  phone: indianPhoneSchema,
  currentCity: z.string().min(2, 'City is required').max(100),
  experienceYears: z
    .number()
    .int('Experience must be a whole number')
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience cannot exceed 50 years'),
  currentPosition: z.string().max(100).optional(),
  expectedSalary: z
    .number()
    .int('Salary must be a whole number')
    .min(0, 'Salary cannot be negative')
    .optional(),
  portfolioUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  whyAmante: z
    .string()
    .min(50, 'Please provide at least 50 characters explaining why you want to join Amante')
    .max(1000, 'This field cannot exceed 1000 characters'),
  availableToJoin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  resumeUrl: z.string().url('Invalid resume URL'),
});

export type CareerFormData = z.infer<typeof careerSchema>;

// ============================================================================
// FILE VALIDATION
// ============================================================================

/**
 * Validate resume file upload
 */
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: 'Resume file is required' };
  }

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Resume must be in PDF or DOC format',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Resume file size must be under 5MB',
    };
  }

  return { valid: true };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

/**
 * Sanitize all string fields in an object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Assumes +91XXXXXXXXXX format
  if (phone.startsWith('+91')) {
    const digits = phone.slice(3);
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

/**
 * Validate Indian phone number format
 */
export function isValidIndianPhone(phone: string): boolean {
  return /^\+91[6-9]\d{9}$/.test(phone);
}
