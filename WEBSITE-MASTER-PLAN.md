# 🎯 AMANTE WEBSITE - MASTER IMPLEMENTATION PLAN

**Last Updated:** 2025-01-23
**Status:** APPROVED - Ready for Implementation
**Approach:** HYBRID (Fast to market with essential features)

---

## 📋 PROJECT PARAMETERS (User Confirmed)

✅ **Timeline:** ASAP (Target: 2-3 weeks)
✅ **Approach:** Hybrid - New homepage + refined menu + essential features
✅ **Photography:** Industry-specific placeholders (to be replaced later)
✅ **Reservation System:** Custom built (simple, no payment gateway)
✅ **Payment:** Physical only (no online payment integration)
✅ **Content:** Need help with copywriting
✅ **Team Profiles:** Placeholder for now
✅ **Events:** Yes - need calendar/schedule
✅ **Delivery:** Eventually (not Phase 1)
✅ **Language:** English only (Phase 1)

---

## 🚀 IMPLEMENTATION ROADMAP

### **PHASE 1: CORE LAUNCH (Week 1-2) - PRIORITY**

#### **Week 1: Homepage + Forms**
1. **Homepage Redesign** (`/`)
   - Hero section with placeholder images
   - About section (AI-generated copy + user refinement)
   - Six spaces preview cards
   - Menu preview section
   - Highlights/USPs grid
   - Social proof section
   - Location & hours
   - CTA sections
   - Footer with all links

2. **Essential Forms**
   - Table reservation form (simple, no payment)
   - Private event enquiry
   - Banquet booking enquiry
   - Contact form
   - Feedback form
   - Form submission → Email notifications

3. **Menu Refinement** (`/menunew`)
   - Add placeholder food images
   - Enhance local descriptions
   - Fix any UX issues
   - Add print-friendly version
   - Add PDF download option

#### **Week 2: Spaces + Events**
4. **Six Space Pages**
   - `/cafe` - Café & Bakery
   - `/restaurant` - Rooftop Restro
   - `/lounge` - Intimate Lounge
   - `/club` - Premier Club
   - `/private-dining` - Private Dining
   - `/banquets` - Grand Banquets
   - Each with: Hero, Overview, Gallery, Menu highlights, CTA

5. **Events & Experience**
   - `/events` - Events calendar with upcoming schedule
   - `/gallery` - Photo gallery (organized by category)
   - `/testimonials` - Customer reviews section

6. **About & Info**
   - `/about` - Restaurant story + team placeholders
   - `/contact` - Comprehensive contact page
   - `/careers` - Job application form

---

### **PHASE 2: ENHANCEMENTS (Week 3-4) - NICE TO HAVE**

7. **Advanced Features**
   - Blog setup (`/blog`)
   - Newsletter signup
   - Instagram feed integration
   - Google Maps integration
   - WhatsApp Business chat widget
   - SEO optimization
   - Analytics setup

8. **Content Population**
   - Professional photography replacement
   - Team profiles update
   - Blog posts (5 articles)
   - Event details
   - Customer testimonials

---

### **PHASE 3: FUTURE ADDITIONS (Post-Launch)**

9. **Advanced Reservations**
   - Real-time table availability
   - SMS confirmations
   - Calendar sync
   - Booking modifications

10. **Business Features**
    - Delivery/takeaway system
    - Gift cards
    - Loyalty program
    - Multi-language (Hindi)
    - Payment gateway integration

---

## 📐 SITE ARCHITECTURE (Final)

