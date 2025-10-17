# QR Menu System - Design Specifications
## Visual Design Guide & Component Mockups for Amante

**Version:** 1.0
**Date:** October 17, 2025
**Designer Reference:** Amante Brand Guidelines

---

## Color Palette

### Brand Colors (Primary)

```css
/* Primary Red - Main brand color */
--amante-red: #B91C1C;
--amante-red-dark: #991B1B;
--amante-red-light: #DC2626;

/* Secondary Pink - Accent & warmth */
--amante-pink: #F8BBD9;
--amante-pink-light: #FCE7F3;
--amante-pink-dark: #F472B6;

/* Neutrals */
--amante-black: #1F1F1F;
--amante-white: #FFFFFF;
--amante-gray: #6B7280;
--amante-gray-light: #F3F4F6;
```

### Functional Colors

```css
/* Status Colors */
--success-green: #10B981;
--warning-yellow: #F59E0B;
--error-red: #EF4444;
--info-blue: #3B82F6;

/* Dietary Indicator Colors */
--veg-green: #16A34A;
--vegan-green: #059669;
--spicy-red: #DC2626;
--gluten-free-amber: #D97706;

/* Background Variants */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-elevated: #FFFFFF;
--bg-overlay: rgba(0, 0, 0, 0.5);
```

---

## Typography

### Font Families

```css
/* Headings - Luxury Serif */
--font-heading: 'Libre Baskerville', 'Baskerville', 'Times New Roman', serif;

/* Body - Clean Sans-serif */
--font-body: -apple-system, BlinkMacSystemFont, 'Avenir Next', 'Segoe UI', system-ui, sans-serif;

/* Monospace - Prices & Numbers */
--font-mono: 'SF Mono', 'Consolas', 'Monaco', monospace;
```

### Type Scale

```css
/* Headings */
--text-5xl: 3rem;      /* 48px - Hero */
--text-4xl: 2.25rem;   /* 36px - Page Title */
--text-3xl: 1.875rem;  /* 30px - Section Header */
--text-2xl: 1.5rem;    /* 24px - Category Name */
--text-xl: 1.25rem;    /* 20px - Item Name */

/* Body */
--text-lg: 1.125rem;   /* 18px - Large Body */
--text-base: 1rem;     /* 16px - Base Body */
--text-sm: 0.875rem;   /* 14px - Small Text */
--text-xs: 0.75rem;    /* 12px - Captions */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Usage Examples

```tsx
// Page Title
<h1 className="font-baskerville text-4xl font-bold text-amante-black">
  Food Menu
</h1>

// Category Header
<h2 className="font-baskerville text-2xl font-semibold text-amante-black">
  Appetizers & Starters
</h2>

// Menu Item Name
<h3 className="font-baskerville text-xl font-bold text-amante-black">
  Paneer Tikka
</h3>

// Description
<p className="font-body text-base text-gray-600 leading-relaxed">
  Cottage cheese marinated in spiced yogurt, grilled to perfection
</p>

// Price
<span className="font-mono text-lg font-semibold text-amante-red">
  ₹399
</span>
```

---

## Spacing System

### Base Scale (8px Grid)

```css
--space-0: 0;        /* 0px */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Component Spacing

```tsx
// Card Padding
className="p-4"              // 16px all sides (mobile)
className="md:p-6"           // 24px all sides (tablet+)

// Vertical Rhythm
className="space-y-4"        // 16px between items
className="space-y-6"        // 24px between sections

// Container Padding
className="px-4 py-8"        // Mobile
className="md:px-6 md:py-12" // Desktop
```

---

## Component Specifications

### 1. Menu Item Card - Premium Version

#### Visual Specifications

