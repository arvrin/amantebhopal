# QR Menu System - Implementation Guide
## Practical Code Examples & Setup Instructions for Amante

**Companion Document to:** QR_MENU_RESEARCH_ANALYSIS.md
**Date:** October 17, 2025

---

## Quick Start Checklist

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Next.js 15.5.2 project setup ✅ (already done)
- [ ] Database provider selected (Vercel Postgres/Supabase)
- [ ] Image CDN account (Cloudinary/Vercel Blob)
- [ ] Menu data in Excel/PDF format ready for conversion

### Setup Steps
1. Install additional dependencies
2. Configure database
3. Set up Prisma ORM
4. Create menu data structure
5. Build core components
6. Implement QR code generation
7. Deploy and test

---

## 1. Install Dependencies

```bash
# Core menu functionality
npm install @prisma/client prisma
npm install swr
npm install zustand
npm install @tanstack/react-query

# QR Code generation
npm install qrcode.react
npm install react-qr-code

# PDF generation
npm install jspdf jspdf-autotable
npm install react-to-print

# Image optimization
npm install sharp
npm install @cloudinary/url-gen @cloudinary/react

# Utilities
npm install clsx tailwind-merge
npm install date-fns
npm install slugify

# Development tools
npm install -D @types/qrcode.react
npm install -D prisma

# Already installed from package.json:
# - framer-motion ✅
# - lucide-react ✅
# - react-hook-form ✅
# - next ✅
# - react ✅
```

---

## 2. Database Setup with Prisma

### Step 1: Initialize Prisma

```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma`
- `.env` file with DATABASE_URL

### Step 2: Configure Environment Variables

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/amante_menu?schema=public"

# For Vercel Postgres (recommended)
POSTGRES_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"

# Cloudinary (for images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### Step 3: Create Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}

