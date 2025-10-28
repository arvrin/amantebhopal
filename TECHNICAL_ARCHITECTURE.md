# AMANTE RESTAURANT WEBSITE - TECHNICAL ARCHITECTURE

**Version:** 1.0
**Date:** 2025-10-24
**Architect:** System Architect Agent
**Status:** APPROVED FOR IMPLEMENTATION

---

## EXECUTIVE SUMMARY

This document defines the complete technical architecture for the Amante Restaurant website transformation from a coming-soon page to a full-featured restaurant website with 6 interactive forms, multiple space showcases, and comprehensive content management.

---

## 1. TECH STACK SPECIFICATION

### Core Framework
- **Framework:** Next.js 15.5.2 (App Router)
  - Server Components for optimal performance
  - Server Actions for form handling
  - API Routes for backend endpoints
  - Built-in image optimization
  - File-based routing

### Frontend Technologies
- **UI Framework:** React 19.1.0
- **Styling:** Tailwind CSS 4.0
  - Custom color palette (Amante brand colors)
  - Responsive design utilities
  - Custom component classes
- **Animations:** Framer Motion 12.23.12
  - Page transitions
  - Scroll animations
  - Interactive elements
- **Icons:** Lucide React 0.542.0
- **Forms:** React Hook Form 7.62.0
  - Uncontrolled components for performance
  - Built-in validation
  - Error handling

### Backend Technologies
- **Language:** TypeScript 5.x (strict mode)
- **Runtime:** Node.js 20+
- **API:** Next.js API Routes
- **Validation:** Zod (to be installed)
  - Schema validation
  - Type inference
  - Error messages

### Database
- **Primary Database:** Supabase (PostgreSQL)
  - **Rationale:**
    - Open-source, PostgreSQL-based
    - Built-in Row Level Security (RLS)
    - Real-time capabilities (future features)
    - Auto-generated REST API
    - Built-in authentication (future admin panel)
    - File storage for resume uploads
    - Generous free tier
    - Excellent TypeScript support
    - Easy Vercel integration

### Email Service
- **Email Provider:** Resend
  - **Rationale:**
    - Modern, developer-friendly API
    - Built specifically for Next.js/React
    - React Email template support
    - 100 emails/day free tier (sufficient for launch)
    - Excellent deliverability
    - Simple integration
    - No complex SMTP configuration
    - Built-in analytics

### File Storage
- **Storage Provider:** Supabase Storage
  - Resume uploads for careers form
  - Public bucket for optimized images (future)
  - CDN-backed delivery
  - Automatic image transformations

### Hosting & Deployment
- **Platform:** Vercel
  - Automatic deployments from Git
  - Edge network CDN
  - Serverless functions
  - Environment variable management
  - Preview deployments
  - Analytics built-in

### Additional Services
- **Analytics:** Google Analytics 4 (Phase 2)
- **Image Optimization:** Next.js Image component + Vercel Image Optimization
- **Monitoring:** Vercel Analytics + Sentry (Phase 2)

---

## 2. APPLICATION ARCHITECTURE

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │  Space Pages │  │  Form Pages  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 APP (Vercel)                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    APP ROUTER PAGES                        │  │
│  │  /app/page.tsx        /app/reservations/page.tsx          │  │
│  │  /app/cafe/page.tsx   /app/private-events/page.tsx        │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    API ROUTES                              │  │
│  │  /app/api/reservations/route.ts                           │  │
│  │  /app/api/private-events/route.ts                         │  │
│  │  /app/api/banquets/route.ts                               │  │
│  │  /app/api/contact/route.ts                                │  │
│  │  /app/api/feedback/route.ts                               │  │
│  │  /app/api/careers/route.ts                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  SERVER COMPONENTS                         │  │
│  │  - Default for all pages                                  │  │
│  │  - Fetch data at build/request time                       │  │
│  │  - Zero JavaScript to client                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  CLIENT COMPONENTS                         │  │
│  │  - Forms with interactivity                               │  │
│  │  - Animations (Framer Motion)                             │  │
│  │  - Interactive UI elements                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
              │                              │
              ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   SUPABASE (Database)    │    │     RESEND (Email)       │
