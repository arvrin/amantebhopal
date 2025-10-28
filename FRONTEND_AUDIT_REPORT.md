# Frontend Code Quality Audit Report
## Amante Restaurant Website

**Audit Date:** October 27, 2025
**Technology Stack:** Next.js 15.5.2, React 19.1.0, TypeScript 5, Tailwind CSS 4, Framer Motion 12.23.12
**Audited By:** Frontend Specialist

---

## Executive Summary

The Amante restaurant website demonstrates a **solid foundation** with modern React patterns, comprehensive TypeScript usage, and well-structured components. However, there are several **critical accessibility issues**, **performance optimizations needed**, and **React best practices violations** that should be addressed to improve the overall code quality and user experience.

**Overall Score:** 7.2/10

- Code Quality: 7.5/10
- Performance: 6.5/10
- Accessibility: 5.0/10
- Best Practices: 7.8/10
- Consistency: 8.5/10

---

## Critical Issues

### 1. Layout Missing Toast Provider
**File:** `/src/app/layout.tsx`
**Severity:** CRITICAL - Breaks functionality
**Lines:** 96-113

**Problem:**
The application uses `react-hot-toast` in multiple pages (reservations, contact, feedback) but the `<Toaster />` component is not included in the root layout.

```tsx
// Current layout.tsx - Missing Toaster
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><HeadIcons /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Impact:**
- Toast notifications won't display to users
- Form submission feedback is completely broken
- Users won't know if their reservations/contact forms succeeded

**Fix:**
```tsx
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><HeadIcons /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

---

### 2. Missing Header and Footer in Main Page Routes
**Files:** All page components
**Severity:** CRITICAL - Major UX issue
**Impact:** Users cannot navigate between pages

**Problem:**
The `layout.tsx` doesn't include `<Header />` and `<Footer />` components. Each page would need to include them individually, leading to:
- Inconsistent layouts
- No navigation between pages
- Poor user experience

**Current Structure:**
```tsx
// layout.tsx - Doesn't include Header/Footer
{children}
```

**Fix:**
```tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><HeadIcons /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

---

### 3. Incorrect Main Page Routing
**File:** `/src/app/page.tsx`
**Severity:** CRITICAL
**Lines:** 1-5

**Problem:**
The homepage is rendering `CleanComingSoon` component instead of the actual `HomePage` component, suggesting the site is still in "coming soon" mode even though all pages are built.

```tsx
// Current - Wrong component
import CleanComingSoon from '@/components/CleanComingSoon';

export default function Home() {
  return <CleanComingSoon />;
}
```

**Fix:**
```tsx
import HomePage from '@/components/HomePage';

export default function Home() {
  return <HomePage />;
}
```

---

## Major Issues

### 4. Select Component Props Interface Mismatch
**File:** `/src/components/ui/Select.tsx`
**Severity:** MAJOR - Type safety issue
**Lines:** 11-17

**Problem:**
The `SelectProps` interface expects an `options` prop with `SelectOption[]` type, but parent components (reservations, contact pages) pass raw string arrays and use plain HTML `<option>` tags instead.

```tsx
// Select.tsx expects:
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];  // This is defined but never used correctly
}

// But reservations/page.tsx does:
<Select name="time" value={formData.time} onChange={handleChange} required>
  <option value="">Select time</option>
  {timeSlots.map((slot) => (
    <option key={slot} value={slot}>{slot}</option>
  ))}
</Select>
```

**Impact:**
- TypeScript errors suppressed or ignored
- Component API inconsistency
- Runtime errors possible

**Fix Option 1 - Use options prop properly:**
```tsx
// reservations/page.tsx
<Select
  name="time"
  value={formData.time}
  onChange={handleChange}
  options={timeSlots.map(slot => ({ value: slot, label: slot }))}
  placeholder="Select time"
  required