```
┌─────────────────────────────────────────┐
│ [Badge: Chef's Pick]                    │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │                                 │   │
│ │        Menu Item Image          │   │
│ │        (4:3 Aspect Ratio)       │   │
│ │                                 │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Paneer Tikka                     ₹399  │
│ ━━━━━━━━━━━━━                    ━━━━  │
│                                         │
│ Cottage cheese marinated in spiced      │
│ yogurt, grilled to perfection with      │
│ bell peppers and onions.                │
│                                         │
│ [🌱] [🌶️🌶️🌶️]         View Details → │
│                                         │
└─────────────────────────────────────────┘

Dimensions:
- Card Width: 100% (mobile), 350px (desktop)
- Image Height: Auto (4:3 ratio)
- Padding: 16px
- Border Radius: 12px
- Border: 1px solid #E5E7EB
- Hover: Border color #B91C1C, Shadow elevation

Colors:
- Background: #FFFFFF
- Border: #E5E7EB (default), #B91C1C (hover)
- Text: #1F1F1F (name), #6B7280 (description)
- Price: #B91C1C

Typography:
- Item Name: 20px, Bold, Baskerville
- Description: 15px, Regular, Avenir
- Price: 18px, Semibold, Mono
```

#### Component Code

```tsx
// components/menu/MenuItemCard.tsx
<article className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-amante-red hover:shadow-lg">
  {/* Badge */}
  {item.chefRecommended && (
    <div className="absolute top-3 left-3 z-10">
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amante-red text-white text-xs font-semibold rounded-full">
        <ChefHat size={14} />
        Chef's Pick
      </span>
    </div>
  )}

  {/* Image */}
  <div className="relative aspect-[4/3] bg-gray-100">
    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="p-4 space-y-3">
    {/* Header */}
    <div className="flex justify-between items-start gap-3">
      <h3 className="font-baskerville text-xl font-bold text-amante-black flex-1">
        {item.name}
      </h3>
      <span className="text-lg font-semibold text-amante-red font-mono">
        ₹{item.price}
      </span>
    </div>

    {/* Description */}
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
      {item.description}
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="flex items-center gap-2">
        {item.dietary.vegetarian && (
          <span className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center">
            <Leaf size={14} className="text-green-600" />
          </span>
        )}
        {item.spiceLevel > 0 && (
          <div className="flex gap-0.5">
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <ChiliPepper key={i} className="text-red-500" size={16} />
            ))}
          </div>
        )}
      </div>

      <button className="text-sm font-medium text-amante-red hover:underline">
        View Details →
      </button>
    </div>
  </div>
</article>
```

---

### 2. Category Navigation Tabs

#### Visual Specifications

```
┌─────────────────────────────────────────────────────────┐
│  Appetizers (12)  │  Mains (24)  │  Desserts (8)  │  →  │
│  ══════════════                                          │
└─────────────────────────────────────────────────────────┘

Active State:
- Background: #B91C1C (Amante Red)
- Text: #FFFFFF
- Border Bottom: 3px solid #B91C1C

Inactive State:
- Background: #F3F4F6
- Text: #6B7280
- Border Bottom: none

Dimensions:
- Height: 48px (mobile), 56px (desktop)
- Padding: 12px 20px
- Border Radius: 24px
- Gap between tabs: 8px

Typography:
- Font Size: 14px (mobile), 16px (desktop)
- Font Weight: 500 (Medium)
- Item Count: 12px, Light opacity
```

#### Component Code

```tsx
// components/menu/CategoryTabs.tsx
<nav className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
  <div className="relative">
    {/* Scroll container */}
    <div className="flex overflow-x-auto scrollbar-hide gap-2 px-4 py-3">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm
              transition-all duration-200
              ${isActive
                ? 'bg-amante-red text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="flex items-center gap-2">
              {category.icon && <span>{category.icon}</span>}
              <span>{category.name}</span>
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${isActive ? 'bg-white/20' : 'bg-black/10'}
              `}>
                {category.itemCount}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </div>
</nav>
```

---

### 3. Search Bar

#### Visual Specifications

```
┌─────────────────────────────────────────────────────────┐
│  🔍  Search menu items, ingredients...              ✕   │
└─────────────────────────────────────────────────────────┘

