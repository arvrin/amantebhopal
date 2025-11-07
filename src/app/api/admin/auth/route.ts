import { NextRequest, NextResponse } from 'next/server';
import { findUserByPhone } from '@/lib/googleSheets';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Check if Google Sheets credentials are configured
    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('GOOGLE_SHEET_ID environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Google Sheets credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Find user in Users sheet
    const user = await findUserByPhone(phone);

    if (!user) {
      console.log(`Authentication failed for phone: ${phone}`);
      return NextResponse.json(
        { error: 'Access denied. Phone number not authorized.' },
        { status: 401 }
      );
    }

    console.log(`Authentication successful for: ${user['Name']} (${phone})`);

    // Create JWT token
    const token = sign(
      {
        phone: user['Phone Number'],
        name: user['Name'],
        role: user['Role'],
        accessLevel: user['Access Level'],
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        phone: user['Phone Number'],
        name: user['Name'],
        role: user['Role'],
        accessLevel: user['Access Level'],
      },
    });

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
