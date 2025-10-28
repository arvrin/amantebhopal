/**
 * Form Type Definitions
 *
 * Comprehensive type definitions for all form-related functionality.
 * These types ensure type safety for form handling, validation, and state management.
 */

import type { UseFormReturn, FieldErrors, FieldValues } from 'react-hook-form';
import type { z } from 'zod';

// ============================================================================
// FORM DATA TYPES (Re-exported from index.ts for convenience)
// ============================================================================

export type {
  ReservationFormData,
  PrivateEventFormData,
  BanquetFormData,
  ContactFormData,
  FeedbackFormData,
  CareerFormData,
} from './index';

// ============================================================================
// FORM STATE TYPES
// ============================================================================

/**
 * Form submission state
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Form state
 */
export interface FormState<T = any> {
  status: FormStatus;
  data: T | null;
  error: string | null;
  submittedAt: string | null;
}

/**
 * Form context type
 */
export interface FormContext<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  state: FormState<T>;
  onSubmit: (data: T) => Promise<void>;
  onReset: () => void;
}

// ============================================================================
// FORM FIELD TYPES
// ============================================================================

/**
 * Form field metadata
 */
export interface FormFieldMeta {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: any;
  validation?: z.ZodTypeAny;
}

/**
 * Form field type
 */
export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'url'
  | 'password'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'hidden';

/**
 * Form field value
 */
export type FormFieldValue = string | number | boolean | File | null | undefined;

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  type?: string;
}

/**
 * Validation result
 */
export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Custom validator function
 */
export type ValidatorFunction<T = any> = (value: T) => boolean | string;

/**
 * Field validators
 */
export interface FieldValidators {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: ValidatorFunction | Record<string, ValidatorFunction>;
}

// ============================================================================
// FORM CONFIGURATION TYPES
// ============================================================================

/**
 * Form configuration
 */
export interface FormConfig<T extends FieldValues = FieldValues> {
  fields: FormFieldMeta[];
  defaultValues?: Partial<T>;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  onError?: (errors: FieldErrors<T>) => void;
  resetOnSuccess?: boolean;
}

/**
 * Form options
 */
export interface FormOptions {
  mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
  reValidateMode?: 'onSubmit' | 'onBlur' | 'onChange';
  shouldFocusError?: boolean;
  shouldUnregister?: boolean;
  criteriaMode?: 'firstError' | 'all';
}

// ============================================================================
// FORM HOOK TYPES
// ============================================================================

/**
 * Use form return type
 */
export interface UseFormHook<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  state: FormState<T>;
  submit: () => Promise<void>;
  reset: () => void;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

/**
 * Use form props
 */
export interface UseFormProps<T extends FieldValues = FieldValues> {
  schema?: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  options?: FormOptions;
}

// ============================================================================
// SPECIFIC FORM TYPES
// ============================================================================

/**
 * Reservation form values
 */
export interface ReservationFormValues {
  date: string;
  time: string;
  partySize: string;
  spacePreference: string;
  occasion: string;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  agreeToSMS: boolean;
}

/**
 * Private event form values
 */
export interface PrivateEventFormValues {
  eventType: string;
  eventDate: string;
  guestCount: string;
  budgetRange: string;
  spacePreference: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  requirements: string;
  preferredContact: string;
}

/**
 * Banquet form values
 */
export interface BanquetFormValues {
  eventType: string;
  eventDate: string;
  alternateDate: string;
  guestCount: string;
  timingFrom: string;
  timingTo: string;
  requirements: string[];
  name: string;
  phone: string;
  email: string;
  city: string;
  hearAboutUs: string;
  additionalNotes: string;
  requestType: string;
}

/**
 * Contact form values
 */
export interface ContactFormValues {
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Feedback form values
 */
export interface FeedbackFormValues {
  visitDate: string;
  spaceVisited: string;
  overallRating: string;
  foodRating: string;
  serviceRating: string;
  ambianceRating: string;
  valueRating: string;
  whatYouLoved: string;
  improvements: string;
  wouldRecommend: string;
  name: string;
  email: string;
  canSharePublicly: boolean;
}

/**
 * Career form values
 */
export interface CareerFormValues {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experienceYears: string;
  currentPosition: string;
  expectedSalary: string;
  resume: FileList | null;
  portfolioUrl: string;
  whyAmante: string;
  availableToJoin: string;
}

// ============================================================================
// FILE UPLOAD TYPES
// ============================================================================

/**
 * File upload state
 */
export interface FileUploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  progress: number;
  error: string | null;
}

/**
 * File validation rules
 */
export interface FileValidationRules {
  maxSize?: number;
  acceptedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * File validation result
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
  file?: File;
}

// ============================================================================
// FORM STEP TYPES (Multi-step forms)
// ============================================================================

/**
 * Form step
 */
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  optional?: boolean;
}

/**
 * Multi-step form state
 */
export interface MultiStepFormState {
  currentStep: number;
  completedSteps: number[];
  steps: FormStep[];
  canGoNext: boolean;
  canGoPrevious: boolean;
}

/**
 * Multi-step form actions
 */
export interface MultiStepFormActions {
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeStep: (step: number) => void;
}

// ============================================================================
// FORM ANALYTICS TYPES
// ============================================================================

/**
 * Form analytics data
 */
export interface FormAnalytics {
  formId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  fields: FieldAnalytics[];
  submitted: boolean;
  errors: string[];
  abandoned: boolean;
}

/**
 * Field analytics data
 */
export interface FieldAnalytics {
  fieldName: string;
  timeToFirstInteraction?: number;
  timeSpent: number;
  errorCount: number;
  changedCount: number;
  finalValue?: any;
}

// ============================================================================
// FORM SUBMISSION TYPES
// ============================================================================

/**
 * Form submission data
 */
export interface FormSubmissionData<T = any> {
  formType: string;
  data: T;
  timestamp: string;
  metadata?: FormSubmissionMetadata;
}

/**
 * Form submission metadata
 */
export interface FormSubmissionMetadata {
  userAgent?: string;
  referrer?: string;
  duration?: number;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  sessionId?: string;
}

/**
 * Form submission result
 */
export interface FormSubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
  redirectUrl?: string;
}

// ============================================================================
// FORM ERROR TYPES
// ============================================================================

/**
 * Form error
 */
export interface FormError {
  field?: string;
  message: string;
  type?: FormErrorType;
}

/**
 * Form error type
 */
export type FormErrorType =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'pattern'
  | 'validate'
  | 'server'
  | 'network';

/**
 * Form error handler
 */
export type FormErrorHandler = (errors: FormError[]) => void;

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Extract form data type from schema
 */
export type InferFormData<T extends z.ZodTypeAny> = z.infer<T>;

/**
 * Make form fields optional
 */
export type PartialFormData<T> = {
  [K in keyof T]?: T[K];
};

/**
 * Required form fields
 */
export type RequiredFormFields<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;