States:
1. Default: Border #E5E7EB, Background #FFFFFF
2. Focus: Border #B91C1C, Shadow glow
3. With Text: Show clear button (✕)

Dimensions:
- Height: 48px
- Border Radius: 12px
- Padding: 12px 16px
- Icon Size: 20px

Typography:
- Input Text: 16px, Regular
- Placeholder: 16px, #9CA3AF
```

#### Component Code

```tsx
// components/menu/SearchBar.tsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <Search className="h-5 w-5 text-gray-400" />
  </div>

  <input
    type="search"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search menu items, ingredients..."
    className="
      w-full pl-12 pr-12 py-3 rounded-xl
      border border-gray-200
      focus:border-amante-red focus:ring-2 focus:ring-amante-red/20
      transition-all duration-200
      text-base
    "
  />

  {query && (
    <button
      onClick={() => setQuery('')}
      className="absolute inset-y-0 right-0 pr-4 flex items-center"
      aria-label="Clear search"
    >
      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
    </button>
  )}
</div>
```

---

### 4. Filter Chips

#### Visual Specifications

```
┌──────────────────────────────────────────────────────────┐
│  [🌱 Vegetarian]  [🥬 Vegan]  [🌾 Gluten-Free]  [🕉️ Jain] │
│   ══════════                                              │
└──────────────────────────────────────────────────────────┘

Active State:
- Background: #B91C1C
- Text: #FFFFFF
- Icon: #FFFFFF
- Border: 2px solid #B91C1C

Inactive State:
- Background: #FFFFFF
- Text: #6B7280
- Icon: Current color
- Border: 1px solid #E5E7EB

Dimensions:
- Height: 36px
- Padding: 8px 16px
- Border Radius: 18px (full pill)
- Gap: 8px

