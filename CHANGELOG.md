# Changelog - Amante Menu System

All notable changes to the Amante digital menu system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.4.1] - 2025-12-28

### Bar Menu Update

#### 14:41 IST - Added 7 New Craft Mocktails

**New Items Added** (all priced at ₹399):

| ID | Name | Description |
|----|------|-------------|
| bar-mocktail-017 | TROPICAL LEMONADE | Cold pressed pineapple juice, clove, topped with lemonade |
| bar-mocktail-018 | SWEET SONNET | Fresh orange & mint leaves, Indian spices, topped with orange juice & aerated water |
| bar-mocktail-019 | EL JEFE | Passion fruit, grape & orange juice, chili and bitters |
| bar-mocktail-020 | THA TRAVELER | Elderflower with coriander, lime salt, topped with ginger ale |
| bar-mocktail-021 | ASIAN CRAFT | Cold pressed pineapple juice, homemade lemongrass, topped with tonic water |
| bar-mocktail-022 | UMAMI | Fresh pineapple slices & coriander, blueberry crush & salt |
| bar-mocktail-023 | MELON & LEMONS | Cold pressed watermelon juice, kaffir lime, topped with lemonade |

**Impact**:
- Mocktails section: 16 → 23 items (+7)
- Bar menu total: 153 → 160 items
- Total menu items: 348 → 355 items

**File Modified**: `src/data/menus/bar.json` (lines 438-493)

**Commits**:
- `cded502` - feat(menu): Add 7 new craft mocktails to bar menu

**Build Status**: ✅ Successful
**Deployment**: Pushed to origin/main

---

## [1.4.0] - 2025-12-17

### Time-Based Menu Experience

#### 16:45 IST - Added Dynamic Greeting & Breakfast Prioritization

**New Features**:
- **Dynamic Greeting System**: Displays time-appropriate greetings in the menu header
  - Good Morning (5:00 AM - 11:59 AM)
  - Good Afternoon (12:00 PM - 4:59 PM)
  - Good Evening (5:00 PM - 8:59 PM)
  - Good Night (9:00 PM - 4:59 AM)

- **Breakfast Menu Prioritization**: Automatic reordering during breakfast hours (7:30 AM - 12:00 PM)
  - Breakfast menu card moves to top position
  - "Now Serving Breakfast" banner appears with quick-access button
  - "Live" badge with pulse animation on breakfast card
  - Highlighted card styling (burgundy border, filled icon)

- **Auto-Refresh**: Menu updates every 60 seconds to reflect time changes

**Files Modified**:
- `src/app/menu/page.tsx` - Added state management, time-based logic, and UI enhancements

**Technical Implementation**:
| Feature | Logic |
|---------|-------|
| Greeting | Based on `new Date().getHours()` |
| Breakfast Time | 7:30 AM (450 min) to 12:00 PM (720 min) |
| Reordering | Dynamic array manipulation with `useState` |
| Refresh | `setInterval` every 60,000ms |

**UI Components Added**:
- Greeting text above "Explore Our Menus" title
- "Now Serving Breakfast" banner with Sunrise icon
- "Live" pulse badge on breakfast card
- Highlighted card styling with ring effect

**Commits**:
- `a03174e` - feat(menu): Add time-based greeting and breakfast prioritization

**Build Status**: ✅ Successful
**Deployment**: Pushed to origin/main

---

## [1.3.0] - 2025-12-04

### Homepage Fluid Typography & Responsive Design Overhaul

#### 13:30 IST - Fixed Small Text on Mobile Devices
- **Issue**: Pure `vw` values in `clamp()` resulted in tiny text on narrow mobile screens
- **Solution**: Implemented hybrid `vw + rem` formula for fluid sizing
- **Files Modified**:
  - `src/components/HeroCarousel/index.tsx`
  - `src/components/HomePage.tsx`