│  - Reservations table    │    │  - Customer emails       │
│  - Private events table  │    │  - Restaurant emails     │
│  - Banquets table        │    │  - React Email templates │
│  - Contact table         │    └──────────────────────────┘
│  - Feedback table        │
│  - Careers table         │
│  - Storage (resumes)     │
└──────────────────────────┘
```

---

## 3. COMPONENT HIERARCHY & ORGANIZATION

### Directory Structure

```
/Users/aaryavar/Documents/ARVR Project Codes/Amante/amante-coming-soon/
├── src/
│   ├── app/                                    # Next.js App Router
│   │   ├── layout.tsx                          # Root layout
│   │   ├── page.tsx                            # Homepage
│   │   ├── globals.css                         # Global styles
│   │   ├── api/                                # API Routes
│   │   │   ├── reservations/
│   │   │   │   └── route.ts                    # POST /api/reservations
│   │   │   ├── private-events/
│   │   │   │   └── route.ts                    # POST /api/private-events
│   │   │   ├── banquets/
│   │   │   │   └── route.ts                    # POST /api/banquets
│   │   │   ├── contact/
│   │   │   │   └── route.ts                    # POST /api/contact
│   │   │   ├── feedback/
│   │   │   │   └── route.ts                    # POST /api/feedback
│   │   │   └── careers/
│   │   │       └── route.ts                    # POST /api/careers
│   │   ├── cafe/
│   │   │   └── page.tsx                        # Café & Bakery space
│   │   ├── restaurant/
│   │   │   └── page.tsx                        # Rooftop Restaurant space
│   │   ├── lounge/
│   │   │   └── page.tsx                        # Intimate Lounge space
│   │   ├── club/
│   │   │   └── page.tsx                        # Premier Club space
│   │   ├── private-dining/
│   │   │   └── page.tsx                        # Private Dining space
│   │   ├── banquets/
│   │   │   └── page.tsx                        # Grand Banquets space
│   │   ├── reservations/
│   │   │   └── page.tsx                        # Reservation form page
│   │   ├── private-events/
│   │   │   └── page.tsx                        # Private events form page
│   │   ├── feedback/
│   │   │   └── page.tsx                        # Feedback form page
│   │   ├── careers/
│   │   │   └── page.tsx                        # Careers form page
│   │   ├── events/
│   │   │   └── page.tsx                        # Events calendar page
│   │   ├── gallery/
│   │   │   └── page.tsx                        # Photo gallery page
│   │   ├── about/
│   │   │   └── page.tsx                        # About page
│   │   ├── contact/
│   │   │   └── page.tsx                        # Contact page
│   │   ├── menu/                               # Existing menu pages
│   │   │   ├── page.tsx
│   │   │   └── [category]/page.tsx
│   │   └── menunew/
│   │       └── page.tsx
│   │
│   ├── components/                             # React Components
│   │   ├── forms/                              # Form components
│   │   │   ├── ReservationForm.tsx             # Table reservation form
│   │   │   ├── PrivateEventForm.tsx            # Private event form
│   │   │   ├── BanquetForm.tsx                 # Banquet booking form
│   │   │   ├── ContactForm.tsx                 # Contact form
│   │   │   ├── FeedbackForm.tsx                # Feedback form
│   │   │   ├── CareerForm.tsx                  # Career application form
│   │   │   ├── FormField.tsx                   # Reusable form field
│   │   │   ├── FormSelect.tsx                  # Reusable select field
│   │   │   ├── FormTextarea.tsx                # Reusable textarea
│   │   │   ├── FormDatePicker.tsx              # Date picker component
│   │   │   ├── FormTimePicker.tsx              # Time picker component
│   │   │   ├── FormFileUpload.tsx              # File upload component
│   │   │   └── FormSubmitButton.tsx            # Submit button with loading
│   │   │
│   │   ├── layout/                             # Layout components
│   │   │   ├── Header.tsx                      # Site header/navigation
│   │   │   ├── Footer.tsx                      # Site footer
│   │   │   ├── Navigation.tsx                  # Main navigation
│   │   │   ├── MobileMenu.tsx                  # Mobile hamburger menu
│   │   │   └── Breadcrumb.tsx                  # Breadcrumb navigation
│   │   │
│   │   ├── sections/                           # Homepage sections
│   │   │   ├── HeroSection.tsx                 # Hero with CTA (EXISTS)
│   │   │   ├── AboutPreview.tsx                # About preview
│   │   │   ├── SpacesPreview.tsx               # Six spaces preview
│   │   │   ├── MenuPreview.tsx                 # Menu preview section
│   │   │   ├── HighlightsGrid.tsx              # USPs/Highlights grid
│   │   │   ├── SocialProof.tsx                 # Reviews/testimonials
│   │   │   ├── LocationHours.tsx               # Location & hours section
│   │   │   └── CTASection.tsx                  # Call-to-action sections
│   │   │
│   │   ├── spaces/                             # Space-specific components
│   │   │   ├── SpaceHero.tsx                   # Space page hero
│   │   │   ├── SpaceOverview.tsx               # Space overview section
│   │   │   ├── SpaceGallery.tsx                # Space photo gallery
│   │   │   ├── SpaceHighlights.tsx             # Space highlights list
│   │   │   ├── SpaceMenuPreview.tsx            # Space menu preview
│   │   │   └── SpaceBookingCTA.tsx             # Space booking CTA
│   │   │
│   │   ├── ui/                                 # Reusable UI components
│   │   │   ├── Button.tsx                      # Button component
│   │   │   ├── Card.tsx                        # Card component
│   │   │   ├── Modal.tsx                       # Modal/dialog
│   │   │   ├── Toast.tsx                       # Toast notifications
│   │   │   ├── Loading.tsx                     # Loading spinner
│   │   │   ├── ErrorMessage.tsx                # Error display
│   │   │   ├── SuccessMessage.tsx              # Success display
│   │   │   ├── ImageGallery.tsx                # Image gallery component
│   │   │   ├── Carousel.tsx                    # Image carousel
│   │   │   ├── Rating.tsx                      # Star rating component
│   │   │   └── Badge.tsx                       # Badge/tag component
│   │   │
│   │   └── shared/                             # Existing components
│   │       ├── CleanComingSoon.tsx             # Current coming soon page
│   │       ├── CountdownTimer.tsx              # Timer component
│   │       ├── InteractiveTimeline.tsx         # Timeline component
│   │       ├── LeadCaptureForm.tsx             # Lead capture
│   │       └── SocialShare.tsx                 # Social sharing
│   │
│   ├── lib/                                    # Utility functions
│   │   ├── db/                                 # Database utilities
│   │   │   ├── supabase.ts                     # Supabase client setup
│   │   │   ├── reservations.ts                 # Reservation DB operations
│   │   │   ├── private-events.ts               # Private events DB ops
│   │   │   ├── banquets.ts                     # Banquets DB ops
│   │   │   ├── contact.ts                      # Contact DB ops
│   │   │   ├── feedback.ts                     # Feedback DB ops
│   │   │   └── careers.ts                      # Careers DB ops
│   │   │
│   │   ├── email/                              # Email utilities
│   │   │   ├── resend.ts                       # Resend client setup
│   │   │   ├── templates/                      # Email templates
│   │   │   │   ├── reservation-customer.tsx    # Customer confirmation
│   │   │   │   ├── reservation-restaurant.tsx  # Restaurant notification
│   │   │   │   ├── event-customer.tsx          # Event customer email
│   │   │   │   ├── event-restaurant.tsx        # Event restaurant email
│   │   │   │   ├── banquet-customer.tsx        # Banquet customer email
│   │   │   │   ├── banquet-restaurant.tsx      # Banquet restaurant email
│   │   │   │   ├── contact-customer.tsx        # Contact confirmation
│   │   │   │   ├── contact-restaurant.tsx      # Contact notification
│   │   │   │   ├── feedback-customer.tsx       # Feedback thank you
│   │   │   │   ├── feedback-restaurant.tsx     # Feedback notification
│   │   │   │   ├── career-customer.tsx         # Career confirmation
│   │   │   │   └── career-restaurant.tsx       # Career notification
│   │   │   └── send.ts                         # Email sending functions
│   │   │
│   │   ├── validation/                         # Validation schemas
│   │   │   ├── reservation.ts                  # Reservation Zod schema
│   │   │   ├── private-event.ts                # Private event schema
│   │   │   ├── banquet.ts                      # Banquet schema
│   │   │   ├── contact.ts                      # Contact schema
│   │   │   ├── feedback.ts                     # Feedback schema
│   │   │   └── career.ts                       # Career schema
│   │   │
│   │   └── utils/                              # Helper functions
│   │       ├── date.ts                         # Date formatting
│   │       ├── phone.ts                        # Phone validation/formatting
│   │       ├── currency.ts                     # Currency formatting
│   │       ├── slugify.ts                      # URL slug generation
│   │       └── file.ts                         # File handling utilities
│   │
│   ├── types/                                  # TypeScript definitions
│   │   ├── index.ts                            # Main type exports
│   │   ├── forms.ts                            # Form data types
│   │   ├── database.ts                         # Database model types
│   │   ├── api.ts                              # API request/response types
│   │   └── components.ts                       # Component prop types
│   │
│   └── data/                                   # Static data
│       ├── menu.json                           # Existing menu data
│       ├── spaces.ts                           # Space information
│       ├── events.ts                           # Events data
│       └── content.ts                          # Static content
│
├── public/                                     # Static assets
│   ├── images/
│   │   ├── hero/                               # Hero images
│   │   ├── spaces/                             # Space images
│   │   │   ├── cafe/
│   │   │   ├── restaurant/
│   │   │   ├── lounge/
│   │   │   ├── club/
│   │   │   ├── private-dining/
│   │   │   └── banquets/
│   │   ├── food/                               # Food images
│   │   └── team/                               # Team photos
│   ├── fonts/                                  # Custom fonts
│   ├── icons/                                  # Icons/logos
│   └── documents/                              # PDFs etc.
│
├── .env.local                                  # Environment variables
├── .env.example                                # Example env file
├── DATABASE_SCHEMA.sql                         # Database schema
├── API_ROUTES_SPEC.md                          # API documentation
├── EMAIL_ARCHITECTURE.md                       # Email system docs
└── TECHNICAL_ARCHITECTURE.md                   # This file
```

---

## 4. STATE MANAGEMENT STRATEGY

### Server State
- **Approach:** Server Components (default)
- **Data Fetching:** Direct database queries in Server Components
- **Caching:** Next.js automatic caching
- **Revalidation:** On-demand revalidation for dynamic content

### Client State
- **Forms:** React Hook Form (uncontrolled)
- **UI State:** React useState, useReducer
- **Global State:** React Context (minimal usage)
- **No Redux/Zustand needed** for Phase 1

### Form State Management
```typescript
// Example: Reservation form state
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset
} = useForm<ReservationFormData>({
  resolver: zodResolver(reservationSchema)
});
```

---

## 5. ROUTING STRUCTURE

### Page Routes (App Router)

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `app/page.tsx` | Static | Homepage |
| `/cafe` | `app/cafe/page.tsx` | Static | Café space page |
| `/restaurant` | `app/restaurant/page.tsx` | Static | Restaurant space page |
| `/lounge` | `app/lounge/page.tsx` | Static | Lounge space page |
| `/club` | `app/club/page.tsx` | Static | Club space page |
| `/private-dining` | `app/private-dining/page.tsx` | Static | Private dining page |
| `/banquets` | `app/banquets/page.tsx` | Static | Banquets page |
| `/reservations` | `app/reservations/page.tsx` | Interactive | Reservation form |
| `/private-events` | `app/private-events/page.tsx` | Interactive | Event form |
| `/feedback` | `app/feedback/page.tsx` | Interactive | Feedback form |
| `/careers` | `app/careers/page.tsx` | Interactive | Career form |
| `/events` | `app/events/page.tsx` | Dynamic | Events calendar |
| `/gallery` | `app/gallery/page.tsx` | Static | Photo gallery |
| `/about` | `app/about/page.tsx` | Static | About page |
| `/contact` | `app/contact/page.tsx` | Interactive | Contact page with form |
| `/menu` | `app/menu/page.tsx` | Static | Menu selector (existing) |
| `/menunew` | `app/menunew/page.tsx` | Static | Enhanced menu (existing) |
| `/menu/[category]` | `app/menu/[category]/page.tsx` | Dynamic | Category menu (existing) |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/reservations` | POST | Submit table reservation |
| `/api/private-events` | POST | Submit private event enquiry |
| `/api/banquets` | POST | Submit banquet booking |
| `/api/contact` | POST | Submit contact form |
| `/api/feedback` | POST | Submit feedback |
| `/api/careers` | POST | Submit career application |

