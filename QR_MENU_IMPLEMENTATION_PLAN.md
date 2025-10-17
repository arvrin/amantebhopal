# Amante QR Menu System - Implementation Plan

## Executive Summary

**Project:** Single QR Code Menu System for Amante
**Timeline:** 2-3 weeks for MVP
**Approach:** Integrate into existing Next.js project
**Goal:** Mobile-first, premium menu experience with Food, Bar, and Café categories

---

## 1. Project Analysis

### Current State
- **Framework:** Next.js 15.5.2 with App Router & Turbopack ✅
- **Styling:** Tailwind CSS 4 ✅
- **Animations:** Framer Motion 12.23.12 ✅
- **Icons:** Lucide React ✅
- **Forms:** React Hook Form ✅
- **Brand:** Established color palette and typography ✅

### What We Have
- Premium landing page at root (`/`)
- Established Amante branding
- Mobile-optimized design system
- Production deployment on Vercel

### What We Need to Add
- Menu data structure and management
- QR menu landing page (`/menu`)
- Three category pages (`/menu/food`, `/menu/bar`, `/menu/cafe`)
- Data conversion tools (Excel/Doc/PDF → JSON)
- Search and filter functionality
- Print-friendly views

---

## 2. Technical Architecture

### Route Structure
```
/                          → Existing coming-soon landing page
/menu                      → QR Menu Landing (3 category selection)
/menu/food                 → Food Menu Page
/menu/bar                  → Bar Menu Page
/menu/cafe                 → Café Menu Page
/menu/[category]/[item]    → Item Detail Page (optional)
```

### Data Flow Options

#### Option A: Static JSON (Recommended for MVP)
**Timeline:** 1 week
**Cost:** Free
**Pros:**
- No database setup required
- Fast deployment
- Works with existing Vercel hosting
- Simple to update (edit JSON, commit, redeploy)

**Cons:**
- Manual updates require deployment
- No real-time changes

**Implementation:**
```
/data
  /menus
    food.json
    bar.json
    cafe.json
```

#### Option B: Database + Admin Panel (Full Solution)
**Timeline:** 3 weeks
**Cost:** ₹500-2000/month (Vercel Postgres)
**Pros:**
- Real-time menu updates via admin panel
- No deployment needed for changes
- Advanced features (item availability, pricing changes)

**Cons:**
- More complex setup
- Requires backend API routes
- Monthly hosting costs

**Recommendation:** Start with Option A (JSON), migrate to Option B after launch if needed.

---

## 3. Implementation Roadmap

### Week 1: Foundation & Data Preparation

#### Day 1-2: Data Conversion & Structure
**Tasks:**
1. Create data conversion scripts
2. Convert Excel/Doc/PDF menus to JSON
3. Define menu item schema
4. Create sample data for testing

**Deliverables:**
- `/scripts/convert-menu.js` - Excel → JSON converter
- `/data/menus/food.json` - Food menu data
- `/data/menus/bar.json` - Bar menu data
- `/data/menus/cafe.json` - Café menu data
- `/types/menu.ts` - TypeScript interfaces

**Menu Item Schema:**
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // 'appetizer', 'main', 'dessert', etc.
  dietary: string[]; // ['veg', 'vegan', 'gluten-free']
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  allergens?: string[];
  image?: string;
  isRecommended?: boolean;
  isAvailable?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: MenuItem[];
}

interface Menu {
  venue: 'food' | 'bar' | 'cafe';
  name: string;
  description: string;
  categories: MenuCategory[];
  lastUpdated: string;
}
```

#### Day 3-4: QR Menu Landing Page
**Tasks:**
1. Create `/app/menu/page.tsx`
2. Design 3-card selection layout
3. Add Amante branding
4. Implement smooth transitions

**Design Requirements:**
- Logo at top
- Tagline: "Explore Our Menus"
- Three large cards:
  - Food Menu 🍽️
  - Bar Menu 🍸
  - Café Menu ☕
- Each card shows:
  - Icon/emoji
  - Category name
  - Short description
  - "View Menu" CTA
- Mobile-first layout
- Smooth fade-in animations

**Component Structure:**
```tsx
/app/menu/
  page.tsx              → Landing page
  layout.tsx            → Menu-specific layout
