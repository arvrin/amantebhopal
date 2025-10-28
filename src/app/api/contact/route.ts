/**
 * Contact API Route
 *
 * POST /api/contact
 * Handles general contact form submissions
 */

import { NextRequest } from 'next/server';
import { contactSchema, sanitizeObject } from '@/lib/validations';
import { createContactSubmission } from '@/lib/db-utils';
import { sendContactEmails } from '@/lib/email';
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
    const validated = contactSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in database
    const { data: contact, error: dbError } = await createContactSubmission({
      inquiry_type: sanitized.inquiryType,
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      message: sanitized.message,
      status: 'pending',
    });

    if (dbError || !contact) {
      throw new Error(dbError?.message || 'Failed to create contact submission');
    }

    // 6. Send emails (non-blocking)
    if (!shouldSkipEmails()) {
      sendContactEmails(contact).catch((error) => {
        console.error('Failed to send contact emails:', error);
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Contact data:', contact);
    }

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/contact', clientId, duration);

    // 8. Return success response
    return successResponse(
      {
        id: contact.id,
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
