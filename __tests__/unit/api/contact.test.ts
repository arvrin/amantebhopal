import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/db-utils', () => ({
  createContactSubmission: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendContactEmails: vi.fn(),
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

import { createContactSubmission } from '@/lib/db-utils';

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a contact submission with valid data', async () => {
    const mockContact = {
      id: '123',
      inquiry_type: 'General',
      name: 'Alice Johnson',
      phone: '+919876543210',
      email: 'alice@email.com',
      message: 'I have a question about your menu',
      status: 'pending',
    };

    vi.mocked(createContactSubmission).mockResolvedValue({
      data: mockContact,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'I have a question about your menu',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('id');
    expect(createContactSubmission).toHaveBeenCalled();
  });

  it('should reject contact with invalid inquiry type', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        inquiryType: 'InvalidType',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'I have a question',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject contact with message too short', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'Short',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject contact with message too long', async () => {
    const longMessage = 'a'.repeat(2001);
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: longMessage,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle database errors gracefully', async () => {
    vi.mocked(createContactSubmission).mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    });

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'I have a question about your menu',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should handle OPTIONS request for CORS', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});
