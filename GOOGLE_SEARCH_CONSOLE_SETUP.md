# Google Search Console Setup Guide for Amante Restaurant

This comprehensive guide walks you through setting up Google Search Console, Analytics, and related tools to maximize Amante's search visibility in Bhopal and beyond.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Search Console Setup](#google-search-console-setup)
3. [Domain Verification](#domain-verification)
4. [Sitemap Submission](#sitemap-submission)
5. [Google Analytics 4 Setup](#google-analytics-4-setup)
6. [Google Business Profile](#google-business-profile)
7. [Monitoring & Reporting](#monitoring--reporting)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- [ ] Access to the Amante website hosting (Vercel)
- [ ] Access to domain registrar (for DNS verification)
- [ ] Google account (use a business email if possible: admin@amante.in)
- [ ] Website deployed to production domain
- [ ] Sitemap.xml live and accessible at https://amante.in/sitemap.xml
- [ ] Robots.txt live and accessible at https://amante.in/robots.txt

---

## Google Search Console Setup

### Step 1: Create Search Console Property

1. **Visit Google Search Console**
   - Go to: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Property**
   - Click "Add Property" or "Start now"
   - Choose property type:
     - **Recommended:** Domain property (covers all subdomains and protocols)
     - Property name: `amante.in`

### Step 2: Choose Verification Method

Google offers multiple verification methods. We'll cover the most reliable ones:

#### Method 1: DNS Verification (Recommended for Domain Property)

**Advantages:** Covers all subdomains and protocols (http, https, www, non-www)

**Steps:**
1. Google will provide a TXT record
2. Log into your domain registrar (where you bought amante.in)
3. Find DNS settings/management
4. Add new TXT record:
   ```
   Type: TXT
   Host: @ (or leave blank)
   Value: google-site-verification=xxxxxxxxxxxxxxxxxxxx
   TTL: 3600 (or default)
   ```
5. Save changes
6. Return to Search Console and click "Verify"
7. **Note:** DNS propagation can take 24-72 hours, but usually completes in 1-2 hours

#### Method 2: HTML File Upload (Alternative for URL Prefix Property)

**Steps:**
1. Download the HTML verification file from Google
2. Upload to your website's public folder:
   ```
   /public/google-verification-file.html
   ```
3. Verify it's accessible:
   ```
   https://amante.in/google-verification-file.html
   ```
4. Return to Search Console and click "Verify"

#### Method 3: HTML Meta Tag (Easiest for Next.js)

**Steps:**
1. Google provides a meta tag like:
   ```html
   <meta name="google-site-verification" content="xxxxxxxxxxxx" />
   ```

2. Add to your Next.js root layout:

   **File:** `src/app/layout.tsx`

   ```tsx
   export const metadata: Metadata = {
     // ... existing metadata
     verification: {
       google: 'your-verification-code-here',
     },
   };
   ```

3. Deploy the changes
4. Return to Search Console and click "Verify"

### Step 3: Confirm Verification

Once verified, you'll see:
- ✅ "Ownership verified" message
- Access to Search Console dashboard
- Data starts collecting (may take 2-3 days for initial data)

---

## Domain Verification

### Setting Up Both Domain and URL Prefix Properties

**Best Practice:** Set up BOTH types

1. **Domain Property** (`amante.in`)
   - Covers all variations (www, https, http)
   - Best for overall site monitoring
   - Requires DNS verification

2. **URL Prefix Property** (`https://amante.in`)
   - More detailed data
   - Easier verification
   - Use for specific monitoring

---

## Sitemap Submission

### Step 1: Verify Sitemap Accessibility

Before submitting, confirm your sitemap works:

1. Open browser and visit:
   ```
   https://amante.in/sitemap.xml
   ```

2. You should see XML content listing all pages

3. Verify sitemap in browser or use tools:
   - [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### Step 2: Submit Sitemap to Google Search Console

1. **Navigate to Sitemaps**
   - In Search Console dashboard
   - Left sidebar → "Sitemaps"

2. **Add Sitemap**
   - Enter: `sitemap.xml`
   - Click "Submit"

3. **Verify Submission**
   - Status should show "Success"
   - "Discovered URLs" count will appear within 24-48 hours

### Step 3: Monitor Sitemap Status

Check regularly:
- **Status:** Should be "Success"
- **Discovered URLs:** Should match your page count (~17 pages + menu categories)
- **Indexed URLs:** Will grow over time as Google crawls

**Expected Timeline:**
- Day 1: Sitemap submitted
- Days 2-7: Google discovers pages
- Days 7-30: Pages begin appearing in index
- Weeks 4-12: Full indexing and ranking stabilization

---

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. **Visit Google Analytics**
   - Go to: https://analytics.google.com
   - Sign in with same Google account

2. **Create Property**
   - Click "Admin" (bottom left)
   - Click "Create Property"
   - Property name: `Amante Restaurant Bhopal`
   - Time zone: `India/Kolkata`
   - Currency: `INR`

3. **Set Up Data Stream**
   - Platform: Web
   - Website URL: `https://amante.in`
   - Stream name: `Amante Main Website`
   - Enhanced measurement: Enable all

4. **Get Measurement ID**
   - You'll receive a Measurement ID: `G-XXXXXXXXXX`
   - Save this for website integration

### Step 2: Integrate GA4 with Next.js

**Option 1: Using Next.js Script Component (Recommended)**

1. Install analytics package (if not already installed):
   ```bash
   npm install @next/third-parties
   ```

2. Add to root layout:

   **File:** `src/app/layout.tsx`

   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

**Option 2: Manual Script Tag**

Add to `layout.tsx` in the `<head>`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Step 3: Set Up Custom Events

Track important user actions:

**Reservation Submissions:**
```typescript
// In your reservation form success handler
gtag('event', 'reservation_submitted', {
  'event_category': 'engagement',
  'event_label': 'Table Reservation',
  'value': 1
});
```

**Event Enquiries:**
```typescript
gtag('event', 'event_enquiry', {
  'event_category': 'lead',
  'event_label': 'Private Event Enquiry',
  'value': 1
});
```

**Phone Number Clicks:**
```typescript
gtag('event', 'phone_click', {
  'event_category': 'contact',
  'event_label': 'Call Button Clicked',
});
```

### Step 4: Link Search Console to Analytics

1. In Google Analytics:
   - Admin → Property Settings
   - "Search Console links"
   - Click "Link"
   - Select your Search Console property
   - Click "Confirm"

2. Benefits:
   - See search queries in Analytics
   - Landing page performance
   - Combined data analysis

---

## Google Business Profile

Critical for local SEO in Bhopal.

### Step 1: Create Business Profile

1. **Visit Google Business**
   - Go to: https://www.google.com/business
   - Sign in with your Google account

2. **Add Business**
   - Business name: `Amante`
   - Category: `Restaurant`
   - Also add:
     - Fine dining restaurant
     - Lounge
     - Banquet hall
     - Event venue

3. **Add Location**
   - Enter exact address in Bhopal
   - Set map marker precisely
   - **Important:** Use exact same address across all platforms (NAP consistency)

4. **Add Contact Information**
   - Phone: +91 98937 79100
   - Website: https://amante.in
   - Service areas: Bhopal, Madhya Pradesh

### Step 2: Complete Business Information

**Business Hours:**
```
General:
Monday-Sunday: 11:00 AM - 12:00 AM

Café:
Monday-Sunday: 8:00 AM - 11:00 PM

Club:
Thursday-Saturday: 9:00 PM - 2:00 AM
```

**Services:**
- Dine-in
- Takeout (if applicable)
- Delivery (if applicable)
- Outdoor seating
- Reservations required
- Bar on-site
- Live music
- Private dining rooms
- Event catering

**Attributes:**
- Romantic atmosphere
- Upscale
- Rooftop seating
- Live entertainment
- Good for groups
- Good for special occasions

### Step 3: Add Photos

**Required Photos (minimum 10):**
1. Logo (square format)
2. Cover photo (landscape, 1080x608)
3. Interior shots (all 6 spaces)
4. Exterior/entrance
5. Food photography (signature dishes)
6. Rooftop views
7. Team members
8. Events/celebrations

**Photo Guidelines:**
- High resolution (minimum 720px)
- Well-lit, professional quality
- No filters or heavy editing
- Show actual venue and food

### Step 4: Verify Business

**Verification Methods:**
1. **Postcard verification** (most common)
   - Google mails verification code to business address
   - Arrives in 5-14 days
   - Enter code in Business Profile

2. **Phone verification** (if available)
   - Instant verification code via call or SMS

3. **Email verification** (rare)
   - For some business types

### Step 5: Post Regular Updates

**Post weekly updates:**
- Special events
- New menu items
- Happy hour offers
- Sunday brunch reminders
- Live music schedules
- Holiday hours

**Post Types:**
- What's new
- Events
- Offers
- Updates

---

## Monitoring & Reporting

### Daily Checks (First Month)

1. **Search Console:**
   - Check "Coverage" for indexing errors
   - Monitor "Performance" for impressions/clicks
   - Review "Enhancements" for structured data issues

2. **Analytics:**
   - Real-time visitors
   - Traffic sources
   - Top pages

### Weekly Reviews

1. **Search Performance:**
   - Top performing keywords
   - Average position changes
   - Click-through rate (CTR)
   - Pages needing optimization

2. **Business Profile:**
   - Views and clicks
   - Photo views
   - Direction requests
   - Phone calls

### Monthly Reports

**Create monthly SEO report tracking:**

1. **Organic Traffic:**
   - Total sessions
   - New vs. returning users
   - Bounce rate
   - Average session duration

2. **Keyword Rankings:**
   - Track target keywords:
     - "restaurant in bhopal"
     - "fine dining bhopal"
     - "rooftop restaurant bhopal"
     - "banquet hall bhopal"
     - "best restaurant bhopal"

3. **Conversions:**
   - Reservation form submissions
   - Event enquiry submissions
   - Phone number clicks
   - Direction requests

4. **Local Performance:**
   - Google Business Profile views
   - Map views
   - Search vs. Discovery
   - Customer actions (calls, directions, website visits)

### Tools for Monitoring

**Free Tools:**
- Google Search Console
- Google Analytics 4
- Google Business Profile
- PageSpeed Insights
- Mobile-Friendly Test

**Recommended Paid Tools:**
- SEMrush or Ahrefs (keyword tracking)
- Moz Local (local SEO monitoring)
- Screaming Frog (technical audits)

---

## Key Metrics to Track

### Search Console Metrics

1. **Coverage:**
   - Valid pages: Target 100%
   - Errors: Target 0
   - Warnings: Review and fix

2. **Performance:**
   - Total clicks: Track growth
   - Total impressions: Track visibility
   - Average CTR: Aim for 3-5%+
   - Average position: Aim for <10 for target keywords

3. **Core Web Vitals:**
   - LCP (Largest Contentful Paint): <2.5s
   - FID (First Input Delay): <100ms
   - CLS (Cumulative Layout Shift): <0.1

### Analytics Metrics

1. **Acquisition:**
   - Organic search %: Target 40%+
   - Direct traffic: Track brand awareness
   - Social: Track social media ROI

2. **Engagement:**
   - Average engagement time: Target 2+ minutes
   - Pages per session: Target 3+
   - Bounce rate: Target <50%

3. **Conversions:**
   - Form submissions
   - Phone clicks
   - Map clicks
   - Menu views

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Pages Not Indexed

**Symptoms:**
- Pages submitted but not appearing in Google

**Solutions:**
1. Check robots.txt isn't blocking
2. Verify sitemap includes the pages
3. Use "URL Inspection" tool in Search Console
4. Request manual indexing
5. Check for crawl errors
6. Ensure pages have unique, quality content

#### Issue: Structured Data Errors

**Symptoms:**
- Errors in "Enhancements" section

**Solutions:**
1. Use [Rich Results Test](https://search.google.com/test/rich-results)
2. Fix JSON-LD syntax errors
3. Ensure all required fields present
4. Re-deploy and request re-crawl

#### Issue: Low Click-Through Rate

**Symptoms:**
- High impressions, low clicks

**Solutions:**
1. Improve meta titles (add keywords, CTAs)
2. Enhance meta descriptions (compelling copy)
3. Add structured data for rich snippets
4. Optimize for featured snippets
5. Build authority through backlinks

#### Issue: Verification Failed

**Symptoms:**
- Unable to verify domain ownership

**Solutions:**
1. **DNS method:** Wait 24-48 hours for propagation
2. **HTML file:** Ensure file is in public root
3. **Meta tag:** Verify tag is in <head>
4. Check for typos in verification codes
5. Try alternative verification method

---

## Next Steps After Setup

### Week 1-2: Initial Optimization
- [ ] Submit all pages for indexing
- [ ] Monitor for crawl errors
- [ ] Set up Analytics goals
- [ ] Add business photos to GMB

### Month 1: Content & Keywords
- [ ] Review search query data
- [ ] Optimize underperforming pages
- [ ] Create blog content (if applicable)
- [ ] Build local citations

### Month 2-3: Growth
- [ ] Start link building campaign
- [ ] Encourage customer reviews
- [ ] Create Google Posts regularly
- [ ] Optimize for voice search

### Ongoing: Maintenance
- [ ] Weekly performance reviews
- [ ] Monthly SEO reports
- [ ] Quarterly strategy adjustments
- [ ] Continuous content optimization

---

## Important URLs

**Google Search Console:**
https://search.google.com/search-console

**Google Analytics:**
https://analytics.google.com

**Google Business Profile:**
https://business.google.com

**Rich Results Test:**
https://search.google.com/test/rich-results

**PageSpeed Insights:**
https://pagespeed.web.dev

**Mobile-Friendly Test:**
https://search.google.com/test/mobile-friendly

---

## Support Resources

**Google Documentation:**
- [Search Console Help](https://support.google.com/webmasters)
- [Analytics Help](https://support.google.com/analytics)
- [Business Profile Help](https://support.google.com/business)

**SEO Communities:**
- [Google Search Central Community](https://support.google.com/webmasters/community)
- [/r/SEO on Reddit](https://reddit.com/r/seo)
- [/r/BigSEO on Reddit](https://reddit.com/r/bigseo)

---

**Document Version:** 1.0
**Last Updated:** October 25, 2025
**Maintained By:** SEO Specialist
**Next Review:** After first month of implementation
