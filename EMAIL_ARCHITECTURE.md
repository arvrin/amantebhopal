# AMANTE RESTAURANT - EMAIL SYSTEM ARCHITECTURE

**Version:** 1.0
**Date:** 2025-10-24
**Author:** System Architect Agent

---

## TABLE OF CONTENTS
1. [Overview](#overview)
2. [Email Service Selection](#email-service-selection)
3. [Email Flow Architecture](#email-flow-architecture)
4. [Email Templates](#email-templates)
5. [Implementation Guide](#implementation-guide)
6. [Configuration](#configuration)
7. [Error Handling](#error-handling)
8. [Testing Strategy](#testing-strategy)

---

## OVERVIEW

This document specifies the complete email system architecture for the Amante Restaurant website, including email service selection, template designs, notification flows, and implementation details.

### Email Types
1. **Customer Confirmations** - Sent to customers after form submission
2. **Restaurant Notifications** - Sent to restaurant staff for action
3. **Status Updates** - Sent when booking status changes (Phase 2)

### Email Requirements
- Professional, branded design
- Mobile-responsive
- Plain text fallback
- Delivery tracking
- Error handling
- Rate limiting compliance

---

## EMAIL SERVICE SELECTION

### Selected Provider: **Resend**

#### Rationale for Resend

**Pros:**
- Built specifically for Next.js/React applications
- React Email component support (type-safe templates)
- Simple, modern API
- Excellent developer experience
- 100 emails/day free tier (3000/month)
- 10,000 emails/month for $20
- High deliverability rates
- Built-in analytics
- No complex SMTP configuration
- Webhooks for delivery tracking
- EU and US data regions

**Cons:**
- Newer service (less established than SendGrid)
- Smaller free tier than some competitors

#### Alternative: SendGrid
- More established service
- Larger free tier (100 emails/day forever)
- More features (marketing automation, etc.)
- More complex setup
- Harder to use with React

**Decision:** Use Resend for superior developer experience and React integration

---

## EMAIL FLOW ARCHITECTURE

### High-Level Flow

```
┌─────────────────┐
│  User Submits   │
│      Form       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Route     │
│   Validates     │
│   & Stores      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Email Service  │
│   (Resend)      │
└────┬────────┬───┘
     │        │
     ▼        ▼
┌─────────┐  ┌─────────┐
│Customer │  │Restaurant│
│  Email  │  │  Email  │
└─────────┘  └─────────┘
```

### Detailed Email Flow

```typescript
// Notification Flow
async function sendFormEmails(formData, formType) {
  try {
    // 1. Send customer confirmation
    const customerEmail = await sendCustomerConfirmation(formData, formType);

    // 2. Send restaurant notification
    const restaurantEmail = await sendRestaurantNotification(formData, formType);

    // 3. Log success
    console.log('Emails sent successfully:', {
      customer: customerEmail.id,
      restaurant: restaurantEmail.id
    });

    return { success: true };

  } catch (error) {
    // 4. Log error (don't throw - email failure shouldn't block form submission)
    console.error('Email sending failed:', error);

    // 5. Queue for retry (Phase 2)
    // await queueEmailRetry(formData, formType);

    return { success: false, error };
  }
}
```

### Email Recipients Configuration

```typescript
// Email addresses for different form types
const EMAIL_RECIPIENTS = {
  reservations: {
    to: process.env.RESTAURANT_EMAIL || 'reservations@amante.in',
    cc: process.env.GENERAL_EMAIL || 'info@amante.in'
  },
  privateEvents: {
    to: process.env.EVENTS_EMAIL || 'events@amante.in',
    cc: process.env.GENERAL_EMAIL || 'info@amante.in'
  },
  banquets: {
    to: process.env.EVENTS_EMAIL || 'events@amante.in',
    cc: process.env.GENERAL_EMAIL || 'info@amante.in',
    urgent: true // High priority
  },
  contact: {
    to: process.env.GENERAL_EMAIL || 'info@amante.in'
  },
  feedback: {
    to: process.env.GENERAL_EMAIL || 'info@amante.in',
    cc: process.env.RESTAURANT_EMAIL || 'reservations@amante.in'
  },
  careers: {
    to: process.env.CAREERS_EMAIL || 'hr@amante.in',
    cc: process.env.GENERAL_EMAIL || 'info@amante.in'
  }
};
```

---

## EMAIL TEMPLATES

### Template Technology: React Email

**Why React Email:**
- Type-safe templates
- Component-based
- Preview in development
- Export to HTML/plain text
- Responsive by default
- Maintained by Resend team

### Template Structure

```
src/lib/email/templates/
├── components/
│   ├── EmailLayout.tsx       # Base layout wrapper
│   ├── EmailHeader.tsx       # Header with logo
│   ├── EmailFooter.tsx       # Footer with links
│   ├── Button.tsx            # CTA button component
│   └── Divider.tsx           # Visual separator
│
├── customer/                 # Customer-facing emails
│   ├── ReservationConfirmation.tsx
│   ├── PrivateEventConfirmation.tsx
│   ├── BanquetConfirmation.tsx
│   ├── ContactConfirmation.tsx
│   ├── FeedbackThankYou.tsx
│   └── CareerConfirmation.tsx
│
└── restaurant/               # Restaurant-facing emails
    ├── ReservationNotification.tsx
    ├── PrivateEventNotification.tsx
    ├── BanquetNotification.tsx
    ├── ContactNotification.tsx
    ├── FeedbackNotification.tsx
    └── CareerNotification.tsx
```

---

## EMAIL TEMPLATES SPECIFICATION

### 1. RESERVATION EMAILS

#### Customer Confirmation Email

**Subject:** `Reservation Request Received - Amante Bhopal`

**Template:**
```tsx
// src/lib/email/templates/customer/ReservationConfirmation.tsx
import {
  Html, Head, Body, Container, Section, Text, Button, Hr
} from '@react-email/components';
import EmailLayout from '../components/EmailLayout';

interface ReservationConfirmationProps {
  name: string;
  date: string;
  time: string;
  partySize: number;
  spacePreference: string;
  occasion?: string;
  phone: string;
}

export default function ReservationConfirmation({
  name,
  date,
  time,
  partySize,
  spacePreference,
  occasion,
  phone
}: ReservationConfirmationProps) {
  return (
    <EmailLayout>
      <Text style={heading}>Reservation Request Received</Text>

      <Text style={paragraph}>Dear {name},</Text>

      <Text style={paragraph}>
        Thank you for choosing Amante! We've received your reservation request and our team will confirm your booking shortly.
      </Text>

      <Section style={detailsBox}>
        <Text style={detailsHeading}>RESERVATION DETAILS</Text>
        <Hr style={divider} />
        <Text style={detail}><strong>Date:</strong> {formatDate(date)}</Text>
        <Text style={detail}><strong>Time:</strong> {time}</Text>
        <Text style={detail}><strong>Party Size:</strong> {partySize} guests</Text>
        <Text style={detail}><strong>Space:</strong> {spacePreference}</Text>
        {occasion && <Text style={detail}><strong>Occasion:</strong> {occasion}</Text>}
      </Section>

      <Text style={paragraph}>
        Our team will call you at <strong>{phone}</strong> within 2 hours to confirm your booking.
      </Text>

      <Section style={infoBox}>
        <Text style={infoHeading}>WHAT TO EXPECT</Text>
        <Text style={infoItem}>✓ Complimentary valet parking</Text>
        <Text style={infoItem}>✓ Table held for 15 minutes past reservation time</Text>
        <Text style={infoItem}>✓ Special arrangements for occasions</Text>
      </Section>

      <Section style={ctaSection}>
        <Text style={paragraph}>
          Need to make changes? Call us anytime at <strong>+91 98937 79100</strong>
        </Text>
        <Button style={button} href="https://amante.in/contact">
          Contact Us
        </Button>
      </Section>

      <Hr style={divider} />

      <Text style={paragraph}>
        Looking forward to hosting you!
      </Text>

      <Text style={signature}>
        Warm regards,<br />
        Team Amante<br />
        +91 98937 79100
      </Text>
    </EmailLayout>
  );
}

// Styles
const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#8B1538',
  marginBottom: '20px'
};

const paragraph = {
  fontSize: '16px',
  color: '#2C2C2C',
  lineHeight: '1.6',
  marginBottom: '16px'
};

const detailsBox = {
  backgroundColor: '#F5E9ED',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px'
};

const detailsHeading = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#8B1538',
  marginBottom: '12px'
};

const detail = {
  fontSize: '14px',
  color: '#2C2C2C',
  marginBottom: '8px'
};

const infoBox = {
  backgroundColor: '#F8F6F0',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px'
};

const infoHeading = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#8B1538',
  marginBottom: '12px'
};

const infoItem = {
  fontSize: '14px',
  color: '#2C2C2C',
  marginBottom: '8px'
};

const button = {
  backgroundColor: '#8B1538',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block'
};

const ctaSection = {
  textAlign: 'center' as const,
  marginBottom: '24px'
};

const divider = {
  borderColor: '#E5B8C5',
  margin: '24px 0'
};

const signature = {
  fontSize: '14px',
  color: '#757575',
  lineHeight: '1.6'
};
```

#### Restaurant Notification Email

**Subject:** `🔔 NEW RESERVATION - Action Required`

**Template:**
```tsx
// src/lib/email/templates/restaurant/ReservationNotification.tsx
import { EmailLayout } from '../components/EmailLayout';

interface ReservationNotificationProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  spacePreference: string;
  occasion?: string;
  specialRequests?: string;
  createdAt: string;
}

export default function ReservationNotification({
  id,
  name,
  phone,
  email,
  date,
  time,
  partySize,
  spacePreference,
  occasion,
  specialRequests,
  createdAt
}: ReservationNotificationProps) {
  return (
    <EmailLayout>
      <Text style={alertHeading}>🔔 NEW RESERVATION REQUEST</Text>

      <Section style={urgentBox}>
        <Text style={urgentText}>
          ⚠️ ACTION REQUIRED: Call customer within 2 hours to confirm booking
        </Text>
      </Section>

      <Section style={detailsBox}>
        <Text style={sectionHeading}>RESERVATION DETAILS</Text>
        <Hr />
        <Text style={detail}><strong>Date:</strong> {formatDate(date)}</Text>
        <Text style={detail}><strong>Time:</strong> {time}</Text>
        <Text style={detail}><strong>Party Size:</strong> {partySize} guests</Text>
        <Text style={detail}><strong>Space:</strong> {spacePreference}</Text>
        {occasion && (
          <Text style={detailHighlight}>
            <strong>Occasion:</strong> {occasion} 🎉
          </Text>
        )}
      </Section>

      <Section style={customerBox}>
        <Text style={sectionHeading}>CUSTOMER INFORMATION</Text>
        <Hr />
        <Text style={detail}><strong>Name:</strong> {name}</Text>
        <Text style={detail}>
          <strong>Phone:</strong>{' '}
          <a href={`tel:${phone}`} style={phoneLink}>{phone}</a>
        </Text>
        <Text style={detail}>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${email}`} style={emailLink}>{email}</a>
        </Text>
      </Section>

      {specialRequests && (
        <Section style={requestsBox}>
          <Text style={sectionHeading}>SPECIAL REQUESTS</Text>
          <Hr />
          <Text style={requests}>{specialRequests}</Text>
        </Section>
      )}

      <Section style={actionsBox}>
        <Text style={sectionHeading}>NEXT STEPS</Text>
        <Text style={actionItem}>1. Call customer at {phone}</Text>
        <Text style={actionItem}>2. Confirm table availability</Text>
        <Text style={actionItem}>3. Update reservation status in system</Text>
        {occasion && (
          <Text style={actionItem}>4. Arrange special {occasion.toLowerCase()} setup</Text>
        )}
      </Section>

      <Hr style={divider} />

      <Section style={metadataBox}>
        <Text style={metadata}>Reservation ID: #{id}</Text>
        <Text style={metadata}>Received: {formatDateTime(createdAt)}</Text>
      </Section>

      <Section style={quickActions}>
        <Button style={buttonPrimary} href={`tel:${phone}`}>
          📞 Call Customer
        </Button>
        <Button style={buttonSecondary} href={`mailto:${email}`}>
          📧 Email Customer
        </Button>
      </Section>
    </EmailLayout>
  );
}

// Styles for restaurant notification
const alertHeading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#8B1538',
  textAlign: 'center' as const,
  marginBottom: '20px'
};

const urgentBox = {
  backgroundColor: '#FFE5E5',
  border: '2px solid #D32F2F',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px'
};

const urgentText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#D32F2F',
  textAlign: 'center' as const
};

const detailsBox = {
  backgroundColor: '#F5F5F5',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '16px'
};

const customerBox = {
  backgroundColor: '#E3F2FD',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '16px'
};

const requestsBox = {
  backgroundColor: '#FFF9C4',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '16px'
};

const actionsBox = {
  backgroundColor: '#E8F5E9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '16px'
};

const phoneLink = {
  color: '#1976D2',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const emailLink = {
  color: '#1976D2',
  textDecoration: 'none'
};

const buttonPrimary = {
  backgroundColor: '#8B1538',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 8px'
};

const buttonSecondary = {
  backgroundColor: '#757575',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 8px'
};

const quickActions = {
  textAlign: 'center' as const,
  marginTop: '24px'
};
```

---

### 2-6. OTHER EMAIL TEMPLATES

**Note:** Similar templates will be created for:
- Private Events (confirmation + notification)
- Banquets (confirmation + notification)
- Contact (confirmation + notification)
- Feedback (thank you + notification)
- Careers (confirmation + notification)

Each follows the same structure with form-specific details.

---

## IMPLEMENTATION GUIDE

### Step 1: Install Dependencies

```bash
npm install resend @react-email/components
```

### Step 2: Configure Resend

```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default from address
export const FROM_EMAIL = 'Amante Restaurant <hello@amante.in>';
```

### Step 3: Create Email Sending Function

```typescript
// src/lib/email/send.ts
import { resend, FROM_EMAIL } from './resend';
import { ReservationConfirmation } from './templates/customer/ReservationConfirmation';
import { ReservationNotification } from './templates/restaurant/ReservationNotification';
import { render } from '@react-email/render';

export async function sendReservationEmails(reservation: Reservation) {
  try {
    // Send customer confirmation
    const customerEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: reservation.email,
      subject: 'Reservation Request Received - Amante Bhopal',
      react: ReservationConfirmation(reservation)
    });

    // Send restaurant notification
    const restaurantEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.RESTAURANT_EMAIL!,
      cc: process.env.GENERAL_EMAIL,
      subject: '🔔 NEW RESERVATION - Action Required',
      react: ReservationNotification(reservation),
      headers: {
        'X-Priority': '1', // High priority
        'Importance': 'high'
      }
    });

    return {
      success: true,
      customerEmailId: customerEmail.id,
      restaurantEmailId: restaurantEmail.id
    };

  } catch (error) {
    console.error('Failed to send reservation emails:', error);
    throw error;
  }
}

