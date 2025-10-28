import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/careers/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  createCareerApplication: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendCareerEmails: vi.fn(),
}));

vi.mock('@/lib/api-utils', () => ({
  handleApiError: vi.fn((error: any) => {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }),
  successResponse: vi.fn((data: any, message: string, status: number) => {
    return new Response(JSON.stringify({ success: true, data, message }), {
      status,
    });
  }),
  checkRateLimit: vi.fn(() => null),
  getClientIdentifier: vi.fn(() => 'test-client-id'),
  logApiRequest: vi.fn(),
  parseJsonBody: vi.fn(async (request: Request) => await request.json()),
  shouldSkipEmails: vi.fn(() => true),
}));

import { createCareerApplication } from '@/lib/db-utils';

describe('POST /api/careers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a career application with valid data', async () => {
    const mockApplication = {
      id: '123',
      position: 'Chef',
      full_name: 'Charlie Brown',
      email: 'charlie@email.com',
      phone: '+919876543210',
      current_city: 'Delhi',
      experience_years: 5,
      why_amante: 'I am passionate about creating exceptional dining experiences and want to join a team that values creativity.',
      available_to_join: '2025-11-01',
      resume_url: 'https://example.com/resume.pdf',
      status: 'pending',
    };

    vi.mocked(createCareerApplication).mockResolvedValue({
      data: mockApplication,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/careers', {
      method: 'POST',
      body: JSON.stringify({
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Delhi',
        experienceYears: 5,
        whyAmante: 'I am passionate about creating exceptional dining experiences and want to join a team that values creativity.',
        availableToJoin: '2025-11-01',
        resumeUrl: 'https://example.com/resume.pdf',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createCareerApplication).toHaveBeenCalled();
  });

  it('should reject application with whyAmante too short', async () => {
    const request = new NextRequest('http://localhost:3000/api/careers', {
      method: 'POST',
      body: JSON.stringify({
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Delhi',
        experienceYears: 5,
        whyAmante: 'Too short',
        availableToJoin: '2025-11-01',
        resumeUrl: 'https://example.com/resume.pdf',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject application with invalid resume URL', async () => {
    const request = new NextRequest('http://localhost:3000/api/careers', {
      method: 'POST',
      body: JSON.stringify({
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Delhi',
        experienceYears: 5,
        whyAmante: 'I am passionate about creating exceptional dining experiences and want to join a team that values creativity.',
        availableToJoin: '2025-11-01',
        resumeUrl: 'not-a-url',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/careers', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
  });
});
