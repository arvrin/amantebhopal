/**
 * Script to fetch all images from FreePik API and save them locally
 * Run with: npx tsx scripts/fetch-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const FREEPIK_API_KEY = 'FPSX4843d7aa866d5c01d00ebf2360fd1488';
const FREEPIK_API_BASE = 'https://api.freepik.com/v1';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

interface ImageDownload {
  space: string;
  category: string;
  query: string;
  filename: string;
}

const IMAGE_QUERIES = {
  cafe: {
    'cafe-hero': 'modern cafe interior',
    'cafe-products': 'fresh pastries bakery',
    'cafe-coffee': 'latte art coffee',
  },
  restaurant: {
    'restaurant-hero': 'rooftop restaurant terrace',
    'restaurant-dining': 'fine dining table',
    'restaurant-food': 'gourmet food plating',
  },
  lounge: {
    'lounge-hero': 'luxury lounge interior',
    'lounge-bar': 'cocktail bar counter',
    'lounge-cocktails': 'craft cocktails',
  },
  club: {
    'club-hero': 'nightclub dance floor',
    'club-lights': 'disco lights club',
    'club-vip': 'VIP lounge champagne',
  },
  'private-dining': {
    'private-dining-hero': 'private dining room',
    'private-dining-table': 'elegant dining table',
    'private-dining-event': 'dinner party celebration',
  },
  banquets: {
    'banquets-hero': 'grand banquet hall',
    'banquets-wedding': 'wedding reception decoration',
    'banquets-stage': 'event stage lighting',
  },
  hero: {
    'main-hero': 'luxury restaurant exterior',
    'lifestyle': 'people dining celebration',
  },
  about: {
    'about-story': 'restaurant interior elegant',
    'about-team': 'chef cooking kitchen',
  },
  events: {
    'event-1': 'live music restaurant',
    'event-2': 'wine tasting glasses',
    'event-3': 'birthday celebration party',
  },
  gallery: {
    'gallery-1': 'indian cuisine food',
    'gallery-2': 'sushi platter japanese',
    'gallery-3': 'pasta italian cuisine',
    'gallery-4': 'grilled steak meat',
    'gallery-5': 'cocktails colorful drinks',
    'gallery-6': 'dessert chocolate cake',
    'gallery-7': 'restaurant interior modern',
    'gallery-8': 'rooftop terrace dining',
    'gallery-9': 'wedding celebration venue',
    'gallery-10': 'corporate event conference',
  },
};

async function searchFreePik(query: string): Promise<string | null> {
  const searchParams = new URLSearchParams({
    locale: 'en-US',
    term: query,
    limit: '1',
    orientation: 'horizontal',
    content_type: 'photo',
  });

  try {
    const response = await fetch(`${FREEPIK_API_BASE}/resources?${searchParams}`, {
      headers: {
        'x-freepik-api-key': FREEPIK_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} for query: ${query}`);
      return null;
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0].image.source.url;
    }

    return null;
  } catch (error) {
    console.error(`Error searching FreePik for "${query}":`, error);
    return null;
  }
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`Error downloading ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🎨 Starting FreePik image fetch...\n');

  // Create directories
  for (const space of Object.keys(IMAGE_QUERIES)) {
    const dir = path.join(OUTPUT_DIR, space);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${space}/`);
    }
  }

  let successCount = 0;
  let failCount = 0;

  // Fetch and download all images
  for (const [space, queries] of Object.entries(IMAGE_QUERIES)) {
    console.log(`\n🔍 Fetching images for: ${space}`);

    for (const [filename, query] of Object.entries(queries)) {
      console.log(`   Searching: "${query}"`);

      const imageUrl = await searchFreePik(query);

      if (imageUrl) {
        const filepath = path.join(OUTPUT_DIR, space, `${filename}.jpg`);
        const success = await downloadImage(imageUrl, filepath);

        if (success) {
          console.log(`   ✅ Downloaded: ${filename}.jpg`);
          successCount++;
        } else {
          console.log(`   ❌ Failed to download: ${filename}.jpg`);
          failCount++;
        }
      } else {
        console.log(`   ⚠️  No image found for: ${filename}`);
        failCount++;
      }

      // Rate limiting - wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   ✅ Successfully downloaded: ${successCount} images`);
  console.log(`   ❌ Failed: ${failCount} images`);
  console.log(`\n✨ Image fetch complete!\n`);
}

main().catch(console.error);