/>
```

**Fix Option 2 - Make options prop optional if children are allowed:**
```tsx
// Select.tsx
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];  // Make optional
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label, error, helperText, options, placeholder, children, className = '', required, ...props
}, ref) => {
  return (
    <div className="w-full">
      {/* ... label code ... */}
      <div className="relative">
        <select /* ... */>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          ) : (
            children  // Allow children if no options prop
          )}
        </select>
        {/* ... icon code ... */}
      </div>
      {/* ... error/helper code ... */}
    </div>
  );
});
```

---

### 5. Missing Error Boundaries
**Severity:** MAJOR - Poor error handling
**Impact:** App crashes show blank screen instead of graceful fallback

**Problem:**
No error boundary components exist to catch and handle React errors gracefully. If any component throws an error, the entire app crashes.

**Fix:**
Create an error boundary component:

```tsx
// /src/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-amante-cream p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-error text-2xl">!</span>
            </div>
            <h1 className="font-heading text-2xl text-amante-red mb-4">
              Something went wrong
            </h1>
            <p className="font-body text-amante-charcoal mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Then wrap your app in layout.tsx:
```tsx
<body>
  <ErrorBoundary>
    <Header />
    <main>{children}</main>
    <Footer />
  </ErrorBoundary>
  <Toaster />
</body>
```

---

### 6. Unnecessary Client-Side Hydration State in HomePage
**File:** `/src/components/HomePage.tsx`
**Severity:** MAJOR - Performance issue
**Lines:** 22-36

**Problem:**
The HomePage uses a mounted state check that causes a double-render and shows a loading placeholder unnecessarily.

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-amante-red/10 rounded-lg"></div>
      </div>
    </div>
  );
}
```

**Impact:**
- Causes unnecessary loading state
- Poor Core Web Vitals (CLS)
- Delayed content display
- Bad user experience

**Fix:**
Remove the mounted state check entirely. Next.js 15 handles hydration properly:

```tsx
export default function HomePage() {
  // Remove mounted state and useEffect
  // Just return the main content directly

  const spaces = [/* ... */];
  const highlights = [/* ... */];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* ... rest of component ... */}
    </div>
  );
}
```

---

### 7. Button Component Nested in Links
**Files:** Multiple pages (gallery, events, about)
**Severity:** MAJOR - Accessibility issue
**Example Lines:**
- `/src/app/gallery/page.tsx:391-396`
- `/src/app/events/page.tsx:547-556`

**Problem:**
Buttons are wrapped inside anchor tags, creating invalid HTML and accessibility issues.

```tsx
// WRONG - Invalid HTML
<Button variant="primary" size="lg">
  <a href="/reservations">Reserve Your Table</a>
</Button>

// ALSO WRONG - Button inside Link
<Link href="/reservations">
  <Button variant="primary" size="lg">Reserve Your Table</Button>
</Link>
```

**Impact:**
- Invalid HTML (button inside link or link inside button)
- Keyboard navigation issues
- Screen reader confusion
- SEO penalties

**Fix:**
Either use Link with styled appearance or Button with onClick:

```tsx
// Option 1: Link styled as button (PREFERRED for navigation)
import Link from 'next/link';

<Link
  href="/reservations"
  className="inline-flex items-center justify-center bg-amante-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-amante-red-dark transition-colors"
>
  Reserve Your Table
</Link>

// Option 2: Button with navigation (use for actions, not navigation)
<Button
  variant="primary"
  size="lg"
  onClick={() => window.location.href = '/reservations'}
>
  Reserve Your Table
