/**
 * Events API Route
 *
 * GET /api/events
 * Returns published upcoming events for the events calendar
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase';
import {
  handleApiError,
  successResponse,
  checkRateLimit,
  getClientIdentifier,
  logApiRequest,
  addCacheHeaders,
} from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const clientId = getClientIdentifier(request);

  try {
    // 1. Rate limiting
    const rateLimitResponse = checkRateLimit(clientId);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const eventType = searchParams.get('type');
    const space = searchParams.get('space');

    // Validate parameters
    if (limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: 'Limit cannot exceed 100',
          },
        },
        { status: 400 }
      );
    }

    // 3. Query database
    const supabase = getServerClient();
    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .gte('event_date', new Date().toISOString().split('T')[0]) // Only future events
      .order('event_date', { ascending: true })
      .range(offset, offset + limit - 1);

    // Apply filters if provided
    if (eventType) {
      query = query.eq('event_type', eventType);
    }
    if (space) {
      query = query.eq('space', space);
    }

    const { data: events, error: dbError, count } = await query;

    if (dbError) {
      throw new Error(dbError.message);
    }

    // 4. Log request
    const duration = Date.now() - startTime;
    logApiRequest('GET', '/api/events', clientId, duration);

    // 5. Return success response with caching
    const response = successResponse(
      {
        events: events || [],
        pagination: {
          limit,
          offset,
          total: count || 0,
          hasMore: (count || 0) > offset + limit,
        },
      },
      undefined,
      200
    );

    // Add cache headers (5 minutes)
    return addCacheHeaders(response, 300);
  } catch (error) {
    console.error('Events API error:', error);
    return handleApiError(error);
  }
}

export async function OPTIONS(_request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
