/**
 * Careers API Route
 *
 * POST /api/careers
 * Handles job application submissions with resume file upload
 */

import { NextRequest } from 'next/server';
import { careerSchema, sanitizeObject, validateResumeFile } from '@/lib/validations';
import { createCareerApplication } from '@/lib/db-utils';
import { uploadFile } from '@/lib/supabase';
import { sendCareerEmails } from '@/lib/email';
import {
  handleApiError,
  successResponse,
  errorResponse,
  checkRateLimit,
  strictRateLimiter,
  getClientIdentifier,
  logApiRequest,
  parseFormData,
  shouldSkipEmails,
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

    // 4. Upload resume to Supabase Storage
    const fileName = `${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    let resumeUrl: string;

    try {
      resumeUrl = await uploadFile('resumes', fileName, resumeFile);
    } catch (uploadError) {
      console.error('Resume upload failed:', uploadError);
      return errorResponse(
        'FILE_UPLOAD_ERROR',
        'Failed to upload resume. Please try again.',
        500
      );
    }

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
      resumeUrl, // Add the uploaded file URL
    };

    // 6. Validate with Zod schema
    const validated = careerSchema.parse(applicationData);

    // 7. Sanitize input to prevent XSS
    const sanitized = sanitizeObject(validated);

    // 8. Store in database
    const { data: application, error: dbError } = await createCareerApplication({
      position: sanitized.position,
      full_name: sanitized.fullName,
      email: sanitized.email,
      phone: sanitized.phone,
      current_city: sanitized.currentCity,
      experience_years: sanitized.experienceYears,
      current_position: sanitized.currentPosition || null,
      expected_salary: sanitized.expectedSalary || null,
      resume_url: sanitized.resumeUrl,
      portfolio_url: sanitized.portfolioUrl || null,
      why_amante: sanitized.whyAmante,
      available_to_join: sanitized.availableToJoin,
      status: 'new',
    });

    if (dbError || !application) {
      // If database insert fails, try to clean up the uploaded file
      // (In production, consider a cleanup job instead)
      throw new Error(dbError?.message || 'Failed to create career application');
    }

    // 9. Send emails (non-blocking)
    if (!shouldSkipEmails()) {
      sendCareerEmails(application).catch((error) => {
        console.error('Failed to send career emails:', error);
      });
    } else {
      console.log('Email sending skipped (development mode)');
      console.log('Career application data:', application);
    }

    // 10. Log request
    const duration = Date.now() - startTime;
    logApiRequest('POST', '/api/careers', clientId, duration);

    // 11. Return success response
    return successResponse(
      {
        id: application.id,
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
