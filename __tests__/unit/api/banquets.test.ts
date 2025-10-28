import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/banquets/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  createBanquetEnquiry: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendBanquetEmails: vi.fn(),
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

import { createBanquetEnquiry } from '@/lib/db-utils';

describe('POST /api/banquets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a banquet enquiry with valid data', async () => {
    const mockBanquet = {
      id: '123',
      event_type: 'Wedding',
      event_date: '2025-12-15',
      guest_count: 150,
      timing_from: '17:00',
      timing_to: '23:00',
      requirements: ['Catering', 'Decoration'],
      name: 'Jane Smith',
      phone: '+919876543210',
      email: 'jane@email.com',
      city: 'Mumbai',
      hear_about_us: 'Google',
      request_type: 'Both',
      status: 'pending',
    };

    vi.mocked(createBanquetEnquiry).mockResolvedValue({
      data: mockBanquet,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/banquets', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Wedding',
        eventDate: '2025-12-15',
        guestCount: 150,
        timingFrom: '17:00',
        timingTo: '23:00',
        requirements: ['Catering', 'Decoration'],
        name: 'Jane Smith',
        phone: '+919876543210',
        email: 'jane@email.com',
        city: 'Mumbai',
        hearAboutUs: 'Google',
        requestType: 'Both',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createBanquetEnquiry).toHaveBeenCalled();
  });

  it('should reject banquet with guest count below minimum', async () => {
    const request = new NextRequest('http://localhost:3000/api/banquets', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Wedding',
        eventDate: '2025-12-15',
        guestCount: 30,
        timingFrom: '17:00',
        timingTo: '23:00',
        requirements: ['Catering'],
        name: 'Jane Smith',
        phone: '+919876543210',
        email: 'jane@email.com',
        city: 'Mumbai',
        hearAboutUs: 'Google',
        requestType: 'Both',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject banquet without requirements', async () => {
    const request = new NextRequest('http://localhost:3000/api/banquets', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Wedding',
        eventDate: '2025-12-15',
        guestCount: 150,
        timingFrom: '17:00',
        timingTo: '23:00',
        requirements: [],
        name: 'Jane Smith',
        phone: '+919876543210',
        email: 'jane@email.com',
        city: 'Mumbai',
        hearAboutUs: 'Google',
        requestType: 'Both',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/banquets', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
  });
});
