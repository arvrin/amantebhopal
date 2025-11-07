/**
 * Careers API Route
 *
 * POST /api/careers
 * Handles job application submissions with resume file upload
 */

import { NextRequest } from 'next/server';
import { careerSchema, sanitizeObject, validateResumeFile } from '@/lib/validations';
import { addCareerApplication } from '@/lib/googleSheets';
import {
  handleApiError,
  successResponse,
  errorResponse,
  checkRateLimit,
  strictRateLimiter,
  getClientIdentifier,
  logApiRequest,
  parseFormData,
} from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientId = getClientIdentifier(request);

  try {
    // 1. Rate limiting (stricter for file uploads)
    const rateLimitResponse = checkRateLimit(clientId, strictRateLimiter);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 2. Parse multipart form data
    const formData = await parseFormData(request);

    // 3. Extract and validate resume file
    const resumeFile = formData.get('resume') as File;
    const fileValidation = validateResumeFile(resumeFile);

    if (!fileValidation.valid) {
      return errorResponse('FILE_VALIDATION_ERROR', fileValidation.error!, 400);
    }

    // 4. Store resume file name for reference
    const fileName = `${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    // Note: Resume file will need to be manually collected via email or other means
    const resumeUrl = `Resume file submitted: ${resumeFile.name}`;

    // 5. Extract and validate other form data
    const applicationData = {
      position: formData.get('position') as string,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      currentCity: formData.get('currentCity') as string,
      experienceYears: parseInt(formData.get('experienceYears') as string, 10),
      currentPosition: (formData.get('currentPosition') as string) || undefined,
      expectedSalary: formData.get('expectedSalary')
        ? parseInt(formData.get('expectedSalary') as string, 10)
        : undefined,
      portfolioUrl: (formData.get('portfolioUrl') as string) || undefined,
      whyAmante: formData.get('whyAmante') as string,
      availableToJoin: formData.get('availableToJoin') as string,
      resumeUrl,
    };

    // 6. Validate with Zod schema
    const validated = careerSchema.parse(applicationData);

    // 7. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 8. Store in Google Sheets
    await addCareerApplication({
      position: sanitized.position,
      fullName: sanitized.fullName,
      email: sanitized.email,
      phone: sanitized.phone,
      currentCity: sanitized.currentCity,
      experienceYears: sanitized.experienceYears,
      currentPosition: sanitized.currentPosition || '',
      expectedSalary: sanitized.expectedSalary,
      portfolioUrl: sanitized.portfolioUrl || '',
      resumeUrl: sanitized.resumeUrl,
      whyAmante: sanitized.whyAmante,
      availableToJoin: sanitized.availableToJoin,
    });

    // 9. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/careers', clientId, duration);

    // 10. Return success response
    return successResponse(
      {
        message:
          "Application submitted successfully. We'll review your application and contact you within 7 business days.",
      },
      "Application submitted successfully. We'll review your application and contact you within 7 business days.",
      200
    );
  } catch (error) {
    console.error('Careers API error:', error);
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
