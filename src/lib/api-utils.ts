/**
 * API Utility Functions
 *
 * Helper functions for API route handlers including error handling,
 * rate limiting, and response formatting.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

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
 * Simple in-memory rate limiter
 * For production, consider using Redis or Upstash
 */
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;

    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Check if request should be rate limited
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.requests.get(identifier);

    if (!record || now >= record.resetTime) {
      // No record or window expired, create new one
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return false;
    }

    if (record.count >= this.limit) {
      return true;
    }

    record.count++;
    return false;
  }

  /**
   * Get rate limit info for headers
   */
  getRateLimitInfo(identifier: string): {
    limit: number;
    remaining: number;
    reset: number;
  } {
    const record = this.requests.get(identifier);
    if (!record) {
      return {
        limit: this.limit,
        remaining: this.limit,
        reset: Date.now() + this.windowMs,
      };
    }

    return {
      limit: this.limit,
      remaining: Math.max(0, this.limit - record.count),
      reset: record.resetTime,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now >= record.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Create rate limiter instances
export const apiRateLimiter = new RateLimiter(10, 60000); // 10 requests per minute
export const strictRateLimiter = new RateLimiter(3, 60000); // 3 requests per minute for sensitive endpoints

/**
 * Check rate limit and return appropriate response if limited
 */
export function checkRateLimit(
  identifier: string,
  limiter: RateLimiter = apiRateLimiter
): NextResponse<ApiErrorResponse> | null {
  if (limiter.isRateLimited(identifier)) {
    const info = limiter.getRateLimitInfo(identifier);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
          details: {
            retryAfter: Math.ceil((info.reset - Date.now()) / 1000),
          },
        },
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': info.limit.toString(),
          'X-RateLimit-Remaining': info.remaining.toString(),
          'X-RateLimit-Reset': info.reset.toString(),
          'Retry-After': Math.ceil((info.reset - Date.now()) / 1000).toString(),
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
