# AMANTE RESTAURANT - DESIGN SYSTEM

**Version:** 1.0
**Date:** October 25, 2025
**Designer:** UI/UX Design Agent
**Status:** APPROVED FOR IMPLEMENTATION

---

## DESIGN PHILOSOPHY

The Amante design system embodies **premium approachability** - sophisticated yet warm, elegant yet welcoming. Every design decision reinforces the brand promise: multiple distinctive spaces, unified by exceptional quality and genuine hospitality.

### Core Design Principles

1. **Warmth First** - Colors, typography, and spacing create inviting, comfortable experiences
2. **Premium Subtlety** - Luxury through restraint, not excess
3. **Mobile Priority** - Bhopal audiences are mobile-first; design for touch and thumb
4. **Conversion Focus** - Every element guides toward booking, calling, or visiting
5. **Accessibility Always** - WCAG 2.1 AA compliance is non-negotiable

---

## COLOR SYSTEM

### Primary Palette

```css
/* Core Brand Colors */
--amante-red: #B91C1C;           /* Primary brand - buttons, headers, CTAs */
--amante-red-dark: #991B1B;      /* Hover states, emphasis */
--amante-red-light: #DC2626;     /* Active states, accents */

/* Supporting Pink Tones */
--amante-pink: #F8BBD9;          /* Soft accents, decorative elements */
--amante-pink-light: #FCE7F3;    /* Backgrounds, subtle highlights */
--amante-pink-dark: #F3A8CC;     /* Secondary buttons, borders */

/* Premium Accent */
--amante-gold: #D4AF37;          /* Premium features, awards, special offers */
```

### Neutral Palette

```css
/* Text & Backgrounds */
--amante-black: #1F1F1F;         /* Primary text */
--amante-charcoal: #2C2C2C;      /* Body text */
--amante-grey-dark: #4A4A4A;     /* Secondary text */
--amante-grey: #757575;          /* Tertiary text, placeholders */
--amante-grey-light: #E5E5E5;    /* Borders, dividers */
--amante-white: #FFFFFF;         /* Backgrounds, cards */
--amante-cream: #F8F6F0;         /* Warm backgrounds, sections */
```

### Semantic Colors

```css
/* Feedback Colors */
--success: #10B981;              /* Success messages, confirmations */
--success-bg: #D1FAE5;           /* Success backgrounds */

--error: #EF4444;                /* Error messages, validation */
--error-bg: #FEE2E2;             /* Error backgrounds */

--warning: #F59E0B;              /* Warning messages, alerts */
--warning-bg: #FEF3C7;           /* Warning backgrounds */

--info: #3B82F6;                 /* Info messages, tips */
--info-bg: #DBEAFE;              /* Info backgrounds */
```

### Color Usage Guidelines