Typography:
- Font Size: 14px
- Font Weight: 500
```

#### Component Code

```tsx
// components/menu/FilterChips.tsx
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
  {filters.map((filter) => {
    const isActive = activeFilters.includes(filter.id);

    return (
      <button
        key={filter.id}
        onClick={() => toggleFilter(filter.id)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          whitespace-nowrap font-medium text-sm
          transition-all duration-200
          ${isActive
            ? 'bg-amante-red text-white border-2 border-amante-red'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <span className={isActive ? 'text-white' : ''}>
          {filter.icon}
        </span>
        <span>{filter.label}</span>
      </button>
    );
  })}
</div>
```

---

### 5. Venue Selector (Mobile)

#### Visual Specifications

```
┌─────────────────────────────────────────┐
│  Amante Menu                            │
│  ┌───────────────────────────────────┐ │
│  │  🍽️  Food  ▼                      │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘

Dropdown Open:
┌─────────────────────────────────────────┐
│  ✓ 🍽️  Food                            │
│    🍸  Bar                              │
│    ☕  Café                             │
└─────────────────────────────────────────┘

Dimensions:
- Selector Height: 48px
- Dropdown Item Height: 44px
- Border Radius: 12px
- Icon Size: 24px

Colors:
- Selected: Background #FEF2F2, Text #B91C1C
- Hover: Background #F9FAFB
```

#### Component Code

```tsx
// components/menu/VenueSelector.tsx (Mobile)
<div className="relative md:hidden">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl"
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{currentVenue.icon}</span>
      <span className="font-semibold text-lg">{currentVenue.name}</span>
    </div>
    <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
  </button>

  {isOpen && (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
      {venues.map((venue) => (
        <button
          key={venue.id}
          onClick={() => {
            onVenueChange(venue.id);
            setIsOpen(false);
          }}
          className={`
            w-full flex items-center gap-3 px-4 py-3
            transition-colors
            ${venue.id === currentVenue.id
              ? 'bg-red-50 text-amante-red'
              : 'hover:bg-gray-50'
            }
          `}
        >
          {venue.id === currentVenue.id && (
            <Check size={20} className="text-amante-red" />
          )}
          <span className="text-2xl">{venue.icon}</span>
          <span className="font-medium">{venue.name}</span>
        </button>
      ))}
    </div>
  )}
</div>

// Desktop Version (Tabs)
<div className="hidden md:flex gap-2 border-b border-gray-200">
  {venues.map((venue) => {
    const isActive = venue.id === currentVenue.id;

    return (
      <button
        key={venue.id}
        onClick={() => onVenueChange(venue.id)}
        className={`
          flex items-center gap-3 px-6 py-4
          border-b-2 transition-colors
          ${isActive
            ? 'border-amante-red text-amante-red font-semibold'
            : 'border-transparent text-gray-600 hover:text-gray-900'
          }
        `}
      >
        <span className="text-xl">{venue.icon}</span>
        <span>{venue.name}</span>
      </button>
    );
  })}
</div>
```

---

### 6. Item Detail Modal

#### Visual Specifications

```
┌─────────────────────────────────────────────────────────┐
│                                                      ✕  │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │              Large Item Image                    │   │
│  │              (16:9 Aspect Ratio)                 │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Paneer Tikka                                    ₹399  │
│  [🌱 Vegetarian]  [🌶️🌶️🌶️ Medium Spice]              │
│                                                         │
│  Cottage cheese cubes marinated in spiced yogurt and   │
│  grilled to perfection with bell peppers and onions.   │
│  A classic North Indian appetizer.                     │
│                                                         │
│  Ingredients                                            │
│  • Paneer (Cottage Cheese)  • Bell Peppers             │
│  • Yogurt                    • Onions                  │
│  • Indian Spices             • Fresh Herbs             │
│                                                         │
│  Allergen Information                                   │
│  Contains: Dairy, Soy                                  │
│                                                         │
│  Nutritional Information (per serving)                  │
│  Calories: 320  │  Protein: 18g  │  Carbs: 12g         │
│                                                         │
│  Preparation Time: 15-20 minutes                        │
│  Serving Size: 6 pieces                                │
│                                                         │
│  Recommended Pairings                                   │
│  • Mint Chutney  • Naan Bread  • House Red Wine        │
│                                                         │
└─────────────────────────────────────────────────────────┘

Dimensions:
- Modal Width: 90% (mobile), 600px (desktop)
- Max Height: 85vh
- Border Radius: 24px (top)
- Padding: 24px

Animation:
- Slide up from bottom (mobile)
- Fade + scale (desktop)
- Duration: 300ms
- Easing: ease-out
```

#### Component Code

```tsx
// components/menu/ItemDetailModal.tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/9] bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-baskerville text-3xl font-bold text-amante-black">
                {item.name}
              </h2>
              <span className="text-2xl font-bold text-amante-red font-mono">
                ₹{item.price}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.dietary.vegetarian && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <Leaf size={16} />
                  Vegetarian
                </span>
              )}
              {item.spiceLevel > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  <Flame size={16} />
                  {getSpiceLevelLabel(item.spiceLevel)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {item.description}
          </p>

          {/* Ingredients */}
          {item.ingredients.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {item.ingredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-center gap-2">
                    <span className="text-amante-red">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {item.allergens.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Allergen Information
              </h3>
              <p className="text-yellow-800">
                Contains: {item.allergens.join(', ')}
              </p>
            </div>
          )}

          {/* Nutritional Info */}
          {item.calories && (
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Nutritional Information (per serving)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amante-red">
                    {item.calories}
                  </div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                {item.protein && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amante-red">
                      {item.protein}g
                    </div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                )}
                {item.carbs && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amante-red">
                      {item.carbs}g
                    </div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex justify-between text-sm text-gray-600 pt-4 border-t">
            {item.preparationTime && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{item.preparationTime}</span>
              </div>
            )}
            {item.servingSize && (
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{item.servingSize}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Extra Small: 0-639px (default) */
/* Mobile phones */

/* Small: 640px+ */
@media (min-width: 640px) {
  /* Large phones, small tablets */
}

/* Medium: 768px+ */
@media (min-width: 768px) {
  /* Tablets */
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large: 1024px+ */
@media (min-width: 1024px) {
  /* Desktop */
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Extra Large: 1280px+ */
@media (min-width: 1280px) {
  /* Large desktop */
  .container {
    max-width: 1280px;
  }
}
```

---

## Icon System

### Dietary Icons

```tsx
// components/common/DietaryIcon.tsx
const dietaryIcons = {
  vegetarian: {
    icon: <Leaf className="text-green-600" size={20} />,
    label: 'Vegetarian',
    color: 'green',
  },
  vegan: {
    icon: <LeafIcon className="text-emerald-600" size={20} />,
    label: 'Vegan',
    color: 'emerald',
  },
  glutenFree: {
    icon: <WheatOff className="text-amber-600" size={20} />,
    label: 'Gluten-Free',
    color: 'amber',
  },
  jain: {
    icon: <Om className="text-orange-600" size={20} />,
    label: 'Jain',
    color: 'orange',
  },
};

// Visual representation
export const DietaryBadge = ({ type }: { type: keyof typeof dietaryIcons }) => {
  const { icon, label, color } = dietaryIcons[type];

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1.5
      rounded-full text-sm font-medium
      bg-${color}-50 text-${color}-700 border border-${color}-200
    `}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
```

### Spice Level Indicator

```tsx
// components/common/SpiceLevel.tsx
const spiceLevels = {
  1: { label: 'Mild', color: 'text-orange-400' },
  2: { label: 'Medium', color: 'text-orange-500' },
  3: { label: 'Hot', color: 'text-red-500' },
  4: { label: 'Very Hot', color: 'text-red-600' },
  5: { label: 'Extra Hot', color: 'text-red-700' },
};

export const SpiceLevel = ({ level }: { level: 1 | 2 | 3 | 4 | 5 }) => {
  const { label, color } = spiceLevels[level];

  return (
    <div className="flex items-center gap-1" aria-label={`Spice level: ${label}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < level ? color : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{label}</span>
    </div>
  );
};
```

---

## Animation Guidelines

### Micro-interactions

```tsx
// Hover animations
className="transition-all duration-200 hover:scale-105"

// Button press
className="active:scale-95 transition-transform"

// Color transitions
className="transition-colors duration-300"

// Smooth scrolling
className="scroll-smooth"

// Fade in
className="animate-fadeIn"

// Slide up
className="animate-slideUp"
```

### Framer Motion Variants

```tsx
// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

---

## Accessibility Patterns

### Focus Styles

```css
/* Global focus ring */
*:focus-visible {
  outline: 3px solid #B91C1C;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Button focus */
.btn:focus-visible {
  outline: 3px solid #B91C1C;
  outline-offset: 2px;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-to-content:focus {
  left: 0;
  top: 0;
  background: #B91C1C;
  color: white;
  padding: 1rem;
}
```

---

## Print Styles

### Print-specific CSS

```css
@media print {
  /* Hide interactive elements */
  nav,
  .search-bar,
  .filter-chips,
  button,
  .floating-button {
    display: none !important;
  }

  /* Optimize for print */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: white;
  }

  /* Page breaks */
  .menu-category {
    page-break-inside: avoid;
  }

  .menu-item {
    page-break-inside: avoid;
    margin-bottom: 12pt;
  }

  /* Simplify layout */
  .menu-item-card {
    border: 1px solid #ddd;
    padding: 8pt;
    margin-bottom: 8pt;
  }

  /* Show URLs for links */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666;
  }
}
```

---

**Document End**

This design specification provides a complete visual reference for implementing the Amante QR menu system with pixel-perfect precision and brand consistency.
