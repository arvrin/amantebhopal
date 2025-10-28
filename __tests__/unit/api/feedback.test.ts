import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/feedback/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  createFeedback: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendFeedbackEmails: vi.fn(),
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

import { createFeedback } from '@/lib/db-utils';

describe('POST /api/feedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create feedback with valid data', async () => {
    const mockFeedback = {
      id: '123',
      visit_date: '2025-10-20',
      space_visited: 'Rooftop Restaurant',
      overall_rating: 5,
      food_rating: 5,
      service_rating: 5,
      ambiance_rating: 5,
      value_rating: 5,
      what_you_loved: 'Everything was perfect!',
      would_recommend: 'Definitely',
      can_share_publicly: true,
    };

    vi.mocked(createFeedback).mockResolvedValue({
      data: mockFeedback,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        visitDate: '2025-10-20',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 5,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Everything was perfect!',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createFeedback).toHaveBeenCalled();
  });

  it('should reject feedback with rating out of range', async () => {
    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        visitDate: '2025-10-20',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 6,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Everything was perfect!',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject feedback with future visit date', async () => {
    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        visitDate: '2030-01-01',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 5,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Everything was perfect!',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
  });
});
