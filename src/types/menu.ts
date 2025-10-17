// Menu Type Definitions for Amante

export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'gluten-free' | 'jain' | 'contains-egg';

export type SpiceLevel = 1 | 2 | 3 | 4 | 5;

export type VenueType = 'food' | 'bar' | 'cafe';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary?: DietaryType[];
  spiceLevel?: SpiceLevel;
  allergens?: string[];
  image?: string;
  isRecommended?: boolean;
  isAvailable?: boolean;
  isNew?: boolean;
  isChefSpecial?: boolean;
  servingSize?: string;
  preparationTime?: string;
  pairingNotes?: string; // For bar items - what it pairs well with
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  items: MenuItem[];
  displayOrder?: number;
}

export interface Menu {
  venue: VenueType;
  name: string;
  description: string;
  tagline?: string;
  categories: MenuCategory[];
  lastUpdated: string;
}

export interface MenuFilters {
  searchQuery: string;
  dietary: DietaryType[];
  category: string | null;
  priceRange: {
    min: number;
    max: number;
  } | null;
  spiceLevel: SpiceLevel | null;
  showRecommended: boolean;
  showAvailable: boolean;
}