---

## 6. API ARCHITECTURE

### Request Flow

```
Client Form Submit
      ↓
Client-side Validation (Zod)
      ↓
POST to API Route
      ↓
Server-side Validation (Zod)
      ↓
Store in Database (Supabase)
      ↓
Send Emails (Resend)
  ├── Customer Confirmation
  └── Restaurant Notification
      ↓
Return Success Response
      ↓
Show Success Message to User
```

### Error Handling Strategy

```typescript
// API Route error handling pattern
try {
  // 1. Validate request
  const validated = schema.parse(body);

  // 2. Database operation
  const result = await db.insert(validated);

  // 3. Send emails
  await sendEmails(validated);

  // 4. Success response
  return Response.json({ success: true, id: result.id });

} catch (error) {
  if (error instanceof ZodError) {
    // Validation error
    return Response.json(
      { error: 'Validation failed', details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof DatabaseError) {
    // Database error
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }

  // Generic error
  return Response.json(
    { error: 'Something went wrong' },
    { status: 500 }
  );
}
```

### Rate Limiting
- **Implementation:** Vercel rate limiting middleware
- **Limits:**
  - 10 requests per minute per IP
  - 100 requests per hour per IP
- **Future:** Redis-based rate limiting for finer control

---

## 7. DATABASE ARCHITECTURE

