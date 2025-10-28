# AGENT 1: SYSTEM ARCHITECT - MISSION BRIEF

**Status:** ACTIVE
**Priority:** CRITICAL - Foundation for entire project
**Started:** 2025-10-24
**Estimated Duration:** 2-3 hours

---

## YOUR MISSION

You are the **System Architect** responsible for designing the complete technical architecture for the Amante Restaurant website. Your deliverables will be used by all subsequent agents, so thoroughness and clarity are essential.

## PROJECT CONTEXT

**Project:** Transform Amante's coming soon page into a full restaurant website
**Timeline:** 2-3 weeks ASAP
**Location:** /Users/aaryavar/Documents/ARVR Project Codes/Amante/amante-coming-soon
**Master Plan:** WEBSITE-MASTER-PLAN.md (READ THIS FIRST)

## CURRENT STATE

- Next.js 15 application with Tailwind CSS
- Existing coming soon page at /
- Existing menu pages at /menu and /menunew
- Basic component structure in place
- No database currently configured
- No API routes currently implemented

## YOUR DELIVERABLES

### 1. TECHNICAL ARCHITECTURE DOCUMENT
**File:** `TECHNICAL_ARCHITECTURE.md`

Must include:
- Complete tech stack specification
- Application architecture diagram (in markdown/ASCII)
- Component hierarchy and organization
- State management strategy
- Routing structure
- API architecture
- Database architecture
- Authentication/security approach (for admin future use)
- File structure/organization strategy
- Build and deployment pipeline
- Environment configuration strategy

### 2. DATABASE SCHEMA SPECIFICATION
**File:** `DATABASE_SCHEMA.sql`

Must include complete schema for 6 forms:
1. **Reservations** (table bookings)
2. **Private Events** (event enquiries)
3. **Banquets** (large event bookings)
4. **Contact** (general inquiries)
5. **Feedback** (customer reviews)
6. **Careers** (job applications)

Requirements:
- All tables with proper fields (reference master plan)
- Proper data types
- Indexes for performance
- Relationships/foreign keys where applicable
- Created_at, updated_at timestamps
- Status tracking fields
- UUID primary keys
- Comments explaining each table/field

### 3. API ROUTES SPECIFICATION
**File:** `API_ROUTES_SPEC.md`

Must include:
- Complete API route structure
- Request/response schemas for each endpoint
- Validation rules
- Error handling strategy
- Rate limiting approach
- Email notification triggers
- API route file locations in Next.js structure

Required API routes:
- POST /api/reservations
- POST /api/private-events
- POST /api/banquets
- POST /api/contact
- POST /api/feedback
- POST /api/careers
- GET /api/events (future: fetch upcoming events)

### 4. EMAIL SYSTEM ARCHITECTURE
**File:** `EMAIL_ARCHITECTURE.md`

Must include:
- Email service selection (Resend/SendGrid/Nodemailer)
- Email template structure
- Notification flow diagrams
- Email template specifications for:
  - Customer confirmations (6 types)
  - Restaurant notifications (6 types)
- Environment variable requirements
- Error handling and retry logic

### 5. TYPE DEFINITIONS
**File:** `src/types/index.ts` (enhancement)

Must include TypeScript interfaces for:
- All form data structures
- API request/response types
- Database model types
- Component prop types
- Validation schema types

### 6. ENVIRONMENT CONFIGURATION SPEC
**File:** `.env.example`

Must include all required environment variables:
- Database connection strings
- Email service API keys
- API endpoints
- Feature flags
- Email addresses for notifications
- Any external service credentials

---

## TECHNICAL REQUIREMENTS

### Tech Stack Constraints
- **Framework:** Next.js 15 (App Router) - MUST USE
- **Styling:** Tailwind CSS - MUST USE
- **Animations:** Framer Motion - ALREADY IN USE
- **Forms:** React Hook Form + Zod validation - RECOMMEND
- **Database:** Supabase OR Firebase - CHOOSE ONE
- **Email:** Resend OR SendGrid - CHOOSE ONE
- **Hosting:** Vercel - MUST USE
- **Language:** TypeScript - MUST USE

### Key Architectural Decisions Needed

1. **Database Choice:**
   - Option A: Supabase (recommended for built-in auth, realtime features)
   - Option B: Firebase (alternative)
   - Justify your choice

2. **Email Service:**
   - Option A: Resend (modern, Next.js friendly)
   - Option B: SendGrid (established, reliable)
   - Justify your choice

3. **Form Validation:**
   - Client-side: Zod schemas
   - Server-side: Validation approach
   - Error handling strategy

4. **File Uploads:**
   - For careers resume uploads
   - Storage solution (Supabase Storage / Cloudinary / S3)
   - File size limits and validation

5. **State Management:**
   - Local state: React hooks
   - Server state: React Query / SWR?
   - Form state: React Hook Form

### Performance Considerations
- Image optimization strategy (Next.js Image component)
- Code splitting approach
- API response caching
- Database query optimization
- CDN strategy

### Security Considerations
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting
- Environment variable security
- File upload security (careers)

---

## CRITICAL SPECIFICATIONS FROM MASTER PLAN

