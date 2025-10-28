/**
 * Email Service Configuration and Utilities
 *
 * Handles all email sending operations using Resend.
 * Includes templates for customer confirmations and restaurant notifications.
 */

import { Resend } from 'resend';
// import { render } from '@react-email/render';
import type {
  Reservation,
  PrivateEvent,
  Banquet,
  ContactSubmission,
  Feedback,
  CareerApplication,
} from './supabase';

// ============================================================================
// RESEND CLIENT CONFIGURATION
// ============================================================================

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined. Email sending will fail.');
}

export const resend = new Resend(process.env.RESEND_API_KEY || '');

// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================

export const EMAIL_CONFIG = {
  from: {
    name: process.env.EMAIL_FROM_NAME || 'Amante Restaurant',
    address: process.env.EMAIL_FROM_ADDRESS || 'hello@amante.in',
  },
  recipients: {
    reservations: process.env.RESTAURANT_EMAIL || 'reservations@amante.in',
    events: process.env.EVENTS_EMAIL || 'events@amante.in',
    careers: process.env.CAREERS_EMAIL || 'hr@amante.in',
    general: process.env.GENERAL_EMAIL || 'info@amante.in',
    feedback: process.env.FEEDBACK_EMAIL || 'feedback@amante.in',
  },
  restaurant: {
    name: process.env.RESTAURANT_NAME || 'Amante',
    phone: process.env.RESTAURANT_PHONE || '+91 98937 79100',
    whatsapp: process.env.RESTAURANT_WHATSAPP || '+91 98937 79100',
    website: process.env.RESTAURANT_WEBSITE || 'https://amante.in',
    address: {
      line1: process.env.RESTAURANT_ADDRESS_LINE1 || '',
      line2: process.env.RESTAURANT_ADDRESS_LINE2 || '',
      city: process.env.RESTAURANT_CITY || 'Bhopal',
      state: process.env.RESTAURANT_STATE || 'Madhya Pradesh',
      postalCode: process.env.RESTAURANT_POSTAL_CODE || '',
      country: process.env.RESTAURANT_COUNTRY || 'India',
    },
  },
  social: {
    instagram: process.env.SOCIAL_INSTAGRAM || '',
    facebook: process.env.SOCIAL_FACEBOOK || '',
    twitter: process.env.SOCIAL_TWITTER || '',
  },
};

/**
 * Get FROM email address
 */
export function getFromEmail(): string {
  return `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.address}>`;
}

// ============================================================================
// EMAIL SENDING FUNCTIONS
// ============================================================================

/**
 * Send reservation confirmation and notification emails
 */
export async function sendReservationEmails(reservation: Reservation) {
  try {
    const results = await Promise.allSettled([
      // Customer confirmation email
      sendCustomerReservationEmail(reservation),
      // Restaurant notification email
      sendRestaurantReservationEmail(reservation),
    ]);

    // Log any failures
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to send reservation email ${index}:`,
          result.reason
        );
      }
    });

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error('Failed to send reservation emails:', error);
    throw error;
  }
}

/**
 * Send private event confirmation and notification emails
 */
export async function sendPrivateEventEmails(event: PrivateEvent) {
  try {
    const results = await Promise.allSettled([
      sendCustomerPrivateEventEmail(event),
      sendRestaurantPrivateEventEmail(event),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to send private event email ${index}:`,
          result.reason
        );
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error('Failed to send private event emails:', error);
    throw error;
  }
}

/**
 * Send banquet confirmation and notification emails
 */
