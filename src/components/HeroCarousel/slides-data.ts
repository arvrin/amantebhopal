export interface HeroSlide {
  id: string;
  category: 'brand' | 'party' | 'cafe' | 'restaurant' | 'events' | 'corporate' | 'lounge';
  headline: string;
  headlineHighlight?: string; // Word(s) to highlight in pink
  subheadline: string;
  body: string;
  primaryCTA: {
    text: string;
    link: string;
    action?: 'modal' | 'link';
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
}

export const heroSlides: HeroSlide[] = [
  // Slide 1: Main Brand Introduction
  {
    id: 'brand-intro',
    category: 'brand',
    headline: 'Where Love Meets Flavor',
    headlineHighlight: 'Meets',
    subheadline: "Bhopal's First Multi-Concept Destination",
    body: 'Six Unique Spaces. Infinite Possibilities.',
    primaryCTA: {
      text: 'Reserve Your Table',
      link: '/reservations',
      action: 'modal'
    },
    secondaryCTA: {
      text: 'Explore Menu',
      link: '/menu'
    }
  },

  // Slide 2: Party & Nightlife
  {
    id: 'party-nightlife',
    category: 'party',
    headline: 'Party Like Never Before',
    headlineHighlight: 'Never',
    subheadline: "Bhopal's Hottest Nightclub & Premium Bar",
    body: 'Live DJ, Craft Cocktails & Electric Vibes Every Night',
    primaryCTA: {
      text: 'Book VIP Table',
      link: '/club',
      action: 'link'
    },
    secondaryCTA: {
      text: 'View Bar Menu',
      link: '/menu'
    }
  },

  // Slide 3: Café & Bakery
  {
    id: 'cafe-bakery',
    category: 'cafe',
    headline: 'Sip. Savor. Smile.',
    headlineHighlight: 'Savor',
    subheadline: 'Artisan Coffee & Freshly Baked Delights',
    body: 'From sunrise lattes to sunset desserts',
    primaryCTA: {
      text: 'Explore Café Menu',
      link: '/cafe',
      action: 'link'
    },
    secondaryCTA: {
      text: 'Order Online',
      link: '/menu'
    }
  },

  // Slide 4: Fine Dining Restaurant
  {
    id: 'fine-dining',
    category: 'restaurant',
    headline: 'Culinary Artistry Elevated',
    headlineHighlight: 'Elevated',
    subheadline: 'Rooftop Fine Dining Under the Stars',
    body: 'Where Every Dish Tells a Love Story',
    primaryCTA: {
      text: 'Reserve Rooftop Table',
      link: '/restaurant',
      action: 'link'
    },
    secondaryCTA: {
      text: 'View Restaurant Menu',
      link: '/menu'
    }
  },

  // Slide 5: Private Events & Celebrations
  {
    id: 'private-events',
    category: 'events',
    headline: "Celebrate Life's Special Moments",
    headlineHighlight: 'Special',
    subheadline: 'Private Dining & Personalized Experiences',
    body: 'Birthdays, Anniversaries & Intimate Celebrations',
    primaryCTA: {
      text: 'Plan Your Event',
      link: '/private-events',
      action: 'link'
    },
    secondaryCTA: {
      text: 'View Private Spaces',
      link: '/private-dining'
    }
  },

  // Slide 6: Corporate Events
  {
    id: 'corporate-events',
    category: 'corporate',
    headline: 'Where Business Meets Pleasure',
    headlineHighlight: 'Meets',
    subheadline: 'Premium Corporate Events & Private Dining Facilities',
    body: 'Conferences, Team Dinners & Corporate Celebrations',
    primaryCTA: {
      text: 'Book Corporate Event',
      link: '/private-events',
      action: 'link'
    },
    secondaryCTA: {
      text: 'Download Brochure',
      link: '/contact'
    }
  },

  // Slide 7: Lounge Experience
  {
    id: 'lounge-experience',
    category: 'lounge',
    headline: 'Unwind in Style',
    headlineHighlight: 'Style',
    subheadline: 'Premium Lounge & Signature Cocktails',
    body: 'The Perfect Escape After a Long Day',
    primaryCTA: {
      text: 'Reserve Lounge Seating',
      link: '/lounge',
      action: 'link'
    },
    secondaryCTA: {
      text: 'View Cocktail Menu',
      link: '/menu'
    }
  }
];
