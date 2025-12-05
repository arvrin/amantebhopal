/**
 * Contact API Route
 *
 * POST /api/contact
 * Handles general contact form submissions
 */

import { NextRequest } from 'next/server';
import { contactSchema, sanitizeObject } from '@/lib/validations';
import { addContact } from '@/lib/googleSheets';
import {
  handleApiError,
  successResponse,
  checkRateLimit,
  getClientIdentifier,
  logApiRequest,
  parseJsonBody,
} from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientId = getClientIdentifier(request);

  try {
    // 1. Rate limiting
    const rateLimitResponse = await checkRateLimit(clientId);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 2. Parse request body
    const body = await parseJsonBody(request);

    // 3. Validate with Zod schema
    const validated = contactSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in Google Sheets
    await addContact({
      inquiryType: sanitized.inquiryType,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email || '',
      message: sanitized.message,
    });

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/contact', clientId, duration);

    // 6. Return success response
    return successResponse(
      {
        message: "Thank you for contacting us. We'll respond within 24 hours.",
      },
      "Thank you for contacting us. We'll respond within 24 hours.",
      200
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return handleApiError(error);
  }
}

// CORS is now handled by middleware.ts - no need for OPTIONS handler
