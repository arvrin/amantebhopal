import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/googleSheets';

export async function GET() {
  try {
    const result = await testConnection();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        sheetTitle: result.sheetTitle,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Test sheets error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to test Google Sheets connection',
      },
      { status: 500 }
    );
  }
}