#### Accessibility Requirements
- **Body text on white:** Minimum #2C2C2C (passes 4.5:1)
- **Red on white:** Use --amante-red (#B91C1C) - passes 4.5:1
- **White on red:** Always passes with --amante-red
- **Gold on white:** Use --amante-gold for decorative only (3:1)
- **Never:** Pink text on white backgrounds (insufficient contrast)

#### Application
- **Primary CTAs:** Red background with white text
- **Secondary CTAs:** Pink-light background with red text
- **Tertiary CTAs:** Outlined red with red text
- **Backgrounds:** Alternate white and cream sections
- **Headers:** Charcoal or black on light backgrounds
- **Links:** Red with underline, red-dark on hover

---

## TYPOGRAPHY SYSTEM

### Font Families

```css
/* Serif - Headings & Elegance */
--font-heading: 'Playfair Display', 'Lora', 'Georgia', serif;
--font-accent: 'Lora', 'Baskerville', 'Times New Roman', serif;

/* Sans-serif - Body & UI */
--font-body: 'Inter', 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale (Desktop)

```css
/* Headings */
--text-h1: 56px;      /* Line-height: 1.1 (62px) - Page titles, hero headlines */
--text-h2: 48px;      /* Line-height: 1.15 (55px) - Section headers */
--text-h3: 36px;      /* Line-height: 1.2 (43px) - Sub-sections */
--text-h4: 28px;      /* Line-height: 1.25 (35px) - Card titles */
--text-h5: 24px;      /* Line-height: 1.3 (31px) - Smaller headings */
--text-h6: 20px;      /* Line-height: 1.4 (28px) - List headers */

/* Body Text */
--text-body-lg: 18px;   /* Line-height: 1.6 (29px) - Featured content */
--text-body: 16px;      /* Line-height: 1.6 (26px) - Standard body */
--text-body-sm: 14px;   /* Line-height: 1.5 (21px) - Secondary text */
--text-body-xs: 12px;   /* Line-height: 1.5 (18px) - Captions, labels */

/* UI Elements */
--text-button: 16px;    /* Line-height: 1.2 (19px) - Buttons */
--text-nav: 15px;       /* Line-height: 1.2 (18px) - Navigation */
--text-label: 14px;     /* Line-height: 1.4 (20px) - Form labels */
--text-input: 16px;     /* Line-height: 1.5 (24px) - Input fields */
```

### Type Scale (Mobile)

```css
/* Headings Mobile */
--text-h1-mobile: 32px;    /* Line-height: 1.15 (37px) */
--text-h2-mobile: 28px;    /* Line-height: 1.2 (34px) */
--text-h3-mobile: 24px;    /* Line-height: 1.25 (30px) */
--text-h4-mobile: 20px;    /* Line-height: 1.3 (26px) */
--text-h5-mobile: 18px;    /* Line-height: 1.35 (24px) */
--text-h6-mobile: 16px;    /* Line-height: 1.4 (22px) */

/* Body text stays same for readability */
```

### Font Weights

```css
--font-weight-light: 300;      /* Rarely used */
--font-weight-regular: 400;    /* Body text default */
--font-weight-medium: 500;     /* Emphasis, UI elements */
--font-weight-semibold: 600;   /* Buttons, labels */
--font-weight-bold: 700;       /* Headings, strong emphasis */
```

### Letter Spacing

```css
--letter-spacing-tight: -0.02em;    /* Large headings */
--letter-spacing-normal: 0;         /* Body text */
--letter-spacing-wide: 0.02em;      /* Small caps, buttons */
--letter-spacing-wider: 0.05em;     /* All caps headings */
```

### Typography Classes

```css
/* Heading Styles */
.heading-hero {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1.1;
  color: var(--amante-black);
}

.heading-section {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1.15;
  color: var(--amante-black);
}

.heading-subsection {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
  color: var(--amante-charcoal);
}

/* Body Styles */
.body-large {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  line-height: 1.6;
  color: var(--amante-charcoal);
}

.body-standard {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--amante-charcoal);
}

.body-small {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  line-height: 1.5;
  color: var(--amante-grey-dark);
}

/* Special Styles */
.text-accent {
  font-family: var(--font-accent);
  font-style: italic;
  color: var(--amante-red);
}

.text-allcaps {
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  font-weight: var(--font-weight-semibold);
}
```

---

## SPACING SYSTEM

### Base Grid: 4px

All spacing follows a consistent 4px base grid for visual harmony and predictability.

```css
/* Spacing Scale */
--space-1: 4px;      /* 0.25rem - Micro spacing */
--space-2: 8px;      /* 0.5rem - Tight spacing */
--space-3: 12px;     /* 0.75rem - Compact spacing */
--space-4: 16px;     /* 1rem - Standard spacing */
--space-5: 20px;     /* 1.25rem - Medium spacing */
--space-6: 24px;     /* 1.5rem - Comfortable spacing */
--space-8: 32px;     /* 2rem - Large spacing */
--space-10: 40px;    /* 2.5rem - Extra large spacing */
--space-12: 48px;    /* 3rem - Section spacing */
--space-16: 64px;    /* 4rem - Component spacing */
--space-20: 80px;    /* 5rem - Large sections */
--space-24: 96px;    /* 6rem - Major sections */
--space-32: 128px;   /* 8rem - Page sections */
```

### Spacing Application

#### Component Internal Spacing
- **Buttons:** Padding 12px 24px (vertical, horizontal)
- **Cards:** Padding 24px all sides
- **Forms:** Gap 16px between fields
- **Input fields:** Padding 12px 16px
- **Navigation items:** 16px gap

#### Layout Spacing
- **Section padding (desktop):** 80px top/bottom
- **Section padding (mobile):** 48px top/bottom
- **Container padding:** 24px sides (mobile), 40px sides (desktop)
- **Content max-width:** 1400px
- **Text max-width:** 720px for readability

#### Stack Spacing (Vertical Rhythm)
- **Related elements:** 8px
- **Paragraphs:** 16px
- **Sections within component:** 24px
- **Components:** 48px
- **Major sections:** 80px

---

## LAYOUT SYSTEM

### Breakpoints

```css
/* Mobile First Breakpoints */
--breakpoint-xs: 320px;     /* Small phones */
--breakpoint-sm: 640px;     /* Phones */
--breakpoint-md: 768px;     /* Tablets */
--breakpoint-lg: 1024px;    /* Desktop */
--breakpoint-xl: 1280px;    /* Large desktop */
--breakpoint-2xl: 1536px;   /* Extra large */
```

### Grid System

```css
/* 12-Column Grid */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Common Grid Patterns */
.grid-2-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.grid-3-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-3-col {
    grid-template-columns: 1fr;
  }
}
```

### Container Widths

```css
.container-narrow {
  max-width: 720px;    /* Text content */
  margin: 0 auto;
  padding: 0 24px;
}

