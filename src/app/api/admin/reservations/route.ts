import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    await requireAdmin();

    const reservations = await readSheet(SHEET_NAMES.RESERVATIONS);

    return NextResponse.json({
      success: true,
      data: reservations.reverse(), // Most recent first
    });
  } catch (error) {
    console.error('Reservations API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}
