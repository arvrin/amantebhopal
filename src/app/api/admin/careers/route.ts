import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    await requireAdmin();

    const careers = await readSheet(SHEET_NAMES.CAREERS);

    return NextResponse.json({
      success: true,
      data: careers.reverse(),
    });
  } catch (error) {
    console.error('Careers API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 });
  }
}
