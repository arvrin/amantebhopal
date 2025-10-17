# How to Access the Amante Menu System

## 🚀 Quick Start (Right Now!)

### On Your Computer
Open your browser and go to:
```
http://localhost:3001/menu
```

### On Your Phone (Same Network)
```
http://192.168.29.32:3001/menu
```

Or scan this QR code:
**Location:** `public/qr-codes/menu-main-localhost.png`

---

## 📱 Menu URLs

### Development (Current)
- **Landing:** http://localhost:3001/menu
- **Food:** http://localhost:3001/menu/food
- **Bar:** http://localhost:3001/menu/bar
- **Café:** http://localhost:3001/menu/cafe

### Production (After Deployment)
- **Landing:** https://cafeamante.com/menu
- **Food:** https://cafeamante.com/menu/food
- **Bar:** https://cafeamante.com/menu/bar
- **Café:** https://cafeamante.com/menu/cafe

---

## 🎯 Navigation Flow

```
Customer Scans QR Code
         ↓
Menu Landing Page
(/menu)
         ↓
Choose Category:
• Food Menu 🍽️
• Bar Menu 🍸
• Café Menu ☕
         ↓
Browse Menu Items
• Search items
• Filter by category
• Filter Veg only
• View prices
• See special badges
         ↓
Order with Staff
(No online ordering yet)
```

---

## 🔍 How to Use Features

### Search
1. Tap search bar at top
2. Type item name (e.g., "butter chicken")
3. Results filter instantly
4. Tap X to clear

### Filters
1. Tap "Veg Only" for vegetarian items
2. Tap category buttons (Appetizers, Mains, etc.)
3. Filters combine (can use multiple)
4. Tap again to remove filter

### View Items
- **Green dot:** Vegetarian
- **Red dot:** Non-Vegetarian
- **🌶️:** Spice level (1-5 chilies)
- **Amber badge:** Recommended
- **Colored badge:** Chef's Special
- **Price:** Bottom right corner
- **Category:** Small text below price

---

## 📊 Menu Statistics

- **Total Items:** 330+
- **Food Items:** 180+ (14 categories)
- **Bar Items:** 100+ (12 categories)
- **Café Items:** 50+ (7 categories)
- **Vegetarian Items:** 150+
- **Chef's Specials:** 25+
- **Recommended Items:** 40+

---

## 🖼️ QR Codes Location

All QR codes are in:
```
public/qr-codes/
```

### Available QR Codes:
1. **menu-main.png** (1000×1000px)
   - Main menu landing page
   - **Use this for table tents!**

2. **menu-food.png** (800×800px)
   - Direct to food menu
   - Use for food section

3. **menu-bar.png** (800×800px)
   - Direct to bar menu
   - Use for bar area

4. **menu-cafe.png** (800×800px)
   - Direct to café menu
   - Use for café section

5. **menu-main-localhost.png** (500×500px)
   - For testing only
   - Scans to localhost

---

## 🎨 What You'll See

### Landing Page Features:
- **Amante Logo** (AMANTE text with diamond decorators)
- **Tagline:** "Explore Our Menus"
- **Three Cards:**
  - Food (burgundy/maroon color)
  - Bar (purple color)
  - Café (green color)
- **Contact Info** at bottom

### Menu Page Features:
- **Header:**
  - Back button (top left)
  - Menu name (center)
  - Description (below name)
- **Search Bar:**
  - Search icon
  - "Search menu items..." placeholder
  - Clear button (X)
- **Filter Buttons:**
  - Veg Only (green)
  - Category buttons (scrollable)
- **Menu Items:**
  - Item name
  - Description
  - Price
  - Dietary indicator
  - Special badges
  - Category label

---

## ⚡ Performance

Expected loading times:
- **Landing Page:** < 1 second
- **Menu Pages:** < 2 seconds
- **Search Results:** Instant
- **Filter Changes:** Instant

Works on:
- ✅ iPhone (iOS 14+)
- ✅ Android (Chrome, Samsung Internet)
- ✅ iPad / Tablets
- ✅ Desktop browsers
- ✅ Slow connections (3G+)

---

## 🧪 Testing Checklist

Before showing to customers:

### Basic Navigation
- [ ] Landing page loads
- [ ] All three category buttons work
- [ ] Back button returns to landing
- [ ] Items display with correct info

### Search
- [ ] Search bar is visible
- [ ] Typing updates results
- [ ] Clear button works
- [ ] No results message shows when needed

### Filters
- [ ] Veg Only toggle works
- [ ] Category filters work
- [ ] Multiple filters combine correctly
- [ ] Filters can be cleared

### Display
- [ ] Veg/Non-veg dots show correctly
- [ ] Prices are visible
- [ ] Special badges appear
- [ ] Spice levels show (where applicable)
- [ ] Layout looks good on your phone

### Performance
- [ ] Pages load quickly
- [ ] No lag when typing search
- [ ] Smooth scrolling
- [ ] No crashes or freezes

---

## 🎯 Staff Training Points

Teach your staff to:

1. **Explain to customers:**
   - "Scan the QR code to view our digital menu"
   - "You can search for items or filter by category"
   - "Green dot means vegetarian, red means non-vegetarian"

2. **Help if needed:**
   - Show how to use camera to scan QR
   - Demonstrate search feature
   - Point out recommended items

3. **Handle issues:**
   - Offer printed menu as backup
   - Help with phone camera issues
   - Ensure good lighting for QR scanning

4. **Promote features:**
   - "Try searching for your favorite dish"
   - "Look for our Chef's Special items"
   - "Use Veg Only if you prefer vegetarian"

---

## 💡 Tips for Best Experience

### For Customers:
- Use portrait mode on phone
- Ensure good lighting for QR scan
- Use search for quick finding
- Try recommended items
- Filter by dietary preference

### For Staff:
- Keep QR codes clean and visible
- Have backup printed menus ready
- Learn popular menu items
- Help customers with search
- Update items regularly in system

### For Management:
- Monitor which items are searched most
- Track popular categories
- Update prices easily in JSON files
- Add seasonal specials quickly
- Keep menu fresh and current

---

## 🆘 Common Issues & Solutions

### "QR Code Won't Scan"
**Solutions:**
- Clean the QR code
- Ensure good lighting
- Try different QR scanner app
- Use direct URL instead
- Offer printed menu

### "Page Won't Load"
**Solutions:**
- Check internet connection
- Try refreshing page
- Clear browser cache
- Use different browser
- Restart phone

### "Can't Find Item"
**Solutions:**
- Clear search and filters
- Try different search terms
- Browse by category
- Ask staff for help
- Check spelling

### "Items Not Showing"
**Solutions:**
- Disable "Veg Only" if needed
- Clear category filter
- Refresh the page
- Check internet connection

---

## 📞 Support Contact

**For Menu Updates:**
Edit files in: `data/menus/`

**For Technical Issues:**
Check: `QR_MENU_README.md`

**For Questions:**
Email: contact.cafeamante@gmail.com

---

## 🎉 You're All Set!

The menu system is:
- ✅ Built and tested
- ✅ Running locally
- ✅ Ready for deployment
- ✅ Fully documented
- ✅ QR codes generated
- ✅ Mobile-optimized
- ✅ Search-enabled
- ✅ Filter-equipped
- ✅ Brand-aligned

**Now test it on your phone!**

Scan: `public/qr-codes/menu-main-localhost.png`

Or visit: http://localhost:3001/menu

---

*Enjoy your new digital menu system!* 🎊

