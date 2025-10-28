/**
 * SEO Utility Library for Amante Restaurant
 * Provides metadata generation and SEO helper functions
 */

import { Metadata } from 'next';

// Business Information Constants
export const BUSINESS_INFO = {
  name: 'Amante',
  legalName: 'Amante Restaurant & Banquets',
  description: "Bhopal's premier multi-venue dining destination featuring 6 unique spaces under one roof",
  tagline: 'Six Unique Spaces. One Unforgettable Destination.',
  phone: '+919893779100',
  email: 'hello@amante.in',
  address: {
    street: '[Address Line]', // TODO: Add actual address
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    postalCode: '[PIN]', // TODO: Add PIN code
    country: 'IN',
  },
  location: {
    latitude: 23.2599, // Bhopal coordinates (approximate)
    longitude: 77.4126,
  },
  hours: {
    general: '11:00 AM - 12:00 AM',
    cafe: '8:00 AM - 11:00 PM',
    club: 'Thu-Sat: 9:00 PM - 2:00 AM',
  },
  social: {
    instagram: '@amantebhopal',
    facebook: '/amantebhopal',
    twitter: '@amantebhopal',
  },
  priceRange: '₹₹₹',
  cuisines: ['Indian', 'Asian', 'Continental', 'Multi-Cuisine'],
  amenities: [
    'Rooftop Dining',
    'Bar & Lounge',
    'Private Dining',
    'Banquet Halls',
    'Live Music',
    'Craft Cocktails',
    'Free Wi-Fi',
    'Valet Parking',
    'Outdoor Seating',
  ],
};

// Site Configuration
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://amante.in',
  siteName: 'Amante',
  locale: 'en_IN',
  defaultOgImage: '/images/og-image.jpg',
  twitterHandle: '@amantebhopal',
};

// Primary Keywords for Bhopal
export const PRIMARY_KEYWORDS = [
  'restaurant in bhopal',
  'fine dining bhopal',
  'rooftop restaurant bhopal',
  'best restaurant bhopal',
  'banquet hall bhopal',
  'bar bhopal',
  'cafe bhopal',
  'lounge bhopal',
  'private dining bhopal',
  'wedding venue bhopal',
];

/**
 * Generate metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  noindex = false,
  alternates: _alternates,
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  alternates?: { canonical?: string };
}): Metadata {
  const fullTitle = `${title} | ${BUSINESS_INFO.name}`;
  const url = canonical || SITE_CONFIG.url;
  const image = ogImage || SITE_CONFIG.defaultOgImage;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,

    // OpenGraph
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: 'website',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },

    // Canonical URL
    alternates: {
      canonical: canonical || url,
    },

    // Robots
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // Verification (add later when setting up Google Search Console)
    // verification: {
    //   google: 'google-site-verification-code',
    // },
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    description: BUSINESS_INFO.description,
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
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`,
      `https://facebook.com${BUSINESS_INFO.social.facebook}`,
      `https://twitter.com/${BUSINESS_INFO.social.twitter.replace('@', '')}`,
    ],
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
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
}

/**
 * Format phone number for tel: link
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/\s+/g, '');
}

/**
 * Generate structured data script tag
 */
export function generateStructuredDataScript(data: object): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Common meta keywords for all pages
 */
export function getCommonKeywords(): string[] {
  return [
    'amante bhopal',
    'amante restaurant',
    'restaurant bhopal',
    'bhopal dining',
    'bhopal restaurants',
  ];
}

/**
 * Generate local business schema (for homepage)
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': `${SITE_CONFIG.url}#restaurant`,
    name: BUSINESS_INFO.name,
    image: `${SITE_CONFIG.url}/images/logo.png`,
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
    acceptsReservations: true,
    hasMenu: `${SITE_CONFIG.url}/menu`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '23:00',
      },
    ],
    amenityFeature: BUSINESS_INFO.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
  };
}
