# Issue #001: Missing XS Breakpoint Definition

**Status:** 🔴 CRITICAL
**Component:** Tailwind Configuration
**File:** `tailwind.config.js`
**Impact:** Site-wide responsive breakage
**Priority:** P0 - Must fix immediately

---

## Description

The codebase extensively uses `xs:` responsive prefix (e.g., `xs:text-sm`, `xs:px-5`, `xs:bottom-24`) across multiple components, but this breakpoint is NOT defined in `tailwind.config.js`.

## Current Behavior

- All `xs:*` classes are being ignored by Tailwind
- The styles are not being generated in the CSS output
- Mobile responsiveness is partially broken

## Files Affected

Based on initial scan:
- `src/components/HomePage.tsx` - Lines 31, 33, 113, 115, 120-150
- `src/components/HeroCarousel/HeroSlide.tsx` - Multiple occurrences
- `src/app/restaurant/page.tsx` - Multiple occurrences
- `src/app/lounge/page.tsx` - Multiple occurrences
- `src/app/club/page.tsx` - Multiple occurrences
- `src/app/cafe/page.tsx` - Multiple occurrences
- `src/app/private-dining/page.tsx` - Multiple occurrences

## Expected Behavior

The `xs:` breakpoint should be defined in Tailwind config and work at the intended breakpoint (likely 475px or 520px based on common practice).

## Root Cause

Tailwind CSS v4 default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

There is NO `xs` breakpoint by default.

## Proposed Fix

Add custom `xs` breakpoint to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // or '520px' depending on design intent
      },
      colors: {
        // existing colors...
      }
    },
  },
}
```

## Testing Required

After fix:
1. Verify Tailwind generates `xs:*` classes
2. Test all pages at xs breakpoint (475px)
3. Ensure no layout regression at other breakpoints
4. Check mobile (320-474px) still works

## Severity Justification

**CRITICAL** because:
- Affects multiple pages site-wide
- Mobile experience is degraded
- Classes are silently failing
- Easy fix with high impact

## Next Steps

1. Add `xs` breakpoint to Tailwind config
2. Rebuild CSS
3. Test at 475px viewport
4. Verify all xs: classes now work
5. Document the breakpoint for future use