**Typography Updates**:
| Element | Before | After |
|---------|--------|-------|
| Headline | `clamp(2.5rem, 8vw, 5.5rem)` | `clamp(3.25rem, 4vh + 2rem, 5.5rem)` |
| Subheadline | `clamp(1.125rem, 3.5vw, 1.75rem)` | `clamp(1.35rem, 2vh + 0.5rem, 1.75rem)` |
| Body Text | `clamp(0.65rem, 1.5vw, 1rem)` | `clamp(0.75rem, 1vw + 0.5rem, 1rem)` |
| Button Text | `clamp(0.625rem, 1.5vw, 0.875rem)` | `clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)` |
| Strip Text | `clamp(0.625rem, 1.5vw, 1rem)` | `clamp(0.7rem, 0.5vw + 0.5rem, 1rem)` |

**Key Improvements**:
- Headlines now use `vh` (viewport height) scaling instead of `vw` for better mobile proportions
- Increased minimum sizes across all text elements
- Button padding uses hybrid formula for consistent sizing

#### 13:20 IST - Implemented Fluid Typography System
- **Technique**: CSS `clamp()` function for intrinsic/fluid design
- **Approach**: All sizing scales smoothly from mobile to desktop without breakpoints
- Replaced fixed pixel values with viewport-relative units

#### 13:15 IST - Fixed Scroll Issue on Mobile Devices
- Added `overflow: hidden` and `overscroll-behavior: none` to html/body
- Changed viewport height from `100vh` to `100dvh` (dynamic viewport height)
- Prevents scroll on devices with dynamic browser chrome

#### Earlier Updates
- **Responsive Collage Grid**: 3×5 on mobile, 5×4 on desktop
- **Social Icons**: Fixed centering and circle distortion on mobile
- **Scrolling Strip**: Adjusted positioning for proper spacing
- **Decorative Elements**: Removed dividers from hero section
- **Showcase Pages**: Deleted all showcase directories

### Commits
- `58ddf2b` - Fix fluid typography with hybrid vw+rem and vh-based heading scaling
- `07c715c` - Implement fluid typography and adaptive sizing for homepage
- `3d81078` - Apply showcase enhancements to main homepage

### Menu Export
- **Generated**: `Amante_Complete_Menu_2025-12-04.xlsx`
- **Contents**: 3 sheets (Food: 150 items, Bar: 153 items, Café: 45 items)
- **Total**: 348 menu items

### Technical Details
- Build Status: ✅ Successful (43 pages)
- Deployment: ✅ Vercel Production

---

## [1.2.0] - 2025-10-19

### Changed

#### Bar Menu Serving Size Standardization
- **Updated serving size from 90ml to 30ml** for 11 drinks
- **Impact**: Standardized all spirit servings to 30ml across the entire bar menu
- **Categories affected**: Bourbon/Irish/American Whisky (3 items) and Vodka (8 items)

**Bourbon/Irish/American Whisky Category**:
1. TOKI - 90ml → 30ml
2. JIM BEAM - 90ml → 30ml
3. JAMESON - 90ml → 30ml

**Vodka Category**:
4. ROBERTO CAVALLI - 90ml → 30ml
5. GREY GOOSE - 90ml → 30ml
6. CIROC - 90ml → 30ml
7. ABSOLUT - 90ml → 30ml
8. BELVEDRE - 90ml → 30ml
9. SAUSAGE TREE IRISH - 90ml → 30ml
10. MAGIC MOMENT - 90ml → 30ml
11. SMIRNOFF - 90ml → 30ml

**Technical Details**:
- File modified: `src/data/menus/bar.json`
- Lines affected: 809, 818, 827, 844, 853, 863, 872, 881, 890, 899, 908
- Build status: ✅ Successful
- Deployment: ✅ Vercel Production

**Rationale**:
- Industry standard serving size for spirits is 30ml (1 oz)
- Ensures consistency across all premium spirits categories
- All Whisky, Single Malt, Tequila, Gin, Rum, Brandy, and Liqueurs already use 30ml
- Improves menu clarity and portion control

### Deployed
- **Production URL**: https://amante-coming-soon-7fi3o3jbq-aaryavars-projects.vercel.app
- **Deployment Date**: October 19, 2025
- **Build Time**: ~2.1s (Turbopack)
- **Status**: ✅ Live

---

## [1.1.0] - 2025-10-18

### Major Changes