/components/menu/
  MenuCategoryCard.tsx  → Reusable category card
  MenuHeader.tsx        → Header with logo
```

#### Day 5-7: Individual Menu Pages
**Tasks:**
1. Create `/app/menu/[category]/page.tsx`
2. Build menu item components
3. Implement category navigation
4. Add search functionality

**Features:**
- Category tabs/filters
- Search bar
- Dietary filter chips (Veg, Vegan, Gluten-Free, Jain)
- Menu item cards with:
  - Name
  - Description
  - Price
  - Dietary icons
  - Spice level indicator
  - "View Details" option
- Sticky header
- Back to menu selection

---

### Week 2: Features & Enhancement

#### Day 8-9: Search & Filter System
**Tasks:**
1. Implement fuzzy search (item names + descriptions)
2. Add dietary filters
3. Add category filters
4. Create filter UI components

**Search Features:**
- Real-time search as user types
- Highlight matching text
- Search across name + description
- Clear search button

**Filter Features:**
- Multi-select dietary preferences
- Category quick filters
- Price range filter (optional)
- Chef's recommendations toggle

#### Day 10-11: Item Detail Modal/Page
**Tasks:**
1. Create detail view for menu items
2. Show full description
3. Display allergen information
4. Add item sharing

**Detail View Contents:**
- Large item image (if available)
- Full name and description
- Price
- Dietary information
- Allergen warnings
- Spice level indicator
- Nutritional info (optional)
- Pairing suggestions (for bar items)
- Share button

#### Day 12-13: Polish & Optimization
**Tasks:**
1. Add loading states
2. Implement skeleton screens
3. Optimize images
4. Add error handling
5. Create print-friendly CSS

**Performance Targets:**
- LCP < 2.5s
- First Contentful Paint < 1.5s
- Mobile PageSpeed > 90

---

### Week 3: Testing & Launch

#### Day 14-15: QR Code Generation & Testing
**Tasks:**
1. Generate production QR codes
2. Test scanning flow on multiple devices
3. Create QR code variants (table tents, posters)
4. Document QR code placement strategy

**QR Code Requirements:**
- URL: `cafeamante.com/menu`
- High error correction (H level - 30%)
- Minimum size: 2cm × 2cm
- Include Amante logo in center
- Test on 10+ different phones

**QR Code Formats:**
- Table tent (digital + print-ready PDF)
- Wall poster
- Menu card insert
- Instagram story share

#### Day 16-17: User Testing & Refinement
**Tasks:**
1. Conduct user testing with 10-15 people
2. Gather feedback
3. Fix usability issues
4. Optimize mobile experience

**Testing Checklist:**
- Can users find items quickly?
- Is navigation intuitive?
- Are prices clearly visible?
- Does search work well?
- Are filters helpful?
- Is text readable?
- Do animations feel smooth?

#### Day 18-19: Content Population
**Tasks:**
1. Add final menu items
2. Upload high-quality food photos
3. Proofread all descriptions
4. Verify pricing
5. Check dietary information accuracy

#### Day 20-21: Launch Preparation
**Tasks:**
1. Final QA on production
2. Print physical QR codes
3. Train staff on system
4. Create backup plan (printed menus)
5. Set up analytics tracking

**Launch Checklist:**
- [ ] All menu items added and verified
- [ ] Images optimized and uploaded
- [ ] QR codes printed and placed
- [ ] Staff trained
- [ ] Analytics configured
- [ ] Backup menus available
- [ ] Performance tested
- [ ] Mobile devices tested (iOS + Android)
- [ ] Accessibility verified

---

## 4. Design Specifications

### Color Palette (From Existing Brand)
```css
Primary:
--amante-red: #B91C1C
--amante-red-dark: #991B1B
--amante-pink: #F8BBD9

Neutrals:
--amante-black: #1F1F1F
--amante-white: #FFFFFF
--beige: #F5F5DC
--cream: #FFFDD0