export async function sendBanquetEmails(banquet: Banquet) {
  try {
    const results = await Promise.allSettled([
      sendCustomerBanquetEmail(banquet),
      sendRestaurantBanquetEmail(banquet),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send banquet email ${index}:`, result.reason);
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error('Failed to send banquet emails:', error);
    throw error;
  }
}

/**
 * Send contact confirmation and notification emails
 */
export async function sendContactEmails(contact: ContactSubmission) {
  try {
    const results = await Promise.allSettled([
      sendCustomerContactEmail(contact),
      sendRestaurantContactEmail(contact),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send contact email ${index}:`, result.reason);
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error('Failed to send contact emails:', error);
    throw error;
  }
}

/**
 * Send feedback thank you and notification emails
 */
export async function sendFeedbackEmails(feedback: Feedback) {
  try {
    const results = await Promise.allSettled([
      sendCustomerFeedbackEmail(feedback),
      sendRestaurantFeedbackEmail(feedback),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send feedback email ${index}:`, result.reason);
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error('Failed to send feedback emails:', error);
    throw error;
  }
}

/**
 * Send career application confirmation and notification emails
 */
export async function sendCareerEmails(application: CareerApplication) {
  try {
    const results = await Promise.allSettled([
      sendCustomerCareerEmail(application),
      sendRestaurantCareerEmail(application),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send career email ${index}:`, result.reason);
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error('Failed to send career emails:', error);
    throw error;
  }
}

// ============================================================================
// CUSTOMER EMAIL FUNCTIONS (Placeholder templates - will be replaced with React Email)
// ============================================================================

async function sendCustomerReservationEmail(reservation: Reservation) {
  // For now, using simple text email. Will be replaced with React Email template
  const subject = 'Reservation Request Received - Amante Bhopal';
  const text = `Dear ${reservation.name},

Thank you for choosing Amante! We've received your reservation request.

RESERVATION DETAILS:
Date: ${reservation.date}
Time: ${reservation.time}
Party Size: ${reservation.party_size} guests
Space: ${reservation.space_preference || 'Any'}
${reservation.occasion ? `Occasion: ${reservation.occasion}\n` : ''}
${reservation.special_requests ? `Special Requests: ${reservation.special_requests}\n` : ''}

Our team will call you at ${reservation.phone} within 2 hours to confirm your booking.

Looking forward to hosting you!

Warm regards,
Team Amante
${EMAIL_CONFIG.restaurant.phone}
${EMAIL_CONFIG.restaurant.website}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: reservation.email,
    subject,
    text,
  });
}

async function sendCustomerPrivateEventEmail(event: PrivateEvent) {
  const subject = 'Private Event Enquiry Received - Amante Bhopal';
  const text = `Dear ${event.name},

Thank you for considering Amante for your ${event.event_type}! We've received your enquiry.

EVENT DETAILS:
Event Type: ${event.event_type}
Date: ${event.event_date}
Guest Count: ${event.guest_count}
Budget Range: ${event.budget_range || 'Not specified'}
Space Preference: ${event.space_preference || 'Any'}

Our events team will contact you within 24 hours to discuss your requirements in detail.

Best regards,
Amante Events Team
${EMAIL_CONFIG.restaurant.phone}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: event.email,
    subject,
    text,
  });
}

async function sendCustomerBanquetEmail(banquet: Banquet) {
  const subject = 'Banquet Enquiry Received - Amante Bhopal';
  const text = `Dear ${banquet.name},

Thank you for considering Amante for your ${banquet.event_type}! We've received your enquiry.

EVENT DETAILS:
Event Type: ${banquet.event_type}
Date: ${banquet.event_date}
${banquet.alternate_date ? `Alternate Date: ${banquet.alternate_date}\n` : ''}Guest Count: ${banquet.guest_count}
Timing: ${banquet.timing_from} to ${banquet.timing_to}
Requirements: ${banquet.requirements?.join(', ') || 'None specified'}

Our banquet manager will contact you within 12 hours to discuss your requirements and arrange a site visit if requested.

Best regards,
Amante Banquet Team
${EMAIL_CONFIG.restaurant.phone}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: banquet.email,
    subject,
    text,
  });
}

async function sendCustomerContactEmail(contact: ContactSubmission) {
  const subject = 'We Received Your Message - Amante Bhopal';
  const text = `Dear ${contact.name},

Thank you for contacting Amante. We've received your message regarding: ${contact.inquiry_type}

We'll respond to your inquiry within 24 hours.

Best regards,
Team Amante
${EMAIL_CONFIG.restaurant.phone}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: contact.email,
    subject,
    text,
  });
}

