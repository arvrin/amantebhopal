# QR Menu System - Quick Reference Guide
## Essential Information at a Glance

**Last Updated:** October 17, 2025

---

## 📋 Document Index

| Document | Purpose | Key Content |
|----------|---------|-------------|
| **QR_MENU_EXECUTIVE_SUMMARY.md** | Management overview | ROI, timeline, budget, recommendations |
| **QR_MENU_RESEARCH_ANALYSIS.md** | Detailed research | Best practices, UX patterns, accessibility |
| **QR_MENU_IMPLEMENTATION_GUIDE.md** | Developer guide | Code examples, setup instructions |
| **QR_MENU_DESIGN_SPECS.md** | Design reference | Visual specs, component designs |
| **This document** | Quick reference | Cheat sheet, common tasks |

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install @prisma/client prisma swr qrcode.react react-to-print

# Database setup
npx prisma init
npx prisma migrate dev --name init
npx prisma generate

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 🎨 Brand Colors (Copy-Paste Ready)

```css
/* Primary */
--amante-red: #B91C1C;
--amante-red-dark: #991B1B;
--amante-red-light: #DC2626;

/* Secondary */
--amante-pink: #F8BBD9;
--amante-pink-light: #FCE7F3;

/* Neutrals */
--amante-black: #1F1F1F;
--amante-white: #FFFFFF;
--amante-gray: #6B7280;

/* Functional */
--veg-green: #16A34A;
--spicy-red: #DC2626;
```

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind CSS breakpoints
sm: '640px'   // Small phones
md: '768px'   // Tablets
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

---

## 🔤 Typography Quick Copy

```tsx
// Page Title
<h1 className="font-baskerville text-4xl font-bold text-amante-black">

// Category Header
<h2 className="font-baskerville text-2xl font-semibold text-amante-black">

// Menu Item Name
<h3 className="font-baskerville text-xl font-bold text-amante-black">

// Description
<p className="text-base text-gray-600 leading-relaxed">

// Price
<span className="text-lg font-semibold text-amante-red font-mono">₹{price}</span>
```

---

## 📊 Database Schema (Essential Fields)

```typescript
// Menu Item
{
  id: string
  slug: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string

  // Dietary
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  jain: boolean

  // Meta
  spiceLevel: 1-5
  allergens: string[]
  available: boolean
  chefRecommended: boolean
}
```

---

## 🔗 API Endpoints

```
GET  /api/menu              → All venues
GET  /api/menu/food         → Food menu
GET  /api/menu/bar          → Bar menu
GET  /api/menu/cafe         → Café menu
GET  /api/menu/search?q=... → Search items
```

---

## 📷 Image Specifications

| Type | Dimensions | Format | Max Size |
|------|-----------|--------|----------|
| Menu Item | 1200×900 (4:3) | WebP | 150KB |
| Category Hero | 1920×1080 (16:9) | WebP | 200KB |
| QR Code | 512×512 | PNG/SVG | 50KB |

---

## ✅ Performance Targets

```
LCP (Largest Contentful Paint):  < 2.5s   ✅
FID (First Input Delay):         < 100ms  ✅
CLS (Cumulative Layout Shift):   < 0.1    ✅
Mobile PageSpeed Score:          > 90     ✅
Accessibility Score:             100      ✅
```

---

## 🎯 QR Code Specifications

```
Size: 2" × 2" minimum (table placement)
Error Correction: Level H (30%)
Colors: Black on White (optimal)
Format: SVG (web), PNG (print)
DPI: 300 for print
```

---

## 🛠️ Common Code Snippets

### Environment Variables (.env)

```bash
# Database
DATABASE_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgres://..."

# CDN
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Site
NEXT_PUBLIC_SITE_URL="https://amante.com"
```

### Fetch Menu Data

```typescript
// Server Component
const menu = await prisma.venue.findUnique({
  where: { slug: 'food' },
  include: { categories: { include: { items: true } } }
});

// Client Component
const { data } = useSWR('/api/menu/food', fetcher);
```

### Generate QR Code

```tsx
import { QRCodeSVG } from 'qrcode.react';

<QRCodeSVG
  value="https://amante.com/menu/food"
  size={256}
  level="H"
  includeMargin
/>
```

---

## 🔍 Dietary Filter Logic

```typescript
const filters = {
  vegetarian: items.filter(item => item.vegetarian),
  vegan: items.filter(item => item.vegan),
  glutenFree: items.filter(item => item.glutenFree),
  jain: items.filter(item => item.jain),
};

// Multi-select
const filtered = items.filter(item =>
  activeFilters.every(filter => item[filter])
);
```

---

## 📱 Accessibility Checklist

```
✅ Color contrast: 4.5:1 minimum
✅ Alt text for all images
✅ ARIA labels on buttons
✅ Keyboard navigation working
✅ Focus indicators visible (3px red outline)
✅ Screen reader tested
✅ Touch targets: 44×44px minimum
✅ Text resizable to 200%
```

---

## 💾 Data Migration Scripts

### Excel to JSON

```bash
# Run conversion script
node scripts/convert-excel-to-json.ts menu-data.xlsx

# Output: prisma/menu-data.json
```

### Seed Database

```bash
# Seed from JSON
npm run db:seed

# Or manually
npx tsx prisma/seed.ts
```

---

## 🎭 Animation Patterns

```tsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// Slide up
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// Stagger children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

---

## 🔧 Troubleshooting Quick Fixes

### Issue: Images not loading
```bash
# Check CDN configuration in next.config.ts
images: {
  domains: ['res.cloudinary.com'],
}