model Venue {
  id          String     @id @default(cuid())
  slug        String     @unique
  name        String
  description String?
  openTime    String
  closeTime   String
  image       String?
  order       Int        @default(0)
  categories  Category[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([slug])
}

model Category {
  id          String     @id @default(cuid())
  slug        String
  name        String
  description String?
  icon        String?
  order       Int        @default(0)
  venue       Venue      @relation(fields: [venueId], references: [id], onDelete: Cascade)
  venueId     String
  items       MenuItem[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@unique([venueId, slug])
  @@index([venueId])
  @@index([slug])
}

model MenuItem {
  id              String   @id @default(cuid())
  slug            String
  name            String
  description     String   @db.Text
  price           Decimal  @db.Decimal(10, 2)
  image           String?

  category        Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  categoryId      String

  subcategory     String?
  cuisine         String?

  vegetarian      Boolean  @default(false)
  vegan           Boolean  @default(false)
  glutenFree      Boolean  @default(false)
  jain            Boolean  @default(false)
  dairyFree       Boolean  @default(false)
  nutFree         Boolean  @default(false)

  spiceLevel      Int?     @db.SmallInt
  allergens       String[]
  ingredients     String[]

  calories        Int?
  protein         Decimal? @db.Decimal(5, 2)
  carbs           Decimal? @db.Decimal(5, 2)
  fat             Decimal? @db.Decimal(5, 2)

  preparationTime String?
  servingSize     String?

  available       Boolean  @default(true)
  seasonal        Boolean  @default(false)
  chefRecommended Boolean  @default(false)
  newItem         Boolean  @default(false)
  popular         Boolean  @default(false)

  viewCount       Int      @default(0)
  orderCount      Int      @default(0)

  order           Int      @default(0)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([categoryId, slug])
  @@index([categoryId])
  @@index([available])
  @@index([chefRecommended])
  @@index([popular])
  @@index([vegetarian])
  @@index([vegan])
}
```

### Step 4: Run Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio to view data
npx prisma studio
```

---

## 3. Data Conversion & Seeding

### Step 1: Convert Excel to JSON

```typescript
// scripts/convert-excel-to-json.ts
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import slugify from 'slugify';

interface ExcelMenuItem {
  'Item Name': string;
  'Description': string;
  'Price': number;
  'Category': string;
  'Venue': 'Food' | 'Bar' | 'Café';
  'Type': 'Veg' | 'Non-Veg' | 'Vegan';
  'Spice Level'?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  'Allergens'?: string;
  'Image URL'?: string;
}

function convertExcelToJSON(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: ExcelMenuItem[] = XLSX.utils.sheet_to_json(worksheet);

  const venues: Record<string, any> = {};

  data.forEach((row, index) => {
    const venueSlug = row.Venue.toLowerCase().replace('é', 'e');
    const categorySlug = slugify(row.Category, { lower: true });
    const itemSlug = slugify(row['Item Name'], { lower: true });

    if (!venues[venueSlug]) {
      venues[venueSlug] = {
        slug: venueSlug,
        name: row.Venue,
        categories: {},
      };
    }

    if (!venues[venueSlug].categories[categorySlug]) {
      venues[venueSlug].categories[categorySlug] = {
        slug: categorySlug,
        name: row.Category,
        items: [],
      };
    }

    const spiceLevelMap: Record<string, number> = {
      'Mild': 1,
      'Medium': 3,
      'Hot': 4,
      'Extra Hot': 5,
    };

    venues[venueSlug].categories[categorySlug].items.push({
      slug: itemSlug,
      name: row['Item Name'].trim(),
      description: row.Description.trim(),
      price: parseFloat(row.Price.toString()),
      image: row['Image URL'] || null,
      dietary: {
        vegetarian: row.Type === 'Veg' || row.Type === 'Vegan',
        vegan: row.Type === 'Vegan',
        glutenFree: row.Allergens?.includes('Gluten-Free') || false,
        jain: false,
      },
      spiceLevel: row['Spice Level'] ? spiceLevelMap[row['Spice Level']] : null,
      allergens: row.Allergens ? row.Allergens.split(',').map(a => a.trim()) : [],
      available: true,
      order: index,
    });
  });

  fs.writeFileSync(
    'prisma/menu-data.json',
    JSON.stringify(venues, null, 2)
  );

  console.log('✅ Conversion complete! Output: prisma/menu-data.json');
}

// Run
convertExcelToJSON('./menu-data.xlsx');
```

### Step 2: Seed Database

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import menuData from './menu-data.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.venue.deleteMany();

  // Seed venues
  for (const [venueSlug, venueData] of Object.entries(menuData)) {
    const venue = await prisma.venue.create({
      data: {
        slug: venueSlug,
        name: venueData.name,
        description: getVenueDescription(venueSlug),
        openTime: getVenueHours(venueSlug).open,
        closeTime: getVenueHours(venueSlug).close,
        order: getVenueOrder(venueSlug),
      },
    });

    console.log(`✓ Created venue: ${venue.name}`);

    // Seed categories
    let categoryOrder = 0;
    for (const [categorySlug, categoryData] of Object.entries(venueData.categories)) {
      const category = await prisma.category.create({
        data: {
          slug: categorySlug,
          name: categoryData.name,
          venueId: venue.id,
          order: categoryOrder++,
        },
      });

      console.log(`  ✓ Created category: ${category.name}`);

      // Seed menu items
      const items = categoryData.items.map((item: any, index: number) => ({
        ...item,
        categoryId: category.id,
        price: item.price,
        vegetarian: item.dietary.vegetarian,
        vegan: item.dietary.vegan,
        glutenFree: item.dietary.glutenFree,
        jain: item.dietary.jain || false,
        dairyFree: false,
        nutFree: false,
        order: index,
      }));

      await prisma.menuItem.createMany({
        data: items,
      });

      console.log(`    ✓ Created ${items.length} items`);
    }
  }

  console.log('✅ Seeding completed successfully!');
}

function getVenueDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    food: 'Premium dining experience with authentic flavors',
    bar: 'Crafted cocktails and premium spirits',
    cafe: 'Artisan coffee and fresh bakery delights',
  };
  return descriptions[slug] || '';
}

function getVenueHours(slug: string) {
  const hours: Record<string, { open: string; close: string }> = {
    food: { open: '12:00', close: '23:00' },
    bar: { open: '17:00', close: '01:00' },
    cafe: { open: '07:00', close: '22:00' },
  };
  return hours[slug] || { open: '09:00', close: '22:00' };
}