### 6 Forms to Support

#### 1. Table Reservation Form
```typescript
interface Reservation {
  date: Date;
  time: string; // Slots: 11am, 1pm, 3pm, 7pm, 9pm, 11pm
  partySize: number; // 1-20
  spacePreference: string; // Rooftop, Lounge, Café, Any
  occasion?: string;
  name: string;
  phone: string; // +91 format
  email: string;
  specialRequests?: string;
  agreeToSMS: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
}
```

#### 2. Private Event Enquiry
```typescript
interface PrivateEvent {
  eventType: string;
  eventDate: Date;
  guestCount: number;
  budgetRange: string;
  spacePreference: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  requirements: string;
  preferredContact: string;
}
```

#### 3. Banquet Booking
```typescript
interface BanquetBooking {
  eventType: string;
  eventDate: Date;
  alternateDate?: Date;
  guestCount: number;
  timingFrom: string;
  timingTo: string;
  requirements: string[];
  name: string;
  phone: string;
  email: string;
  city: string;
  hearAboutUs: string;
  additionalNotes?: string;
  requestType: 'Site Visit' | 'Quote';
}
```

#### 4. Contact Form
```typescript
interface ContactSubmission {
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}
```

#### 5. Feedback Form
```typescript
interface Feedback {
  visitDate: Date;
  spaceVisited: string;
  overallRating: number; // 1-5
  foodRating: number;
  serviceRating: number;
  ambianceRating: number;
  valueRating: number;
  whatYouLoved: string;
  improvements: string;
  wouldRecommend: string;
  name?: string;
  email?: string;
  canSharePublicly: boolean;
}
```

#### 6. Careers Form
```typescript
interface CareerApplication {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experience: number;
  currentPosition: string;
  expectedSalary: number;
  resume: File; // PDF/DOC
  portfolio?: string;
  whyAmante: string;
  availableToJoin: Date;
}
```

---

## PAGES TO ARCHITECT FOR

### Phase 1 (Week 1-2)
- Homepage (/)
- Menu pages (/menu, /menunew) - ALREADY EXISTS, enhance
- 6 Space pages:
  - /cafe
  - /restaurant
  - /lounge
  - /club
  - /private-dining
  - /banquets
- Form pages:
  - /reservations
  - /private-events (form page)
  - /feedback
  - /careers
- Info pages:
  - /events
  - /gallery
  - /about
  - /contact

### Component Architecture Needed
- Reusable form components
- Image gallery components
- Menu display components
- Space showcase components
- Navigation components
- Footer component
- Loading states
- Error states
- Success notifications

---

## ARCHITECTURAL PATTERNS TO USE

### 1. Component Organization
```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── forms/             # All form components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Homepage sections
│   ├── ui/                # Reusable UI components
│   └── spaces/            # Space-specific components
├── lib/
│   ├── db/                # Database utilities
│   ├── email/             # Email sending utilities
│   ├── validation/        # Zod schemas
│   └── utils/             # Helper functions
├── types/                 # TypeScript definitions
└── data/                  # Static data/content
```

### 2. API Route Organization
```
src/app/api/
├── reservations/
│   └── route.ts
├── private-events/
│   └── route.ts
├── banquets/
│   └── route.ts
├── contact/
│   └── route.ts
├── feedback/
│   └── route.ts
└── careers/
    └── route.ts
```

---

## SUCCESS CRITERIA

Your architecture will be considered complete when:

1. All 6 database tables are fully specified
2. All 6 API routes are documented with request/response schemas
3. Complete tech stack is selected and justified
4. Email system is fully specified
5. Type definitions are comprehensive
6. Environment variables are documented
7. File structure is clearly defined
8. Security considerations are addressed
9. Performance strategy is outlined
10. All deliverable files are created

---

## DEPENDENCIES NEEDED FROM USER

Note these in your deliverables as placeholders:
- Restaurant address (for schema/emails)
- Operating hours (for schema)
- Phone numbers (for emails)
- Email addresses (for notifications)
- Social media handles (for emails/footer)
- Domain name (for email templates)

---

## NEXT AGENT DEPENDENCIES

Your deliverables will be used by:
- **Agent 2 (content-copywriter):** Site structure, page list
- **Agent 3 (database-expert):** Database schema to implement
- **Agent 4 (backend-engineer):** API specifications to build
- **Agent 5 (ui-ux-designer):** Component structure, page layouts
- **Agent 6 (frontend-specialist):** Complete architecture to build from
- **Agent 9 (typescript-specialist):** Type definitions to verify

---

## EXECUTION INSTRUCTIONS

1. Read WEBSITE-MASTER-PLAN.md thoroughly
2. Analyze current codebase structure
3. Make architectural decisions (database, email service, etc.)
4. Create all 6 deliverable files
5. Ensure completeness and internal consistency
6. Document assumptions and rationale
7. Flag any blockers or missing information

---

## START NOW

Begin by reading the master plan, analyzing the current codebase, and creating your deliverables. Be thorough - the entire project depends on your architecture.

**Expected completion:** 2-3 hours
**Report status:** When all deliverables are complete

Good luck, Architect!
