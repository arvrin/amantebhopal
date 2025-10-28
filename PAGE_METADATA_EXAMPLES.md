# Page Metadata Examples for Amante Restaurant

This document provides copy-paste ready metadata configurations for all pages in the Amante website.

## Table of Contents
1. [Homepage](#homepage)
2. [Space Pages](#space-pages)
3. [Menu Pages](#menu-pages)
4. [Events Page](#events-page)
5. [About Page](#about-page)
6. [Contact Page](#contact-page)
7. [Reservation Page](#reservation-page)
8. [Private Events Page](#private-events-page)
9. [Banquets Page](#banquets-page)
10. [Gallery Page](#gallery-page)
11. [Feedback Page](#feedback-page)
12. [Careers Page](#careers-page)

---

## Homepage

**File:** `src/app/page.tsx`

The layout.tsx already has excellent root metadata. For the homepage, add structured data:

```tsx
import { RestaurantSchema, LocalBusinessSchema, WebSiteSchema, OrganizationSchema } from '@/components/seo/StructuredData';

export default function Home() {
  return (
    <>
      <RestaurantSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <OrganizationSchema />

      {/* Your page content */}
      <CleanComingSoon />
    </>
  );
}
```

---

## Space Pages

### Cafe & Bakery

**File:** `src/app/cafe/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Artisan Café & Bakery Bhopal | Fresh Pastries & Specialty Coffee | Amante",
  description: "Start your day at Bhopal's favorite artisan café. Fresh-baked pastries, specialty coffee, hearty breakfast bowls, and gourmet sandwiches in a warm, welcoming atmosphere. Perfect for morning meetings or afternoon treats. Open daily from 8 AM.",
  keywords: [
    'cafe bhopal',
    'bakery bhopal',
    'artisan cafe',
    'specialty coffee bhopal',
    'fresh pastries bhopal',
    'breakfast bhopal',
    'coffee shop bhopal',
    'best cafe bhopal',
    'amante cafe'
  ],
  openGraph: {
    title: "Amante Café & Bakery - Bhopal's Best Artisan Café",
    description: "Fresh-baked pastries, specialty coffee, and all-day breakfast in Bhopal's warmest café setting.",
    url: 'https://amante.in/cafe',
    images: [{
      url: '/images/spaces/cafe/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Café & Bakery Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Café & Bakery - Fresh Pastries & Specialty Coffee",
    description: "Start your day right at Bhopal's favorite artisan café",
    images: ['/images/spaces/cafe/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/cafe',
  },
};

export default function CafePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Café & Bakery', url: '/cafe' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

### Rooftop Restaurant

**File:** `src/app/restaurant/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Rooftop Restaurant Bhopal | Fine Dining with City Views | Amante",
  description: "Dine beneath the stars with panoramic Bhopal skyline views. Our rooftop restaurant offers elevated contemporary cuisine, signature cocktails, live music, and unforgettable ambiance. Perfect for romantic dinners and special celebrations. Reserve your table now.",
  keywords: [
    'rooftop restaurant bhopal',
    'fine dining bhopal',
    'romantic restaurant bhopal',
    'best rooftop restaurant bhopal',
    'skyline dining bhopal',
    'rooftop bar bhopal',
    'live music restaurant',
    'amante rooftop',
    'terrace dining bhopal'
  ],
  openGraph: {
    title: "Amante Rooftop Restaurant - Elevated Dining with Bhopal Views",
    description: "Experience fine dining under the stars with panoramic city views, live music, and exceptional cuisine.",
    url: 'https://amante.in/restaurant',
    images: [{
      url: '/images/spaces/restaurant/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Rooftop Restaurant Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Rooftop Restaurant - Fine Dining with City Views",
    description: "Elevated dining, literally and figuratively. Reserve your rooftop table today.",
    images: ['/images/spaces/restaurant/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/restaurant',
  },
};

export default function RestaurantPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Rooftop Restaurant', url: '/restaurant' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

### Intimate Lounge

**File:** `src/app/lounge/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Premium Lounge Bar Bhopal | Craft Cocktails & Live Music | Amante",
  description: "Unwind at Bhopal's most sophisticated lounge. Expert mixologists, premium spirits, elevated small plates, and live acoustic music create the perfect setting for conversation and connection. Happy Hour daily 5-8 PM. Reserve your spot today.",
  keywords: [
    'lounge bhopal',
    'bar bhopal',
    'cocktail bar bhopal',
    'best lounge bhopal',
    'happy hour bhopal',
    'live music lounge',
    'premium bar bhopal',
    'craft cocktails bhopal',
    'amante lounge'
  ],
  openGraph: {
    title: "Amante Lounge - Bhopal's Sophisticated Cocktail Bar",
    description: "Craft cocktails, premium spirits, and live music in Bhopal's most refined lounge setting.",
    url: 'https://amante.in/lounge',
    images: [{
      url: '/images/spaces/lounge/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Intimate Lounge Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Lounge - Where Conversations Flow",
    description: "Craft cocktails and live music in Bhopal's most sophisticated setting.",
    images: ['/images/spaces/lounge/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/lounge',
  },
};

export default function LoungePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Intimate Lounge', url: '/lounge' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

### Premier Club

**File:** `src/app/club/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Best Nightclub Bhopal | DJ Nights & VIP Service | Amante Club",
  description: "Experience Bhopal's most vibrant nightlife. World-class DJs, cutting-edge sound systems, VIP service, and electric atmosphere make our club the destination for unforgettable nights. Open Thursday-Saturday. Reserve your VIP table for premium service.",
  keywords: [
    'nightclub bhopal',
    'club bhopal',
    'best nightclub bhopal',
    'dj nights bhopal',
    'vip club bhopal',
    'weekend nightlife bhopal',
    'party venue bhopal',
    'dance club bhopal',
    'amante club'
  ],
  openGraph: {
    title: "Amante Club - Bhopal's Premier Nightlife Destination",
    description: "World-class DJs, VIP service, and electric energy. Where Bhopal comes alive after dark.",
    url: 'https://amante.in/club',
    images: [{
      url: '/images/spaces/club/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Premier Club Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Club - Where Bhopal Comes Alive After Dark",
    description: "Experience the city's most vibrant nightlife every weekend.",
    images: ['/images/spaces/club/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/club',
  },
};

export default function ClubPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Premier Club', url: '/club' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

### Private Dining

**File:** `src/app/private-dining/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Private Dining Room Bhopal | Exclusive Event Spaces | Amante",
  description: "Host intimate celebrations in exclusive private dining spaces accommodating 10-50 guests. Customizable menus, dedicated service, complete privacy, and Amante's culinary excellence combine for flawless events. Perfect for milestone celebrations and business dinners. Request proposal.",
  keywords: [
    'private dining bhopal',
    'private party venue bhopal',
    'intimate dining bhopal',
    'corporate dining bhopal',
    'private room restaurant bhopal',
    'exclusive dining bhopal',
    'business dinner venue',
    'private event space bhopal'
  ],
  openGraph: {
    title: "Amante Private Dining - Exclusive Spaces for Special Moments",
    description: "Intimate dining rooms with customized menus and dedicated service for 10-50 guests.",
    url: 'https://amante.in/private-dining',
    images: [{
      url: '/images/spaces/private-dining/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Private Dining Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Private Dining - Exclusive Events",
    description: "Intimate spaces for your most important moments.",
    images: ['/images/spaces/private-dining/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/private-dining',
  },
};

export default function PrivateDiningPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Private Dining', url: '/private-dining' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

### Grand Banquets

**File:** `src/app/banquets/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Banquet Hall Bhopal | Wedding Venue & Event Space | Amante",
  description: "Transform grand celebrations into unforgettable experiences. Our elegant banquet halls accommodate up to 500 guests with comprehensive services for weddings, corporate galas, and large events. Expert coordination, exceptional catering, stunning venues. Schedule your venue tour.",
  keywords: [
    'banquet hall bhopal',
    'wedding venue bhopal',
    'marriage hall bhopal',
    'banquet bhopal',
    'corporate event venue bhopal',
    'wedding reception bhopal',
    'party hall bhopal',
    'event space bhopal',
    'conference venue bhopal',
    'best banquet hall bhopal'
  ],
  openGraph: {
    title: "Amante Banquet Halls - Premium Wedding & Event Venue Bhopal",
    description: "Elegant banquet halls for up to 500 guests. Perfect for weddings, galas, and grand celebrations.",
    url: 'https://amante.in/banquets',
    images: [{
      url: '/images/spaces/banquets/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Amante Grand Banquets Bhopal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amante Banquets - Grand Celebrations Deserve Grand Venues",
    description: "Bhopal's premier banquet facilities for weddings and events up to 500 guests.",
    images: ['/images/spaces/banquets/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amante.in/banquets',
  },
};

export default function BanquetsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Our Spaces', url: '/#spaces' },
        { name: 'Grand Banquets', url: '/banquets' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Menu Pages

**File:** `src/app/menu/page.tsx`

```tsx
import { Metadata } from 'next';
import { MenuSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Menu | Multi-Cuisine Restaurant Bhopal | Amante",
  description: "Explore Amante's diverse menus featuring contemporary global cuisine, artisan baked goods, craft cocktails, and regional favorites. From breakfast to late-night, our chefs create exceptional dishes using quality ingredients. View menus and make reservations online.",
  keywords: [
    'restaurant menu bhopal',
    'food menu bhopal',
    'amante menu',
    'multi cuisine menu',
    'restaurant food bhopal',
    'dining menu bhopal',
    'cocktail menu bhopal'
  ],
  openGraph: {
    title: "Amante Menu - Multi-Cuisine Dining in Bhopal",
    description: "Explore our diverse menu featuring global cuisine, craft cocktails, and artisan specialties.",
    url: 'https://amante.in/menu',
    images: [{
      url: '/images/menu/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/menu',
  },
};

export default function MenuPage() {
  return (
    <>
      <MenuSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Menu', url: '/menu' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Events Page

**File:** `src/app/events/page.tsx`

```tsx
import { Metadata } from 'next';
import { EventSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Events & Live Music Bhopal | Sunday Brunch & Ladies Night | Amante",
  description: "Join us for live music nights, Sunday brunch, happy hour, ladies night, and special celebrations throughout the year. Discover Bhopal's most exciting dining events calendar plus private event hosting options. View schedule and make reservations.",
  keywords: [
    'events bhopal',
    'live music bhopal',
    'sunday brunch bhopal',
    'ladies night bhopal',
    'happy hour bhopal',
    'restaurant events',
    'weekend events bhopal',
    'amante events'
  ],
  openGraph: {
    title: "Amante Events - Live Music, Brunch & Special Celebrations",
    description: "Experience Bhopal's best dining events calendar. Live music, Sunday brunch, happy hours, and more.",
    url: 'https://amante.in/events',
    images: [{
      url: '/images/events/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/events',
  },
};

export default function EventsPage() {
  return (
    <>
      <EventSchema
        name="Sunday Brunch at Amante"
        description="Bhopal's most indulgent Sunday brunch with unlimited buffet and panoramic city views"
        startDate="2025-11-02T11:00:00+05:30"
        endDate="2025-11-02T16:00:00+05:30"
        isRecurring={true}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Events', url: '/events' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## About Page

**File:** `src/app/about/page.tsx`

```tsx
import { Metadata } from 'next';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "About Amante | Our Story & Values | Bhopal's Premier Restaurant",
  description: "Discover the story behind Bhopal's premier dining destination. Learn about Amante's vision, values, expert team, and commitment to excellence across 6 unique spaces. From our beginning to our future, hospitality drives everything we do.",
  keywords: [
    'about amante',
    'amante story',
    'restaurant bhopal',
    'amante team',
    'best restaurant bhopal',
    'dining destination bhopal'
  ],
  openGraph: {
    title: "About Amante - Bhopal's Premier Dining Destination",
    description: "Our story, values, and commitment to creating unforgettable dining experiences.",
    url: 'https://amante.in/about',
    images: [{
      url: '/images/about/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Contact Page

**File:** `src/app/contact/page.tsx`

```tsx
import { Metadata } from 'next';
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Contact Amante Bhopal | Location, Hours & Reservations",
  description: "Get in touch with Amante. Find our location in central Bhopal, contact our team for reservations and inquiries, or reach our events specialists for celebration planning. Open daily 11 AM-12 AM. Café opens at 8 AM.",
  keywords: [
    'contact amante',
    'amante location',
    'amante phone number',
    'restaurant address bhopal',
    'amante hours',
    'amante reservations',
    'contact restaurant bhopal'
  ],
  openGraph: {
    title: "Contact Amante - Visit Us in Bhopal",
    description: "Find us, call us, or visit us. We're here to help create your perfect dining experience.",
    url: 'https://amante.in/contact',
    images: [{
      url: '/images/contact/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Reservation Page

**File:** `src/app/reservations/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Reserve Your Table | Book Online | Amante Bhopal",
  description: "Reserve your table at Amante online. Select your preferred dining space, date, and time for instant confirmation. From café breakfast to rooftop dinner, secure your spot at Bhopal's most sought-after destination. Book now.",
  keywords: [
    'book table bhopal',
    'reserve table amante',
    'restaurant reservation bhopal',
    'online booking restaurant',
    'table booking bhopal',
    'amante reservation'
  ],
  openGraph: {
    title: "Reserve Your Table at Amante Bhopal",
    description: "Book your table online for instant confirmation at Bhopal's premier dining destination.",
    url: 'https://amante.in/reservations',
    images: [{
      url: '/images/reservations/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/reservations',
  },
};

export default function ReservationsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Reservations', url: '/reservations' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Private Events Page

**File:** `src/app/private-events/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Private Events Bhopal | Corporate & Social Gatherings | Amante",
  description: "Plan unforgettable private events at Amante. From intimate 10-person dinners to celebrations hosting 200 guests, our dedicated events team creates customized experiences with exceptional catering, personalized service, and complete coordination. Request your proposal today.",
  keywords: [
    'private events bhopal',
    'corporate events bhopal',
    'party venue bhopal',
    'event planning bhopal',
    'birthday party venue',
    'anniversary celebration',
    'business events bhopal'
  ],
  openGraph: {
    title: "Amante Private Events - Create Unforgettable Celebrations",
    description: "Customized event planning with exceptional service for 10-200 guests.",
    url: 'https://amante.in/private-events',
    images: [{
      url: '/images/private-events/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/private-events',
  },
};

export default function PrivateEventsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Private Events', url: '/private-events' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Gallery Page

**File:** `src/app/gallery/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Photo Gallery | Amante Bhopal Interior & Food Images",
  description: "Explore Amante's stunning spaces, exceptional cuisine, and memorable moments through our photo gallery. See our rooftop views, elegant interiors, signature dishes, and happy celebrations.",
  keywords: [
    'amante photos',
    'restaurant interior bhopal',
    'food photography',
    'amante gallery',
    'rooftop restaurant photos',
    'bhopal restaurant images'
  ],
  openGraph: {
    title: "Amante Gallery - See Our Spaces & Cuisine",
    description: "Explore stunning photos of our six unique spaces and exceptional cuisine.",
    url: 'https://amante.in/gallery',
    images: [{
      url: '/images/gallery/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Gallery', url: '/gallery' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Feedback Page

**File:** `src/app/feedback/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Share Your Feedback | Customer Reviews | Amante Bhopal",
  description: "Share your Amante experience. Your feedback helps us continually improve our food, service, and hospitality. Submit praise, concerns, or suggestions—our management team reviews every submission personally and responds to concerns promptly.",
  keywords: [
    'amante reviews',
    'restaurant feedback',
    'customer reviews bhopal',
    'amante testimonials'
  ],
  openGraph: {
    title: "Share Your Amante Experience",
    description: "Your feedback helps us serve you better. Share your experience with us.",
    url: 'https://amante.in/feedback',
  },
  alternates: {
    canonical: 'https://amante.in/feedback',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function FeedbackPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Feedback', url: '/feedback' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Careers Page

**File:** `src/app/careers/page.tsx`

```tsx
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Careers at Amante Bhopal | Hospitality Jobs & Opportunities",
  description: "Join Bhopal's premier hospitality team. Explore career opportunities at Amante across culinary, service, management, and operations. We invest in our team through training, advancement opportunities, and supportive culture. View openings and apply online.",
  keywords: [
    'restaurant jobs bhopal',
    'hospitality careers bhopal',
    'chef jobs bhopal',
    'waiter jobs bhopal',
    'amante careers',
    'restaurant employment',
    'hiring bhopal'
  ],
  openGraph: {
    title: "Join the Amante Team - Careers in Hospitality",
    description: "Build your hospitality career with Bhopal's premier dining destination.",
    url: 'https://amante.in/careers',
    images: [{
      url: '/images/careers/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://amante.in/careers',
  },
};

export default function CareersPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Careers', url: '/careers' },
      ]} />

      {/* Page content */}
    </>
  );
}
```

---

## Implementation Checklist

- [ ] Copy metadata from this file to each respective page
- [ ] Replace placeholder image paths with actual images
- [ ] Update BUSINESS_INFO in src/lib/seo.ts with actual address and details
- [ ] Generate and upload OG images (1200x630) for each section
- [ ] Test all metadata using:
  - [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify sitemap at /sitemap.xml
- [ ] Verify robots.txt at /robots.txt
- [ ] Add structured data to all pages as shown
- [ ] Test all canonical URLs

---

## Image Requirements for OG Tags

Each page should have optimized social sharing images:

**Dimensions:** 1200 x 630 pixels
**Format:** JPG (optimized) or PNG
**Size:** Under 1MB

**Required Images:**
- `/public/og-image.jpg` - Homepage
- `/public/images/spaces/cafe/og-image.jpg` - Cafe page
- `/public/images/spaces/restaurant/og-image.jpg` - Restaurant page
- `/public/images/spaces/lounge/og-image.jpg` - Lounge page
- `/public/images/spaces/club/og-image.jpg` - Club page
- `/public/images/spaces/private-dining/og-image.jpg` - Private Dining
- `/public/images/spaces/banquets/og-image.jpg` - Banquets
- `/public/images/menu/og-image.jpg` - Menu page
- `/public/images/events/og-image.jpg` - Events page
- And similar for other pages

---

**Last Updated:** October 25, 2025
**Maintained By:** SEO Specialist
