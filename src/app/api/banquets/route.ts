/**
 * Banquets API Route
 *
 * POST /api/banquets
 * Handles banquet/wedding booking enquiries
 */

import { NextRequest } from 'next/server';
import { banquetSchema, sanitizeObject } from '@/lib/validations';
import { createBanquet } from '@/lib/db-utils';
import { sendBanquetEmails } from '@/lib/email';
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
    const validated = banquetSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in database
    const { data: banquet, error: dbError } = await createBanquet({
      event_type: sanitized.eventType,
      event_date: sanitized.eventDate,
      alternate_date: sanitized.alternateDate || null,
      guest_count: sanitized.guestCount,
      timing_from: sanitized.timingFrom,
      timing_to: sanitized.timingTo,
      requirements: sanitized.requirements,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      city: sanitized.city,
      hear_about_us: sanitized.hearAboutUs,
      additional_notes: sanitized.additionalNotes || null,
      request_type: sanitized.requestType,
      status: 'pending',
      advance_paid: 0,
    });

    if (dbError || !banquet) {
      throw new Error(dbError?.message || 'Failed to create banquet enquiry');
    }

    // 6. Send emails (non-blocking)
    if (!shouldSkipEmails()) {
      sendBanquetEmails(banquet).catch((error) => {
        console.error('Failed to send banquet emails:', error);
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Banquet data:', banquet);
    }

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/banquets', clientId, duration);

    // 8. Return success response
    return successResponse(
      {
        id: banquet.id,
        message:
          'Banquet enquiry received. Our banquet manager will contact you within 12 hours.',
      },
      'Banquet enquiry received. Our banquet manager will contact you within 12 hours.',
      200
    );
  } catch (error) {
    console.error('Banquets API error:', error);
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
