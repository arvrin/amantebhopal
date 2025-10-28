# SEO Quick Start Checklist

Quick reference for implementing Amante Restaurant SEO.

---

## Pre-Launch Checklist

### 1. Update Business Information ⚠️ CRITICAL
**File:** `/src/lib/seo.ts`

- [ ] Line 24: Add actual street address
- [ ] Line 27: Add actual PIN code
- [ ] Line 28: Verify phone number (+919893779100)
- [ ] Line 29: Verify email (hello@amante.in)
- [ ] Lines 32-34: Update coordinates if needed

### 2. Implement Page Metadata ⚠️ CRITICAL
**Reference:** `PAGE_METADATA_EXAMPLES.md`

Copy metadata to each page file:
- [ ] `/src/app/page.tsx` - Homepage
- [ ] `/src/app/cafe/page.tsx` - Café
- [ ] `/src/app/restaurant/page.tsx` - Restaurant
- [ ] `/src/app/lounge/page.tsx` - Lounge
- [ ] `/src/app/club/page.tsx` - Club
- [ ] `/src/app/private-dining/page.tsx` - Private Dining
- [ ] `/src/app/banquets/page.tsx` - Banquets
- [ ] `/src/app/menu/page.tsx` - Menu
- [ ] `/src/app/events/page.tsx` - Events
- [ ] `/src/app/about/page.tsx` - About
- [ ] `/src/app/contact/page.tsx` - Contact
- [ ] `/src/app/reservations/page.tsx` - Reservations
- [ ] `/src/app/private-events/page.tsx` - Private Events
- [ ] `/src/app/gallery/page.tsx` - Gallery
- [ ] `/src/app/feedback/page.tsx` - Feedback
- [ ] `/src/app/careers/page.tsx` - Careers

### 3. Add Structured Data ⚠️ CRITICAL

**Homepage** (`/src/app/page.tsx`):
```tsx
import { RestaurantSchema, LocalBusinessSchema, WebSiteSchema, OrganizationSchema } from '@/components/seo/StructuredData';

export default function Home() {
  return (
    <>
      <RestaurantSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <OrganizationSchema />
      {/* Page content */}
    </>
  );
}
```

**All Other Pages**:
```tsx
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[...]} />
      {/* Page content */}
    </>
  );
}
```

### 4. Create OG Images ⚠️ CRITICAL

**Required Images (1200 x 630 pixels, JPG, < 1MB):**
- [ ] `/public/og-image.jpg` - Homepage
- [ ] `/public/images/spaces/cafe/og-image.jpg`
- [ ] `/public/images/spaces/restaurant/og-image.jpg`
- [ ] `/public/images/spaces/lounge/og-image.jpg`
- [ ] `/public/images/spaces/club/og-image.jpg`
- [ ] `/public/images/spaces/private-dining/og-image.jpg`
- [ ] `/public/images/spaces/banquets/og-image.jpg`

### 5. Environment Variables

- [ ] Copy `.env.example` to `.env.local`
- [ ] Update with actual values:
  - [ ] NEXT_PUBLIC_SITE_URL
  - [ ] NEXT_PUBLIC_BUSINESS_* variables
  - [ ] RESEND_API_KEY
  - [ ] SUPABASE_* variables
- [ ] Add to Vercel dashboard (production)

### 6. Pre-Launch Testing

- [ ] Build website: `npm run build`
- [ ] Test locally: `npm run dev`
- [ ] Verify sitemap: http://localhost:3000/sitemap.xml
- [ ] Verify robots.txt: http://localhost:3000/robots.txt
- [ ] Test metadata on all pages
- [ ] Check mobile responsiveness
- [ ] Test page speed

---

## Launch Day Checklist

### Deploy to Production
- [ ] Deploy to Vercel
- [ ] Verify production URL works
- [ ] Test sitemap: https://amante.in/sitemap.xml
- [ ] Test robots.txt: https://amante.in/robots.txt

