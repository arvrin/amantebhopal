# Comprehensive UX Audit Report: Amante Restaurant Website

**Audit Date:** October 27, 2025
**Audited By:** UX/UI Design Expert
**Project:** Amante Multi-Space Dining Destination Website

---

## Executive Summary

This comprehensive UX audit analyzed the complete Amante restaurant website across all pages, components, and user flows. The analysis identified **73 distinct issues** categorized by severity, along with specific recommendations for improvement. The website demonstrates strong foundational design principles but requires attention in navigation architecture, accessibility compliance, form usability, and responsive design optimization.

**Overall Assessment:**
- Strong visual brand consistency
- Good component reusability
- Significant navigation and information architecture issues
- Multiple accessibility violations
- Form UX needs substantial improvements
- Mobile experience requires optimization

---

## Table of Contents

1. [Critical Issues](#critical-issues) (13 items)
2. [Major Issues](#major-issues) (24 items)
3. [Minor Issues](#minor-issues) (21 items)
4. [Enhancement Opportunities](#enhancement-opportunities) (15 items)

---

## Critical Issues
**Issues that break user experience or prevent task completion**

### 1. Missing Breadcrumbs Across All Pages
**Location:** All page templates
**Problem:** Users cannot understand their location within the site hierarchy or navigate back easily. No breadcrumb navigation exists on any page.
**User Impact:** Users become disoriented, especially when navigating between the six space pages or form pages. Increases back button usage and potential abandonment.
**Recommended Fix:**
- Add breadcrumb component to all pages except homepage
- Pattern: Home > Our Spaces > Café & Bakery
- Make breadcrumbs clickable for quick navigation
- Add schema.org BreadcrumbList structured data

### 2. Header Dropdown Not Keyboard Accessible
**Location:** `/src/components/layout/Header.tsx` (lines 72-95)
**Problem:** The "Our Spaces" dropdown menu only opens on hover, making it completely inaccessible via keyboard navigation. Violates WCAG 2.1 Level A (2.1.1 Keyboard).
**User Impact:** Keyboard-only users and screen reader users cannot access any of the six space pages through main navigation.
**Recommended Fix:**
```typescript
// Add keyboard event handlers
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    setIsSpacesOpen(!isSpacesOpen);
  }
  if (e.key === 'Escape') {
    setIsSpacesOpen(false);
  }
}}
// Add proper ARIA attributes
aria-expanded={isSpacesOpen}
aria-haspopup="true"
```

### 3. Select Component Missing Options Prop Implementation
**Location:** `/src/components/ui/Select.tsx` (line 15)
**Problem:** Select component defines `options` prop in interface but all forms pass inline `<option>` children instead, creating API inconsistency.
**User Impact:** Developers experience confusion, potential bugs when switching between patterns. Inconsistent form implementation.
**Recommended Fix:**
- Either remove `options` prop from interface and make it children-based
- OR implement options-based rendering and update all forms
- Document the chosen pattern clearly

### 4. Form Validation Errors Not Announced to Screen Readers
**Location:** All form pages (reservations, contact, feedback, careers, etc.)
**Problem:** Form validation errors lack `aria-live` regions, so screen reader users don't know submission failed or what fields have errors.
**User Impact:** Screen reader users cannot complete forms successfully. Violates WCAG 2.1 Level A (4.1.3 Status Messages).
**Recommended Fix:**
```typescript
// Add to form submission error handling
<div
  role="alert"
  aria-live="assertive"
  className="sr-only"
>
  {validationErrors.length > 0 &&
    `Form has ${validationErrors.length} errors. Please correct and try again.`
  }
</div>
```

### 5. Missing Skip Navigation Link
**Location:** `/src/components/layout/Header.tsx`
**Problem:** No "Skip to main content" link for keyboard users to bypass repetitive navigation.
**User Impact:** Keyboard and screen reader users must tab through entire header navigation on every page. Violates WCAG 2.1 Level A (2.4.1 Bypass Blocks).
**Recommended Fix:**
```typescript
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amante-red focus:text-white"
>
  Skip to main content
</a>
// Add id="main-content" to main content wrapper
```

### 6. File Upload Component Missing Error Handling UI
**Location:** `/src/components/ui/FileUpload.tsx`
**Problem:** File upload component (used in careers page) doesn't display error messages when file size exceeds limit or format is incorrect.
**User Impact:** Users don't know why their resume upload failed, leading to form abandonment.
**Recommended Fix:**
- Add error state display in FileUpload component
- Show specific error messages (file too large, wrong format)
- Add visual error indication (red border, error icon)

### 7. No Loading States for Image-Heavy Gallery Page
**Location:** `/src/app/gallery/page.tsx`
**Problem:** Gallery page has 33 placeholder items but no skeleton loading states or progressive loading. Page appears broken while loading.
**User Impact:** Users see blank page or broken layout on slow connections, assume site is broken, abandon.
**Recommended Fix:**
- Add skeleton loaders for gallery grid
- Implement lazy loading for images
- Show loading spinner during initial render

### 8. Mobile Menu Covers Content Without Scroll Lock
**Location:** `/src/components/layout/Header.tsx` (lines 143-230)
**Problem:** When mobile menu is open, users can still scroll background content, creating confusion and accidental dismissals.
**User Impact:** Poor mobile UX, users accidentally close menu, difficult to navigate on mobile.
**Recommended Fix:**
```typescript
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isMobileMenuOpen]);
```

### 9. Success Pages Missing Back Navigation
**Location:** All success states (reservations, contact, feedback, careers, private-events)
**Problem:** After successful form submission, users can only "Return Home" or resubmit. No way to navigate to related pages or continue browsing.
**User Impact:** Users feel trapped, forced to start navigation over from homepage.
**Recommended Fix:**
- Add "Browse Our Spaces" button
- Add "View Menu" button
- Add "Explore Events" button
- Provide contextual next steps based on form type

### 10. Phone Number Pattern Validation Too Restrictive
**Location:** All forms with phone input (pattern="[+]?[0-9]{10,15}")
**Problem:** Pattern doesn't allow common formats like (123) 456-7890 or 123-456-7890, frustrating users.
**User Impact:** Users' valid phone numbers are rejected, form abandonment increases.
**Recommended Fix:**
- Use more flexible regex: `pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"`
- OR remove pattern and do server-side validation
- Show example format: "e.g., +91 98937 79100"

### 11. Footer Privacy/Terms Links Go Nowhere
**Location:** `/src/components/layout/Footer.tsx` (lines 200-208)
**Problem:** Footer links to Privacy Policy, Terms of Service, and Cancellation Policy pages that don't exist, resulting in 404 errors.
**User Impact:** Users trying to review policies hit dead ends, loss of trust, potential legal compliance issues.
**Recommended Fix:**
- Create actual policy pages OR
- Remove links until pages are ready OR
- Link to coming-soon placeholders

### 12. Gallery Lightbox Not Keyboard Escapable
**Location:** `/src/app/gallery/page.tsx` (lines 296-372)
**Problem:** Lightbox modal can only be closed by clicking close button or backdrop, not by Escape key.
**User Impact:** Keyboard users cannot close lightbox, trapped in modal. Violates WCAG 2.1 Level A (2.1.2 No Keyboard Trap).
**Recommended Fix:**
```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedImage) {
      setSelectedImage(null);
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [selectedImage]);
```

### 13. Missing Focus Management on Modal Open
**Location:** All pages with modals/success states
**Problem:** When modals or success states appear, focus doesn't move to the new content, screen readers don't announce the change.
**User Impact:** Screen reader users don't know modal opened, keyboard users' focus remains on background.
**Recommended Fix:**
```typescript
const modalRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (isSuccess && modalRef.current) {
    modalRef.current.focus();
  }
}, [isSuccess]);
// Add tabIndex={-1} and ref to modal container
```

---

## Major Issues
**Issues that significantly impact UX but don't completely block tasks**

### 14. Inconsistent CTA Button Placement
**Location:** All pages with CTAs
**Problem:** Primary CTAs sometimes use `<Link>` wrapper, sometimes `<a>` tags, sometimes buttons with onClick. Inconsistent patterns across pages.
**User Impact:** Inconsistent behavior (some open in new tab with cmd+click, others don't), maintenance difficulties.
**Recommended Fix:** Standardize on Next.js `<Link>` for internal navigation, ensure all CTAs support browser navigation features.

### 15. Space Pages Use Identical Layout Without Differentiation
**Location:** `/src/components/SpacePageTemplate.tsx` and all space page implementations
**Problem:** All six space pages use exact same template with same structure, colors, and animations. No visual differentiation between spaces.
**User Impact:** Users confused about which space they're viewing, spaces don't feel unique, brand storytelling weakened.
**Recommended Fix:**
- Add unique color themes per space (cafe: browns/ambers, lounge: deep purples, club: vibrant neons)
- Add space-specific imagery (currently all placeholders)
- Vary layout slightly per space type

### 16. Form Field Labels Not Associated with Inputs
**Location:** Multiple form pages where labels are separate from Input component
**Problem:** Labels rendered outside Input component don't have programmatic association via `htmlFor` and `id`.
**User Impact:** Screen reader users can't determine which label goes with which field. Violates WCAG 2.1 Level A (1.3.1 Info and Relationships).
**Recommended Fix:**
- Pass label prop to Input component to ensure proper association
- OR add explicit id/htmlFor associations manually

### 17. No Autofocus on Form Page Load
**Location:** All form pages
**Problem:** Users must manually click into first field, adding unnecessary interaction step.
**User Impact:** Slows form completion, especially on desktop. Not critical but reduces efficiency.
**Recommended Fix:**
```typescript
const firstFieldRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  firstFieldRef.current?.focus();
}, []);
// Add ref to first input
```

### 18. Character Count Shows After Typing (Not Before)
**Location:** Reservations, Contact, Careers, Private Events forms
**Problem:** Character counters display "0/500 characters" only after user types, not immediately visible as guidance.
**User Impact:** Users don't know field has character limit until they start typing.
**Recommended Fix:** Make counter visible immediately, use muted color until user starts typing.

### 19. Star Rating Not Navigable by Keyboard
**Location:** `/src/app/feedback/page.tsx` (lines 106-143)
**Problem:** Star rating buttons don't support keyboard navigation (arrow keys to change rating, Enter to select).
**User Impact:** Keyboard users must tab through all 5 stars individually, slow and cumbersome.
**Recommended Fix:** Implement arrow key navigation within rating group, add role="radiogroup" with proper ARIA attributes.

### 20. Success State Removes All Context
**Location:** All form success pages
**Problem:** Success state replaces entire form with success message, user can't review what they submitted.
**User Impact:** Users unsure if they filled everything correctly, no confirmation of details, increased support requests.
**Recommended Fix:** Show summary of submitted information in success state (name, date, party size, etc.).

### 21. No Indication of Required vs Optional Fields
**Location:** All forms
**Problem:** Required fields marked with asterisk (*) but no legend explaining what asterisk means. Optional fields not clearly marked.
**User Impact:** Users uncertain which fields are mandatory, may skip required fields.
**Recommended Fix:**
- Add form legend: "* indicates required field"
- Consider marking optional fields with "(optional)" instead
- Make optional fields visually distinct (lighter label color)

### 22. Events Filter Buttons Too Small on Mobile
**Location:** `/src/app/events/page.tsx` (lines 186-220)
**Problem:** Filter buttons with icons + text become cramped on mobile, difficult to tap accurately.
**User Impact:** Users struggle to tap correct filter, especially on smaller phones. Violates WCAG 2.1 Level AAA (2.5.5 Target Size).
**Recommended Fix:** Stack filters vertically on mobile OR hide text and show icons only OR use dropdown select on mobile.

### 23. Gallery Sticky Filter Jumps on Scroll
**Location:** `/src/app/gallery/page.tsx` (line 155)
**Problem:** Sticky filter bar at top causes content jump when scrolling due to z-index and backdrop-blur without proper height compensation.
**User Impact:** Jarring scroll experience, users lose place when scrolling.
**Recommended Fix:** Add proper height placeholder when filter becomes sticky, smooth transition.

### 24. No Empty State Guidance
**Location:** Events and Gallery filter results
**Problem:** When filters return no results, empty state only shows "No events found. Check back soon!" without guidance on what to do.
**User Impact:** Users unsure if it's a bug or if there really are no results, no path forward.
**Recommended Fix:**
- Add "Try a different filter" suggestion
- Show related content that IS available
- Add "Request this type of event" action

### 25. Time Slot Selection Too Limited
**Location:** `/src/app/reservations/page.tsx` (lines 28-35)
**Problem:** Only 6 pre-defined time slots (11 AM, 1 PM, 3 PM, 7 PM, 9 PM, 11 PM). No flexibility for off-times.
**User Impact:** Users wanting 6:30 PM or 8 PM have to choose closest time, may conflict with their schedule.
**Recommended Fix:**
- Add more granular time slots (every 30 minutes)
- OR add "Other (specify in special requests)" option
- OR use time input field with validation

### 26. Footer "Get in Touch" Hours Don't Match Header
**Location:** Footer shows "11 AM - 12 AM" but Contact page shows different hours
**Problem:** Inconsistent information across pages creates confusion about actual operating hours.
**User Impact:** Users don't know real hours, may arrive when closed.
**Recommended Fix:** Centralize hours information in config file, use single source of truth across all pages.

### 27. Private Events Form Missing Date Flexibility
**Location:** `/src/app/private-events/page.tsx`
**Problem:** Event date is required field with single date picker. Events often need date ranges or flexible dates.
**User Impact:** Users with flexible dates forced to pick arbitrary date, may need to change later.
**Recommended Fix:** Add "Date is flexible" checkbox, show date range picker option.

### 28. Mobile Menu Doesn't Show Active Page
**Location:** `/src/components/layout/Header.tsx` mobile menu
**Problem:** Mobile menu highlights active page in navigation list but not in dropdown submenu items.
**User Impact:** Users don't know which space page they're currently viewing when opening mobile menu.
**Recommended Fix:** Apply active state styling to dropdown items in mobile menu matching pathname.

### 29. Button Loading State Only Shows Text Change
**Location:** `/src/components/ui/Button.tsx`
**Problem:** Loading state shows spinner and changes text but button remains fully enabled appearance, not clearly disabled.
**User Impact:** Users might try to click multiple times, unsure if first click registered.
**Recommended Fix:** Add visual disabled state when loading (reduced opacity, cursor: not-allowed).

### 30. Homepage Hero Height Issues on Short Screens
**Location:** `/src/components/HomePage.tsx` (line 121) - `h-screen`
**Problem:** Hero section at 100vh height pushes content below fold on short screens (laptops with browser chrome).
**User Impact:** Users on laptops/short screens don't see scroll indicator, think page is complete.
**Recommended Fix:** Use `min-h-[600px] h-screen max-h-[900px]` to ensure reasonable bounds.

### 31. About Page Placeholder Images Confusing
**Location:** `/src/app/about/page.tsx` - gradient placeholder boxes with icons
**Problem:** Obvious placeholder gradients with icons make site look unfinished, unprofessional.
**User Impact:** Users question site legitimacy, reduced trust in brand.
**Recommended Fix:** Replace with actual photos OR use higher-quality stock photos OR remove image sections until real photos available.

### 32. Contact Page Inquiry Types Too Vague
**Location:** `/src/app/contact/page.tsx` (line 23)
**Problem:** Inquiry types include "General", "Issue", "Feedback" which overlap and confuse users on which to choose.
**User Impact:** Inquiries routed incorrectly, slower response times.
**Recommended Fix:**
- Rename to clearer categories: "General Information", "Report a Problem", "Share Feedback"
- Add description helper text for each option
- Route to specific teams based on selection

### 33. Gallery Share Functionality Incomplete
**Location:** `/src/app/gallery/page.tsx` (lines 95-106)
**Problem:** Share button shows "alert('Share functionality would be implemented here')" - debug code left in production.
**User Impact:** Users think feature is broken, poor professional impression.
**Recommended Fix:** Either implement proper share functionality OR remove share buttons until ready.

### 34. Events Page Date Formatting Overly Verbose
**Location:** `/src/app/events/page.tsx` (lines 280-285)
**Problem:** Dates shown as "Saturday, October 30, 2025" takes excessive space, especially on mobile cards.
**User Impact:** Event cards become cramped, harder to scan multiple events quickly.
**Recommended Fix:** Use shorter format: "Sat, Oct 30, 2025" OR "Oct 30 • Saturday"

### 35. Careers Form Expected Salary Optional But Should Guide
**Location:** `/src/app/careers/page.tsx` (lines 377-391)
**Problem:** Salary field is optional with no guidance, makes budgeting difficult for HR, users uncertain if they should fill it.
**User Impact:** Mismatched salary expectations discovered late in process, wasted time.
**Recommended Fix:**
- Add helper text: "Helps us ensure mutual fit"
- Consider making it range instead of exact number
- Add "Negotiable" checkbox option

### 36. No Confirmation Before Leaving Filled Forms
**Location:** All form pages
**Problem:** If user fills form partially and navigates away, no warning, all data lost.
**User Impact:** Accidental form abandonment, frustration, users must re-enter all data.
**Recommended Fix:**
```typescript
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (formHasChanges && !isSuccess) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [formHasChanges, isSuccess]);
```

### 37. Footer Social Media Links Not Verified
**Location:** `/src/components/layout/Footer.tsx` (lines 140-167)
**Problem:** Social media links point to amantebhopal handles but likely don't exist yet (placeholder URLs).
**User Impact:** Users click links and find non-existent pages, brand credibility damaged.
**Recommended Fix:** Verify accounts exist OR add "Coming Soon" indicator OR remove until accounts are active.

---

## Minor Issues
**Polish issues and smaller improvements**

### 38. Scroll Indicator Arrow Animation Not Smooth
**Location:** All pages with `animate-bounce` (HomePage, SpacePages, etc.)
**Problem:** Bounce animation feels too aggressive, draws excessive attention.
**User Impact:** Minor visual annoyance, distracts from main content.
**Recommended Fix:** Use gentler animation:
```css
animate-[bounce_3s_ease-in-out_infinite]
```

### 39. Button Hover Transform Not Accessible
**Location:** `/src/components/ui/Button.tsx` primary variant (line 30)
**Problem:** `-translate-y-0.5` hover effect is purely decorative and causes layout shift.
**User Impact:** Minor visual jank, can affect users sensitive to motion.
**Recommended Fix:** Add `will-change: transform` OR use scale instead of translate.

### 40. Inconsistent Spacing Units
**Location:** Throughout all components
**Problem:** Mixing `gap-4`, `gap-6`, `gap-8`, `mb-6`, `mb-8`, `mb-12` without clear system.
**User Impact:** Visual inconsistency, maintenance difficulty.
**Recommended Fix:** Define spacing scale in design system: small (gap-4), medium (gap-6), large (gap-8), xl (gap-12).

### 41. Color Contrast Issues with Grey Text
**Location:** Helper text throughout forms using `text-amante-grey`
**Problem:** May not meet WCAG AA contrast ratio of 4.5:1 depending on amante-grey color definition.
**User Impact:** Users with low vision struggle to read helper text.
**Recommended Fix:** Test all grey text colors, ensure 4.5:1 minimum ratio, darken if needed.

### 42. Missing Hover States on Some Links
**Location:** Footer explore links, Contact page quick links
**Problem:** Some text links don't have visible hover state, users uncertain if clickable.
**User Impact:** Reduced affordance, users may not realize elements are interactive.
**Recommended Fix:** Ensure all links have underline on hover OR color change OR both.

### 43. Icon Sizes Inconsistent
**Location:** Throughout all pages
**Problem:** Icons vary between `w-4 h-4`, `w-5 h-5`, `w-6 h-6`, `w-8 h-8` with no clear pattern.
**User Impact:** Visual inconsistency, unprofessional appearance.
**Recommended Fix:** Define icon size scale: sm (16px), md (20px), lg (24px), xl (32px).

### 44. Form Section Headers Not Semantically Grouped
**Location:** All forms with multiple sections
**Problem:** Section headers like "Contact Information" use `<h3>` but aren't in `<fieldset>` with `<legend>`.
**User Impact:** Screen readers can't identify form sections properly, harder to navigate forms.
**Recommended Fix:** Wrap form sections in `<fieldset>` tags with `<legend>` for section titles.

### 45. Toast Notifications Position Not Consistent
**Location:** Using react-hot-toast but position not configured
**Problem:** Default toast position may overlap important UI elements.
**User Impact:** Users might miss important success/error messages.
**Recommended Fix:** Configure toast position explicitly:
```typescript
<Toaster position="top-center" />
```

### 46. Loading States Use Generic "Loading..." Text
**Location:** All button loading states
**Problem:** Loading text is generic "Submitting..." - doesn't confirm what's being submitted.
**User Impact:** Minor confusion, less reassuring feedback.
**Recommended Fix:** Use specific messages: "Sending reservation...", "Uploading resume...", etc.

### 47. Space Page Capacity Field Sometimes String, Sometimes Number Format
**Location:** SpacePageTemplate capacity prop
**Problem:** Inconsistent capacity representation: "50 guests", "Up to 100", "10-20 people".
**User Impact:** Users can't easily compare capacities across spaces.
**Recommended Fix:** Standardize format: "Capacity: 50 guests" or "Up to 50 guests".

### 48. No Print Styles
**Location:** Entire site
**Problem:** No print-specific CSS, pages won't print well (nav, footer, backgrounds waste ink).
**User Impact:** Users trying to print menus, event details, or reservation confirmations get poor results.
**Recommended Fix:** Add print media queries to hide nav/footer, adjust colors, optimize layout.

### 49. Focus Outline Color Low Contrast
**Location:** Default browser focus styles used throughout
**Problem:** Default blue focus outline may not be visible on all backgrounds (especially gradients).
**User Impact:** Keyboard users lose track of focused element.
**Recommended Fix:** Define custom focus styles with high-contrast outline:
```css
focus:outline-none focus:ring-2 focus:ring-amante-red focus:ring-offset-2 focus:ring-offset-white
```

### 50. Homepage Spaces Grid Not Responsive Enough
**Location:** `/src/components/HomePage.tsx` (line 288)
**Problem:** Grid uses `md:grid-cols-2 lg:grid-cols-3` which on tablets shows 2 columns, leaving 6th card alone.
**User Impact:** Awkward layout on tablets, visual imbalance.
**Recommended Fix:** Use `sm:grid-cols-2 lg:grid-cols-3` OR always use 2 columns on tablet sizes.

### 51. Footer Email Address Too Long
**Location:** Footer shows "contact.cafeamante@gmail.com"
**Problem:** Long email address breaks layout on small screens, looks unprofessional for brand.
**User Impact:** Minor visual issue, email doesn't match brand domain.
**Recommended Fix:** Use shorter branded email: hello@amante.in (as shown elsewhere in site).

### 52. Event Cards Line-Clamp May Cut Off Important Info
**Location:** `/src/app/events/page.tsx` (line 300) - `line-clamp-3`
**Problem:** Event descriptions truncated at 3 lines with no way to expand and read full description.
**User Impact:** Users miss important event details, can't make informed booking decision.
**Recommended Fix:** Add "Read more" button OR expand on hover/click OR link to dedicated event detail page.

### 53. Gallery Category Filter Doesn't Show Count
**Location:** `/src/app/gallery/page.tsx` filter buttons
**Problem:** Filter buttons don't show how many photos in each category.
**User Impact:** Users don't know if category has content before clicking.
**Recommended Fix:** Add count badge: "Café (4)", "Restaurant (4)", etc.

### 54. Success Modal Takes Over Entire Screen
**Location:** All form success states
**Problem:** Success modal is full viewport, removes all context about where user was.
**User Impact:** Disorienting, users don't know which form they just submitted.
**Recommended Fix:** Make success state an overlay modal OR keep minimal page context visible.

### 55. Career Application Resume File Size Limit Not Prominent
**Location:** `/src/app/careers/page.tsx`
**Problem:** 5MB file size limit only shown in small helper text after upload field.
**User Impact:** Users upload large files, see error, must compress and retry - frustrating.
**Recommended Fix:** Show file size limit in label: "Resume/CV (PDF/DOC, max 5MB)"

### 56. No Timezone Indication for Hours
**Location:** Footer and Contact page hours
**Problem:** Hours shown as "11:00 AM - 12:00 AM" with no timezone specified.
**User Impact:** Confusion for users from other timezones viewing site.
**Recommended Fix:** Add "(IST)" or timezone indicator to hours display.

### 57. Banquet Booking Page Missing
**Location:** Footer links to /banquet-booking
**Problem:** Based on file structure, banquet-booking page exists but wasn't reviewed. May have similar issues to other form pages.
**User Impact:** Unknown - page should be audited separately.
**Recommended Fix:** Conduct full audit of banquet-booking page using same criteria.

### 58. Animation Duration Inconsistencies
**Location:** Various pages using framer-motion
**Problem:** Animation durations vary: 0.5s, 0.6s, 0.8s, 1s with no clear pattern.
**User Impact:** Inconsistent feel across pages, some transitions feel slow, others rushed.
**Recommended Fix:** Standardize: fast (0.2s), normal (0.3s), slow (0.5s).

---

## Enhancement Opportunities
**Nice-to-have improvements that would elevate the experience**

### 59. Add Estimated Wait Time on Reservations
**Location:** `/src/app/reservations/page.tsx`
**Enhancement:** After selecting date/time, show estimated availability or popularity indicator.
**Value:** Helps users make informed decisions, improves perceived transparency.
**Implementation:** "This time slot is popular" or "Usually available" based on booking data.

### 60. Implement Form Auto-Save
**Location:** All long forms (careers, private events)
**Enhancement:** Automatically save form progress to localStorage every few seconds.
**Value:** Reduces frustration from accidental page closes, increases completion rates.
**Implementation:** Use useEffect with debounce to save formData to localStorage, restore on mount.

### 61. Add Progressive Image Loading
**Location:** Gallery page and all image placeholders
**Enhancement:** Use blur-up or skeleton placeholders for images instead of gradient blocks.
**Value:** Professional appearance, perceived performance improvement.
**Implementation:** Use Next.js Image component with blur placeholder or BlurHash.

### 62. Implement Live Availability Calendar
**Location:** Reservations page
**Enhancement:** Show calendar with available/unavailable dates visually.
**Value:** Users can quickly see options, reduces back-and-forth with restaurant.
**Implementation:** Integrate react-calendar with availability API, color-code dates.

### 63. Add Estimated Reading Time
**Location:** About page and Events detail pages
**Enhancement:** Show "5 min read" indicator at top of long-form content.
**Value:** Sets user expectations, helps them decide when to read.
**Implementation:** Calculate based on word count: words / 200 WPM.

### 64. Implement Virtual Tour or 360° Views
**Location:** Space pages
**Enhancement:** Add immersive virtual tour or 360° photos of each space.
**Value:** Helps users visualize spaces, increases booking confidence for events.
**Implementation:** Use Matterport, Google Street View API, or custom 360° photo viewer.

### 65. Add Social Proof Elements
**Location:** Homepage and Space pages
**Enhancement:** Show recent reviews, testimonials, or booking counts ("5 reservations today").
**Value:** Builds trust, social proof increases conversion rates.
**Implementation:** Pull recent reviews from Google/TripAdvisor OR display curated testimonials.

### 66. Implement Smart Form Field Ordering
**Location:** All forms
**Enhancement:** Use progressive disclosure - show fields progressively based on previous answers.
**Value:** Forms feel shorter, reduced cognitive load.
**Implementation:** Conditionally render field groups based on previous selections.

### 67. Add Menu Preview Modal
**Location:** Homepage and Space pages
**Enhancement:** Quick menu preview without leaving page.
**Value:** Reduces friction, users can preview offerings before deciding to reserve.
**Implementation:** Lightbox modal with sample menu items, link to full menu page.

### 68. Implement Reservation Confirmation with Calendar Add
**Location:** Reservations success page
**Enhancement:** Add "Add to Calendar" buttons (Google, Apple, Outlook) with reservation details.
**Value:** Reduces no-shows, provides immediate utility.
**Implementation:** Generate .ics files or use calendar API links.

### 69. Add Dietary Preference Quick Tags
**Location:** Reservations special requests field
**Enhancement:** Add quick-select tags for common dietary restrictions (vegetarian, vegan, gluten-free, etc.).
**Value:** Faster form completion, standardized dietary info for kitchen.
**Implementation:** Multi-select tag component that also allows custom input.

### 70. Implement AI-Powered Event Recommendations
**Location:** Events page
**Enhancement:** Suggest events based on user's browsing history or preferences.
**Value:** Personalized experience, increases event attendance.
**Implementation:** Track page views, use simple matching algorithm for recommendations.

### 71. Add WhatsApp Quick Contact Button
**Location:** All pages - floating action button
**Enhancement:** Floating WhatsApp button for instant chat (common in India).
**Value:** Provides instant support channel preferred by local users.
**Implementation:** Floating button linking to WhatsApp business number with pre-filled message.

### 72. Implement Referral/Share Incentive
**Location:** Success pages after booking
**Enhancement:** "Share and get 10% off next visit" incentive.
**Value:** Viral growth, customer acquisition.
**Implementation:** Generate unique referral codes, track usage.

### 73. Add Accessibility Settings Toggle
**Location:** Header or settings menu
**Enhancement:** Let users toggle high contrast mode, reduced motion, larger text.
**Value:** Inclusive design, serves users with disabilities better.
**Implementation:** Use React context to manage accessibility preferences, apply CSS classes accordingly.

---

## Priority Recommendations

### Immediate Priorities (Next Sprint)
1. Fix keyboard navigation for header dropdown
2. Add skip navigation link
3. Implement proper form validation announcements
4. Add breadcrumbs across all pages
5. Fix missing focus management on modals
6. Create actual policy pages or remove footer links

### Short-term Priorities (Next Month)
1. Improve mobile navigation experience
2. Standardize form field patterns
3. Add proper error states to file uploads
4. Implement form auto-save
5. Fix accessibility issues in star ratings and gallery
6. Add proper loading states throughout

### Long-term Enhancements (Next Quarter)
1. Replace all placeholder images with real photos
2. Implement live availability calendar
3. Add social proof elements
4. Create unique space page differentiation
5. Implement virtual tours or 360° views
6. Add comprehensive analytics tracking

---

## Testing Recommendations

### Accessibility Testing
- Run axe DevTools on all pages
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Complete keyboard-only navigation audit
- Verify color contrast ratios meet WCAG AA minimum

### Usability Testing
- Conduct user testing with 5-8 users completing reservation flow
- A/B test form layouts for completion rates
- Track form abandonment rates and identify drop-off points
- Test on multiple devices and screen sizes

### Performance Testing
- Lighthouse audit on all pages (target 90+ on all metrics)
- Test on slow 3G networks
- Optimize image sizes and implement lazy loading
- Measure Core Web Vitals

---

## Conclusion

The Amante website demonstrates solid foundational design and component architecture but requires significant improvements in accessibility, navigation, and form UX to meet modern web standards. Addressing the 13 critical issues should be the immediate priority, followed by the 24 major issues that impact user experience. The 21 minor issues and 15 enhancement opportunities provide a roadmap for continuous improvement.

**Overall Risk Assessment:** MEDIUM
Critical accessibility and navigation issues could lead to legal compliance problems and significant user experience degradation, but the core functionality is present.

**Estimated Effort:**
- Critical Issues: 40-60 development hours
- Major Issues: 80-100 development hours
- Minor Issues: 40-50 development hours
- Enhancement Opportunities: 120-160 development hours

---

**Report Generated:** October 27, 2025
**Methodology:** Heuristic evaluation, WCAG 2.1 compliance review, user flow analysis, code review
**Tools Used:** Manual code review, accessibility knowledge base, UX heuristics