```
AMANTE WEBSITE
│
├── / (Homepage)
│   ├── Hero Section
│   ├── About Preview
│   ├── Six Spaces Preview
│   ├── Menu Preview
│   ├── Highlights
│   ├── Social Proof
│   ├── Location & Hours
│   └── CTAs
│
├── MENU SECTION
│   ├── /menu (Menu selector - keep existing)
│   ├── /menunew (Enhanced menu - primary)
│   ├── /menu/food (Category view)
│   ├── /menu/bar (Category view)
│   └── /menu/cafe (Category view)
│
├── SPACES
│   ├── /cafe (Café & Bakery)
│   ├── /restaurant (Rooftop Restro)
│   ├── /lounge (Intimate Lounge)
│   ├── /club (Premier Club)
│   ├── /private-dining (Private Dining)
│   └── /banquets (Grand Banquets)
│
├── EXPERIENCE
│   ├── /events (Events calendar)
│   ├── /gallery (Photo gallery)
│   └── /testimonials (Customer reviews)
│
├── ABOUT
│   ├── /about (Story + Team)
│   ├── /contact (All contact info + forms)
│   └── /careers (Job applications)
│
└── RESERVATIONS & FORMS
    ├── /reservations (Table booking)
    ├── /private-events (Event enquiry)
    ├── /banquets (Banquet booking)
    └── /feedback (Customer feedback)
```

---

## 📝 FORMS SPECIFICATION

### **1. Table Reservation Form** (`/reservations`)

**Purpose:** Allow customers to request table reservations
**Processing:** Email to restaurant + SMS to customer (confirmation)
**No Payment Required**

**Fields:**
```javascript
{
  date: Date,
  time: String, // Time slots: 11am, 1pm, 3pm, 7pm, 9pm, 11pm
  partySize: Number, // 1-20
  spacePreference: String, // Rooftop, Lounge, Café, Any
  occasion: String, // Optional: Birthday, Anniversary, etc.
  name: String,
  phone: String, // +91 format validation
  email: String,
  specialRequests: Text,
  agreeToSMS: Boolean
}
```

**Email Template:**
```
TO: restaurant@amante.in
SUBJECT: New Table Reservation Request

Reservation Details:
- Date: {date}
- Time: {time}
- Party Size: {partySize}
- Space: {spacePreference}
- Occasion: {occasion}

Customer Details:
- Name: {name}
- Phone: {phone}
- Email: {email}

Special Requests:
{specialRequests}

---
Action Required: Call customer to confirm
```

**Customer Confirmation:**
```
TO: {email}
SUBJECT: Reservation Request Received - Amante

Dear {name},

Thank you for choosing Amante! We've received your reservation request:

Date: {date}
Time: {time}
Party Size: {partySize}

Our team will call you at {phone} within 2 hours to confirm your booking.

Looking forward to hosting you!

Warm regards,
Team Amante
+91 98937 79100
```

---

### **2. Private Event Enquiry** (`/private-events`)

**Purpose:** Capture leads for private events
**Processing:** Email to events team
**No Payment Required**

**Fields:**
```javascript
{
  eventType: String, // Birthday, Anniversary, Corporate, Proposal, Other
  eventDate: Date,
  guestCount: Number,
  budgetRange: String, // ₹50k-1L, ₹1L-2L, ₹2L-5L, 5L+
  spacePreference: String, // Private Dining, Rooftop, Banquet
  name: String,
  phone: String,
  email: String,
  company: String, // Optional for corporate
  requirements: Text,
  preferredContact: String // Phone, WhatsApp, Email
}
```

---

### **3. Banquet Booking Enquiry** (`/banquets`)

**Purpose:** Wedding and large event enquiries
**Processing:** Email to banquet manager + WhatsApp notification
**No Payment Required**

**Fields:**
```javascript
{
  eventType: String, // Wedding, Reception, Corporate, Conference, etc.
  eventDate: Date,
  alternateDate: Date,
  guestCount: Number,
  timingFrom: Time,
  timingTo: Time,
  requirements: Array, // Catering, Decoration, Photography, DJ, Valet, etc.
  name: String,
  phone: String,
  email: String,
  city: String,
  hearAboutUs: String, // Google, Instagram, Referral, etc.
  additionalNotes: Text,
  requestType: String // Site Visit, Quote
}
```