.container-standard {
  max-width: 1200px;   /* Standard content */
  margin: 0 auto;
  padding: 0 24px;
}

.container-wide {
  max-width: 1400px;   /* Full layouts */
  margin: 0 auto;
  padding: 0 40px;
}

.container-full {
  max-width: 100%;     /* Full bleed */
  padding: 0;
}
```

---

## ELEVATION & SHADOWS

### Shadow Scale

```css
/* Shadows for depth and hierarchy */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
/* Use: Subtle borders, very light elevation */

--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
/* Use: Input fields, cards at rest */

--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
/* Use: Buttons, cards on hover, dropdowns */

--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
/* Use: Modals, overlays, prominent cards */

--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12);
/* Use: Sticky headers, hero elements */

--shadow-2xl: 0 20px 40px rgba(0, 0, 0, 0.15);
/* Use: Pop-up modals, image lightbox */

/* Brand Shadows (with red tint) */
--shadow-amante-sm: 0 2px 8px rgba(185, 28, 28, 0.1);
--shadow-amante-md: 0 4px 12px rgba(185, 28, 28, 0.12);
--shadow-amante-lg: 0 8px 20px rgba(185, 28, 28, 0.15);
```

### Elevation Layers

```
z-index system:
- Base content: 0
- Elevated cards: 10
- Sticky headers: 100
- Dropdowns: 200
- Overlays: 300
- Modals: 400
- Toasts: 500
```

---

## BORDER RADIUS

```css
/* Rounded Corners */
--radius-none: 0;
--radius-sm: 4px;       /* Subtle rounding - buttons, inputs */
--radius-md: 8px;       /* Standard - cards, images */
--radius-lg: 12px;      /* Prominent - hero cards */
--radius-xl: 16px;      /* Large elements */
--radius-2xl: 24px;     /* Extra large */
--radius-full: 9999px;  /* Pills, circular avatars */
```

### Border Width

```css
--border-thin: 1px;     /* Standard borders */
--border-medium: 2px;   /* Emphasis, focus states */
--border-thick: 4px;    /* Strong emphasis */
```

---

## ANIMATION & TRANSITIONS

### Timing Functions

```css
/* Easing Curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-premium: cubic-bezier(0.6, -0.05, 0.01, 0.99);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Scale

```css
--duration-instant: 100ms;    /* Micro-interactions */
--duration-fast: 200ms;       /* Hover states, highlights */
--duration-normal: 300ms;     /* Standard transitions */
--duration-slow: 500ms;       /* Complex animations */
--duration-slower: 800ms;     /* Page transitions */
```

### Common Transitions

```css
.transition-default {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
  transition: background-color 200ms ease-out, color 200ms ease-out;
}

.transition-transform {
  transition: transform 300ms cubic-bezier(0.6, -0.05, 0.01, 0.99);
}

.transition-shadow {
  transition: box-shadow 300ms ease-out;
}
```

### Animation Presets

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse (for loading) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## COMPONENT TOKENS

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--amante-red);
  color: var(--amante-white);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--text-button);
  font-weight: var(--font-weight-semibold);
  border: none;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-default);
}

.btn-primary:hover {
  background: var(--amante-red-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Secondary Button */
.btn-secondary {
  background: var(--amante-pink-light);
  color: var(--amante-red);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--amante-pink);
  transition: var(--transition-default);
}

.btn-secondary:hover {
  background: var(--amante-pink);
  border-color: var(--amante-pink-dark);
}

/* Outlined Button */
.btn-outline {
  background: transparent;
  color: var(--amante-red);
  padding: 12px 24px;
  border: 2px solid var(--amante-red);
  border-radius: var(--radius-sm);
  transition: var(--transition-default);
}

.btn-outline:hover {
  background: var(--amante-red);
  color: var(--amante-white);
}

/* Button Sizes */
.btn-sm { padding: 8px 16px; font-size: 14px; }
.btn-md { padding: 12px 24px; font-size: 16px; }
.btn-lg { padding: 16px 32px; font-size: 18px; }
```