Menu-Specific:
--background: #FAFAF9
--card-bg: #FFFFFF
--border: #E5E5E5
--text-primary: #1F1F1F
--text-secondary: #6B7280
--accent: #B91C1C
```

### Typography
```css
Headers: 'Lora', serif (already in use)
Body: System fonts (Segoe UI, Helvetica Neue)
Menu Items: 'Avenir' or 'Inter'
Prices: Tabular numbers for alignment
```

### Component Sizes
```
Touch Target: 44px minimum (iOS guidelines)
Card Padding: 16px mobile, 24px tablet
Font Sizes:
  - Menu item name: 18px (mobile), 20px (desktop)
  - Description: 14px (mobile), 16px (desktop)
  - Price: 16px (mobile), 18px (desktop)
  - Category headers: 24px (mobile), 28px (desktop)
```

### Iconography
- Dietary icons: 24×24px
- Category icons: 48×48px (landing), 32×32px (menu)
- Spice level: 16×16px chili icons
- Search/filter icons: 20×20px

---

## 5. File Structure

```
amante-coming-soon/
├── app/
│   ├── menu/
│   │   ├── page.tsx                    → Landing (3 categories)
│   │   ├── layout.tsx                  → Menu layout
│   │   ├── [category]/
│   │   │   ├── page.tsx                → Food/Bar/Café menu
│   │   │   └── [item]/
│   │   │       └── page.tsx            → Item detail (optional)
│   │   └── loading.tsx                 → Loading state
│   └── api/
│       └── menu/
│           └── route.ts                → API endpoint (if using database)
│
├── components/menu/
│   ├── MenuLanding.tsx                 → Landing page component
│   ├── MenuCategoryCard.tsx            → Category selection card
│   ├── MenuHeader.tsx                  → Header with logo/back
│   ├── MenuItem.tsx                    → Individual menu item
│   ├── MenuItemCard.tsx                → Item in grid/list view
│   ├── MenuItemDetail.tsx              → Detail modal/page
│   ├── MenuSearch.tsx                  → Search bar
│   ├── MenuFilters.tsx                 → Filter chips
│   ├── CategoryNav.tsx                 → Category tabs
│   ├── DietaryIcon.tsx                 → Veg/Vegan icons
│   ├── SpiceLevelIndicator.tsx         → Chili icons
│   └── PrintMenu.tsx                   → Print-friendly view
│
├── data/menus/
│   ├── food.json                       → Food menu data
│   ├── bar.json                        → Bar menu data
│   └── cafe.json                       → Café menu data
│
├── types/
│   └── menu.ts                         → TypeScript interfaces
│
├── lib/
│   ├── menuHelpers.ts                  → Utility functions
│   └── menuSearch.ts                   → Search logic
│
├── scripts/
│   ├── convert-excel-to-json.js        → Excel converter
│   ├── convert-doc-to-json.js          → Doc converter
│   └── convert-pdf-to-json.js          → PDF parser
│
├── public/
│   ├── menus/
│   │   ├── items/                      → Menu item images
│   │   ├── categories/                 → Category images
│   │   └── qr-codes/                   → Generated QR codes
│   └── menu-icon.png                   → Menu favicon
│
└── styles/
    └── print.css                        → Print-specific styles
```

---

## 6. Data Conversion Strategy

### From Excel (Bar Menu)
**Tool:** xlsx or exceljs package

**Steps:**
1. Install: `npm install xlsx`
2. Read Excel file
3. Map columns to JSON structure
4. Generate category groupings
5. Export to `data/menus/bar.json`

**Script:** `/scripts/convert-excel-to-json.js`

```javascript
const XLSX = require('xlsx');
const fs = require('fs');

function convertExcelToJSON(filePath, outputPath) {
  // Read Excel file
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Transform to menu structure
  const menu = {
    venue: 'bar',
    name: 'Amante Bar Menu',
    categories: transformToCategories(data),
    lastUpdated: new Date().toISOString()
  };

  // Save to JSON
  fs.writeFileSync(outputPath, JSON.stringify(menu, null, 2));
}
```

### From Word Doc (Café & Food)
**Tool:** mammoth or docx packages

**Steps:**
1. Install: `npm install mammoth`
2. Extract text from .docx
3. Parse structure (categories, items, prices)
4. Apply formatting rules
5. Generate JSON

**Challenges:**
- Inconsistent formatting
- Manual price extraction
- Description parsing

**Recommendation:** Copy-paste to Excel first for consistency, then use Excel converter.

### From PDF (Food Menu)
**Tool:** pdf-parse package

**Steps:**
1. Install: `npm install pdf-parse`
2. Extract text from PDF
3. Use regex to parse items
4. Manual review required

**Reality Check:** PDFs are hardest to parse automatically.

**Best Approach:**
1. Open PDF
2. Copy text to Excel
3. Use Excel converter

---

## 7. Component Implementation

### MenuLanding Component
```tsx
// app/menu/page.tsx
'use client';