### Database Provider: Supabase (PostgreSQL)

**Connection:**
- Use Supabase JavaScript client
- Connection pooling handled by Supabase
- Environment variables for credentials

**Schema:** See DATABASE_SCHEMA.sql for complete schema

**Tables:**
1. `reservations` - Table bookings
2. `private_events` - Private event enquiries
3. `banquets` - Banquet bookings
4. `contact_submissions` - Contact form submissions
5. `feedback` - Customer feedback
6. `career_applications` - Job applications

**Key Features:**
- UUID primary keys
- Timestamps (created_at, updated_at)
- Status tracking for all submissions
- Indexes on frequently queried fields
- Full-text search capability (future)

---

## 8. SECURITY ARCHITECTURE

### Input Validation
- **Client-side:** Zod schemas in forms
- **Server-side:** Zod schemas in API routes
- **Sanitization:** HTML sanitization for text inputs
- **File uploads:** MIME type validation, size limits

### SQL Injection Prevention
- Use Supabase client (parameterized queries)
- Never construct raw SQL with user input
- Use TypeScript for type safety

### XSS Prevention
- React automatic escaping
- DOMPurify for user-generated content
- Content Security Policy headers

### CSRF Protection
- Next.js built-in CSRF protection
- SameSite cookie attributes
- Origin header validation

