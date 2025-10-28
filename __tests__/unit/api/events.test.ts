import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/events/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db-utils', () => ({
  getEvents: vi.fn(),
}));

vi.mock('@/lib/api-utils', () => ({
  handleApiError: vi.fn((error: any) => {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }),
  successResponse: vi.fn((data: any, message: string, status: number) => {
    return new Response(JSON.stringify({ success: true, data, message }), {
      status,
    });
  }),
  getClientIdentifier: vi.fn(() => 'test-client-id'),
  logApiRequest: vi.fn(),
}));

import { getEvents } from '@/lib/db-utils';

describe('GET /api/events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return all events successfully', async () => {
    const mockEvents = [
      {
        id: '1',
        title: 'Wine Tasting Night',
        description: 'Join us for fine wines',
        date: '2025-11-30',
        start_time: '19:00',
        end_time: '22:00',
        category: 'Special Event',
        price: 2500,
        capacity: 30,
        location: 'Main Dining Hall',
      },
      {
        id: '2',
        title: 'Live Jazz Evening',
        description: 'Enjoy live jazz music',
        date: '2025-12-05',
        start_time: '20:00',
        end_time: '23:00',
        category: 'Live Music',
        price: 1500,
        capacity: 50,
        location: 'Lounge',
      },
    ];

    vi.mocked(getEvents).mockResolvedValue({
      data: mockEvents,
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/events');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(2);
    expect(getEvents).toHaveBeenCalled();
  });

  it('should handle database errors', async () => {
    vi.mocked(getEvents).mockResolvedValue({
      data: null,
      error: { message: 'Database connection failed' },
    });

    const request = new NextRequest('http://localhost:3000/api/events');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
  });

  it('should return empty array when no events exist', async () => {
    vi.mocked(getEvents).mockResolvedValue({
      data: [],
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/events');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(0);
  });
});
