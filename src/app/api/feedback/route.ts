/**
 * Feedback API Route
 *
 * POST /api/feedback
 * Handles customer feedback and review submissions
 */

import { NextRequest } from 'next/server';
import { feedbackSchema, sanitizeObject } from '@/lib/validations';
import { createFeedback } from '@/lib/db-utils';
import { sendFeedbackEmails } from '@/lib/email';
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
    const validated = feedbackSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in database
    const { data: feedback, error: dbError } = await createFeedback({
      visit_date: sanitized.visitDate,
      space_visited: sanitized.spaceVisited,
      overall_rating: sanitized.overallRating,
      food_rating: sanitized.foodRating,
      service_rating: sanitized.serviceRating,
      ambiance_rating: sanitized.ambianceRating,
      value_rating: sanitized.valueRating,
      what_you_loved: sanitized.whatYouLoved,
      improvements: sanitized.improvements || null,
      would_recommend: sanitized.wouldRecommend,
      name: sanitized.name || null,
      email: sanitized.email || null,
      can_share_publicly: sanitized.canSharePublicly,
      featured: false, // Admin will manually feature reviews
      published_on_website: false, // Admin will manually publish
    });

    if (dbError || !feedback) {
      throw new Error(dbError?.message || 'Failed to create feedback');
    }

    // 6. Send emails (non-blocking)
    if (!shouldSkipEmails()) {
      sendFeedbackEmails(feedback).catch((error) => {
        console.error('Failed to send feedback emails:', error);
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Feedback data:', feedback);
    }

    // 7. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/feedback', clientId, duration);

    // 8. Return success response with personalized message based on rating
    const message =
      sanitized.overallRating >= 4
        ? "Thank you for your wonderful feedback! We're delighted you enjoyed your experience."
        : 'Thank you for your valuable feedback. We take all comments seriously and will work to improve.';

    return successResponse(
      {
        id: feedback.id,
        message,
      },
      message,
      200
    );
  } catch (error) {
    console.error('Feedback API error:', error);
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