async function sendCustomerFeedbackEmail(feedback: Feedback) {
  const subject = 'Thank You for Your Feedback - Amante Bhopal';
  const text = `${feedback.name ? `Dear ${feedback.name}` : 'Dear Guest'},

Thank you for taking the time to share your feedback about your visit to ${feedback.space_visited || 'Amante'}.

Your insights help us continually improve our service and guest experience. We truly appreciate your ${feedback.overall_rating}-star rating!

${feedback.overall_rating >= 4 ? "We're delighted you enjoyed your experience with us. We look forward to welcoming you back soon!" : "We're sorry if any aspect of your visit didn't meet expectations. Your feedback will help us do better."}

Warm regards,
Team Amante
${EMAIL_CONFIG.restaurant.phone}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: feedback.email || EMAIL_CONFIG.recipients.feedback,
    subject,
    text,
  });
}

async function sendCustomerCareerEmail(application: CareerApplication) {
  const subject = 'Application Received - Amante Careers';
  const text = `Dear ${application.full_name},

Thank you for your interest in joining the Amante team!

We've received your application for the ${application.position} position. Our HR team will review your application and resume, and we'll be in touch within 7 business days.

If your qualifications match our requirements, we'll contact you to schedule an interview.

Best wishes,
Amante HR Team
${EMAIL_CONFIG.recipients.careers}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: application.email,
    subject,
    text,
  });
}

// ============================================================================
// RESTAURANT EMAIL FUNCTIONS (Staff notifications)
// ============================================================================

async function sendRestaurantReservationEmail(reservation: Reservation) {
  const subject = `🔔 NEW RESERVATION - ${reservation.name} (${reservation.party_size} guests on ${reservation.date})`;
  const text = `NEW RESERVATION REQUEST

⚠️ ACTION REQUIRED: Call customer within 2 hours to confirm booking

RESERVATION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date: ${reservation.date}
Time: ${reservation.time}
Party Size: ${reservation.party_size} guests
Space: ${reservation.space_preference || 'Any'}
${reservation.occasion ? `Occasion: ${reservation.occasion} 🎉\n` : ''}
${reservation.special_requests ? `\nSPECIAL REQUESTS:\n${reservation.special_requests}\n` : ''}
CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${reservation.name}
Phone: ${reservation.phone}
Email: ${reservation.email}

NEXT STEPS:
1. Call customer at ${reservation.phone}
2. Confirm table availability
3. Update reservation status in system
${reservation.occasion ? `4. Arrange special ${reservation.occasion.toLowerCase()} setup\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reservation ID: #${reservation.id}
Received: ${new Date(reservation.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.reservations,
    cc: EMAIL_CONFIG.recipients.general,
    subject,
    text,
    headers: {
      'X-Priority': '1',
      Importance: 'high',
    },
  });
}

