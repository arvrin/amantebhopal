/**
 * Structured Data Components for Amante Restaurant
 * Implements Schema.org JSON-LD markup for better search engine understanding
 */

import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/seo';

/**
 * Restaurant Schema Component
 * Use on homepage and restaurant-related pages
 */
export function RestaurantSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_CONFIG.url}#restaurant`,
    name: BUSINESS_INFO.name,
    image: [
      `${SITE_CONFIG.url}/images/restaurant-exterior.jpg`,
      `${SITE_CONFIG.url}/images/rooftop-dining.jpg`,
      `${SITE_CONFIG.url}/images/interior-dining.jpg`,
    ],
    description: BUSINESS_INFO.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.location.latitude,
      longitude: BUSINESS_INFO.location.longitude,
    },
    url: SITE_CONFIG.url,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    servesCuisine: BUSINESS_INFO.cuisines,
    acceptsReservations: 'True',
    hasMenu: `${SITE_CONFIG.url}/menu`,
    menu: `${SITE_CONFIG.url}/menu`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '23:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`,
      `https://facebook.com${BUSINESS_INFO.social.facebook}`,
      `https://twitter.com/${BUSINESS_INFO.social.twitter.replace('@', '')}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Local Business Schema Component
 * Use on homepage and contact page
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness', 'FoodEstablishment'],
    '@id': `${SITE_CONFIG.url}#localbusiness`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: BUSINESS_INFO.description,
    image: `${SITE_CONFIG.url}/images/logo.png`,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    url: SITE_CONFIG.url,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.location.latitude,
      longitude: BUSINESS_INFO.location.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.location.latitude},${BUSINESS_INFO.location.longitude}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '23:00',
      },
    ],
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    currenciesAccepted: 'INR',
    amenityFeature: BUSINESS_INFO.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`,
      `https://facebook.com${BUSINESS_INFO.social.facebook}`,
      `https://twitter.com/${BUSINESS_INFO.social.twitter.replace('@', '')}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Menu Schema Component
 * Use on menu pages
 */
export function MenuSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Amante Restaurant Menu',
    description: 'Multi-cuisine menu featuring Indian, Asian, and Continental dishes',
    inLanguage: 'en-IN',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Cafe & Bakery',
        description: 'Fresh-baked pastries, specialty coffee, and artisan breads',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Specialty Coffee',
            description: 'Single-origin beans prepared by certified baristas',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: '150',
            },
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Rooftop Restaurant',
        description: 'Contemporary global cuisine with regional influences',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Signature Dishes',
            description: 'Chef-curated specialties featuring seasonal ingredients',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: '800',
            },
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Lounge',
        description: 'Craft cocktails and elevated small plates',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Craft Cocktails',
            description: 'Signature cocktails by expert mixologists',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: '500',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Event Schema Component
 * Use for specific events (live music, Sunday brunch, etc.)
 */
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  eventType = 'FoodEvent',
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventType?: string;
  isRecurring?: boolean;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': eventType,
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    location: {
      '@type': 'Restaurant',
      name: BUSINESS_INFO.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.postalCode,
        addressCountry: BUSINESS_INFO.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: SITE_CONFIG.url,
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.url}/reservations`,
      validFrom: new Date().toISOString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb Schema Component
 * Use on all pages except homepage
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization Schema Component
 * Use on homepage and about page
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.name,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/images/logo.png`,
      width: '600',
      height: '600',
    },
    description: BUSINESS_INFO.description,
    slogan: BUSINESS_INFO.tagline,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.phone,
        contactType: 'reservations',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`,
      `https://facebook.com${BUSINESS_INFO.social.facebook}`,
      `https://twitter.com/${BUSINESS_INFO.social.twitter.replace('@', '')}`,
    ],
    founder: {
      '@type': 'Person',
      name: 'Amante Founders',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Schema Component
 * Use on pages with frequently asked questions
 */
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Website Schema Component
 * Use on homepage
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}#website`,
    url: SITE_CONFIG.url,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