</Button>
```

Better yet, extend Button component to accept `as` prop:
```tsx
// Button.tsx
type ButtonProps = {
  as?: 'button' | 'a';
  href?: string;
  // ... other props
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ as = 'button', href, children, className = '', ...props }, ref) => {
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    if (as === 'a' && href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return <button className={classes} {...props}>{children}</button>;
  }
);
```

---

### 8. Missing Loading States for Data Fetching
**Files:** All form pages
**Severity:** MAJOR - Poor UX

**Problem:**
Forms show loading state only on submit button, but no loading state for the entire form if there are errors or during API calls.

**Impact:**
- Users can interact with form during submission
- Can trigger duplicate submissions
- No visual feedback during async operations

**Fix:**
Add form-level loading state:

```tsx
// reservations/page.tsx
export default function ReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={isSubmitting ? 'pointer-events-none opacity-60' : ''}>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
```

---

## Accessibility Issues

### 9. Missing Main Landmark
**Files:** All page components
**Severity:** MAJOR - WCAG 2.1 AA violation

**Problem:**
No `<main>` landmark in layout or pages. Screen readers cannot identify main content.

**Impact:**
- WCAG 2.1 Level A failure
- Screen readers can't skip to main content
- Poor keyboard navigation

**Fix:**
Already suggested in layout.tsx fix above - wrap children in `<main>` tag.

---

### 10. Poor Focus Management in Modals
**File:** `/src/components/layout/Header.tsx`
**Severity:** MAJOR - Accessibility issue
**Lines:** 143-230

**Problem:**
Mobile menu doesn't trap focus or handle escape key properly. When menu opens, focus isn't moved to the menu.

**Impact:**
- Keyboard users can tab outside menu
- Can't close menu with Escape key
- Poor keyboard accessibility

**Fix:**
```tsx
import { useEffect, useRef } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Trap focus in menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleTab as any);
    return () => menu.removeEventListener('keydown', handleTab as any);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ... header ... */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        ref={menuRef}
        className={/* ... */}
      >
        {/* Menu content */}
      </div>
    </>
  );
}
```

---

### 11. Missing ARIA Labels on Icon-Only Buttons
**Files:** Multiple files
**Severity:** MAJOR

**Problem:**
Many icon-only buttons lack aria-labels:

```tsx
// Header.tsx - Line 128-137 (OK - has aria-label)
<button aria-label="Toggle menu">
  {isMobileMenuOpen ? <X /> : <Menu />}
</button>

// Gallery.tsx - Line 264-272 (MISSING aria-label)
<button onClick={(e) => { e.stopPropagation(); handleShare(item); }}>
  <Share2 className="w-4 h-4" />
</button>
```

**Fix:**
Add descriptive aria-labels to all icon-only buttons:

```tsx
<button
  onClick={(e) => { e.stopPropagation(); handleShare(item); }}
  aria-label={`Share ${item.title}`}
  className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
>
  <Share2 className="w-4 h-4 text-amante-red" />