---

### **4. Contact Form** (`/contact`)

**Purpose:** General inquiries
**Processing:** Email to general inbox

**Fields:**
```javascript
{
  inquiryType: String, // Reservation, Event, General, Corporate, Jobs, Press, Issue
  name: String,
  phone: String,
  email: String,
  message: Text
}
```

---

### **5. Feedback Form** (`/feedback`)

**Purpose:** Collect customer feedback
**Processing:** Email to management + Store in database

**Fields:**
```javascript
{
  visitDate: Date,
  spaceVisited: String, // Café, Restaurant, Lounge, Club
  overallRating: Number, // 1-5 stars
  foodRating: Number,
  serviceRating: Number,
  ambianceRating: Number,
  valueRating: Number,
  whatYouLoved: Text,
  improvements: Text,
  wouldRecommend: String, // Definitely, Probably, Maybe, No
  name: String, // Optional
  email: String, // Optional
  canSharePublicly: Boolean
}
```

---

### **6. Careers Form** (`/careers`)

**Purpose:** Job applications
**Processing:** Email to HR + Store resume

**Fields:**
```javascript
{
  position: String, // Chef, Bartender, Server, Manager, Host, Housekeeping, Other
  fullName: String,
  email: String,
  phone: String,
  currentCity: String,
  experience: Number, // years
  currentPosition: String,
  expectedSalary: Number,
  resume: File, // PDF/DOC
  portfolio: Text,
  whyAmante: Text,
  availableToJoin: Date
}
```

---

## 🎨 DESIGN SPECIFICATIONS

### **Color Palette**
```css
--amante-red: #8B1538;        /* Primary brand color */
--amante-pink-light: #E5B8C5; /* Light accent */
--amante-pink-subtle: #F5E9ED;/* Background tint */
--gold: #D4AF37;              /* Accent for premium */
--cream: #F8F6F0;             /* Backgrounds */
--charcoal: #2C2C2C;          /* Text */
--warm-grey: #757575;         /* Secondary text */
```

### **Typography**
```css
/* Headings */
font-family: 'Playfair Display', serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;

/* Accent/Special */
font-family: 'Laginchy', serif; /* If available */
```

### **Image Requirements**
- **Format:** WebP (with JPG fallback)
- **Hero Images:** 1920x1080px minimum
- **Space Cards:** 600x400px
- **Food Photos:** 800x800px (square)
- **Gallery:** Various sizes, optimized
- **Placeholder Source:** Unsplash, Pexels (restaurant/food keywords)

---

## 📸 PLACEHOLDER IMAGE STRATEGY

### **Image Categories Needed:**

1. **Hero Section** (3-4 rotating images)
   - Elegant dining setup
   - Rooftop ambiance at sunset
   - Bar with cocktails
   - Food plating close-up

2. **Spaces** (1 hero + 6-8 gallery per space)
   - **Café:** Coffee art, pastries, morning light, cozy seating
   - **Restaurant:** Rooftop dining, city views, elegant table settings
   - **Lounge:** Cozy seating, cocktails, ambient lighting
   - **Club:** DJ setup, dance floor, bottle service, neon lights
   - **Private Dining:** Intimate table, chef's table, wine pairing
   - **Banquets:** Wedding setup, stage decoration, large hall

3. **Food** (For menu items - 50-60 images)
   - Indian dishes
   - Asian cuisine
   - Continental plates
   - Cocktails & beverages
   - Desserts
   - Coffee & café items

4. **About/Team** (Placeholder team photos)
   - Chef in action
   - Bartender mixing drinks
   - Service staff
   - Team gathering

**Placeholder Sources:**
- Unsplash Collections: Restaurant, Food, Cocktails
- Pexels: Fine Dining, Indian Food
- Pixabay: Bar, Coffee Shop
- Generated: Can use AI image generation for specific needs

---

## ✍️ CONTENT FRAMEWORK (To Be Written)