function getVenueOrder(slug: string): number {
  const order: Record<string, number> = {
    cafe: 0,
    food: 1,
    bar: 2,
  };
  return order[slug] || 999;
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Step 3: Run Seed Script

```bash
# Add to package.json
"scripts": {
  "db:seed": "tsx prisma/seed.ts"
}

# Install tsx for TypeScript execution
npm install -D tsx

# Run seed
npm run db:seed
```

---

## 4. Core Components Implementation

### Utility Functions

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Menu API Routes

```typescript
// app/api/menu/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const venues = await prisma.venue.findMany({
      include: {
        categories: {
          include: {
            items: {
              where: { available: true },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(venues);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}

// app/api/menu/[venue]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { venue: string } }
) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { slug: params.venue },
      include: {
        categories: {
          include: {
            items: {
              where: { available: true },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!venue) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(venue);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch venue data' },
      { status: 500 }
    );
  }
}

// app/api/menu/search/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const venue = searchParams.get('venue');
  const dietary = searchParams.get('dietary')?.split(',') || [];

  try {
    const items = await prisma.menuItem.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          venue ? { category: { venue: { slug: venue } } } : {},
          dietary.includes('veg') ? { vegetarian: true } : {},
          dietary.includes('vegan') ? { vegan: true } : {},
          dietary.includes('gluten-free') ? { glutenFree: true } : {},
          dietary.includes('jain') ? { jain: true } : {},
          { available: true },
        ],
      },
      include: {
        category: {
          include: {
            venue: true,
          },
        },
      },
      take: 50,
      orderBy: [
        { chefRecommended: 'desc' },
        { popular: 'desc' },
        { order: 'asc' },
      ],
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

### Menu Page

```typescript
// app/menu/page.tsx
import { prisma } from '@/lib/prisma';
import { MenuLayout } from '@/components/menu/MenuLayout';

export const metadata = {
  title: 'Menu | Amante - Eat. Sip. Dance. Celebrate.',
  description: 'Explore our curated menu of premium food, crafted cocktails, and artisan café delights.',
};

export default async function MenuPage() {
  const venues = await prisma.venue.findMany({
    include: {
      categories: {
        include: {
          items: {
            where: { available: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });

  return <MenuLayout venues={venues} />;
}

// app/menu/[venue]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { VenueMenu } from '@/components/menu/VenueMenu';

export async function generateStaticParams() {
  const venues = await prisma.venue.findMany({
    select: { slug: true },
  });

  return venues.map((venue) => ({
    venue: venue.slug,
  }));
}

export async function generateMetadata({ params }: { params: { venue: string } }) {
  const venue = await prisma.venue.findUnique({
    where: { slug: params.venue },
  });

  if (!venue) return {};

  return {
    title: `${venue.name} Menu | Amante`,
    description: venue.description,
  };
}

export default async function VenueMenuPage({ params }: { params: { venue: string } }) {
  const venue = await prisma.venue.findUnique({
    where: { slug: params.venue },
    include: {
      categories: {
        include: {
          items: {
            where: { available: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!venue) {
    notFound();
  }

  return <VenueMenu venue={venue} />;
}
```

---

## 5. QR Code Generation

### Generate QR Codes for Each Venue

```typescript
// app/admin/qr-codes/page.tsx
'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function QRCodeGenerator() {
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setVenues(data));
  }, []);

  const downloadQR = (venueSlug: string) => {
    const svg = document.getElementById(`qr-${venueSlug}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `amante-${venueSlug}-qr.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Generate QR Codes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {venues.map((venue) => {
          const url = `${process.env.NEXT_PUBLIC_SITE_URL}/menu/${venue.slug}`;

          return (
            <div key={venue.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 capitalize">{venue.name}</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-4 flex justify-center">
                <QRCodeSVG
                  id={`qr-${venue.slug}`}
                  value={url}
                  size={256}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: '/assets/logos/amante-icon.png',
                    height: 50,
                    width: 50,
                    excavate: true,
                  }}
                />
              </div>

              <p className="text-sm text-gray-600 mb-4 break-all">{url}</p>

              <button
                onClick={() => downloadQR(venue.slug)}
                className="w-full flex items-center justify-center gap-2 bg-amante-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <Download size={20} />
                Download PNG
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Dynamic QR Code with Analytics

```typescript
// lib/qr-analytics.ts
export async function trackQRScan(venueSlug: string) {
  await fetch('/api/analytics/qr-scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      venue: venueSlug,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }),
  });
}

// app/menu/[venue]/page.tsx (add tracking)
'use client';

import { useEffect } from 'react';
import { trackQRScan } from '@/lib/qr-analytics';

export default function VenueMenuPage({ params }: { params: { venue: string } }) {
  useEffect(() => {
    // Track QR scan on page load
    if (document.referrer === '' || document.referrer.includes('camera')) {
      trackQRScan(params.venue);
    }
  }, [params.venue]);

  // ... rest of component
}
```

---

## 6. Performance Optimization

### Image Component with Blur Placeholder

```typescript
// components/common/OptimizedImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`
          transition-all duration-300
          ${isLoading ? 'blur-lg scale-105' : 'blur-0 scale-100'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};
```

### PWA Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... existing config

  // PWA Configuration (requires next-pwa)
  // npm install next-pwa

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ],

  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

// public/manifest.json
{
  "name": "Amante Menu",
  "short_name": "Amante",
  "description": "Premium dining, cocktails, and café experience",
  "start_url": "/menu",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#B91C1C",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}

// app/layout.tsx (add manifest)
export const metadata = {
  manifest: '/manifest.json',
  // ... other metadata
};
```

---

## 7. Testing & Quality Assurance

### Performance Testing Script

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Create lighthouserc.js
cat > lighthouserc.js << 'EOF'
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/menu'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
EOF

# Run Lighthouse
npm run build
npm run start
lhci autorun
```

### Accessibility Testing

```bash
# Install Pa11y
npm install -g pa11y

# Run accessibility test
pa11y http://localhost:3000/menu

# Or use axe-core
npm install -D @axe-core/cli
npx axe http://localhost:3000/menu --save results.json
```

---

## 8. Deployment Checklist

### Pre-Deployment

- [ ] Run database migrations on production
- [ ] Seed production database with menu data
- [ ] Upload images to CDN (Cloudinary/Vercel)
- [ ] Set environment variables in Vercel
- [ ] Test QR codes with production URLs
- [ ] Run Lighthouse performance audit
- [ ] Run accessibility audit (Pa11y/axe)
- [ ] Test on multiple devices (iOS/Android)
- [ ] Verify offline functionality (PWA)
- [ ] Check print functionality

### Deployment

```bash
# Deploy to Vercel
vercel --prod

# Or via GitHub integration (recommended)
git push origin main  # Auto-deploys on Vercel
```

### Post-Deployment

- [ ] Verify all menu items load correctly
- [ ] Test search functionality
- [ ] Test dietary filters
- [ ] Scan QR codes from physical devices
- [ ] Monitor Core Web Vitals in Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics (Google Analytics)

---

## 9. Maintenance & Updates

### Update Menu Items

```typescript
// scripts/update-menu.ts
import { prisma } from '@/lib/prisma';

async function updateMenuItem(slug: string, updates: any) {
  const item = await prisma.menuItem.update({
    where: { slug },
    data: updates,
  });

  console.log(`✓ Updated: ${item.name}`);
}

async function markAsSoldOut(itemSlug: string) {
  await updateMenuItem(itemSlug, { available: false });
}

async function updatePrice(itemSlug: string, newPrice: number) {
  await updateMenuItem(itemSlug, { price: newPrice });
}

// Usage
markAsSoldOut('paneer-tikka');
updatePrice('butter-chicken', 449);
```

### Batch Updates

```typescript
// scripts/batch-update.ts
import { prisma } from '@/lib/prisma';

async function markSeasonalItems() {
  await prisma.menuItem.updateMany({
    where: {
      name: {
        contains: 'Mango',
      },
    },
    data: {
      seasonal: true,
    },
  });

  console.log('✓ Marked mango items as seasonal');
}

async function updateCategoryOrder(categoryId: string, newOrder: number) {
  await prisma.category.update({
    where: { id: categoryId },
    data: { order: newOrder },
  });
}
```

---

## 10. Troubleshooting

### Common Issues

**Issue: QR code not scanning**
```
Solution:
1. Ensure QR code has sufficient contrast (black on white)
2. Check minimum size (2×2 inches for table placement)
3. Test in different lighting conditions
4. Verify URL is accessible
5. Use error correction level H
```

**Issue: Slow image loading**
```
Solution:
1. Optimize images (WebP format, 80-85% quality)
2. Implement lazy loading with next/image
3. Use CDN for image delivery
4. Generate blur placeholders
5. Set explicit width/height to prevent CLS
```

**Issue: Menu not updating**
```
Solution:
1. Check database connection (DATABASE_URL)
2. Verify Prisma client is generated (npx prisma generate)
3. Clear Next.js cache (.next folder)
4. Revalidate API routes (next: { revalidate: 3600 })
5. Check for caching issues (disable during testing)
```

**Issue: Poor mobile performance**
```
Solution:
1. Reduce JavaScript bundle size (code splitting)
2. Implement virtual scrolling for long lists
3. Optimize images (smaller file sizes)
4. Use server components where possible
5. Enable compression in next.config
```

---

## Next Steps

1. **Set up development environment** - Install dependencies, configure database
2. **Convert menu data** - Use Excel to JSON script
3. **Seed database** - Run migration and seed scripts
4. **Build core components** - Menu display, navigation, search
5. **Generate QR codes** - Create venue-specific QR codes
6. **Test thoroughly** - Performance, accessibility, cross-browser
7. **Deploy to production** - Vercel deployment with environment variables
8. **Monitor & iterate** - Track analytics, gather feedback, optimize

**Estimated Timeline:** 2-3 weeks for full implementation

**Support Resources:**
- Prisma Docs: https://www.prisma.io/docs
- Next.js App Router: https://nextjs.org/docs/app
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel Deployment: https://vercel.com/docs

---

**Document End**
