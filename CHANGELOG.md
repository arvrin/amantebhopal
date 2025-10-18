# Changelog - Amante Menu System

All notable changes to the Amante digital menu system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
- **v1.1.0**: October 18, 2025
- **v1.0.0**: October 17, 2025

---

## Breaking Changes

### v1.1.0
- None (items removed from menu, no API changes)

### v1.0.0
- None (visual and content updates only)

---

## Migration Notes

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