</button>
```

---

### 12. Color Contrast Issues
**Files:** Tailwind config and various components
**Severity:** MAJOR - WCAG AA violation

**Problem:**
Some color combinations don't meet WCAG AA contrast requirements:

```css
/* amante-grey on white: 4.2:1 - Barely passes */
.text-amante-grey { color: #757575; }

/* amante-pink-light on white: 1.8:1 - FAILS */
.text-amante-pink-light { color: #FCE7F3; }
```

**Impact:**
- WCAG 2.1 Level AA failure
- Users with low vision can't read text
- Legal compliance issues

**Fix:**
Use darker shades for text on light backgrounds:

```js
// tailwind.config.js
colors: {
  'amante-grey': {
    dark: '#4A4A4A',  // Use for text
    DEFAULT: '#757575',  // Use for borders/icons
    light: '#E5E5E5',  // Use for backgrounds
  },
}
```

In components, use appropriate shades:
```tsx
// Instead of
<p className="text-amante-grey">Text</p>

// Use
<p className="text-amante-grey-dark">Text</p>
```

---

### 13. Form Labels Not Properly Associated
**File:** `/src/app/reservations/page.tsx`
**Severity:** MAJOR
**Lines:** 193-204, 208-224

**Problem:**
Labels use `className="block"` with visual icons but don't use `htmlFor` to associate with inputs, and Input component is passed separately.

```tsx
<label className="block font-body font-semibold text-amante-charcoal mb-2">
  <Calendar className="inline w-5 h-5 mr-2" />
  Date
</label>
<Input type="date" name="date" value={formData.date} onChange={handleChange} required />
```

**Impact:**
- Clicking label doesn't focus input
- Screen readers may not associate label with input
- Poor accessibility

**Fix:**
Input component already handles labels via props, so use it:

```tsx
<Input
  type="date"
  name="date"
  label="Date"
  leftIcon={<Calendar className="w-5 h-5" />}
  value={formData.date}
  onChange={handleChange}
  required
/>
```

Or if using separate label, add id and htmlFor:
```tsx
<label htmlFor="date" className="block font-body font-semibold text-amante-charcoal mb-2">
  <Calendar className="inline w-5 h-5 mr-2" />
  Date
</label>
<Input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required />
```

---

## Performance Issues

### 14. Framer Motion Overuse
**Files:** All page components
**Severity:** MODERATE - Performance impact

**Problem:**
Every section uses Framer Motion animations with `whileInView`, which can cause performance issues on low-end devices and adds unnecessary bundle size.

```tsx
{/* This pattern repeated 20+ times per page */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

**Impact:**
- Increased bundle size (~30KB)
- Layout thrashing on scroll
- Reduced performance on mobile
- Poor Core Web Vitals

**Fix:**
Use CSS animations for simple fade-ins and reserve Framer Motion for complex interactions:

```css
/* globals.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@supports (animation-timeline: view()) {
  .scroll-animate {
    animation: fadeInUp linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
```

Then replace simple Framer Motion animations:
```tsx
// Instead of
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>

// Use
<div className="scroll-animate">
```

---

### 15. Missing Image Optimization
**Files:** All page components using placeholder gradients
**Severity:** MODERATE

**Problem:**
Components use gradient placeholders instead of actual optimized images. When real images are added, they need proper optimization.

```tsx
// Current placeholder
<div className="relative h-96 bg-gradient-to-br from-amante-pink-light to-amante-pink">
  <Heart className="w-24 h-24 text-amante-red/20" />
</div>
```

**Impact:**
- When real images added, could cause poor LCP
- No lazy loading
- No responsive images
- Poor performance

**Fix:**
Prepare for proper Image usage:

```tsx
import Image from 'next/image';

<div className="relative h-96 overflow-hidden">
  <Image
    src="/images/spaces/cafe.jpg"
    alt="Amante Café interior with customers enjoying coffee"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
    priority={false}  // Only first image should be priority
    quality={85}
  />
</div>
```

---

### 16. No Code Splitting for Heavy Components
**Severity:** MODERATE

**Problem:**
Gallery lightbox and other heavy components are always loaded, even when not used.

**Fix:**
Use dynamic imports:

```tsx
// gallery/page.tsx
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('@/components/Lightbox'), {
  ssr: false,
  loading: () => <Loading />
});

// Only render when needed
{selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
```

---

### 17. Unnecessary Re-renders in Header
**File:** `/src/components/layout/Header.tsx`
**Severity:** MODERATE

**Problem:**
Navigation array is recreated on every render.

```tsx
export default function Header() {
  // This array is recreated every render
  const navigation = [
    { name: 'Home', href: '/' },
    // ... more items
  ];
```

**Fix:**
Move outside component or memoize:

```tsx
const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  {
    name: 'Our Spaces',
    href: '#',
    dropdown: [/* ... */]
  },
  // ... rest
];

export default function Header() {
  const navigation = NAVIGATION_ITEMS;
  // ... rest of component
}
```

---

### 18. Missing Next.js Font Optimization
**File:** `/src/app/layout.tsx`
**Severity:** MODERATE

**Problem:**
Custom fonts (Playfair Display, Inter) referenced in Tailwind config but not loaded via Next.js font system.

```js
// tailwind.config.js
fontFamily: {
  heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
  body: ['var(--font-inter)', 'Inter', 'sans-serif'],
}
```

**Impact:**
- Flash of unstyled text (FOUT)
- Poor CLS score
- Fonts not optimized

**Fix:**
```tsx
// layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-body">
        {/* ... */}
      </body>
    </html>
  );
}
```

---

## React Best Practices Issues

### 19. Inline Function Definitions in Render
**Files:** Multiple components
**Severity:** MINOR - Performance

**Problem:**
Functions defined inline in JSX cause unnecessary re-renders and memory allocation.

```tsx
// gallery/page.tsx - Line 95-106
const handleShare = (item: typeof galleryItems[0]) => {
  if (navigator.share) {
    navigator.share({/* ... */});
  } else {
    alert('Share functionality would be implemented here');
  }
};
```

**Fix:**
Use useCallback for functions passed as props:

```tsx
const handleShare = useCallback((item: typeof galleryItems[0]) => {
  if (navigator.share) {
    navigator.share({
      title: item.title,
      text: `Check out this photo from Amante: ${item.title}`,
      url: window.location.href
    }).catch(console.error);
  } else {
    toast.error('Sharing not supported on this device');
  }
}, []);
```

---

### 20. Missing Key Props Warnings
**File:** `/src/app/about/page.tsx`
**Severity:** MINOR
**Lines:** 358-362

**Problem:**
Array iteration uses index as key, which can cause issues if array order changes.

```tsx
{[1, 2, 3, 4, 5].map((star) => (
  <Star key={star} className="w-6 h-6 fill-amante-red text-amante-red" />
))}
```

**This is actually OK** since the array is static, but better practice:

```tsx
{Array.from({ length: 5 }, (_, i) => (
  <Star key={`star-${i}`} className="w-6 h-6 fill-amante-red text-amante-red" />
))}
```

---

### 21. Uncontrolled vs Controlled Form Inconsistency
**File:** `/src/app/reservations/page.tsx`
**Severity:** MINOR

**Problem:**
Mixing controlled components (Input, Select with value) and uncontrolled components (checkbox with checked).

All form inputs should be consistently controlled or uncontrolled. Current implementation is correct but inconsistent pattern.

**Current (acceptable but could be better):**
```tsx
<input
  type="checkbox"
  name="agreeToSMS"
  id="agreeToSMS"
  checked={formData.agreeToSMS}
  onChange={handleChange}
/>
```

**Better - Extract to controlled Checkbox component:**
```tsx
// ui/Checkbox.tsx
export default function Checkbox({ label, checked, onChange, required }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        className="mt-1 w-5 h-5 text-amante-red border-amante-grey-light rounded focus:ring-amante-red"
      />
      {label && <label className="font-body text-sm text-amante-charcoal">{label}</label>}
    </div>
  );
}
```

---

## Code Consistency Issues

### 22. Inconsistent Component Export Patterns
**Severity:** MINOR

**Problem:**
Some components use default export, others use named exports. Some use arrow functions, others use function declarations.

```tsx
// Button.tsx - named const + default export
const Button = forwardRef<HTMLButtonElement, ButtonProps>(/* ... */);
export default Button;

// Loading.tsx - default export function
export default function Loading({ size, text, fullScreen }: LoadingProps) { }

// HomePage.tsx - default export function
export default function HomePage() { }
```

**Recommendation:**
Choose one pattern and stick with it. Recommended pattern:

```tsx
// For UI components (reusable)
const Button = forwardRef<HTMLButtonElement, ButtonProps>(/* ... */);
Button.displayName = 'Button';
export default Button;

// For page components
export default function HomePage() { }

// For utility components
export default function Loading(props: LoadingProps) { }
```

---

### 23. Inconsistent Error Handling Patterns
**Files:** Form pages
**Severity:** MINOR

**Problem:**
Error handling varies across forms:

```tsx
// Some use try-catch with toast
try {
  const response = await fetch(/* ... */);
  if (!response.ok) throw new Error(/* ... */);
  toast.success(/* ... */);
} catch (error) {
  toast.error(error instanceof Error ? error.message : 'Failed...');
}

// Others might handle differently
```

**Recommendation:**
Create a consistent error handling utility:

```tsx
// lib/error-utils.ts
export function handleFormError(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}

// Usage
catch (error) {
  const message = handleFormError(error, 'Failed to submit form');
  toast.error(message);
}
```

---

### 24. Magic Numbers in Animations
**Files:** All pages with animations
**Severity:** MINOR

**Problem:**
Animation durations and delays are hardcoded throughout components:

```tsx
transition={{ duration: 0.6, delay: index * 0.1 }}
transition={{ duration: 0.5, delay: 0.1 }}
transition={{ duration: 0.8, delay: 0.2 }}
```

**Recommendation:**
Define animation constants:

```tsx
// lib/animation-constants.ts
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
} as const;

export const STAGGER_DELAY = 0.1;

// Usage
transition={{
  duration: ANIMATION_DURATION.normal,
  delay: index * STAGGER_DELAY
}}
```

---

## Improvements (Best Practices)

### 25. Add TypeScript Strict Mode Compliance
**File:** `tsconfig.json`
**Severity:** IMPROVEMENT

**Current State:** Already has strict mode enabled ✓

The TypeScript configuration is excellent with strict mode enabled:
```json
{
  "strict": true,
  "strictNullChecks": true,
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

**Recommendation:** Maintain this configuration. It's excellent.

---

### 26. Add Loading Skeletons Instead of Spinners
**File:** `/src/components/ui/Loading.tsx`
**Severity:** IMPROVEMENT

**Current:** Generic loading spinner

**Better UX:** Content-specific skeletons that match the layout

```tsx
// ui/Skeleton.tsx (already exists but underutilized)
export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-4">
      <div className="h-96 bg-amante-grey-light rounded-lg" />
      <div className="space-y-4">
        <div className="h-8 bg-amante-grey-light rounded w-3/4" />
        <div className="h-4 bg-amante-grey-light rounded" />
        <div className="h-4 bg-amante-grey-light rounded w-5/6" />
      </div>
    </div>
  );
}
```

---

### 27. Add Suspense Boundaries for Better Loading States
**Severity:** IMPROVEMENT

**Recommendation:**
Use React Suspense for async components:

```tsx
// app/layout.tsx
import { Suspense } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';

<Suspense fallback={<PageSkeleton />}>
  {children}
</Suspense>
```

---

### 28. Implement Progressive Enhancement
**Severity:** IMPROVEMENT

**Current:** Heavy reliance on JavaScript

**Recommendation:**
Forms should work without JavaScript:

```tsx
// Use Next.js Server Actions for forms
// app/reservations/actions.ts
'use server';

export async function createReservation(formData: FormData) {
  const data = {
    date: formData.get('date'),
    time: formData.get('time'),
    // ... parse form data
  };

  // Validate and save
  const result = await saveReservation(data);
  return result;
}

// page.tsx
<form action={createReservation}>
  {/* Works without JS! */}
</form>
```

---

### 29. Add Internationalization (i18n) Support
**Severity:** IMPROVEMENT (Future-proofing)

**Recommendation:**
Prepare for multi-language support:

```tsx
// lib/i18n.ts
export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    // ... more
  },
  hi: {
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    // ... more
  }
};