# Regenerate optimized images
npm run build
```

### Issue: Database connection error
```bash
# Regenerate Prisma client
npx prisma generate

# Check .env file has correct DATABASE_URL
```

### Issue: QR code not scanning
```
- Increase size to 2×2 inches minimum
- Ensure high contrast (black on white)
- Check URL is publicly accessible
- Test in different lighting
```

### Issue: Slow page load
```bash
# Run Lighthouse audit
npm run build && npm start
npx lighthouse http://localhost:3000/menu

# Check image sizes
# Implement lazy loading
# Enable caching headers
```

---

## 📈 Analytics Events to Track

```typescript
// Track QR scan
trackEvent('qr_scan', { venue: 'food' });

// Track menu view
trackEvent('menu_view', { venue, category });

// Track item view
trackEvent('item_view', { itemId, itemName });

// Track search
trackEvent('menu_search', { query, resultsCount });

// Track filter usage
trackEvent('filter_applied', { filterType });
```

---

## 🎨 Component Import Quick Reference

```typescript
// Common imports
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ChefHat, Leaf } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';

// SWR for data fetching
import useSWR from 'swr';
const { data, error, isLoading } = useSWR('/api/menu', fetcher);
```

---

## 🚦 Deploy Checklist

```
Pre-Deployment:
☐ Run database migration on production
☐ Upload all images to CDN
☐ Set environment variables in Vercel
☐ Test QR codes with production URLs
☐ Run Lighthouse audit (score > 90)
☐ Run accessibility audit (score = 100)
☐ Test on iPhone and Android
☐ Verify offline mode works

Post-Deployment:
☐ Monitor error rates (Sentry)
☐ Check Core Web Vitals
☐ Test QR codes from physical location
☐ Verify analytics tracking
☐ Gather initial user feedback
```

---

## 💡 Pro Tips

### Performance
- Use `next/image` for ALL images
- Enable `priority` only for above-fold images
- Implement skeleton screens for loading states
- Use dynamic imports for heavy components

### SEO
- Add unique meta titles per venue
- Include structured data (Schema.org)
- Generate sitemap for all routes
- Use semantic HTML (nav, main, article)

### Accessibility
- Test with screen reader (VoiceOver/NVDA)
- Ensure keyboard tab order is logical
- Add skip to content link
- Use ARIA labels for icon-only buttons

### UX
- Show loading states immediately
- Provide clear error messages
- Keep filter state in URL (shareable)
- Add "Back to Top" on long menus

---

## 📞 Support Resources

### Documentation
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

### Tools
- Lighthouse: `npx lighthouse [url]`
- Pa11y (Accessibility): `npx pa11y [url]`
- QR Code Generator: https://qr-code-generator.com
- Image Optimization: https://squoosh.app

### Testing
- BrowserStack: Cross-browser testing
- LambdaTest: Real device testing
- WebAIM Contrast Checker: Color contrast
- WAVE: Accessibility evaluation

---

## 📝 Common Tasks Cheat Sheet

```bash
# Add new menu item
npm run db:seed -- --add-item

# Update menu prices
npm run db:update -- --prices

# Mark items as sold out
npm run db:update -- --sold-out item-slug

# Generate new QR codes
npm run qr:generate

# Backup database
npx prisma db pull

# Reset database
npx prisma migrate reset

# View database in browser
npx prisma studio
```

---

## 🎯 Success Metrics Dashboard

Track these weekly:

```
User Engagement:
- QR scan rate: ____% (target: 80%+)
- Avg session time: ____ min (target: 3-5min)
- Search usage: ____% (target: 40%+)
- Filter usage: ____% (target: 35%+)

Performance:
- LCP: ____ s (target: <2.5s)
- Mobile score: ____ (target: >90)
- Error rate: ____% (target: <1%)

Business:
- AOV increase: ____% (target: 60%+)
- Menu updates/week: ____
- Print cost savings: ₹____
```

---

## 🔄 Update Menu Content (Quick Guide)

### Via Admin Dashboard (Coming Soon)
1. Login to admin panel
2. Navigate to Menu Management
3. Select venue → category
4. Edit item or add new
5. Preview changes
6. Publish

### Via Database (Current)
```typescript
// Update price
await prisma.menuItem.update({
  where: { slug: 'paneer-tikka' },
  data: { price: 449 }
});

// Mark sold out
await prisma.menuItem.update({
  where: { slug: 'butter-chicken' },
  data: { available: false }
});

// Add new item
await prisma.menuItem.create({
  data: {
    slug: 'malai-kofta',
    name: 'Malai Kofta',
    description: 'Cottage cheese dumplings in creamy gravy',
    price: 399,
    categoryId: 'main-course-id',
    vegetarian: true,
    // ... other fields
  }
});
```

---

## 📄 Print Menu Quick Export

```tsx
// Print current page
window.print();

// Download PDF
import { generateMenuPDF } from '@/lib/pdf';
const pdf = await generateMenuPDF('food');
pdf.save('Amante-Food-Menu.pdf');
```

---

## 🌐 Multi-Language Support (Future)

```typescript
// Setup i18n
const translations = {
  en: { menuTitle: 'Menu' },
  hi: { menuTitle: 'मेनू' }
};

// Usage
const { locale } = useRouter();
const t = translations[locale];

<h1>{t.menuTitle}</h1>
```

---

**END OF QUICK REFERENCE**

For detailed information, refer to the comprehensive documentation files listed at the top of this document.

Happy coding! 🚀
