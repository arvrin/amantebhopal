/**
 * Private Events API Route
 *
 * POST /api/private-events
 * Handles private event enquiry submissions
 */

import { NextRequest } from 'next/server';
import { privateEventSchema, sanitizeObject } from '@/lib/validations';
import { addPrivateEvent } from '@/lib/googleSheets';
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
    const rateLimitResponse = checkRateLimit(clientId);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 2. Parse request body
    const body = await parseJsonBody(request);

    // 3. Validate with Zod schema
    const validated = privateEventSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in Google Sheets
    await addPrivateEvent({
      eventType: sanitized.eventType,
      eventDate: sanitized.eventDate,
      guestCount: sanitized.guestCount,
      budgetRange: sanitized.budgetRange,
      spacePreference: sanitized.spacePreference,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      company: sanitized.company || '',
      requirements: sanitized.requirements,
      preferredContact: sanitized.preferredContact,
    });

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/private-events', clientId, duration);

    // 6. Return success response
    return successResponse(
      {
        message:
          'Private event enquiry received. Our events team will contact you within 24 hours.',
      },
      'Private event enquiry received. Our events team will contact you within 24 hours.',
      200
    );
  } catch (error) {
    console.error('Private events API error:', error);
    return handleApiError(error);
  }
}

export async function OPTIONS(_request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