// Usage with next-intl or similar
```

---

### 30. Implement Analytics Tracking
**Severity:** IMPROVEMENT

**Recommendation:**
Add event tracking for user interactions:

```tsx
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Google Analytics, Mixpanel, etc.
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Usage in forms
const handleSubmit = async (e) => {
  trackEvent('reservation_started', { space: formData.spacePreference });
  // ... submit logic
  trackEvent('reservation_completed');
};
```

---

### 31. Add Rate Limiting on Client Side
**Severity:** IMPROVEMENT

**Current:** API has rate limiting, but client can still spam

**Recommendation:**
Add client-side debouncing and rate limiting:

```tsx
// hooks/useRateLimitedSubmit.ts
import { useState, useCallback } from 'react';

export function useRateLimitedSubmit(submitFn: Function, cooldownMs = 3000) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const submit = useCallback(async (...args: any[]) => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setCanSubmit(false);

    try {
      await submitFn(...args);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setCanSubmit(true), cooldownMs);
    }
  }, [canSubmit, isSubmitting, submitFn, cooldownMs]);

  return { submit, isSubmitting, canSubmit };
}
```

---

### 32. Add Form Validation Preview
**Severity:** IMPROVEMENT

**Recommendation:**
Show validation errors as user types, not just on submit:

```tsx
// hooks/useFormValidation.ts
import { useState, useCallback } from 'react';
import { z } from 'zod';

