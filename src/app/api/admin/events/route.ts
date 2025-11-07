import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    await requireAdmin();

    const events = await readSheet(SHEET_NAMES.PRIVATE_EVENTS);

    return NextResponse.json({
      success: true,
      data: events.reverse(),
    });
  } catch (error) {
    console.error('Events API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