#### Removed 17 Discontinued Menu Items
- **Impact**: Food menu reduced from 146 to 129 items (-11.6%)
- **Performance**: Category page bundle size reduced from 19.5 kB to 18.9 kB
- **Total Menu Items**: 340+ → 323 items

**Items Removed by Category**:

**Appetizers & Starters (4 items)**:
1. Mushroom Galouti Kebab - ₹699
2. Amante Special KadakNath Tandoori - ₹1,499
3. Amante Special Mutton Galouti Kebab - ₹999
4. Tandoori Fish Tikka (murrel fish) - ₹899

**Soups, Broth & Ramen (2 items)**:
5. Smoked Chicken Tomato and Almond Soup - ₹499
6. Mutton Yakini Shorba - ₹499

**Sushi (2 items)**:
7. Vegetable Tempura Uramaki - ₹999
8. Pickled Wild Mushroom and Tofu Roll - ₹999

**Pizza (2 items)**:
9. Lamb Pepperoni Pizza - ₹1,399
10. Amante Special Interactive Garden Green Pizza - ₹899

**Indian Main Course (2 items)**:
11. Bhopali Mutton Rezala - ₹1,099
12. Chef Interactive Flavored Grilled Bhupali Lamb Chop - ₹1,499

**Pasta, Ravioli & Risotto (2 items)**:
13. Lemon Ricotta Ravioli - ₹699
14. Grilled Mascarpone Polenta with Roasted Pine Nuts - ₹699

**Grills & Mains (1 item)**:
15. Amante Peaking Chicken - ₹4,999

**Desserts (2 items)**:
16. Amante Kulfi Faluda Delite - ₹499
17. Belgium Chocolate Mousse - ₹659

### Fixed
- **Dessert Name Correction**: "Vaklaba" → "Baklava"
  - Updated description to: "Layered phyllo pastry with honey, nuts and aromatic spices"
  - Location: `food.json`, desserts category, item ID: `food-dessert-013`

### Added
- Created automated removal script: `scripts/remove-specified-items.js`
- Created verification report: `scripts/remove-items-report.txt`
- Comprehensive changelog documentation

### Documentation
- Updated MENU_DOCUMENTATION.md to version 1.1.0
- Added detailed removal history
- Updated menu statistics and build sizes

---

## [1.0.0] - 2025-10-17

### Major Changes

#### Logo System Overhaul
- **Switched from PNG to SVG format** across all pages
  - Better scalability and performance
  - Smaller file size (reduced from 152KB PNG)
  - Crystal clear rendering on all screen sizes

#### Logo Size Increases
- **Main Menu Page**: h-64 / h-80 / h-96 (mobile/tablet/desktop)
- **Category Pages**: h-32 / h-40 (mobile/tablet)
- Removed container padding from logo section for full-width display

#### Filter Improvements
- **Removed "Veg Only" filter** from Bar and Café menus
  - Filter now only appears on Food menu
  - More relevant UX for beverage menus

### Changed
- **Address Update**: "MP Nagar" → "Bawadia Kalan"
  - Updated on all menu pages
  - New address: "1, Mahendra Business Square, Bawadia Kalan, Bhopal"

### Added
- **"Powered by Restronaut" branding**
  - Added to all menu page footers
  - External link to https://restronaut.in
  - Subtle gray text with burgundy hover effect
  - Opens in new tab with proper security attributes

- **Comprehensive Documentation**
  - Created MENU_DOCUMENTATION.md (900+ lines)
  - Complete system architecture
  - Detailed component documentation
  - Maintenance guides
  - Troubleshooting section

### Fixed
- Menu page layout and spacing optimization
- Logo display without container constraints

---

## [Previous Updates] - Pre-1.0.0

### Menu Content Updates

#### Food Menu Expansion
- **Added 59 missing items** from Food Final menu_2025.pdf
- **Coverage improved**: 45.1% → 70.4%
- **Total items**: 87 → 146 items
- Added new "Noodle Bowls" category with 5 items
- Created verification script: `scripts/verify-food-menu-actual.js`
- Created addition script: `scripts/add-missing-food-items.js`