### Rate Limiting
- Vercel Edge middleware
- Per-IP rate limiting
- Per-endpoint limits

### File Upload Security
- MIME type validation
- File size limits (5MB for resumes)
- Virus scanning (future with ClamAV)
- Secure storage in Supabase Storage
- Signed URLs for downloads

### Environment Variables
- Never commit to Git
- Use Vercel environment variables
- Different values for dev/prod
- Secure storage of API keys

### HTTPS/TLS
- Enforced by Vercel
- Automatic SSL certificates
- HSTS headers

---

## 9. PERFORMANCE STRATEGY

### Image Optimization
- **Next.js Image component** for all images
- **WebP format** with JPG fallback
- **Lazy loading** for below-the-fold images
- **Responsive images** with srcset
- **Image dimensions** specified to prevent layout shift
- **Priority loading** for hero images
- **Blur placeholders** for better UX

### Code Splitting
- **Automatic:** Next.js route-based splitting
- **Manual:** Dynamic imports for heavy components
- **Example:**
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false
});
```

### Caching Strategy
- **Static pages:** Cached at build time
- **API responses:** Short TTL caching
- **Images:** CDN caching via Vercel
- **Font optimization:** Next.js font optimization

### Database Query Optimization
- **Indexes** on frequently queried fields
- **Pagination** for large result sets
- **Connection pooling** via Supabase
- **Query optimization** for complex queries

### Bundle Size Optimization
- **Tree shaking:** Automatic with Next.js
- **Code minification:** Production builds
- **Dependency auditing:** Regular checks
- **Bundle analysis:** Use @next/bundle-analyzer

### Performance Targets
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

---

## 10. BUILD & DEPLOYMENT PIPELINE

### Development Workflow
```
1. Local development (npm run dev)
   ↓
2. Git commit
   ↓
3. Push to GitHub
   ↓
4. Automatic Vercel preview deployment
   ↓
5. Review and test
   ↓
