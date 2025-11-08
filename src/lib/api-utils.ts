/**
 * API Utility Functions
 *
 * Helper functions for API route handlers including error handling,
 * rate limiting, and response formatting.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// ============================================================================
// TYPES
// ============================================================================

export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Handle API errors and return appropriate response
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error('API Error:', error);

  // Zod validation error
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    );
  }

  // Database error
  if (error instanceof Error) {
    if (error.message.toLowerCase().includes('database')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to save data. Please try again.',
          },
        },
        { status: 500 }
      );
    }

    // File upload error
    if (error.message.toLowerCase().includes('file') || error.message.toLowerCase().includes('upload')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_UPLOAD_ERROR',
            message: error.message,
          },
        },
        { status: 400 }
      );
    }

    // Email error (don't fail the request, just log)
    if (error.message.toLowerCase().includes('email')) {
      console.error('Email sending failed, but request succeeded:', error);
      // Don't return error - email failure shouldn't block form submission
    }

    // Generic error with message
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: error.message || 'Something went wrong. Please try again later.',
        },
      },
      { status: 500 }
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
      },
    },
    { status: 500 }
  );
}

/**
 * Create success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * Create error response
 */
export function errorResponse(
  code: string,
  message: string,
  status: number = 500,
  details?: any
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

// ============================================================================
// RATE LIMITING
// ============================================================================

/**
 * Redis-based rate limiting using Upstash
 * Persistent rate limiting for serverless environments
 */

// Initialize Redis client (only if credentials are provided)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create rate limiter instances
export const apiRateLimiter = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per minute
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null;

export const strictRateLimiter = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(3, '60 s'), // 3 requests per minute for sensitive endpoints
      analytics: true,
      prefix: 'ratelimit:strict',
    })
  : null;

/**
 * Check rate limit and return appropriate response if limited
 */
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null = apiRateLimiter
): Promise<NextResponse<ApiErrorResponse> | null> {
  // If no rate limiter configured (Redis not available), skip rate limiting
  if (!limiter) {
    console.warn('Rate limiting disabled - Upstash Redis not configured');
    return null;
  }

  const { success, limit, reset, remaining } = await limiter.limit(identifier);

  if (!success) {
    const resetDate = new Date(reset);
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.`,
          details: {
            retryAfter,
          },
        },
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }

  return null;
}

/**
 * Get client identifier from request (IP or user agent)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  // Fallback to user agent if no IP
  if (ip === 'unknown') {
    const userAgent = request.headers.get('user-agent') || 'unknown';
    return `ua:${userAgent.slice(0, 50)}`;
  }

  return `ip:${ip}`;
}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

/**
 * Validate request content type
 */
export function validateContentType(request: Request, expected: string = 'application/json'): boolean {
  const contentType = request.headers.get('content-type');
  return contentType?.includes(expected) ?? false;
}

/**
 * Safely parse JSON request body
 */
export async function parseJsonBody<T = any>(request: Request): Promise<T> {
  try {
    return await request.json();
  } catch (error) {
    throw new Error('Invalid JSON in request body');
  }
}

/**
 * Safely parse form data
 */
export async function parseFormData(request: Request): Promise<FormData> {
  try {
    return await request.formData();
  } catch (error) {
    throw new Error('Invalid form data in request');
  }
}

// ============================================================================
// LOGGING
// ============================================================================

/**
 * Log API request
 */
export function logApiRequest(
  method: string,
  path: string,
  identifier: string,
  duration?: number
): void {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${method} ${path} | Client: ${identifier}${
    duration ? ` | Duration: ${duration}ms` : ''
  }`;
  console.log(logLine);
}

/**
 * Log API error
 */
export function logApiError(
  method: string,
  path: string,
  error: unknown,
  identifier: string
): void {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR ${method} ${path} | Client: ${identifier}`);
  console.error(error);
}

// ============================================================================
// CORS HEADERS
// ============================================================================

/**
 * Add CORS headers to response
 */
export function addCorsHeaders(response: NextResponse): NextResponse {
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['*'];

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0]);
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  return response;
}

// ============================================================================
// DATA SANITIZATION
// ============================================================================

/**
 * Remove sensitive data from object before logging
 */
export function sanitizeForLogging<T extends Record<string, any>>(data: T): Partial<T> {
  const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard'];
  const sanitized: any = { ...data };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

/**
 * Add cache headers to response
 */
export function addCacheHeaders(
  response: NextResponse,
  maxAge: number = 300
): NextResponse {
  response.headers.set('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate`);
  return response;
}

/**
 * Add no-cache headers to response
 */
export function addNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate required environment variables
 */
export function validateEnvVars(requiredVars: string[]): void {
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if emails should be skipped in development
 */
export function shouldSkipEmails(): boolean {
  return isDevelopment() && process.env.SKIP_EMAILS_IN_DEV === 'true';
}