### **Homepage Copy**

#### **Hero Section**
```
Headline: "Where Culinary Art Meets Bhopal's Spirit"
Subheadline: "Six distinctive spaces. One unforgettable experience."
CTA: "Reserve Your Table" | "Explore Our Menu"
```

#### **About Section** (300 words)
```
Title: "A Story of Passion & Flavor"

[Paragraph 1: Opening - The Vision]
Amante isn't just a restaurant; it's a culinary destination where
[NEEDS: Brand story - why started, inspiration, vision]

[Paragraph 2: What Makes Us Special]
From our rooftop restaurant with panoramic city views to our intimate
lounge perfect for evening conversations...
[NEEDS: USPs, what differentiates from competition]

[Paragraph 3: The Experience]
Whether you're celebrating a milestone, hosting a corporate event, or
simply seeking an exceptional meal...
[NEEDS: Emotional connection, what guests can expect]
```

#### **Six Spaces Preview** (50 words each)
```
Café & Bakery:
"Start your day with artisan coffee and French-inspired pastries in
our charming café. Perfect for morning meetings and casual brunches."

Rooftop Restro:
"Dine under the stars with panoramic views of Bhopal. Our signature
cuisine paired with the city's best ambiance."

Intimate Lounge:
"Unwind with craft cocktails in a setting designed for conversation.
Live music on weekends adds to the magic."

Premier Club:
"Bhopal's most exclusive nightlife destination. World-class DJs,
premium bottle service, and unforgettable nights."

Private Dining:
"An intimate space for your special moments. Chef's table experiences
and customized menus for up to 20 guests."

Grand Banquets:
"Make your celebrations legendary. From weddings to corporate galas,
our banquet halls host 50-500 guests."
```

---

### **Space Page Template** (200 words each)

```markdown
## [Space Name]

### Overview
[Opening paragraph - what makes this space special, atmosphere,
unique features - 100 words]

### Perfect For
- [Use case 1]
- [Use case 2]
- [Use case 3]

### Timings
- [Days]: [Hours]
- [Special hours if any]

### Capacity
- [Seating capacity]
- [Standing capacity if applicable]

### Highlights
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

### Menu Specialties
[Brief description of what's special about this space's menu - 50 words]
[Link to full menu]

### What Our Guests Say
[Placeholder for testimonials - to be added]

### Book This Space
[CTA with appropriate form link]
```

---

### **Events Page Copy**

```markdown
## Upcoming Events at Amante

[Calendar/List view of events]

### Regular Events
- **Live Music Nights** - Every Friday & Saturday, 8pm-11pm
- **Sunday Brunch** - Every Sunday, 11am-3pm
- **Happy Hour** - Monday-Friday, 5pm-7pm
- **Ladies Night** - Every Wednesday, 7pm onwards

### Special Events
[To be updated monthly with themed nights, festivals, special performances]

### Host Your Event
Looking to host a private event? [Link to enquiry form]
```

---

### **About Page Copy** (500 words)

```markdown
## Our Story

[Paragraph 1: The Beginning - 100 words]
[NEEDS: Founder's vision, when started, initial concept]

[Paragraph 2: The Journey - 100 words]
[NEEDS: Growth story, challenges overcome, milestones]

[Paragraph 3: The Philosophy - 100 words]
[NEEDS: Culinary philosophy, sourcing, quality commitment]

[Paragraph 4: The Team - 100 words]
[NEEDS: Team culture, expertise, dedication]

[Paragraph 5: The Future - 100 words]
[NEEDS: Vision ahead, commitment to Bhopal, community involvement]

## Our Values
- **Excellence:** [Brief description]
- **Innovation:** [Brief description]
- **Hospitality:** [Brief description]
- **Community:** [Brief description]

## Awards & Recognition
[Placeholder - to be updated with actual awards]

## Meet Our Team
[Placeholder team profiles - to be replaced]
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### **Tech Stack (Current)**
```
Framework: Next.js 15
Styling: Tailwind CSS
Animations: Framer Motion
Forms: React Hook Form + Zod validation
Email: Resend / SendGrid / Nodemailer
Database: Supabase / Firebase (for form submissions)
Analytics: Google Analytics 4
Hosting: Vercel
```

### **Form Processing Flow**

```javascript
// Simple implementation without payment