async function sendRestaurantPrivateEventEmail(event: PrivateEvent) {
  const subject = `🎉 NEW PRIVATE EVENT ENQUIRY - ${event.event_type} (${event.guest_count} guests)`;
  const text = `NEW PRIVATE EVENT ENQUIRY

⚠️ ACTION REQUIRED: Contact customer within 24 hours

EVENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Type: ${event.event_type}
Date: ${event.event_date}
Guest Count: ${event.guest_count}
Budget Range: ${event.budget_range || 'Not specified'}
Space Preference: ${event.space_preference || 'Any'}
${event.company ? `Company: ${event.company}\n` : ''}
REQUIREMENTS:
${event.requirements}

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${event.name}
Phone: ${event.phone}
Email: ${event.email}
Preferred Contact: ${event.preferred_contact || 'Phone'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enquiry ID: #${event.id}
Received: ${new Date(event.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.events,
    cc: EMAIL_CONFIG.recipients.general,
    subject,
    text,
  });
}

async function sendRestaurantBanquetEmail(banquet: Banquet) {
  const subject = `💒 NEW BANQUET ENQUIRY - ${banquet.event_type} (${banquet.guest_count} guests)`;
  const text = `NEW BANQUET ENQUIRY

⚠️ HIGH PRIORITY: Contact customer within 12 hours

EVENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Type: ${banquet.event_type}
Date: ${banquet.event_date}
${banquet.alternate_date ? `Alternate Date: ${banquet.alternate_date}\n` : ''}Guest Count: ${banquet.guest_count}
Timing: ${banquet.timing_from} to ${banquet.timing_to}
Requirements: ${banquet.requirements?.join(', ') || 'None'}
${banquet.additional_notes ? `\nADDITIONAL NOTES:\n${banquet.additional_notes}\n` : ''}
CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${banquet.name}
Phone: ${banquet.phone}
Email: ${banquet.email}
City: ${banquet.city || 'Not specified'}
How they found us: ${banquet.hear_about_us || 'Not specified'}
Request Type: ${banquet.request_type || 'Quote'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enquiry ID: #${banquet.id}
Received: ${new Date(banquet.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.events,
    cc: EMAIL_CONFIG.recipients.general,
    subject,
    text,
    headers: {
      'X-Priority': '1',
      Importance: 'high',
    },
  });
}

async function sendRestaurantContactEmail(contact: ContactSubmission) {
  const subject = `📧 NEW CONTACT FORM - ${contact.inquiry_type}`;
  const text = `NEW CONTACT FORM SUBMISSION

Inquiry Type: ${contact.inquiry_type}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${contact.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION:
Name: ${contact.name}
Phone: ${contact.phone}
Email: ${contact.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submission ID: #${contact.id}
Received: ${new Date(contact.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.general,
    subject,
    text,
  });
}

async function sendRestaurantFeedbackEmail(feedback: Feedback) {
  const subject = `⭐ NEW FEEDBACK - ${feedback.overall_rating} stars (${feedback.space_visited || 'General'})`;
  const text = `NEW CUSTOMER FEEDBACK

RATINGS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall: ${'⭐'.repeat(feedback.overall_rating)} (${feedback.overall_rating}/5)
Food: ${'⭐'.repeat(feedback.food_rating)} (${feedback.food_rating}/5)
Service: ${'⭐'.repeat(feedback.service_rating)} (${feedback.service_rating}/5)
Ambiance: ${'⭐'.repeat(feedback.ambiance_rating)} (${feedback.ambiance_rating}/5)
Value: ${'⭐'.repeat(feedback.value_rating)} (${feedback.value_rating}/5)

Space Visited: ${feedback.space_visited || 'Not specified'}
Visit Date: ${feedback.visit_date}
Would Recommend: ${feedback.would_recommend || 'Not specified'}

WHAT THEY LOVED:
${feedback.what_you_loved || 'Not provided'}

IMPROVEMENTS SUGGESTED:
${feedback.improvements || 'None'}

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${feedback.name || 'Anonymous'}
Email: ${feedback.email || 'Not provided'}
Can Share Publicly: ${feedback.can_share_publicly ? 'Yes ✓' : 'No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feedback ID: #${feedback.id}
Received: ${new Date(feedback.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.feedback,
    cc: EMAIL_CONFIG.recipients.general,
    subject,
    text,
  });
}

async function sendRestaurantCareerEmail(application: CareerApplication) {
  const subject = `👔 NEW JOB APPLICATION - ${application.position} (${application.experience_years}y exp)`;
  const text = `NEW CAREER APPLICATION

POSITION: ${application.position}

CANDIDATE INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${application.full_name}
Email: ${application.email}
Phone: ${application.phone}
Current City: ${application.current_city}
Experience: ${application.experience_years} years
Current Position: ${application.current_position || 'Not specified'}
Expected Salary: ${application.expected_salary ? `₹${application.expected_salary}/month` : 'Not specified'}
Available to Join: ${application.available_to_join || 'Not specified'}

WHY AMANTE:
${application.why_amante}

RESUME: ${application.resume_url}
${application.portfolio_url ? `PORTFOLIO: ${application.portfolio_url}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Application ID: #${application.id}
Received: ${new Date(application.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return resend.emails.send({
    from: getFromEmail(),
    to: EMAIL_CONFIG.recipients.careers,
    cc: EMAIL_CONFIG.recipients.general,
    subject,
    text,
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format date for display in emails
 */
export function formatEmailDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format datetime for display in emails
 */
export function formatEmailDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  });
}
