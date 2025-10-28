/**
 * Private Events API Route
 *
 * POST /api/private-events
 * Handles private event enquiry submissions
 */

import { NextRequest } from 'next/server';
import { privateEventSchema, sanitizeObject } from '@/lib/validations';
import { createPrivateEvent } from '@/lib/db-utils';
import { sendPrivateEventEmails } from '@/lib/email';
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
    const validated = privateEventSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in database
    const { data: event, error: dbError } = await createPrivateEvent({
      event_type: sanitized.eventType,
      event_date: sanitized.eventDate,
      guest_count: sanitized.guestCount,
      budget_range: sanitized.budgetRange,
      space_preference: sanitized.spacePreference === 'Any' ? null : sanitized.spacePreference,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      company: sanitized.company || null,
      requirements: sanitized.requirements,
      preferred_contact: sanitized.preferredContact,
      status: 'pending',
    });

    if (dbError || !event) {
      throw new Error(dbError?.message || 'Failed to create private event enquiry');
    }

    // 6. Send emails (non-blocking)
    if (!shouldSkipEmails()) {
      sendPrivateEventEmails(event).catch((error) => {
        console.error('Failed to send private event emails:', error);
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Private event data:', event);
    }

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/private-events', clientId, duration);

    // 8. Return success response
    return successResponse(
      {
        id: event.id,
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
