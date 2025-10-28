import { http, HttpResponse } from 'msw';

export const handlers = [
  // Reservations API
  http.post('/api/reservations', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-reservation-id',
        message: "Reservation request received successfully. We'll contact you within 2 hours to confirm.",
        ...body,
      },
    });
  }),

  // Contact API
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-contact-id',
        message: "Thank you for contacting us. We'll respond within 24 hours.",
        ...body,
      },
    });
  }),

  // Private Events API
  http.post('/api/private-events', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-event-id',
        message: 'Private event enquiry received. Our events team will contact you within 24 hours.',
        ...body,
      },
    });
  }),

  // Banquets API
  http.post('/api/banquets', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-banquet-id',
        message: 'Banquet enquiry received. Our team will contact you within 24 hours.',
        ...body,
      },
    });
  }),

  // Feedback API
  http.post('/api/feedback', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-feedback-id',
        message: "Thank you for your wonderful feedback! We're delighted you enjoyed your experience.",
        ...body,
      },
    });
  }),

  // Careers API
  http.post('/api/careers', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 'mock-career-id',
        message: 'Application received successfully. Our HR team will review and contact you soon.',
        ...body,
      },
    });
  }),

  // Events API
  http.get('/api/events', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          title: 'Wine Tasting Night',
          description: 'Join us for an evening of fine wines',
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
      ],
      message: 'Events retrieved successfully',
    });
  }),

  // Error handlers for testing error states
  http.post('/api/reservations/error', () => {
    return HttpResponse.json(
      {
        success: false,
        error: 'Server error',
      },
      { status: 500 }
    );
  }),
];
