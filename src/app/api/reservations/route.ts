/**
 * Reservations API Route
 *
 * POST /api/reservations
 * Handles table reservation requests
 */

import { NextRequest } from 'next/server';
import { reservationSchema, sanitizeObject } from '@/lib/validations';
import { addReservation } from '@/lib/googleSheets';
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
    const validated = reservationSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in Google Sheets
    await addReservation({
      date: sanitized.date,
      time: sanitized.time,
      partySize: sanitized.partySize,
      spacePreference: sanitized.spacePreference,
      occasion: sanitized.occasion || '',
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      specialRequests: sanitized.specialRequests || '',
      agreeToSMS: sanitized.agreeToSMS,
    });

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/reservations', clientId, duration);

    // 6. Return success response
    return successResponse(
      {
        message:
          "Reservation request received successfully. We'll contact you within 2 hours to confirm.",
      },
      "Reservation request received successfully. We'll contact you within 2 hours to confirm.",
      200
    );
  } catch (error) {
    // Log error
    console.error('Reservation API error:', error);

    // Return error response
    return handleApiError(error);
  }
}

// CORS is now handled by middleware.ts - no need for OPTIONS handler