1. User fills form → Client-side validation
2. Submit → POST to /api/reservations
3. Server validates → Store in database
4. Send confirmation email to customer
5. Send notification email to restaurant
6. Optional: Send WhatsApp notification
7. Return success message to user
```

### **Reservation API Route Example**

```typescript
// /api/reservations/route.ts

export async function POST(request: Request) {
  const data = await request.json();

  // Validate data
  const validated = reservationSchema.parse(data);

  // Store in database
  await supabase.from('reservations').insert(validated);

  // Send emails
  await sendCustomerConfirmation(validated);
  await sendRestaurantNotification(validated);

  return Response.json({ success: true });
}
```

### **Database Schema**

```sql
-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  party_size INTEGER NOT NULL,
  space_preference VARCHAR(50),
  occasion VARCHAR(100),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Private Events
CREATE TABLE private_events (
  id UUID PRIMARY KEY,
  event_type VARCHAR(50),
  event_date DATE,
  guest_count INTEGER,
  budget_range VARCHAR(50),
  space_preference VARCHAR(50),
  name VARCHAR(100),
  phone VARCHAR(15),
  email VARCHAR(100),
  company VARCHAR(100),
  requirements TEXT,
  preferred_contact VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  visit_date DATE,
  space_visited VARCHAR(50),
  overall_rating INTEGER,
  food_rating INTEGER,
  service_rating INTEGER,
  ambiance_rating INTEGER,
  value_rating INTEGER,
  what_you_loved TEXT,
  improvements TEXT,
  would_recommend VARCHAR(20),
  name VARCHAR(100),
  email VARCHAR(100),
  can_share_publicly BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Similar for other forms...
```

---

## 📊 SEO STRATEGY

### **On-Page SEO**

**Homepage:**
```html
<title>Amante - Bhopal's Premier Restaurant, Bar & Banquet | Book Now</title>
<meta name="description" content="Experience fine dining at Amante, Bhopal's top restaurant featuring rooftop dining, craft cocktails, private events & grand banquets. Reserve your table today!">
<meta name="keywords" content="restaurant bhopal, fine dining bhopal, rooftop restaurant bhopal, bar bhopal, banquet hall bhopal, private dining bhopal">
```

**Menu Pages:**
```html
<title>Amante Menu - Food, Bar & Café | Bhopal's Best Cuisine</title>
<meta name="description" content="Explore Amante's diverse menu featuring Indian classics, Asian fusion, Continental favorites, craft cocktails & artisan coffee. 300+ dishes to choose from.">
```

**Space Pages:**
```html
<title>Rooftop Restaurant in Bhopal - Amante | Book Your Table</title>
<meta name="description" content="Dine under the stars at Amante's rooftop restaurant with panoramic city views. Perfect for romantic dinners & celebrations. Reserve now!">
```

### **Schema Markup**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Amante",
  "image": "https://amante.com/images/hero.jpg",
  "description": "Fine dining restaurant with multiple spaces",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Bhopal",
    "addressRegion": "MP",
    "postalCode": "[PIN]",
    "addressCountry": "IN"
  },
  "telephone": "+919893779100",
  "servesCuisine": ["Indian", "Asian", "Continental"],
  "priceRange": "₹₹₹",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "00:00"
    }
  ],
  "acceptsReservations": "True"
}
```

### **Local SEO**
- Google My Business listing
- Bing Places
- Zomato, Swiggy, Dineout profiles
- Local directory listings
- Location-specific keywords

---

## 📱 MOBILE OPTIMIZATION

### **Mobile-First Features**
- Tap-to-call buttons
- WhatsApp chat integration
- One-tap Google Maps navigation
- Swipeable image galleries
- Hamburger menu
- Sticky "Reserve" button
- Fast loading (<3s)

### **Progressive Web App (Future)**
- Add to home screen
- Offline menu viewing
- Push notifications for offers

---

## 🎯 CONVERSION OPTIMIZATION

### **Key Conversion Points**
1. **Homepage → Reservation** (Primary)
2. **Menu → Reservation** (Secondary)
3. **Space Page → Enquiry** (Primary)
4. **Events → Registration** (When applicable)
5. **Contact → Form Submit** (Secondary)

### **Trust Signals**
- Google review rating (prominent display)
- Customer testimonials with photos
- Awards & certifications
- "As featured in" media logos
- Real-time availability indicators
- Clear cancellation policy

### **Urgency Triggers**
- "Only 3 tables left for tonight"
- "Book within 2 hours for 10% off first visit" (future)
- Event countdowns
- Limited-time offers

---

## 📧 EMAIL TEMPLATES

### **Customer Confirmation (Reservation)**
```
Subject: Reservation Request Received - Amante Bhopal

Dear [Name],

Thank you for choosing Amante for your upcoming visit!

RESERVATION DETAILS:
━━━━━━━━━━━━━━━━━━━━━
Date: [Date]
Time: [Time]
Party Size: [Size]
Space: [Space Preference]

We've received your reservation request and our team will confirm
your booking within 2 hours.

You'll receive a call at [Phone] shortly.

WHAT TO EXPECT:
• Complimentary valet parking
• Table held for 15 minutes past reservation time
• Special arrangements for [Occasion] if mentioned

LOCATION:
[Address]
[Google Maps Link]

Need to make changes? Call us at +91 98937 79100

Looking forward to hosting you!

Warm regards,
Team Amante

---
Follow us:
Instagram | Facebook | Twitter

Powered by Restronaut
```

### **Restaurant Notification (New Reservation)**
```
Subject: 🔔 NEW RESERVATION - Action Required

RESERVATION DETAILS:
━━━━━━━━━━━━━━━━━━━━━
Date: [Date]
Time: [Time]
Party Size: [Size]
Space: [Space Preference]
Occasion: [Occasion]

CUSTOMER:
━━━━━━━━━━━━━━━━━━━━━
Name: [Name]
Phone: [Phone]
Email: [Email]

SPECIAL REQUESTS:
[Requests if any]

⚠️ ACTION REQUIRED:
Call customer at [Phone] within 2 hours to confirm booking.

━━━━━━━━━━━━━━━━━━━━━
Reservation ID: #[ID]
Received: [Timestamp]
```

---

## ✅ LAUNCH CHECKLIST

### **Pre-Launch (Week 1)**
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] All placeholder images in place
- [ ] Content written and approved
- [ ] Forms tested (all fields)
- [ ] Email notifications working
- [ ] Mobile responsive verified
- [ ] Browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Load time optimized (<3s)
- [ ] Analytics installed