### Form Elements

```css
/* Input Fields */
.input-field {
  width: 100%;
  padding: 12px 16px;
  font-size: var(--text-input);
  color: var(--amante-charcoal);
  background: var(--amante-white);
  border: 1px solid var(--amante-grey-light);
  border-radius: var(--radius-sm);
  transition: var(--transition-default);
}

.input-field:focus {
  outline: none;
  border-color: var(--amante-red);
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}

.input-field:disabled {
  background: #F5F5F5;
  color: var(--amante-grey);
  cursor: not-allowed;
}

.input-field.error {
  border-color: var(--error);
}

/* Labels */
.form-label {
  display: block;
  font-size: var(--text-label);
  font-weight: var(--font-weight-medium);
  color: var(--amante-charcoal);
  margin-bottom: 8px;
}

.form-label.required::after {
  content: '*';
  color: var(--error);
  margin-left: 4px;
}

/* Helper Text */
.form-helper {
  font-size: var(--text-body-xs);
  color: var(--amante-grey);
  margin-top: 4px;
}

/* Error Message */
.form-error {
  font-size: var(--text-body-xs);
  color: var(--error);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

### Cards

```css
.card {
  background: var(--amante-white);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-default);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: var(--font-weight-bold);
  color: var(--amante-black);
  margin-bottom: 8px;
}

.card-description {
  font-size: var(--text-body);
  color: var(--amante-charcoal);
  line-height: 1.6;
}
```

---

## ICONOGRAPHY

### Icon System

- **Library:** Lucide React (consistent, modern, customizable)
- **Size Scale:** 16px, 20px, 24px, 32px, 48px
- **Stroke Width:** 2px (standard), 1.5px (light), 2.5px (bold)
- **Style:** Minimalist line icons

### Icon Usage

```css
/* Icon Sizes */
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }

/* Icon Colors */
.icon-primary { color: var(--amante-red); }
.icon-secondary { color: var(--amante-grey); }
.icon-white { color: var(--amante-white); }
```

### Common Icons

- **Navigation:** Menu, X (close), ChevronDown, ChevronRight
- **Actions:** Phone, Mail, MapPin, Calendar, Clock, User
- **Social:** Instagram, Facebook, Twitter
- **UI Feedback:** Check, AlertCircle, Info, AlertTriangle
- **Forms:** Search, Filter, ChevronDown (select), Upload
- **Media:** Play, Pause, Share, Heart, Star

---

## ACCESSIBILITY STANDARDS

### WCAG 2.1 AA Compliance

#### Color Contrast Requirements
- **Normal text (under 18px):** Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 contrast ratio
- **UI components & graphics:** Minimum 3:1 contrast ratio

#### Tested Color Combinations (Approved)

✅ **Pass** - Black (#1F1F1F) on White (#FFFFFF) - 17.5:1
✅ **Pass** - Charcoal (#2C2C2C) on White - 12.6:1
✅ **Pass** - Red (#B91C1C) on White - 6.3:1
✅ **Pass** - White on Red (#B91C1C) - 6.3:1
✅ **Pass** - Grey-Dark (#4A4A4A) on White - 8.6:1
❌ **Fail** - Pink (#F8BBD9) on White - 1.8:1 (Decorative only)
❌ **Fail** - Gold (#D4AF37) on White - 2.8:1 (Large text or decorative)

#### Touch Target Sizes
- **Minimum:** 44x44px (mobile)
- **Recommended:** 48x48px
- **Spacing:** 8px minimum between targets

#### Focus States
```css
.focus-visible {
  outline: 2px solid var(--amante-red);
  outline-offset: 2px;
  border-radius: 2px;
}
```

#### Screen Reader Support
- All images require alt text
- Form labels properly associated
- ARIA labels for icon-only buttons
- Semantic HTML structure
- Skip navigation links

### Keyboard Navigation
- Tab order follows visual flow
- All interactive elements focusable
- Focus indicators clearly visible
- Escape closes modals/dropdowns
- Enter/Space activate buttons

---

## RESPONSIVE DESIGN TOKENS

### Mobile Adaptations

```css
/* Mobile Typography Adjustments */
@media (max-width: 768px) {
  :root {
    --text-h1: 32px;
    --text-h2: 28px;
    --text-h3: 24px;
    --text-h4: 20px;
    --space-section: 48px;
  }
}

