import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/private-events/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  createPrivateEvent: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendPrivateEventEmails: vi.fn(),
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

import { createPrivateEvent } from '@/lib/db-utils';

describe('POST /api/private-events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a private event enquiry with valid data', async () => {
    const mockEvent = {
      id: '123',
      event_type: 'Corporate',
      event_date: '2025-12-01',
      guest_count: 50,
      budget_range: '₹1L-2L',
      space_preference: 'Rooftop Restaurant',
      name: 'John Doe',
      phone: '+919876543210',
      email: 'john@company.com',
      requirements: 'AV equipment needed',
      preferred_contact: 'Email',
      status: 'pending',
    };

    vi.mocked(createPrivateEvent).mockResolvedValue({
      data: mockEvent,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/private-events', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Corporate',
        eventDate: '2025-12-01',
        guestCount: 50,
        budgetRange: '₹1L-2L',
        spacePreference: 'Rooftop Restaurant',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@company.com',
        requirements: 'AV equipment needed',
        preferredContact: 'Email',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createPrivateEvent).toHaveBeenCalled();
  });

  it('should reject event with guest count exceeding limit', async () => {
    const request = new NextRequest('http://localhost:3000/api/private-events', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Corporate',
        eventDate: '2025-12-01',
        guestCount: 600,
        budgetRange: '₹5L+',
        spacePreference: 'Rooftop Restaurant',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@company.com',
        requirements: 'AV equipment needed',
        preferredContact: 'Email',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject event with requirements too short', async () => {
    const request = new NextRequest('http://localhost:3000/api/private-events', {
      method: 'POST',
      body: JSON.stringify({
        eventType: 'Corporate',
        eventDate: '2025-12-01',
        guestCount: 50,
        budgetRange: '₹1L-2L',
        spacePreference: 'Rooftop Restaurant',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@company.com',
        requirements: 'Too short',
        preferredContact: 'Email',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/private-events', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});
