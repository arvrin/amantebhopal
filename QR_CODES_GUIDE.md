# Amante QR Codes Guide

## 🎯 Overview

All QR codes have been generated and are ready for printing. They link directly to your live menu system on Vercel.

**Production URL:** https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app

---

## 💝 Heart-Shaped QR Code (SPECIAL!)

### **menu-heart-qr.png** ⭐ RECOMMENDED
- **Size:** 1000×1000px (24KB)
- **Shape:** Heart-shaped QR code
- **Color:** Amante Burgundy (#8B1538)
- **Links to:** Main menu landing page
- **Use for:**
  - Table tents (premium look)
  - Wall posters
  - Marketing materials
  - Social media posts
  - Instagram stories
- **Print size:** Minimum 5cm × 5cm for reliable scanning
- **Special feature:** Matches Amante brand with elegant heart design

---

## 📱 Standard Production QR Codes

### **menu-main-production.png**
- **Size:** 1000×1000px (9.7KB)
- **Links to:** Main menu landing page
- **Use for:** Primary table placement
- **Print size:** Minimum 2cm × 2cm

### **menu-food-production.png**
- **Size:** 800×800px (7.9KB)
- **Links to:** Direct to food menu
- **Use for:** Food section signage
- **Print size:** Minimum 2cm × 2cm

### **menu-bar-production.png**
- **Size:** 800×800px (7.9KB)
- **Links to:** Direct to bar menu
- **Use for:** Bar area signage
- **Print size:** Minimum 2cm × 2cm

### **menu-cafe-production.png**
- **Size:** 800×800px (7.9KB)
- **Links to:** Direct to café menu
- **Use for:** Café section signage
- **Print size:** Minimum 2cm × 2cm

---

## 🧪 Testing QR Code

### **menu-main-localhost.png**
- **Size:** 500×500px (3.7K)
- **Links to:** http://localhost:3001/menu
- **Use for:** Testing only (not for customers)

---

## 🎨 Design Specifications

All QR codes use:
- **Color:** #8B1538 (Amante Burgundy)
- **Background:** White (#FFFFFF)
- **Error Correction:** High (30% - works even if partially damaged)
- **Format:** PNG with transparency support

---

## 📋 Printing Guidelines

### Recommended Sizes:
1. **Table Tents:** 5cm × 5cm (heart-shaped for premium look)
2. **Menu Cards:** 3cm × 3cm (standard QR)
3. **Wall Posters:** 10cm × 10cm (heart-shaped)
4. **Business Cards:** 2cm × 2cm (minimum size)

### Print Quality:
- **Resolution:** 300 DPI minimum
- **Material:** Matte or glossy cardstock
- **Lamination:** Recommended for durability
- **Color profile:** RGB for digital, CMYK for print

### Test Before Mass Printing:
1. Print one test copy at intended size
2. Scan with multiple phones (iPhone, Android)
3. Test in different lighting conditions
4. Verify the correct URL loads
5. Check scanning distance (should work from 10-30cm)

---

## 🚀 Deployment Locations

### Priority 1 - Essential:
- [ ] All dining tables (heart-shaped QR)
- [ ] Restaurant entrance
- [ ] Waiting area
- [ ] Checkout counter

### Priority 2 - Enhanced Experience:
- [ ] Outdoor signage
- [ ] Parking area
- [ ] Washroom area info boards
- [ ] Staff uniforms/badges

### Priority 3 - Marketing:
- [ ] Social media posts
- [ ] Instagram stories
- [ ] Business cards
- [ ] Delivery packaging
- [ ] Email signatures

---

## ✅ Testing Checklist

Before deploying to customers:

**Physical QR Codes:**
- [ ] Printed at correct size
- [ ] High quality print (no blur/smudging)
- [ ] Laminated or protected
- [ ] Positioned at comfortable viewing angle
- [ ] Good lighting in scanning area

**Scanning Test:**
- [ ] Scans successfully on iPhone
- [ ] Scans successfully on Android
- [ ] Works in different lighting
- [ ] Loads correct menu page
- [ ] Menu displays properly on phone
- [ ] All navigation works

**Backup Plan:**
- [ ] Printed backup menus available
- [ ] Staff trained to help customers
- [ ] Alternative URL displayed (optional)

---

## 💡 Usage Tips

### For Maximum Scanability:
1. **Size matters:** Don't print smaller than 2cm × 2cm
2. **Contrast:** Keep white background, don't add backgrounds
3. **Placement:** Eye-level, good lighting, stable surface
4. **Protection:** Laminate to prevent wear and tear
5. **Cleanliness:** Wipe regularly, replace if damaged

### For Best Customer Experience:
1. **Heart-shaped QR** creates visual interest and brand recognition
2. Place multiple QR codes so customers don't have to wait
3. Add text: "Scan for Menu" or "Scan to Order"
4. Consider multilingual text if needed
5. Train staff to assist customers

---

## 🔄 Updating QR Codes

If you need to update the URL in the future:

1. Edit `scripts/generate-qr.js` and `scripts/generate-heart-qr.js`
2. Update the `PRODUCTION_URL` or `MENU_URL` variable
3. Run: `node scripts/generate-qr.js`
4. Run: `node scripts/generate-heart-qr.js`
5. Test the new QR codes before printing

---

## 📞 Support

**Location:** `public/qr-codes/`

**Files:**
- Heart-shaped: `menu-heart-qr.png`
- Production QRs: `menu-*-production.png`
- Testing: `menu-main-localhost.png`

**Scripts:**
- Standard QR: `scripts/generate-qr.js`
- Heart QR: `scripts/generate-heart-qr.js`

**Questions:** contact.cafeamante@gmail.com

---

## 🎊 Ready to Launch!

Your QR codes are production-ready! The heart-shaped QR code is especially unique and will create a memorable brand experience for your customers.

**Recommended:** Start with the heart-shaped QR code on table tents for a premium, Instagram-worthy presentation! 💝

---

*Generated: October 17, 2025*
*Version: 1.0.0*