export function useFormValidation<T extends z.ZodType>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((field: string, value: any) => {
    try {
      schema.shape[field].parse(value);
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [field]: error.errors[0].message
        }));
      }
    }
  }, [schema]);

  return { errors, validate };
}
```

---

## File Structure and Organization

### 33. Consider Atomic Design Pattern
**Severity:** SUGGESTION

**Current Structure:**
```
src/
  components/
    ui/           # Atoms
    layout/       # Organisms
  HomePage.tsx   # Page template
  app/
    page.tsx    # Pages
```

**Recommendation:**
```
src/
  components/
    atoms/      # Button, Input, etc.
    molecules/  # Form fields with labels, card components
    organisms/  # Header, Footer, Forms
    templates/  # SpacePageTemplate, etc.
  app/
    [routes]/
```

---

## Testing Gaps

### 34. Missing Component Tests
**Current:** Only basic component tests for Button, Input, Select, FileUpload

**Recommendation:**
Add tests for:
- Form submission flows
- Navigation interactions
- Error states
- Accessibility (using jest-axe)

```tsx
// __tests__/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/layout/Header';

describe('Header', () => {
  it('opens mobile menu on menu button click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes mobile menu on escape key', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByLabelText('Toggle menu'));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

---

## Security Considerations

### 35. Environment Variables Exposure
**Severity:** OBSERVATION (Good practice already followed)

**Current:** API keys properly handled server-side only ✓

The codebase correctly handles sensitive data:
- Supabase keys only used server-side
- Email credentials in environment variables
- No client-side exposure of secrets

**Recommendation:** Continue this practice. Consider adding:

```tsx
// lib/env.ts - Validate env vars at build time
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith('re_'),
});

export const env = envSchema.parse(process.env);
```

---

## Summary of Findings

### Critical (Must Fix)
1. ✓ Missing Toaster in layout.tsx
2. ✓ Missing Header/Footer in layout
3. ✓ Wrong component on homepage (CleanComingSoon vs HomePage)

### Major (Should Fix)
4. ✓ Select component props mismatch
5. ✓ Missing error boundaries
6. ✓ Unnecessary hydration check in HomePage
7. ✓ Button inside Link accessibility issue
8. ✓ Missing form-level loading states
9. ✓ No main landmark
10. ✓ Poor focus management in mobile menu
11. ✓ Missing ARIA labels
12. ✓ Color contrast issues
13. ✓ Form label associations

### Performance (Should Optimize)
14. ✓ Framer Motion overuse
15. ✓ Missing image optimization strategy
16. ✓ No code splitting for heavy components
17. ✓ Unnecessary re-renders in Header
18. ✓ Missing font optimization

### Best Practices (Minor Issues)
19. ✓ Inline functions in render
20. ✓ Key props warnings
21. ✓ Form control consistency

### Consistency (Nice to Have)
22. ✓ Export patterns
23. ✓ Error handling patterns
24. ✓ Magic numbers in animations

### Improvements (Future Enhancements)
25. ✓ TypeScript strict mode (already good)
26. ✓ Loading skeletons
27. ✓ Suspense boundaries
28. ✓ Progressive enhancement
29. ✓ i18n support
30. ✓ Analytics tracking
31. ✓ Client-side rate limiting
32. ✓ Real-time form validation
33. ✓ Atomic design structure
34. ✓ More comprehensive tests
35. ✓ Environment validation (already good)

---

## Priority Fixes

### Immediate (This Week)
1. Add Toaster to layout.tsx
2. Add Header and Footer to layout.tsx
3. Fix homepage routing
4. Fix Select component type safety
5. Add error boundaries

### Short-term (This Month)
6. Fix all accessibility issues (#9-13)
7. Remove unnecessary hydration check
8. Fix Button/Link nesting issues
9. Optimize Framer Motion usage
10. Add font optimization

### Medium-term (Next Quarter)
11. Add loading skeletons
12. Implement code splitting
13. Add comprehensive testing
14. Add analytics tracking
15. Prepare for image optimization

---

## Positive Highlights

Despite the issues found, the codebase has several strengths:

1. **Excellent TypeScript Usage** - Strict mode enabled, proper types throughout
2. **Comprehensive Validation** - Zod schemas with detailed validation rules
3. **Security Best Practices** - Proper handling of sensitive data, sanitization
4. **Consistent Component API** - UI components follow consistent patterns
5. **Good Code Organization** - Clear separation of concerns
6. **API Error Handling** - Robust server-side error handling and rate limiting
7. **Responsive Design** - Tailwind config with mobile-first approach
8. **Modern Next.js Patterns** - Using App Router, Server/Client components correctly

---

## Conclusion

The Amante restaurant website has a **solid foundation** but requires **critical accessibility fixes** and **performance optimizations** before production deployment. The most urgent issues are:

1. Layout missing core providers (Toaster, Header, Footer)
2. Homepage routing to wrong component
3. Multiple WCAG accessibility violations
4. Type safety issues in form components

After addressing the critical and major issues, the application will provide an excellent user experience with good performance and accessibility. The codebase demonstrates professional-level development practices with room for improvement in specific areas.

**Recommendation:** Address all Critical and Major issues before production launch. Performance and consistency improvements can be addressed iteratively post-launch.

---

**Report Generated:** October 27, 2025
**Files Analyzed:** 25+ TypeScript/TSX files
**Lines of Code Reviewed:** ~8,000+
**Issues Found:** 35 (3 Critical, 10 Major, 6 Performance, 3 Best Practices, 3 Consistency, 10 Improvements)