6. Merge to main branch
   ↓
7. Automatic production deployment
```

### Environment Configuration
- **Development:** `.env.local`
- **Preview:** Vercel environment variables (preview)
- **Production:** Vercel environment variables (production)

### Build Process
```bash
# Install dependencies
npm install

# Type checking
tsc --noEmit

# Linting
npm run lint

# Build
npm run build

# Start production server
npm run start
```

### Deployment Strategy
- **Platform:** Vercel
- **Trigger:** Git push to main branch
- **Preview:** All branches get preview URLs
- **Rollback:** Instant rollback via Vercel dashboard
- **Zero downtime:** Automatic

### CI/CD Pipeline (Future)
- GitHub Actions for automated testing
- TypeScript compilation check
- ESLint checks
- Automated tests
- Build verification

---

## 11. ENVIRONMENT CONFIGURATION STRATEGY

### Environment Variables Structure

```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... # Server-only

# Email (Resend)
RESEND_API_KEY=re_xxx...

# Email Addresses (for notifications)
RESTAURANT_EMAIL=reservations@amante.in
EVENTS_EMAIL=events@amante.in
CAREERS_EMAIL=hr@amante.in
GENERAL_EMAIL=info@amante.in

# Business Info (for email templates)
RESTAURANT_NAME=Amante
RESTAURANT_PHONE=+919893779100
RESTAURANT_ADDRESS=... # To be provided by user
RESTAURANT_WEBSITE=https://amante.in

# Analytics (Phase 2)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
ENABLE_RESERVATIONS=true
ENABLE_EVENTS=true
ENABLE_CAREERS=true

# Rate Limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=10
RATE_LIMIT_REQUESTS_PER_HOUR=100
```

### Security Considerations
- Server-only variables (no NEXT_PUBLIC prefix)
- Use Vercel secrets for production
- Never log sensitive values
- Rotate keys regularly

---

## 12. MONITORING & ANALYTICS

### Application Monitoring
- **Vercel Analytics:** Built-in performance monitoring
- **Error Tracking:** Sentry (Phase 2)
- **Uptime Monitoring:** Vercel status page
- **Database Monitoring:** Supabase dashboard

### Business Analytics
- **Google Analytics 4:** User behavior tracking
- **Conversion Tracking:** Form submissions
- **Custom Events:**
  - Reservation submissions
  - Event enquiries
  - Menu views
  - Space page views

### Performance Monitoring
- **Core Web Vitals:** Vercel analytics
- **Real User Monitoring:** Built-in
- **Synthetic Monitoring:** Lighthouse CI (future)

---

## 13. DEPENDENCIES & PACKAGES TO INSTALL

### Required New Packages

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "resend": "^3.0.0",
    "@react-email/components": "^0.0.14",
    "@react-email/render": "^0.0.12",
    "zod": "^3.22.4",
    "date-fns": "^3.0.0",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@next/bundle-analyzer": "^15.0.0"
  }
}
```

### Installation Command
```bash
npm install @supabase/supabase-js resend @react-email/components @react-email/render zod date-fns react-hot-toast
npm install -D @next/bundle-analyzer
```

---

## 14. TESTING STRATEGY (Phase 2)

### Unit Tests
- Component testing with Jest + React Testing Library
- Utility function tests
- Validation schema tests

### Integration Tests
- API route testing
- Database operation tests
- Email sending tests

### E2E Tests
- Form submission flows with Playwright
- Critical user journeys
- Cross-browser testing

### Manual Testing Checklist
- All forms submit successfully
- Email notifications received
- Mobile responsiveness
- Browser compatibility
- Accessibility (WCAG 2.1 AA)

---

## 15. SCALABILITY CONSIDERATIONS

### Current Architecture (Phase 1)
- Supports 1000+ concurrent users
- 100+ form submissions per day
- 10,000+ page views per day

### Scaling Strategy (Future)
- **Database:** Supabase auto-scaling
- **API:** Vercel serverless auto-scaling
- **CDN:** Vercel Edge Network
- **Caching:** Redis for high-traffic scenarios
- **Email:** Upgrade Resend tier as needed

---

## 16. ACCESSIBILITY STRATEGY

### WCAG 2.1 AA Compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader testing

### Form Accessibility
- Clear labels
- Error announcements
- Required field indicators
- Help text for complex fields

---