### Verify SEO Elements
- [ ] All pages load correctly
- [ ] Meta tags render on all pages
- [ ] OG images display in Facebook debugger
- [ ] Twitter cards display correctly
- [ ] Structured data validates (Rich Results Test)

---

## Week 1 Post-Launch Checklist

### Google Search Console Setup
**Guide:** `GOOGLE_SEARCH_CONSOLE_SETUP.md`

- [ ] Create Search Console account
- [ ] Add property (amante.in)
- [ ] Verify domain ownership
  - [ ] Choose verification method (DNS recommended)
  - [ ] Add verification code
  - [ ] Confirm verification
- [ ] Submit sitemap (https://amante.in/sitemap.xml)
- [ ] Enable email notifications

### Google Analytics 4 Setup
- [ ] Create GA4 property
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- [ ] Add to Vercel environment variables
- [ ] Deploy with analytics
- [ ] Test tracking (real-time view)
- [ ] Set up conversion tracking:
  - [ ] Reservation submissions
  - [ ] Event enquiries
  - [ ] Phone clicks

### Google Business Profile Setup
**Guide:** `LOCAL_SEO_GUIDE.md` (page 10)

- [ ] Create/claim business listing
- [ ] Complete all sections:
  - [ ] Business name: Amante
  - [ ] Category: Restaurant (+ 5-10 more)
  - [ ] Address (exact match everywhere)
  - [ ] Phone: +919893779100
  - [ ] Website: https://amante.in
  - [ ] Hours (all spaces)
  - [ ] Services list (20+ services)
  - [ ] Attributes (30+ attributes)
  - [ ] Description (750 chars)
- [ ] Upload 20+ photos:
  - [ ] Exterior (5 photos)
  - [ ] Interior (10 photos)
  - [ ] Food & drinks (10 photos)
  - [ ] Team (5 photos)
- [ ] Verify business (postcard/phone/email)
- [ ] Create first Google Post

### Initial SEO Checks
- [ ] Verify all pages indexed (Search Console)
- [ ] Check for crawl errors
- [ ] Validate structured data
- [ ] Test page speed (all pages)
- [ ] Check mobile usability
- [ ] Audit Core Web Vitals

---

## Month 1 Checklist

### Local Citations (Top 10 Priority)
**Guide:** `LOCAL_SEO_GUIDE.md` (page 35)

Claim/create listings on:
- [ ] 1. Google Business Profile ✓
- [ ] 2. Facebook Business Page
- [ ] 3. Instagram Business Profile
- [ ] 4. JustDial
- [ ] 5. Sulekha
- [ ] 6. Zomato
- [ ] 7. Dineout
- [ ] 8. EazyDiner
- [ ] 9. TripAdvisor
- [ ] 10. WedMeGood (for banquets)

**For each listing:**
- Use exact NAP (Name, Address, Phone)
- Add 5+ photos
- Complete all fields
- Add menu/services where possible

### Review Generation
**Guide:** `LOCAL_SEO_GUIDE.md` (page 45)

- [ ] Create review request system:
  - [ ] Google review link: https://g.page/r/[PLACE_ID]/review
  - [ ] Create short link: bit.ly/amante-review
  - [ ] Print QR codes for tables
  - [ ] Email template
  - [ ] SMS template
- [ ] Train staff on asking for reviews
- [ ] Target: 25 Google reviews in Month 1
- [ ] Respond to ALL reviews within 24 hours

### Content & Updates
- [ ] Create 8-12 Google Posts (2-3 per week)
- [ ] Update event calendar
- [ ] Add new photos weekly
- [ ] Ensure all internal links working

### Monitoring
- [ ] Set up weekly analytics check
- [ ] Track keyword rankings (manually or tool)
- [ ] Monitor Google Business Profile insights
- [ ] Check for new reviews daily

---

## Monthly Ongoing Checklist

### Content (Weekly)
- [ ] Create 2-3 Google Posts
- [ ] Add 3-5 new photos to GBP
- [ ] Update event calendar
- [ ] Check for broken links

### Reviews (Daily/Weekly)
- [ ] Respond to all new reviews (daily)
- [ ] Generate 10+ new reviews per month
- [ ] Monitor review ratings across platforms

### Monitoring (Weekly)
- [ ] Check Search Console for errors
- [ ] Review Google Analytics traffic
- [ ] Monitor keyword rankings
- [ ] Check GBP insights

### Optimization (Monthly)
- [ ] Review underperforming pages
- [ ] Update meta descriptions if CTR low
- [ ] Add new content sections
- [ ] Build 3-5 local citations
- [ ] Create 1-2 local backlinks
- [ ] Generate monthly SEO report

---

## Quarterly Checklist

### Comprehensive Audit
- [ ] Full site SEO audit
- [ ] Backlink profile review
- [ ] Citation consistency check
- [ ] Competitor analysis
- [ ] Keyword strategy review
- [ ] Content gap analysis

### Optimization
- [ ] Update old content
- [ ] Refresh underperforming pages
- [ ] Add new keywords
- [ ] Improve conversion rates
- [ ] Update business information if changed

### Reporting
- [ ] Quarter-over-quarter traffic growth
- [ ] Keyword ranking improvements
- [ ] Review count growth
- [ ] Conversion rate trends
- [ ] Goal completions

---

## Tools Quick Reference

### Free Tools
- **Search Console:** https://search.google.com/search-console
- **Analytics:** https://analytics.google.com
- **Business Profile:** https://business.google.com
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed:** https://pagespeed.web.dev
- **Mobile Test:** https://search.google.com/test/mobile-friendly

### Testing Your Site
```bash
# Test metadata
https://search.google.com/test/rich-results?url=https://amante.in

# Test mobile
https://search.google.com/test/mobile-friendly?url=https://amante.in

# Test speed
https://pagespeed.web.dev/analysis?url=https://amante.in
```

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `SEO_IMPLEMENTATION.md` | Complete SEO guide (1,300 lines) |
| `LOCAL_SEO_GUIDE.md` | Local SEO strategy (1,000 lines) |
| `GOOGLE_SEARCH_CONSOLE_SETUP.md` | Setup guide (600 lines) |
| `PAGE_METADATA_EXAMPLES.md` | Metadata for all pages (800 lines) |
| `SEO_DELIVERABLES_SUMMARY.md` | Project summary |
| `/src/lib/seo.ts` | SEO utilities |
| `/src/components/seo/StructuredData.tsx` | Schema components |

---

## Contact & Support

**Documentation:** All guides in project root
**Code:** `/src/lib/seo.ts` and `/src/components/seo/`

**Google Support:**
- Search Console: https://support.google.com/webmasters
- Analytics: https://support.google.com/analytics
- Business Profile: https://support.google.com/business

---

## Success Metrics

### Month 1 Goals
- [ ] All pages indexed
- [ ] 25+ Google reviews
- [ ] 10+ citations live
- [ ] Appearing in local pack
- [ ] 100+ organic sessions

### Month 3 Goals
- [ ] 50+ Google reviews
- [ ] 20+ citations
- [ ] Top 20 for 5+ keywords
- [ ] 300+ organic sessions

### Month 6 Goals
- [ ] 100+ Google reviews
- [ ] 30+ citations
- [ ] Top 10 for 3+ keywords
- [ ] 500+ organic sessions
- [ ] 50+ monthly conversions

### Month 12 Goals
- [ ] 200+ Google reviews
- [ ] 50+ citations
- [ ] Top 3 for primary keywords
- [ ] 1,000+ organic sessions
- [ ] 100+ monthly conversions

---

**Last Updated:** October 25, 2025
**Status:** Production Ready
**Priority:** Complete pre-launch items first!
