import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    await requireAdmin();

    const contact = await readSheet(SHEET_NAMES.CONTACT);

    return NextResponse.json({
      success: true,
      data: contact.reverse(),
    });
  } catch (error) {
    console.error('Contact API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to fetch contact inquiries' }, { status: 500 });
  }
}