## 17. INTERNATIONALIZATION (Future)

### Phase 1: English Only
- All content in English
- INR currency
- Indian phone format (+91)
- Date format: DD/MM/YYYY

### Phase 3: Multi-language
- Next.js i18n
- Hindi support
- Language selector
- Localized content

---

## 18. BACKUP & DISASTER RECOVERY

### Database Backups
- **Supabase:** Automatic daily backups
- **Retention:** 7 days on free tier
- **Manual backups:** Before major changes

### Code Backups
- **Git repository:** GitHub
- **Vercel:** Stores all deployments
- **Rollback:** Instant via Vercel

### Data Export
- **Supabase:** CSV export available
- **Scheduled exports:** Weekly to external storage (Phase 2)

---

## 19. COMPLIANCE & LEGAL

### Data Privacy
- GDPR considerations (future EU customers)
- Privacy policy page (Phase 2)
- Cookie consent (Phase 2)
- Data retention policy

### Terms of Service
- Terms page (Phase 2)
- Cancellation policy
- Refund policy (when payments added)

---

## 20. FUTURE ENHANCEMENTS ARCHITECTURE

### Phase 2 Features
- Blog system (MDX)
- Newsletter (Mailchimp integration)
- Instagram feed (Meta API)
- WhatsApp chat widget
- Advanced search

### Phase 3 Features
- Real-time table availability
- Payment gateway (Razorpay)
- SMS notifications (Twilio)
- Admin dashboard
- Delivery system
- Loyalty program

---

## ARCHITECTURAL DECISIONS LOG

### ADR-001: Database Selection - Supabase
**Decision:** Use Supabase over Firebase
**Rationale:**
- PostgreSQL provides better relational data handling
- Open-source and self-hostable
- Better TypeScript support
- Built-in auth for future admin panel
- More generous free tier

### ADR-002: Email Service - Resend
**Decision:** Use Resend over SendGrid
**Rationale:**
- Built specifically for Next.js/React
- React Email component support
- Simpler API
- Better developer experience
- Sufficient free tier for launch

### ADR-003: Validation Library - Zod
**Decision:** Use Zod over Yup
**Rationale:**
- Better TypeScript integration
- Type inference
- Smaller bundle size
- Active development
- Next.js ecosystem standard

### ADR-004: Form Library - React Hook Form
**Decision:** Use React Hook Form over Formik
**Rationale:**
- Better performance (uncontrolled inputs)
- Smaller bundle size
- Better TypeScript support
- Excellent Zod integration
- Active development

---

## CRITICAL DEPENDENCIES FROM USER

### Required Information
1. **Restaurant Address:** Full address with PIN code
2. **Operating Hours:** All 7 days, special hours
3. **Phone Numbers:** Reservation, events, general, careers
4. **Email Addresses:** All notification emails
5. **Social Media:** Instagram, Facebook, Twitter handles
6. **Domain:** Custom domain name for deployment
7. **Brand Assets:** Logo files (PNG, SVG)

### Content Inputs (for email templates)
8. **Brand Story:** Brief overview (200 words)
9. **Tagline:** Official restaurant tagline
10. **Cancellation Policy:** For email templates

---

## SUCCESS METRICS

### Technical Metrics
- 99.9% uptime
- < 3s page load time
- Zero critical security vulnerabilities
- < 5% form submission error rate

### Business Metrics
- Form completion rate > 70%
- Email deliverability > 95%
- Mobile traffic > 60%
- Conversion rate > 5%

---

## NEXT STEPS FOR IMPLEMENTATION

1. **Immediate (Week 1):**
   - Install required packages
   - Set up Supabase project
   - Set up Resend account
   - Create database schema
   - Set up environment variables

2. **Development (Week 1-2):**
   - Implement API routes
   - Build form components
   - Create email templates
   - Build space pages
   - Integrate database

3. **Testing (Week 2-3):**
   - Test all forms
   - Test email delivery
   - Performance testing
   - Security audit
   - Browser testing

4. **Deployment (Week 3):**
   - Production environment setup
   - Custom domain configuration
   - SSL certificate
   - Launch!

---

**ARCHITECTURE STATUS:** ✅ APPROVED FOR IMPLEMENTATION

**Next Agent:** content-copywriter (depends on this architecture)

**Document Owner:** System Architect Agent
**Last Updated:** 2025-10-24
**Version:** 1.0