// Similar functions for other form types
export async function sendPrivateEventEmails(event: PrivateEvent) { /* ... */ }
export async function sendBanquetEmails(banquet: Banquet) { /* ... */ }
export async function sendContactEmails(contact: Contact) { /* ... */ }
export async function sendFeedbackEmails(feedback: Feedback) { /* ... */ }
export async function sendCareerEmails(application: CareerApplication) { /* ... */ }
```

### Step 4: Integrate with API Routes

```typescript
// src/app/api/reservations/route.ts
import { sendReservationEmails } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const validated = reservationSchema.parse(await request.json());
    const reservation = await createReservation(validated);

    // Send emails (non-blocking)
    sendReservationEmails(reservation).catch((error) => {
      console.error('Email sending failed:', error);
      // Log to error tracking service (Sentry in Phase 2)
    });

    return NextResponse.json({
      success: true,
      data: { id: reservation.id }
    });

  } catch (error) {
    return handleApiError(error);
  }
}
```

---

## CONFIGURATION

### Environment Variables

```bash
# .env.local

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email Recipients
RESTAURANT_EMAIL=reservations@amante.in
EVENTS_EMAIL=events@amante.in
CAREERS_EMAIL=hr@amante.in
GENERAL_EMAIL=info@amante.in

# Restaurant Info (for email templates)
RESTAURANT_NAME=Amante
RESTAURANT_PHONE=+919893779100
RESTAURANT_ADDRESS=... # To be provided
RESTAURANT_WEBSITE=https://amante.in
```

### Email Configuration

```typescript
// src/lib/email/config.ts
export const EMAIL_CONFIG = {
  from: {
    name: 'Amante Restaurant',
    email: 'hello@amante.in'
  },
  recipients: {
    reservations: process.env.RESTAURANT_EMAIL!,
    events: process.env.EVENTS_EMAIL!,
    careers: process.env.CAREERS_EMAIL!,
    general: process.env.GENERAL_EMAIL!
  },
  templates: {
    brandColor: '#8B1538',
    logoUrl: 'https://amante.in/logo.png',
    footerLinks: {
      website: 'https://amante.in',
      instagram: 'https://instagram.com/amante',
      facebook: 'https://facebook.com/amante'
    }
  }
};
```

---

## ERROR HANDLING

### Email Sending Errors

```typescript
try {
  await sendEmails(data);
} catch (error) {
  if (error instanceof ResendError) {
    console.error('Resend API error:', error.message);
    // Log to error tracking
  } else {
    console.error('Unexpected email error:', error);
  }

  // Don't throw - form submission should succeed even if email fails
  // Queue for retry (Phase 2)
}
```

### Retry Strategy (Phase 2)

```typescript
// Exponential backoff retry
async function sendEmailWithRetry(emailData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await resend.emails.send(emailData);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

## TESTING STRATEGY

### Development Testing

```typescript
// Preview emails during development
import { render } from '@react-email/render';

// Generate HTML preview
const html = render(ReservationConfirmation({
  name: 'Test User',
  date: '2025-11-15',
  // ... other props
}));

console.log(html); // View in browser
```

### Email Preview Tool

```bash
# Install React Email CLI
npm install -D @react-email/cli

# Run preview server
npx email dev
```

Access at: `http://localhost:3000`

### Testing Checklist

- [ ] All templates render correctly
- [ ] Mobile responsiveness works
- [ ] Links work correctly
- [ ] Brand colors applied
- [ ] Logo displays
- [ ] Plain text fallback exists
- [ ] Emails delivered to inbox (not spam)
- [ ] Correct recipients receive emails
- [ ] Error handling works
- [ ] Rate limits respected

---

## DELIVERABILITY BEST PRACTICES

### SPF, DKIM, DMARC Setup

```
# DNS Records (to be added)

# SPF Record
TXT @ "v=spf1 include:_spf.resend.com ~all"

# DKIM Record (provided by Resend)
TXT resend._domainkey "v=DKIM1; k=rsa; p=..."

# DMARC Record
TXT _dmarc "v=DMARC1; p=none; rua=mailto:admin@amante.in"
```

### Email Content Best Practices

- Clear, concise subject lines
- Personalized content
- Balanced text-to-image ratio
- No spam trigger words
- Unsubscribe link (for marketing emails)
- Physical address in footer
- Consistent branding

---

## MONITORING & ANALYTICS

### Email Metrics to Track

- Delivery rate
- Open rate (customer emails)
- Click rate (for links)
- Bounce rate
- Spam complaints
- Response time (restaurant notifications)

### Resend Dashboard

- View sent emails
- Check delivery status
- Monitor failed sends
- Track opens/clicks
- View analytics

---

## FUTURE ENHANCEMENTS (Phase 2)

### Advanced Features
- Email queue system with Redis
- Retry mechanism for failed sends
- Email templates in multiple languages
- SMS notifications via Twilio
- WhatsApp notifications
- Automated follow-ups
- Email scheduling
- A/B testing for templates
- Advanced analytics dashboard

---

**EMAIL ARCHITECTURE STATUS:** ✅ COMPLETE

**Next Steps:**
1. Set up Resend account
2. Configure DNS records
3. Create email templates
4. Integrate with API routes
5. Test email delivery
6. Monitor deliverability

**Document Owner:** System Architect Agent
**Last Updated:** 2025-10-24
**Version:** 1.0