#### Café Menu Completion
- **Added 1 missing item**: Piccolo (Cortado) - ₹189
- **Coverage achieved**: 100% (45/45 items)
- Created verification script: `scripts/verify-cafe-menu-actual.js`
- Created addition script: `scripts/add-missing-cafe-items.js`

#### Bar Menu
- **Implemented bottle pricing** for all applicable items
- Added `bottlePrice` field to menu items
- Display format: "₹4,500 (Bottle)"

### Technical Improvements
- Enhanced responsive design across all breakpoints
- Improved menu page layout and spacing
- Optimized component structure
- Better mobile UX

---

## Menu Statistics History

| Version | Food Items | Bar Items | Café Items | Total Items |
|---------|-----------|-----------|------------|-------------|
| 1.4.1   | 150       | 160       | 45         | 355         |
| 1.3.0   | 150       | 153       | 45         | 348         |
| 1.2.0   | 129       | 149       | 45         | 323         |
| 1.1.0   | 129       | 149       | 45         | 323         |
| 1.0.0   | 146       | 149       | 45         | 340         |
| Pre-1.0 | 87        | 149       | 44         | 280         |

---

## Build Size History

| Version | Main Page | Menu Landing | Category Pages | First Load JS |
|---------|-----------|--------------|----------------|---------------|
| 1.1.0   | 58.5 kB   | 5.12 kB      | 18.9 kB        | ~162-176 kB   |
| 1.0.0   | 58.5 kB   | 5.12 kB      | 19.5 kB        | ~162-177 kB   |

---

## Scripts Created

### Verification Scripts
- `scripts/verify-food-menu-actual.js` - Compare food menu with PDF
- `scripts/verify-cafe-menu-actual.js` - Compare café menu with PDF

### Addition Scripts
- `scripts/add-missing-food-items.js` - Add missing food items
- `scripts/add-missing-cafe-items.js` - Add missing café items

### Removal Scripts
- `scripts/remove-specified-items.js` - Remove discontinued items (v1.1.0)

### Reports
- `scripts/remove-items-report.txt` - Detailed removal verification (v1.1.0)

---

## Deployment History

All versions deployed to Vercel production:
- **v1.4.1**: December 28, 2025 (7 New Craft Mocktails)
- **v1.4.0**: December 17, 2025 (Time-Based Greeting & Breakfast Prioritization)
- **v1.3.0**: December 04, 2025 (Fluid Typography & Responsive Design)
- **v1.2.0**: October 19, 2025
- **v1.1.0**: October 18, 2025
- **v1.0.0**: October 17, 2025

---

## Breaking Changes

### v1.4.1
- None (menu data addition only, no API changes)

### v1.4.0
- None (frontend feature addition only, no API changes)

### v1.3.0
- None (frontend styling updates only, no API changes)

### v1.2.0
- None (serving size update only, no API changes)

### v1.1.0
- None (items removed from menu, no API changes)

### v1.0.0
- None (visual and content updates only)

---

## Migration Notes

### From v1.1.0 to v1.2.0
No migration needed. Changes are:
- Data-only (serving size standardization: 90ml → 30ml)
- No structural or API changes

### From v1.0.0 to v1.1.0
No migration needed. Changes are:
- Data-only (menu items removed)
- Minor text fix (Vaklaba → Baklava)

### From Pre-1.0 to v1.0.0
No migration needed. Changes are:
- Logo format change (PNG → SVG)
- UI improvements
- Address update
- Filter visibility changes

---

## Future Planned Changes

### Short-term
- [ ] Add allergen filtering
- [ ] Implement nutritional information
- [ ] Add item images
- [ ] Multi-language support (Hindi)

### Long-term
- [ ] Online ordering integration
- [ ] QR code generation
- [ ] Admin panel for menu management
- [ ] Analytics tracking
- [ ] PWA capabilities

---

## Contributors

- Amante Team
- Restronaut (Technical Partner)
- Claude Code (Development Assistant)

---

## License

Proprietary - © Amante Restaurant 2025

---

**For detailed documentation, see [MENU_DOCUMENTATION.md](./MENU_DOCUMENTATION.md)**
