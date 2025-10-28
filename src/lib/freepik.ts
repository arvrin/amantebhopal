/**
 * FreePik API Integration
 * Fetches high-quality images from FreePik API
 */

const FREEPIK_API_KEY = process.env.NEXT_PUBLIC_FREEPIK_API_KEY || 'FPSX4843d7aa866d5c01d00ebf2360fd1488';
const FREEPIK_API_BASE = 'https://api.freepik.com/v1';

interface FreePikImage {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  thumbnail: string;
  orientation: 'horizontal' | 'vertical' | 'square';
  size: string;
}

interface FreePikSearchParams {
  term: string;
  limit?: number;
  orientation?: 'horizontal' | 'vertical' | 'square' | 'panoramic';
  contentType?: 'photo' | 'vector' | 'psd';
  order?: 'latest' | 'popular' | 'relevant';
}

/**
 * Search for images on FreePik
 */
export async function searchFreePikImages(params: FreePikSearchParams): Promise<FreePikImage[]> {
  const {
    term,
    limit = 10,
    orientation = 'horizontal',
    contentType = 'photo',
    order = 'popular'
  } = params;

  const searchParams = new URLSearchParams({
    locale: 'en-US',
    term: term,
    limit: limit.toString(),
    orientation: orientation,
    content_type: contentType,
    order: order,
  });

  try {
    const response = await fetch(`${FREEPIK_API_BASE}/resources?${searchParams}`, {
      headers: {
        'x-freepik-api-key': FREEPIK_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`FreePik API error: ${response.status}`);
    }

    const data = await response.json();

    return data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      imageUrl: item.image.source.url,
      thumbnail: item.image.source.url,
      orientation: item.image.orientation,
      size: item.image.source.size,
    }));
  } catch (error) {
    console.error('Error fetching FreePik images:', error);
    return [];
  }
}

/**
 * Optimized search queries for each space type
 * These are crafted to get the most relevant, high-quality images
 */
export const SPACE_IMAGE_QUERIES = {
  cafe: {
    hero: 'modern coffee cafe interior cozy warm ambiance',
    products: 'fresh pastries croissants bakery display',
    coffee: 'cappuccino latte art coffee cup',
    ambiance: 'cafe seating comfortable modern interior',
  },
  restaurant: {
    hero: 'rooftop restaurant terrace evening city view',
    dining: 'fine dining elegant table setting wine',
    food: 'gourmet food plating artistic cuisine',
    ambiance: 'upscale restaurant interior elegant lighting',
  },
  lounge: {
    hero: 'luxury lounge interior sophisticated modern',
    bar: 'cocktail bar counter premium spirits',
    cocktails: 'colorful craft cocktails mixology',
    seating: 'comfortable lounge seating intimate lighting',
  },
  club: {
    hero: 'nightclub dance floor DJ booth lights',
    lights: 'club lighting effects LED laser',
    dj: 'DJ mixing console nightclub party',
    vip: 'VIP lounge bottle service luxury nightclub',
  },
  privateDining: {
    hero: 'private dining room exclusive elegant',
    table: 'elegant formal dining table setting',
    event: 'intimate dinner party celebration',
    decor: 'luxury private dining room interior',
  },
  banquets: {
    hero: 'grand banquet hall ballroom chandeliers',
    wedding: 'wedding reception elegant decoration setup',
    stage: 'event stage setup lighting decoration',
    tables: 'banquet table arrangement elegant centerpiece',
  },
  hero: {
    main: 'luxury restaurant exterior evening entrance',
    lifestyle: 'people dining celebration happy restaurant',
    experience: 'fine dining experience gourmet food',
  },
  about: {
    story: 'restaurant interior heritage elegant warm',
    team: 'chef cooking professional kitchen',
    craftsmanship: 'chef preparing food artisan culinary',
  },
  events: {
    liveMusic: 'live music performance restaurant venue',
    wine: 'wine tasting event glasses bottles',
    corporate: 'corporate event venue modern professional',
    celebration: 'birthday celebration restaurant party',
  },
  gallery: {
    food1: 'gourmet plated dish fine dining',
    food2: 'sushi platter artistic presentation',
    food3: 'pasta italian cuisine elegant',
    food4: 'steak grilled meat restaurant quality',
    interior1: 'restaurant interior elegant modern',
    interior2: 'bar interior premium cocktails',
    interior3: 'cafe interior cozy comfortable',
    event1: 'wedding celebration restaurant venue',
    event2: 'party celebration people dancing',
    ambiance: 'restaurant ambiance mood lighting',
  },
};

/**
 * Fetch images for a specific space
 */
export async function fetchSpaceImages(
  space: keyof typeof SPACE_IMAGE_QUERIES,
  category?: string
): Promise<FreePikImage[]> {
  const queries = SPACE_IMAGE_QUERIES[space];

  if (!queries) {
    return [];
  }

  // If specific category requested
  if (category && category in queries) {
    const query = (queries as any)[category];
    return await searchFreePikImages({
      term: query,
      limit: 1,
      orientation: 'horizontal',
    });
  }

  // Fetch all images for the space
  const allImages: FreePikImage[] = [];

  for (const [key, query] of Object.entries(queries)) {
    const images = await searchFreePikImages({
      term: query,
      limit: 1,
      orientation: 'horizontal',
    });
    allImages.push(...images);
  }

  return allImages;
}

/**
 * Download and save image locally
 * This can be used during build time to cache images
 */
export async function downloadImage(imageUrl: string, savePath: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return false;

    // This would need to be implemented with fs in a Node.js environment
    // For now, just return the URL to use directly
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
}

/**
 * Get a single optimized image URL for a space
 */
export async function getSpaceHeroImage(space: keyof typeof SPACE_IMAGE_QUERIES): Promise<string> {
  const images = await fetchSpaceImages(space, 'hero');
  return images[0]?.imageUrl || '';
}