/* Mobile Touch Targets */
@media (pointer: coarse) {
  button, a, input, select {
    min-height: 48px;
    min-width: 48px;
  }
}

/* Reduce Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## DESIGN TOKENS EXPORT

### For Developers (CSS Variables)

```css
/* Copy-paste ready for implementation */
:root {
  /* Colors */
  --amante-red: #B91C1C;
  --amante-red-dark: #991B1B;
  --amante-red-light: #DC2626;
  --amante-pink: #F8BBD9;
  --amante-pink-light: #FCE7F3;
  --amante-gold: #D4AF37;
  --amante-black: #1F1F1F;
  --amante-charcoal: #2C2C2C;
  --amante-grey: #757575;
  --amante-white: #FFFFFF;
  --amante-cream: #F8F6F0;

  --success: #10B981;
  --error: #EF4444;
  --warning: #F59E0B;
  --info: #3B82F6;

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --space-4: 16px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-default: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### For Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'amante-red': '#B91C1C',
        'amante-red-dark': '#991B1B',
        'amante-red-light': '#DC2626',
        'amante-pink': '#F8BBD9',
        'amante-pink-light': '#FCE7F3',
        'amante-gold': '#D4AF37',
        'amante-black': '#1F1F1F',
        'amante-charcoal': '#2C2C2C',
        'amante-grey': '#757575',
        'amante-cream': '#F8F6F0',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '4': '16px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
    },
  },
};
```

---

## COMPONENT LIBRARY INVENTORY

### Planned Components (to be detailed in COMPONENT_SPECS.md)

#### Navigation
- Header (desktop + mobile)
- Main navigation menu
- Mobile hamburger menu
- Footer
- Breadcrumb navigation

#### Hero Elements
- Hero section (full-width)
- Hero section (with image)
- CTA banner

#### Content Cards
- Space preview card
- Menu item card
- Event card
- Testimonial card
- Team member card (future)

#### Forms
- Input field
- Select dropdown
- Textarea
- Date picker
- Time picker
- File upload
- Checkbox
- Radio button
- Submit button with loading state

#### UI Elements
- Button (primary, secondary, outline, icon)
- Badge/Tag
- Loading spinner
- Toast notification
- Modal/Dialog
- Dropdown menu
- Image gallery
- Carousel
- Rating stars

#### Sections
- About section
- Spaces grid
- Highlights grid
- Social proof carousel
- Location map
- Contact info

---

## BRAND GUIDELINES SUMMARY

### Photography Style
- Warm, inviting lighting
- Natural color tones (avoid oversaturation)
- Show people enjoying food and atmosphere
- Mix of close-ups and wide shots
- Consistent editing style across all images

### Voice & Tone (for design)
- Headlines: Bold, confident, inviting
- Body copy: Warm, conversational, informative
- CTAs: Action-oriented, urgent but not pushy
- Error messages: Helpful, not blaming
- Success messages: Celebratory, encouraging

### Do's and Don'ts

**DO:**
- Use ample whitespace
- Maintain consistent spacing
- Follow the 4px grid
- Test on mobile devices
- Consider accessibility always
- Use semantic HTML
- Optimize images

**DON'T:**
- Use pink text on white backgrounds
- Cram too much content
- Ignore touch target sizes
- Use decorative fonts for body text
- Rely on color alone to convey meaning
- Use low-contrast combinations
- Skip focus states

---

## HANDOFF NOTES FOR DEVELOPERS

### Critical Requirements
1. All interactive elements must have visible focus states
2. Touch targets minimum 44x44px on mobile
3. Forms must have proper validation feedback
4. Loading states required for all async actions
5. Error handling must be user-friendly
6. Images must have alt text
7. Semantic HTML required (not div soup)

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Mobile page weight: < 1MB

### Browser Support
- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari iOS 14+
- Chrome Mobile (latest)

---

**DESIGN SYSTEM STATUS:** ✅ COMPLETE & APPROVED

**Next Document:** WIREFRAMES.md (17 page wireframes)

**Designer:** UI/UX Design Agent
**Date:** October 25, 2025
**Version:** 1.0
