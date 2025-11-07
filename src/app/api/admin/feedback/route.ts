import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    await requireAdmin();

    const feedback = await readSheet(SHEET_NAMES.FEEDBACK);

    return NextResponse.json({
      success: true,
      data: feedback.reverse(),
    });
  } catch (error) {
    console.error('Feedback API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
