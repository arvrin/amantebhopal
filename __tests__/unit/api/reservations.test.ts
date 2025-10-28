import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/reservations/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/db-utils', () => ({
  createReservation: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendReservationEmails: vi.fn(),
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

import { createReservation } from '@/lib/db-utils';
import { sendReservationEmails } from '@/lib/email';

describe('POST /api/reservations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a reservation with valid data', async () => {
    const mockReservation = {
      id: '123',
      date: '2025-11-15',
      time: '7:00 PM',
      party_size: 4,
      name: 'John Doe',
      phone: '+919876543210',
      email: 'john@example.com',
      special_requests: 'Window seat',
      agree_to_sms: true,
      status: 'pending',
    };

    vi.mocked(createReservation).mockResolvedValue({
      data: mockReservation,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        specialRequests: 'Window seat',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createReservation).toHaveBeenCalled();
  });

  it('should reject reservation with invalid phone number', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: 'invalid',
        email: 'john@example.com',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject reservation with invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'invalid-email',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject reservation without SMS agreement', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: false,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject reservation with party size exceeding limit', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 25,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject reservation with past date', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2020-01-01',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle database errors gracefully', async () => {
    vi.mocked(createReservation).mockResolvedValue({
      data: null,
      error: { message: 'Database connection failed' },
    });

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: true,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });
});
