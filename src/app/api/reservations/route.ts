/**
 * Reservations API Route
 *
 * POST /api/reservations
 * Handles table reservation requests
 */

import { NextRequest } from 'next/server';
import { reservationSchema, sanitizeObject } from '@/lib/validations';
import { createReservation } from '@/lib/db-utils';
import { sendReservationEmails } from '@/lib/email';
import {
  handleApiError,
  successResponse,
  checkRateLimit,
  getClientIdentifier,
  logApiRequest,
  parseJsonBody,
  shouldSkipEmails,
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
    const validated = reservationSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in database
    const { data: reservation, error: dbError } = await createReservation({
      date: sanitized.date,
      time: sanitized.time,
      party_size: sanitized.partySize,
      space_preference: sanitized.spacePreference === 'Any' ? null : sanitized.spacePreference,
      occasion: sanitized.occasion || null,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      special_requests: sanitized.specialRequests || null,
      agree_to_sms: sanitized.agreeToSMS,
      status: 'pending', // Default status
    });

    if (dbError || !reservation) {
      throw new Error(dbError?.message || 'Failed to create reservation');
    }

    // 6. Send emails (non-blocking - don't fail request if emails fail)
    if (!shouldSkipEmails()) {
      sendReservationEmails(reservation).catch((error) => {
        console.error('Failed to send reservation emails:', error);
        // Log to error tracking service in production
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Reservation data:', reservation);
    }

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/reservations', clientId, duration);

    // 8. Return success response
    return successResponse(
      {
        id: reservation.id,
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

// OPTIONS handler for CORS preflight
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
