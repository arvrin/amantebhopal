# Amante - Coming Soon Landing Page

> 🥂 **"Eat. Sip. Dance. Celebrate."** - Bhopal's destination of love, happiness, and timeless celebrations.

## 🎯 Project Overview

This is an interactive coming-soon landing page for **Amante**, a premium multi-concept venue in Bhopal featuring:

- ☕ **Café & Bakery** - Morning warmth and artisan delights
- 🍽️ **Rooftop Restro** - Magical evening dining under stars  
- 🍸 **Lounge** - Crafted cocktails and intimate vibes
- 💃 **Club & Bar** - Dance floor energy and nightlife
- 🎭 **Private Dining** - Exclusive intimate experiences
- 💒 **Banquets** - Grand celebrations and milestones

## ✨ Features

### 🎨 **Brand-Aligned Design**
- **Colors**: Amante Red (#B91C1C) & Pink (#F8BBD9) palette
- **Typography**: Baskerville (luxury) + Avenir Next (modern)
- **Logo System**: Primary, Secondary, and Icon variations
- **Design Elements**: Diamond decorations and heart symbols

### 🚀 **Interactive Experience**
- **Timeline Journey**: Hover through a day at Amante (7 AM - 12 AM)
- **Countdown Timer**: Live countdown to opening day
- **Lead Capture**: Smart form with occasion selection
- **Social Sharing**: Integrated social media sharing
- **Smooth Animations**: Framer Motion powered interactions

### 📱 **Mobile-First & Performance**
- **Responsive Design**: Perfect on all devices
- **Performance Optimized**: Fast loading and smooth scrolling  
- **Accessibility**: Touch-friendly with proper contrast
- **SEO Ready**: Meta tags and structured data

## 🛠️ Tech Stack

### **Frontend Framework**
```
Next.js 15.5.2 (App Router + Turbopack)
TypeScript 5+
Tailwind CSS 3+
```

### **Animation & Interaction**
```
Framer Motion - Smooth animations
Lucide React - Beautiful icons
React Hook Form - Form handling
```

### **Performance & SEO**
```
Next.js Image Optimization
Automatic code splitting
Built-in SEO optimization
```

## 🏃‍♀️ Quick Start

### Prerequisites
- Node.js 22+ (Latest LTS)
- npm/yarn

### Installation
```bash
# Navigate to project
cd amante-coming-soon

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📁 Project Structure

```
amante-coming-soon/
├── src/
│   ├── app/
│   │   ├── globals.css      # Brand styles & animations
│   │   └── page.tsx         # Main entry point
│   └── components/
│       ├── ComingSoon.tsx         # Main landing page
│       ├── InteractiveTimeline.tsx # Timeline experience
│       ├── CountdownTimer.tsx     # Opening countdown
│       ├── LeadCaptureForm.tsx    # Email collection
│       └── SocialShare.tsx        # Social sharing
├── public/
│   └── assets/
│       └── logos/           # Brand logo variations
└── package.json
```

## 🎨 Brand Guidelines

### **Color Palette**
```css
--amante-red: #B91C1C        /* Primary brand color */
--amante-pink: #F8BBD9       /* Secondary/accent */
--amante-pink-light: #FCE7F3 /* Background tints */
--amante-black: #1F1F1F      /* Text/contrast */
--amante-white: #FFFFFF      /* Clean backgrounds */
```

### **Typography Scale**
- **Headlines**: Baskerville (luxury serif)
- **Body Text**: Avenir Next (clean sans-serif)  
- **Accents**: Laginchy (custom brand font)

### **Logo Usage**
- **Hero/Headers**: Primary framed logo
- **Navigation**: Secondary clean logo
- **Mobile/Favicons**: Icon version only
- **Backgrounds**: Use pink variants for warmth

## 📱 Components Guide

### **ComingSoon** (Main Container)
Primary landing page with all sections and animations.

### **InteractiveTimeline** 
Timeline showing different experiences throughout the day:
- Morning café brewing
- Afternoon lunch 
- Evening rooftop dining
- Night club energy

### **CountdownTimer**
Live countdown to opening date with animated number changes.

### **LeadCaptureForm**
Comprehensive form collecting:
- Name, Email, Phone
- Occasion preference
- WhatsApp opt-in
- Early bird exclusivity

### **SocialShare**
Floating share button with platform-specific sharing:
- Instagram (copy text)
- Facebook (direct share)
- Twitter (direct share)
- Copy link functionality

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Build for Production**
```bash
npm run build
npm start
```

## 🎯 Marketing Strategy

### **Launch Sequence**
1. **Soft Launch**: Friends, family, industry connections
2. **Social Buzz**: Instagram/Facebook teasers
3. **PR Push**: Local Bhopal media coverage  
4. **Influencer Previews**: Behind-the-scenes content

### **Lead Generation Goals**
- **Target**: 1000+ qualified leads before opening
- **Conversion**: 30% email signup rate
- **Engagement**: 60%+ social share rate
- **Retention**: 80% WhatsApp opt-in rate

## 💡 Future Enhancements

### **Phase 2 Features**
- [ ] Construction live camera feed
- [ ] Virtual venue tour (3D)  
- [ ] Event planning quiz
- [ ] WhatsApp chatbot integration
- [ ] Multi-language support (Hindi/English)

### **Phase 3 Integration**
- [ ] Table reservation system
- [ ] Event booking calendar
- [ ] Loyalty program preview
- [ ] Gift card pre-sales

## 🤝 Brand Philosophy

**Love** • **Celebration** • **Happiness**

> *"Where love finds its place. A multi-concept destination crafted for indulgence, joy, and unforgettable memories."*

---

## 📞 Contact & Support

For technical questions or brand guideline clarifications, refer to the brand assets in `/public/assets/logos/` and the style guide in `src/app/globals.css`.

**Remember**: Every interaction should reflect Amante's core values of love, celebration, and happiness. 💖

---

*Built with ❤️ for Amante - Where every moment becomes a memory.*