import { motion } from 'framer-motion';
import MenuCategoryCard from '@/components/menu/MenuCategoryCard';

const categories = [
  {
    id: 'food',
    name: 'Food Menu',
    emoji: '🍽️',
    description: 'Savor our culinary masterpieces',
    href: '/menu/food',
    color: '#B91C1C'
  },
  {
    id: 'bar',
    name: 'Bar Menu',
    emoji: '🍸',
    description: 'Craft cocktails & premium spirits',
    href: '/menu/bar',
    color: '#7C3AED'
  },
  {
    id: 'cafe',
    name: 'Café Menu',
    emoji: '☕',
    description: 'Artisan coffee & fresh pastries',
    href: '/menu/cafe',
    color: '#059669'
  }
];

export default function MenuLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-amante-pink-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <img
            src="/assets/logos/amante-logo.png"
            alt="Amante"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="font-lora text-4xl text-amante-black mb-2">
            Explore Our Menus
          </h1>
          <p className="text-gray-600">
            Select your dining experience
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          {categories.map((category, index) => (
            <MenuCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### MenuCategoryCard Component
```tsx
// components/menu/MenuCategoryCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MenuCategoryCardProps {
  category: {
    id: string;
    name: string;
    emoji: string;
    description: string;
    href: string;
    color: string;
  };
  index: number;
}

export default function MenuCategoryCard({ category, index }: MenuCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={category.href}>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="text-5xl w-20 h-20 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: `${category.color}10` }}
              >
                {category.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-amante-black mb-1">
                  {category.name}
                </h2>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={24} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

### Menu Page Component
```tsx
// app/menu/[category]/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuSearch from '@/components/menu/MenuSearch';
import MenuFilters from '@/components/menu/MenuFilters';
import MenuItemCard from '@/components/menu/MenuItemCard';
import CategoryNav from '@/components/menu/CategoryNav';

// Import menu data
import foodMenu from '@/data/menus/food.json';
import barMenu from '@/data/menus/bar.json';
import cafeMenu from '@/data/menus/cafe.json';

const menus = { food: foodMenu, bar: barMenu, cafe: cafeMenu };

export default function MenuPage({ params }: { params: { category: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const menu = menus[params.category as keyof typeof menus];

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let items = menu.categories.flatMap(cat => cat.items);

    // Search filter
    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Dietary filters
    if (selectedFilters.length > 0) {
      items = items.filter(item =>
        selectedFilters.every(filter => item.dietary?.includes(filter))
      );
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  }, [searchQuery, selectedFilters, selectedCategory, menu]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHeader
        title={menu.name}
        backUrl="/menu"
      />

      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <MenuSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <MenuFilters
            selectedFilters={selectedFilters}
            onChange={setSelectedFilters}
          />
        </div>
      </div>

      <CategoryNav
        categories={menu.categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 8. QR Code Generation

### Method 1: Online Service (Recommended for MVP)
**Tools:**
- QR Code Generator (qr-code-generator.com)
- QR Code Monkey (qrcode-monkey.com)

**Steps:**
1. Go to website
2. Enter URL: `https://cafeamante.com/menu`
3. Customize:
   - Add Amante logo in center
   - Choose high error correction (H)
   - Set colors (optional: match brand)
4. Download high-resolution PNG/SVG
5. Create variants for different sizes

### Method 2: Programmatic (For Scale)
**Package:** qrcode

**Installation:**
```bash
npm install qrcode
```

**Script:**
```javascript
// scripts/generate-qr.js
const QRCode = require('qrcode');

async function generateQR() {
  const url = 'https://cafeamante.com/menu';

  const options = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    width: 1000,
    margin: 2,
    color: {
      dark: '#1F1F1F',  // Amante black
      light: '#FFFFFF'
    }
  };

  try {
    await QRCode.toFile('./public/menus/qr-codes/menu-qr.png', url, options);
    console.log('QR code generated successfully!');
  } catch (err) {
    console.error(err);
  }
}

generateQR();
```

### QR Code Placement Strategy

**Physical Locations:**
1. **Table Tents** (All tables)
   - Size: 10cm × 15cm
   - QR: 5cm × 5cm
   - Text: "Scan to view our menu"

2. **Wall Posters** (Entry, waiting area)
   - Size: A4 (21cm × 29.7cm)
   - QR: 10cm × 10cm
   - Branding + instructions

3. **Menu Cards** (For those who prefer)
   - QR on back cover
   - Printed backup inside

4. **Bar Counter**
   - Acrylic stand with QR
   - For bar menu specifically

**Digital Locations:**
1. Instagram bio link
2. Google My Business
3. Facebook page
4. Website footer

---

## 9. Additional Features (Post-MVP)

### Phase 2 Enhancements
1. **Item Images**
   - Professional food photography
   - Lazy loading
   - Lightbox view

2. **Advanced Search**
   - Voice search
   - Autocomplete suggestions
   - Recent searches

3. **Personalization**
   - Remember dietary preferences
   - Favorite items
   - Recently viewed

4. **Social Features**
   - Share items on social media
   - Instagram integration
   - User reviews (future)

5. **Waiter Call**
   - Call waiter button
   - Request bill button
   - Table number input

6. **Multi-language**
   - Hindi translations
   - Language toggle

### Phase 3: Advanced
1. **Online Ordering**
   - Add to cart
   - Table delivery
   - Payment integration

2. **Recommendations**
   - AI-powered suggestions
   - Pairing recommendations
   - Popular items

3. **Nutrition Info**
   - Calorie counts
   - Allergen details
   - Ingredient lists

---

## 10. Testing Checklist

### Pre-Launch Testing

#### Functionality
- [ ] All menu items display correctly
- [ ] Search returns accurate results
- [ ] Filters work as expected
- [ ] Navigation is smooth
- [ ] Back button works
- [ ] QR code scans correctly

#### Devices
- [ ] iPhone (iOS 16+)
- [ ] iPhone (iOS 15)
- [ ] Android (Chrome)
- [ ] Android (Samsung browser)
- [ ] iPad
- [ ] Desktop (backup)

#### Performance
- [ ] Page loads < 2 seconds on 4G
- [ ] Images load progressively
- [ ] No layout shift
- [ ] Smooth animations
- [ ] Works offline (if PWA)

#### Accessibility
- [ ] Screen reader compatible
- [ ] Keyboard navigation
- [ ] Color contrast (4.5:1)
- [ ] Touch targets (44px)
- [ ] Text is readable

#### Edge Cases
- [ ] No results found
- [ ] Long item names
- [ ] Missing images
- [ ] Slow network
- [ ] No JavaScript

---

## 11. Launch Day Checklist

### Pre-Service
- [ ] Test QR codes from 5+ devices
- [ ] Verify all menu prices
- [ ] Check all items marked available
- [ ] Print backup menus (just in case)
- [ ] Brief staff on new system

### During Service
- [ ] Monitor analytics
- [ ] Watch for errors
- [ ] Get customer feedback
- [ ] Be ready to switch to backup

### Post-Service
- [ ] Review analytics
- [ ] Document issues
- [ ] Plan improvements
- [ ] Thank customers for feedback

---

## 12. Success Metrics

### Week 1 Targets
- QR scan rate: 70%+
- Menu view time: 2+ minutes
- Zero critical bugs
- Positive customer feedback

### Month 1 Targets
- QR scan rate: 85%+
- Reduced printed menu requests: 80%
- Staff satisfaction: High
- Cost savings realized

### Quarter 1 Targets
- QR scan rate: 90%+
- Customer satisfaction: 4.5/5
- Menu update frequency: Weekly
- ROI: Positive

---

## 13. Budget Estimate

### One-Time Costs
| Item | Cost (₹) |
|------|----------|
| Development time (2-3 weeks) | 0 (in-house) |
| QR code design | Free (online tools) |
| QR code printing | 2,000-5,000 |
| Table tents printing | 5,000-10,000 |
| Wall posters | 2,000-3,000 |
| Food photography (optional) | 20,000-50,000 |
| **Total** | **29,000-68,000** |

### Monthly Costs
| Item | Cost (₹) |
|------|----------|
| Hosting (Vercel free tier) | 0 |
| Domain (existing) | 0 |
| Analytics (Google Analytics) | 0 |
| **Total** | **0** |

**Note:** For database-driven version, add ₹500-2,000/month for Vercel Postgres.

---

## 14. Risk Mitigation

### Risk 1: QR Code Scanning Issues
**Mitigation:**
- Use high error correction (H level)
- Print at minimum 2cm × 2cm
- Test on multiple devices
- Keep backup printed menus

### Risk 2: Slow Internet at Venue
**Mitigation:**
- Optimize for fast loading (< 2s)
- Implement PWA for offline support
- Compress images
- Use CDN

### Risk 3: Customer Unfamiliarity
**Mitigation:**
- Clear instructions on table tents
- Staff training to assist
- Backup printed menus available
- "How to scan" poster

### Risk 4: Menu Updates
**Mitigation:**
- Document update process clearly
- Create simple admin interface (Phase 2)
- Test updates on staging before production
- Keep change log

---

## 15. Next Steps

### Immediate Actions (This Week)

1. **Gather Menu Data**
   - Collect Excel, Doc, PDF files
   - Review for accuracy
   - Identify missing information

2. **Set Up Development**
   - Create `/menu` route structure
   - Install required packages
   - Set up data conversion scripts

3. **Design Review**
   - Review design mockups
   - Get stakeholder approval
   - Finalize branding elements

4. **Timeline Confirmation**
   - Confirm launch date
   - Allocate resources
   - Set milestones

### Decision Points

**Question 1:** Static JSON or Database?
- **Recommendation:** Start with JSON (faster, cheaper)
- **Timeline:** JSON = 2 weeks, Database = 3-4 weeks

**Question 2:** MVP or Full Features?
- **Recommendation:** MVP first (landing + 3 menus + search)
- **Add later:** Advanced filters, item details, waiter call

**Question 3:** Food Photography?
- **Recommendation:** Launch without, add later
- **Why:** Don't delay launch for photos
- **Timeline:** Add photos in Week 4-5

---

## 16. Communication Plan

### Stakeholders
- **Owner:** Weekly progress updates
- **Chef/Manager:** Menu content approval
- **Staff:** Training session before launch
- **Customers:** Soft announcement, then full launch

### Launch Announcement

**Instagram Post:**
```
🎉 Introducing our NEW Digital Menu!

Simply scan the QR code on your table to explore:
🍽️ Food Menu
🍸 Bar Menu
☕ Café Menu

Fast, easy, and always up-to-date!

#AmanteDigital #QRMenu #Bhopal #Innovation
```

**Facebook Post:**
```
We've gone digital! 📱

Visit Amante and experience our new QR menu system:
✓ Instant access to all menus
✓ Search for your favorites
✓ Filter by dietary preferences
✓ No waiting for menu cards

Scan. Browse. Order. It's that simple!

Visit us at 1, Mahendra Business Square, MP Nagar, Bhopal
```

---

## 17. Maintenance Plan

### Daily
- Monitor analytics for errors
- Check customer feedback
- Verify menu availability

### Weekly
- Update menu items/prices
- Add new items
- Review popular items

### Monthly
- Performance audit
- Customer satisfaction survey
- Staff feedback session
- Feature planning

---

## Conclusion

This implementation plan provides a complete roadmap to launch the Amante QR Menu system in 2-3 weeks. The MVP approach with static JSON data minimizes risk and complexity while delivering immediate value.

**Key Success Factors:**
1. Mobile-first design
2. Fast loading (< 2s)
3. Intuitive navigation
4. Accurate menu data
5. Staff training
6. Backup plan

**Timeline Summary:**
- Week 1: Foundation + Data + Landing Page
- Week 2: Features + Polish
- Week 3: Testing + Launch

**Expected Outcome:**
A premium, mobile-optimized menu experience that positions Amante as technology-forward while reducing operational costs and improving customer satisfaction.

---

**Ready to begin implementation?** Let's start with data conversion and landing page development!

**Document Version:** 1.0
**Last Updated:** October 17, 2025
**Next Review:** After MVP launch
