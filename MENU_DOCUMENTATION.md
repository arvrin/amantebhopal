# Amante Menu System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Menu Data Structure](#menu-data-structure)
5. [Pages & Components](#pages--components)
6. [Features](#features)
7. [Styling & Design](#styling--design)
8. [Assets](#assets)
9. [Deployment](#deployment)
10. [Maintenance](#maintenance)

---

## Overview

The Amante menu system is a Next.js 15.5.2 application that provides an interactive digital menu experience for three venues: Food, Bar, and Café. The system uses TypeScript, Tailwind CSS, and Framer Motion for a modern, responsive interface.

### Key Statistics
- **Food Menu**: 146 items across 15 categories (70.4% coverage from source PDF)
- **Bar Menu**: 149 items with bottle pricing options
- **Café Menu**: 45 items across 7 categories (100% coverage)
- **Total Items**: 340+ menu items

---

## Architecture

### Technology Stack
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Image Format**: SVG (optimized for scalability)

### Design Principles
1. **Mobile-first**: Optimized for smartphone viewing
2. **Performance**: SVG logos, optimized images, minimal bundle size
3. **Accessibility**: Proper ARIA labels, semantic HTML
4. **Maintainability**: JSON-based menu data for easy updates

---

## File Structure

```
/Users/aaryavar/Documents/ARVR Project Codes/Amante/amante-coming-soon/
│
├── src/
│   ├── app/
│   │   └── menu/
│   │       ├── page.tsx                    # Main menu landing page
│   │       └── [category]/
│   │           └── page.tsx                # Dynamic category pages (food/bar/cafe)
│   │
│   └── data/
│       └── menus/
│           ├── food.json                   # Food menu data (146 items)
│           ├── bar.json                    # Bar menu data (149 items)
│           └── cafe.json                   # Café menu data (45 items)
│
├── public/
│   └── assets/
│       └── logos/
│           └── Primary Logo/
│               └── SVG/
│                   └── Red Logo.svg        # Primary logo (currently used)
│
├── scripts/
│   ├── verify-food-menu-actual.js          # Verification script for food menu
│   ├── add-missing-food-items.js           # Script to add missing food items
│   ├── verify-cafe-menu-actual.js          # Verification script for café menu
│   └── add-missing-cafe-items.js           # Script to add missing café items
│
└── Menu/                                    # Source PDFs
    ├── Food Final menu_2025.pdf
    ├── BAR MENU FINAL 2024.pdf
    └── COFEE MENU FINAL_.pdf
```

---

## Menu Data Structure

### JSON Schema

Each menu JSON file follows this structure:

```typescript
interface MenuItem {
  id: string;                    // Unique identifier (e.g., "food-app-001")
  name: string;                  // Item name
  description: string;           // Item description
  price: number;                 // Price in INR
  bottlePrice?: number;          // Optional bottle price (bar items only)
  category: string;              // Category ID
  dietary?: string[];            // ["veg", "non-veg"]
  spiceLevel?: number;           // 1-3 (chili peppers)
  isRecommended?: boolean;       // Recommended tag
  isChefSpecial?: boolean;       // Chef's Special tag
  isNew?: boolean;               // New item tag
  isAvailable?: boolean;         // Availability status
  allergens?: string[];          // Allergen information
}

interface MenuCategory {
  id: string;                    // Category identifier
  name: string;                  // Display name
  description: string;           // Category description
  displayOrder?: number;         // Sort order
  items: MenuItem[];             // Array of menu items
}

interface Menu {
  venue: string;                 // "food", "bar", or "cafe"
  name: string;                  // Menu display name
  description: string;           // Menu description
  tagline?: string;              // Optional tagline
  categories: MenuCategory[];    // Array of categories
  lastUpdated?: string;          // ISO timestamp
}
```

### Example Menu Item

```json
{
  "id": "food-app-001",
  "name": "Yasai Yakitori",
  "description": "Charcoal grilled seasonal vegetables with yakitori sauce",
  "price": 549,
  "category": "appetizers",
  "dietary": ["veg"],
  "isRecommended": true,
  "isAvailable": true
}
```

### Example Bar Item with Bottle Price

```json
{
  "id": "bar-gin-001",
  "name": "Bombay Sapphire",
  "description": "Premium London Dry Gin",
  "price": 450,
  "bottlePrice": 4500,
  "category": "gin",
  "isAvailable": true
}
```

---

## Pages & Components

### 1. Main Menu Landing Page (`/menu/page.tsx`)

**Route**: `/menu`

**Features**:
- Full-width SVG logo (h-64/h-80/h-96)
- Three category cards: Food, Bar, Café
- Animated entrance with Framer Motion
- Gradient background
- Footer with address and Restronaut branding

**Layout**:
```
┌─────────────────────────────┐
│                             │
│      [LOGO - SVG]           │
│      ◆ (Diamond)            │
│                             │
│   Explore Our Menus         │
│   A celebration...          │
│                             │
├─────────────────────────────┤
│   ┌─────────────────────┐   │
│   │  🍴 Food Menu       │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │  🍷 Bar Menu        │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │  ☕ Café Menu       │   │
│   └─────────────────────┘   │
├─────────────────────────────┤
│   Address • Contact         │
│   Powered by Restronaut     │
└─────────────────────────────┘
```

**Key Code Sections**:

```typescript
// Logo Section (Full-width, no container)
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center py-4 md:py-6"
>
  <Image
    src="/assets/logos/Primary Logo/SVG/Red Logo.svg"
    alt="Amante"
    className="h-64 md:h-80 lg:h-96 w-auto"
  />
</motion.div>

// Category Cards (Contained)
<div className="container mx-auto px-4 max-w-3xl">
  {categories.map((category, index) => (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
    >
      {/* Card content */}
    </motion.div>
  ))}
</div>
```

---

### 2. Category Pages (`/menu/[category]/page.tsx`)

**Routes**: `/menu/food`, `/menu/bar`, `/menu/cafe`

**Features**:
- Sticky header with logo (h-32/h-40)
- Search functionality
- Category filters
- Veg/Non-veg filter (food only)
- Dietary indicators (green/red circles)
- Special tags (Recommended, Chef's Special)
- Spice level indicators (🌶️)
- Bottle pricing display (bar only)
- Animated item cards
- Footer with Restronaut branding

**Layout**:
```
┌─────────────────────────────┐
│ ← Back  [LOGO]          │   │  <- Sticky Header
│                             │
│ [Search Bar]                │
│ [Veg Only*] [Category 1]... │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ ● Item Name        ₹549 │ │
│ │ Description...          │ │
│ │ 🌶️🌶️                   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ ● Item Name        ₹799 │ │
│ │ Description...          │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ All prices inclusive taxes  │
│ ♦ AMANTE ♦                  │
│ Powered by Restronaut       │
└─────────────────────────────┘

* Veg Only filter only on food menu
```

**Key Features Implementation**:

#### Search Filter
```typescript
const filteredItems = useMemo(() => {
  let items = allItems;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    items = items.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  return items;
}, [allItems, searchQuery]);
```

#### Veg Only Filter (Food Menu Only)
```typescript
{resolvedParams.category === 'food' && (
  <button
    onClick={() => setShowVegOnly(!showVegOnly)}
    className={`px-4 py-2 rounded-full ${
      showVegOnly
        ? 'bg-green-600 text-white'
        : 'bg-gray-100 text-gray-700'
    }`}
  >
    <Leaf size={16} />
    Veg Only
  </button>
)}
```

#### Dietary Indicators
```typescript
const DietaryIcon = ({ dietary }: { dietary?: string[] }) => {
  const isVeg = dietary?.includes('veg') && !dietary?.includes('non-veg');
  const isNonVeg = dietary?.includes('non-veg');

  if (isVeg) {
    return (
      <div className="w-5 h-5 border-2 border-green-600 rounded">
        <Circle className="w-2.5 h-2.5 fill-green-600" />
      </div>
    );
  }
  if (isNonVeg) {
    return (
      <div className="w-5 h-5 border-2 border-red-600 rounded">
        <Circle className="w-2.5 h-2.5 fill-red-600" />
      </div>
    );
  }
  return null;
};
```

#### Bottle Price Display (Bar Menu)
```typescript
{item.bottlePrice && (
  <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
    ₹{item.bottlePrice.toLocaleString('en-IN')} (Bottle)
  </p>
)}
```

---

## Features

### 1. Search Functionality
- Real-time search across item names and descriptions
- Case-insensitive matching
- Clear button to reset search
- Animated results

### 2. Filtering System

#### Category Filters
- Available on all menu pages
- Toggle between categories
- Burgundy highlight when active
- Horizontal scrollable on mobile

#### Veg Only Filter
- **Food Menu Only**: Displays veg-only items
- **Bar & Café**: Filter not shown (not applicable)
- Green highlight when active

### 3. Item Display

#### Tags & Badges
- **Recommended**: Amber badge
- **Chef's Special**: Burgundy badge
- **New**: Can be added to items

#### Dietary Information
- **Veg**: Green circle indicator
- **Non-veg**: Red circle indicator
- Square border with filled circle

#### Spice Level
- Displayed as chili pepper emojis (🌶️)
- 1-3 levels supported
- Only shown for applicable items

#### Pricing
- Glass/Cup price: Primary display
- Bottle price: Secondary display (bar only)
- INR currency format with ₹ symbol
- Thousand separators (e.g., ₹4,500)

### 4. Animations

All animations use Framer Motion:

```typescript
// Page entrance
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Item cards
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ delay: index * 0.05 }}
>

// AnimatePresence for filtered results
<AnimatePresence mode="wait">
  {filteredItems.map(...)}
</AnimatePresence>
```

### 5. Responsive Design

#### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: md (≥ 768px)
- **Desktop**: lg (≥ 1024px)

#### Logo Sizes
**Main Menu Page**:
- Mobile: h-64 (256px)
- Tablet: h-80 (320px)
- Desktop: h-96 (384px)

**Category Pages**:
- Mobile: h-32 (128px)
- Tablet: h-40 (160px)

---

## Styling & Design

### Color Palette

```css
Primary Brand Color (Burgundy): #8B1538
Background: #FFF5F0
White: #FFFFFF
Gray Scale:
  - Gray 100: #F3F4F6
  - Gray 200: #E5E7EB
  - Gray 400: #9CA3AF
  - Gray 500: #6B7280
  - Gray 600: #4B5563
  - Gray 700: #374151
  - Gray 900: #111827
Dietary Indicators:
  - Veg: #16A34A (Green 600)
  - Non-veg: #DC2626 (Red 600)
Recommended: #F59E0B (Amber 500)
```

### Typography

```css
Font Family: System fonts (Tailwind default)
Serif: font-serif (for headings)

Font Sizes:
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
```

### Component Styling

#### Menu Cards (Main Page)
```css
Background: Gradient from burgundy/10 to pink
Border: 2px solid burgundy/20
Border Radius: rounded-2xl (1rem)
Padding: p-4 (1rem)
Shadow: shadow-lg, hover:shadow-2xl
Transition: duration-300
Active State: scale-[0.98]
```

#### Item Cards (Category Pages)
```css
Background: White
Border: 1px solid gray-100
Border Radius: rounded-xl (0.75rem)
Padding: p-4 (1rem)
Shadow: shadow-sm, hover:shadow-md
```

#### Buttons
```css
Filter Buttons:
  - Default: bg-gray-100 text-gray-700
  - Active: bg-burgundy text-white (or bg-green-600 for veg)
  - Border Radius: rounded-full
  - Padding: px-4 py-2

Search Clear Button:
  - Color: text-gray-400 hover:text-gray-600
  - Size: 20px icon
```

---

## Assets

### Logo Files

#### Currently Used
- **Path**: `/assets/logos/Primary Logo/SVG/Red Logo.svg`
- **Format**: SVG (vector)
- **Color**: Burgundy (#8B1538)
- **Usage**: All menu pages

#### Available Alternatives

**Primary Logo PNG**:
- `/assets/logos/Primary Logo/PNG/Red Logo.png` (152KB)
- `/assets/logos/Primary Logo/PNG/Black Logo.png`
- `/assets/logos/Primary Logo/PNG/Pink Logo.png`
- `/assets/logos/Primary Logo/PNG/White Logo_BlackBG.png`

**Primary Logo SVG**:
- `/assets/logos/Primary Logo/SVG/Red Logo.svg` ✓ (In use)
- `/assets/logos/Primary Logo/SVG/Black Logo.svg`
- `/assets/logos/Primary Logo/SVG/Pink Logo.svg`
- `/assets/logos/Primary Logo/SVG/White Logo_BlackBG.svg`

**Other Variants**:
- Secondary Logo (with different styling)
- Logo with Tagline
- Icon only versions

### Why SVG?
1. **Perfect Scalability**: Vector format scales without quality loss
2. **File Size**: Much smaller than PNG (typically 10-20% of PNG size)
3. **Retina Ready**: Always sharp on high-DPI displays
4. **Performance**: Faster page loads
5. **Future-proof**: Easy to resize without re-exporting

---

## Deployment

### Vercel Configuration

**Project**: amante-coming-soon
**Production URL**: https://amante-coming-soon-[hash]-aaryavars-projects.vercel.app

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Build output
Route (app)                         Size  First Load JS
┌ ○ /                            58.5 kB         173 kB
├ ○ /menu                        5.12 kB         162 kB
└ ƒ /menu/[category]             19.5 kB         177 kB
```

### Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Check deployment logs
vercel inspect [deployment-url] --logs
```

### Git Workflow

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Description

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Deploy to Vercel (automatic on push in CI/CD setup)
vercel --prod
```

---

## Maintenance

### Adding New Menu Items

#### 1. Manual Addition

Edit the appropriate JSON file (`food.json`, `bar.json`, or `cafe.json`):

```json
{
  "id": "food-app-999",
  "name": "New Item Name",
  "description": "Detailed description",
  "price": 599,
  "category": "appetizers",
  "dietary": ["veg"],
  "spiceLevel": 2,
  "isRecommended": true,
  "isAvailable": true
}
```

#### 2. Using Verification Scripts

**Step 1**: Update source PDF in `/Menu/` folder

**Step 2**: Run verification script:
```bash
node scripts/verify-food-menu-actual.js
# or
node scripts/verify-cafe-menu-actual.js
```

**Step 3**: Review missing items output

**Step 4**: Run addition script:
```bash
node scripts/add-missing-food-items.js
# or
node scripts/add-missing-cafe-items.js
```

**Step 5**: Build and deploy:
```bash
npm run build
git add .
git commit -m "Add new menu items"
vercel --prod
```

### Updating Prices

1. Edit JSON file
2. Update `price` or `bottlePrice` fields
3. Build and deploy

### Changing Categories

1. Edit JSON file
2. Update category `name` or `description`
3. Rebuild for changes to take effect

### Updating Address

Edit both menu pages:

**Main Menu Page** (`src/app/menu/page.tsx`):
```typescript
<p className="text-gray-600 text-xs mb-1">
  1, Mahendra Business Square, Bawadia Kalan, Bhopal
</p>
```

**Category Pages** (`src/app/menu/[category]/page.tsx`):
```typescript
<p className="text-center py-8 text-gray-500 text-sm">
  All prices are inclusive of taxes
</p>
```

### Menu Data Validation

Run these checks before deploying:

```bash
# Check JSON syntax
node -e "require('./src/data/menus/food.json')"
node -e "require('./src/data/menus/bar.json')"
node -e "require('./src/data/menus/cafe.json')"

# Build test
npm run build

# Type check
npx tsc --noEmit
```

---

## Common Issues & Solutions

### Issue 1: Items Not Appearing

**Symptoms**: Menu items don't show on the page

**Solutions**:
1. Check `isAvailable` is `true`
2. Verify JSON syntax is correct
3. Ensure category ID matches
4. Check filter settings (veg filter, category filter)

### Issue 2: Logo Not Loading

**Symptoms**: Broken image or missing logo

**Solutions**:
1. Verify file path: `/assets/logos/Primary Logo/SVG/Red Logo.svg`
2. Check file exists in `public/` folder
3. Clear Next.js cache: `rm -rf .next`
4. Rebuild: `npm run build`

### Issue 3: Filters Not Working

**Symptoms**: Clicking filters doesn't update results

**Solutions**:
1. Check React state is updating
2. Verify `useMemo` dependencies
3. Ensure filter logic matches data structure
4. Check category names match exactly

### Issue 4: Slow Performance

**Solutions**:
1. Verify SVG is being used (not PNG)
2. Check bundle size with `npm run build`
3. Optimize images in `public/assets/`
4. Review Framer Motion animation delays

---

## Performance Metrics

### Build Sizes
- **Main Page**: 58.5 kB
- **Menu Landing**: 5.12 kB
- **Category Pages**: 19.5 kB (dynamic)
- **First Load JS**: ~162-177 kB

### Optimization Techniques
1. **SVG Logos**: Vector format for scalability
2. **Code Splitting**: Dynamic routes for category pages
3. **Lazy Loading**: Images loaded on demand
4. **Static Generation**: Menu landing page pre-rendered
5. **CSS Optimization**: Tailwind CSS purging unused styles

---

## Browser Support

### Tested Browsers
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Required Features
- ES6+ JavaScript
- CSS Grid & Flexbox
- SVG support
- CSS Custom Properties
- Viewport units (vh, vw)

---

## Security Considerations

### External Links
All external links use security attributes:
```typescript
<a
  href="https://restronaut.in"
  target="_blank"
  rel="noopener noreferrer"
>
```

### Content Security
- No user-generated content
- Static menu data
- No form submissions
- Read-only interface

---

## Future Enhancements

### Potential Features
1. **Multi-language Support**: English, Hindi
2. **Allergen Filters**: Filter by allergens
3. **Nutritional Information**: Calories, macros
4. **Favorites System**: Save favorite items
5. **Online Ordering**: Integration with ordering system
6. **QR Code Generation**: Direct links to menu sections
7. **Daily Specials**: Time-based menu changes
8. **Image Gallery**: Item photos
9. **Reviews & Ratings**: Customer feedback
10. **PDF Export**: Downloadable menu

### Technical Improvements
1. **Testing**: Unit tests, E2E tests
2. **Analytics**: Track popular items
3. **A/B Testing**: Menu presentation variations
4. **PWA**: Progressive Web App capabilities
5. **Offline Support**: Service worker caching
6. **Admin Panel**: Menu management interface

---

## Contact & Support

### Project Information
- **Location**: 1, Mahendra Business Square, Bawadia Kalan, Bhopal
- **Email**: contact.cafeamante@gmail.com
- **Website**: www.cafeamante.com

### Technical Support
- **Powered by**: [Restronaut](https://restronaut.in)
- **Framework**: Next.js 15.5.2
- **Deployment**: Vercel

---

## Version History

### Current Version: 1.0.0

**Changes Log**:

#### 2025-10-17
- Switched from PNG to SVG logo format
- Increased logo sizes on all pages
- Removed container padding from logo section
- Optimized logo sizes for category pages (h-32/h-40)
- Updated address to "Bawadia Kalan"
- Added "Powered by Restronaut" footer link
- Removed Veg Only filter from bar and café menus

#### Previous Updates
- Added 59 missing food items (70.4% coverage achieved)
- Added missing café item: Piccolo (Cortado) - ₹189 (100% coverage)
- Implemented bottle pricing for bar menu items
- Created verification and addition scripts
- Improved menu page layout and spacing
- Enhanced responsive design

---

## Appendix

### File Naming Conventions

**Menu Item IDs**:
- Format: `{venue}-{category}-{number}`
- Example: `food-app-001`, `bar-gin-005`, `cafe-hot-007`

**Category IDs**:
- Lowercase, hyphenated
- Example: `appetizers`, `hot-coffee`, `signature-cocktails`

### JSON Best Practices

1. **Always validate JSON** before committing
2. **Maintain consistent formatting** (2-space indentation)
3. **Keep IDs sequential** within categories
4. **Update lastUpdated** timestamp
5. **Use consistent price format** (no decimals for whole rupees)

### Deployment Checklist

Before each deployment:

- [ ] Verify all JSON files are valid
- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run dev`
- [ ] Check all pages load correctly
- [ ] Verify search and filters work
- [ ] Test on mobile viewport
- [ ] Review changes in git diff
- [ ] Write descriptive commit message
- [ ] Deploy to Vercel
- [ ] Verify production deployment
- [ ] Test live site on mobile device

---

**Last Updated**: October 17, 2025
**Document Version**: 1.0.0
**Maintained by**: Amante Team with Restronaut
