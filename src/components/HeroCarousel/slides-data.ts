export interface HeroSlide {
  id: string;
  category: 'brand' | 'party' | 'cafe' | 'restaurant' | 'events' | 'corporate' | 'lounge';
  backgroundImage: string;
  backgroundVideo?: string;
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
  theme: {
    textColor: string;
    accentColor: string;
    overlayGradient: string;
  };
}

export const heroSlides: HeroSlide[] = [
  // Slide 1: Main Brand Introduction
  {
    id: 'brand-intro',
    category: 'brand',
    backgroundImage: '/hero1.jpeg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-black/60 via-black/40 to-black/60'
    }
  },

  // Slide 2: Party & Nightlife
  {
    id: 'party-nightlife',
    category: 'party',
    backgroundImage: '/hero2.jpg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-purple-900/60 via-black/40 to-black/60'
    }
  },

  // Slide 3: Café & Bakery
  {
    id: 'cafe-bakery',
    category: 'cafe',
    backgroundImage: '/hero1.jpeg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-amber-900/50 via-black/40 to-black/60'
    }
  },

  // Slide 4: Fine Dining Restaurant
  {
    id: 'fine-dining',
    category: 'restaurant',
    backgroundImage: '/hero2.jpg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-black/70 via-black/50 to-black/60'
    }
  },

  // Slide 5: Private Events & Celebrations
  {
    id: 'private-events',
    category: 'events',
    backgroundImage: '/hero1.jpeg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-rose-900/50 via-black/40 to-black/60'
    }
  },

  // Slide 6: Corporate & Private Events
  {
    id: 'corporate-events',
    category: 'corporate',
    backgroundImage: '/hero2.jpg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-slate-900/60 via-black/40 to-black/60'
    }
  },

  // Slide 7: Lounge Experience (Optional)
  {
    id: 'lounge-experience',
    category: 'lounge',
    backgroundImage: '/hero1.jpeg',
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
    },
    theme: {
      textColor: '#FFFFFF',
      accentColor: '#F8BBD9',
      overlayGradient: 'from-indigo-900/50 via-black/40 to-black/60'
    }
  }
];
