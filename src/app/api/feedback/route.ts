/**
 * Feedback API Route
 *
 * POST /api/feedback
 * Handles customer feedback and review submissions
 */

import { NextRequest } from 'next/server';
import { feedbackSchema, sanitizeObject } from '@/lib/validations';
import { addFeedback } from '@/lib/googleSheets';
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
    const validated = feedbackSchema.parse(body);

    // 4. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 5. Store in Google Sheets
    await addFeedback({
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email || '',
      visitDate: sanitized.visitDate,
      spaceVisited: sanitized.spaceVisited,
      overallRating: sanitized.overallRating,
      foodRating: sanitized.foodRating,
      serviceRating: sanitized.serviceRating,
      ambianceRating: sanitized.ambianceRating,
      valueRating: sanitized.valueRating,
      yourThoughts: sanitized.yourThoughts,
      wouldRecommend: sanitized.wouldRecommend,
      canSharePublicly: sanitized.canSharePublicly,
    });

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

// CORS is now handled by middleware.ts - no need for OPTIONS handler