### **Launch Day**
- [ ] Final content review
- [ ] Replace coming soon page
- [ ] Submit sitemap to Google
- [ ] Social media announcement
- [ ] Staff training on new system
- [ ] Monitor form submissions
- [ ] Check email deliverability
- [ ] Verify all links work

### **Post-Launch (Week 1)**
- [ ] Monitor analytics
- [ ] Collect user feedback
- [ ] Fix any reported issues
- [ ] A/B test CTA buttons
- [ ] Start collecting testimonials
- [ ] Begin photography replacement
- [ ] SEO performance tracking

---

## 📈 SUCCESS METRICS

### **Week 1 Targets**
- 500+ unique visitors
- 50+ reservation requests
- 20+ event enquiries
- 10+ form submissions (other)
- <5% bounce rate on homepage

### **Month 1 Targets**
- 5,000+ unique visitors
- 200+ reservations
- 50+ event enquiries
- 100+ email signups
- 50+ testimonials collected

### **Tracking Tools**
- Google Analytics 4 (traffic, conversions)
- Hotjar (heatmaps, recordings)
- Google Search Console (SEO performance)
- Form submission dashboard

---

## 🔄 MAINTENANCE PLAN

### **Daily**
- Monitor form submissions
- Respond to enquiries within 2 hours
- Check website uptime

