import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { readSheet, SHEET_NAMES } from '@/lib/googleSheets';

export async function GET() {
  try {
    // Verify admin authentication
    await requireAdmin();

    // Fetch all data from sheets
    const [reservations, events, feedback, careers, contact] = await Promise.all([
      readSheet(SHEET_NAMES.RESERVATIONS),
      readSheet(SHEET_NAMES.PRIVATE_EVENTS),
      readSheet(SHEET_NAMES.FEEDBACK),
      readSheet(SHEET_NAMES.CAREERS),
      readSheet(SHEET_NAMES.CONTACT),
    ]);

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Get next 7 days date range
    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);
    const next7DaysStr = next7Days.toISOString().split('T')[0];

    // Filter today's reservations
    const todayReservations = reservations.filter(r => r['Date'] === todayStr);

    // Filter upcoming reservations (next 7 days)
    const upcomingReservations = reservations.filter(r => {
      const date = r['Date'];
      return date > todayStr && date <= next7DaysStr;
    });

    // Filter today's events
    const todayEvents = events.filter(e => e['Event Date'] === todayStr);

    // Filter upcoming events (next 7 days)
    const upcomingEvents = events.filter(e => {
      const date = e['Event Date'];
      return date > todayStr && date <= next7DaysStr;
    });

    // Get recent feedback (last 10)
    const recentFeedback = feedback.slice(-10).reverse();

    // Get recent career applications (last 10)
    const recentCareers = careers.slice(-10).reverse();

    // Get pending contact inquiries (recent)
    const recentContact = contact.slice(-10).reverse();

    // Calculate total counts
    const totalReservations = reservations.length;
    const totalEvents = events.length;
    const totalFeedback = feedback.length;
    const totalCareers = careers.length;
    const totalContact = contact.length;

    // Calculate average rating
    const averageRating = feedback.length > 0
      ? (feedback.reduce((sum, fb) => sum + (parseInt(fb['Overall Rating']) || 0), 0) / feedback.length).toFixed(1)
      : '0';

    // Calculate KPIs
    const kpis = {
      todayReservations: todayReservations.length,
      upcomingEvents: upcomingEvents.length,
      totalFeedback: totalFeedback,
      totalApplications: totalCareers,
      totalReservations: totalReservations,
      totalEvents: totalEvents,
      totalContact: totalContact,
      averageRating: averageRating,
    };

    return NextResponse.json({
      success: true,
      data: {
        kpis,
        todayReservations,
        todayEvents,
        upcomingReservations,
        upcomingEvents,
        recentFeedback,
        recentCareers,
        recentContact,
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