### **Weekly**
- Update events calendar
- Post new blog/social content
- Review analytics
- Backup database

### **Monthly**
- Replace placeholder images
- Update menu prices/items
- SEO audit
- Performance optimization
- Content updates

### **Quarterly**
- Major photography update
- Team profile updates
- Feature additions
- Design refresh (if needed)

---

## 💰 ESTIMATED COSTS

### **Development (DIY with AI assistance)**
- Domain: ₹1,000/year
- Hosting (Vercel): ₹0 (free tier) or ₹2,000/month (pro)
- Email service (SendGrid): ₹0 (free tier) or ₹1,500/month
- Database (Supabase): ₹0 (free tier) or ₹2,000/month
- Image hosting (Cloudinary): ₹0 (free tier)
- **Monthly: ₹0-5,500**

### **Photography (Future)**
- Professional photoshoot: ₹30,000-50,000 (one-time)
- Food photography: ₹20,000-30,000 (one-time)
- Video production: ₹50,000-1,00,000 (optional)

### **Marketing (Optional)**
- Google Ads: ₹10,000-30,000/month
- Social media ads: ₹5,000-15,000/month
- SEO services: ₹10,000-20,000/month

---

## 🚨 CRITICAL DEPENDENCIES

**Before Development Starts - NEED FROM YOU:**

1. **Restaurant Details:**
   - [ ] Exact address with PIN code
   - [ ] Operating hours (all 7 days)
   - [ ] Any closed days
   - [ ] Phone numbers (reservation, events, general)
   - [ ] Email addresses (general, events, careers)
   - [ ] Social media handles

2. **Content Inputs:**
   - [ ] Brand story (brief overview - 200 words)
   - [ ] What makes Amante special (USPs)
   - [ ] Founder's vision (if to be shared)
   - [ ] Any taglines/slogans currently used
   - [ ] Awards/recognition received

3. **Technical:**
   - [ ] Access to domain DNS settings
   - [ ] Email service preference (Gmail/custom)
   - [ ] Logo files (PNG, SVG if available)
   - [ ] Any existing brand guidelines

4. **Business:**
   - [ ] Cancellation policy
   - [ ] Advance booking window (how far ahead)
   - [ ] Minimum party size restrictions
   - [ ] Peak hours/days
   - [ ] Special requirements for banquet bookings

---

## 🎯 NEXT IMMEDIATE STEPS

**READY TO START:**

1. **This Week:**
   - Gather all dependencies listed above
   - Approve placeholder image strategy
   - Review and refine content framework
   - Set up hosting and domain

2. **Next Week:**
   - Begin homepage development
   - Create form infrastructure
   - Write initial content
   - Source placeholder images

3. **Week 3:**
   - Complete space pages
   - Set up email system
   - Testing and refinement
   - Prepare for launch

---

## 📞 SUPPORT & MAINTENANCE

**Post-Launch Support:**
- Bug fixes: Immediate
- Content updates: Within 24 hours
- New features: Scoped separately
- Emergency issues: Same day

**Contact for Updates:**
- Content changes: Email/WhatsApp
- Technical issues: Report via dashboard
- Feature requests: Monthly review

---

**PLAN STATUS:** ✅ APPROVED & SAVED
**NEXT ACTION:** Gather dependencies and start Phase 1 development
**TARGET LAUNCH:** 2-3 weeks from kickoff

---

*This plan is a living document and will be updated as the project progresses.*
