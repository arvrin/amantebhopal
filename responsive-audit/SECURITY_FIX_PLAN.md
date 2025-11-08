# Security Fix Implementation Plan
**Date:** 2025-11-08
**Status:** Ready for Implementation
**Estimated Time:** ~90 minutes total

---

## 🎯 Fix Priority Matrix

| Priority | Issue | Complexity | Time | Risk |
|----------|-------|------------|------|------|
| 🔴 P0 | JWT_SECRET fallback | Trivial | 5 min | Low |
| 🔴 P0 | Vulnerable xlsx package | Trivial | 2 min | Low |
| 🟡 P1 | CORS wildcard | Easy | 15 min | Low |
| 🟡 P1 | In-memory rate limiting | Medium | 30 min | Medium |
| 🟡 P1 | Resend API key validation | Trivial | 5 min | Low |
| 🟢 P2 | JWT expiry duration | Trivial | 10 min | Low |
| 🟢 P2 | Email config validation | Easy | 10 min | Low |
| 🟢 P3 | 2FA implementation | Complex | Future | High |
| 🟢 P3 | Client identifier | Easy | 13 min | Low |

---

## 🔴 P0 - CRITICAL FIXES (Must Do Before Production)

### Fix #1: Remove JWT_SECRET Fallback Value

**Files to Modify:**
1. `src/lib/admin/auth.ts:4`
2. `src/app/api/admin/auth/route.ts:5`

**Current Code:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
```

**Fixed Code:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    'CRITICAL: JWT_SECRET environment variable is required but not set. ' +
    'Admin authentication will not work without this.'
  );
}
```

**Implementation Steps:**

1. **Edit src/lib/admin/auth.ts:**
```typescript
// Line 4 - Replace entire JWT_SECRET declaration
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    'CRITICAL: JWT_SECRET environment variable is required but not set. ' +
    'Admin authentication will not work without this.'
  );
}
```

2. **Edit src/app/api/admin/auth/route.ts:**
```typescript
// Line 5 - Replace entire JWT_SECRET declaration
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    'CRITICAL: JWT_SECRET environment variable is required but not set. ' +
    'Admin authentication will not work without this.'
  );
}
```

3. **Verify JWT_SECRET is set in Vercel:**
```bash
# Check production
vercel env ls production | grep JWT_SECRET

# If not set, add it:
# Generate strong secret:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Add to Vercel:
vercel env add JWT_SECRET production
# Paste the generated secret when prompted
```

4. **Test locally:**
```bash
# Remove JWT_SECRET from .env.local temporarily
# Start dev server - should throw error immediately
npm run dev

# Restore JWT_SECRET
# Server should start normally
```

**Verification:**
- ✅ Development throws error without JWT_SECRET
- ✅ Production deployment fails if JWT_SECRET missing
- ✅ Admin login still works with JWT_SECRET set

**Time:** 5 minutes
**Risk:** Low (fail-fast is safer than fallback)

---

### Fix #2: Update Vulnerable xlsx Package

**Current Version:** `xlsx@0.18.5`
**Required Version:** `xlsx@0.20.2` or later

**Implementation Steps:**

1. **Update package:**
```bash
cd "/Users/aaryavar/Documents/ARVR Project Codes/Amante/amante-coming-soon"

# Remove old version
npm uninstall xlsx

# Install latest version
npm install xlsx@latest --save-dev
```

2. **Verify update:**
```bash
# Check new version
npm list xlsx

# Run audit again
npm audit

# Should show 0 vulnerabilities
```

3. **Test menu generation scripts:**
```bash
# Test if scripts still work with new version
node scripts/generate-menu-excel.js
# Verify Excel files generate correctly
```

**Files That May Need Updates:**
- `scripts/generate-menu-excel.js` (if using deprecated API)

**Verification:**
- ✅ npm audit shows 0 vulnerabilities
- ✅ Menu Excel generation still works
- ✅ No breaking changes in usage

**Time:** 2 minutes
**Risk:** Low (devDependency only, not in production)

---

## 🟡 P1 - HIGH PRIORITY FIXES (Before Production)

### Fix #3: Implement Proper CORS Configuration

**Strategy:** Centralized CORS middleware in Next.js

**Files to Modify:**
- Create: `src/middleware.ts` (NEW)
- Modify: All API routes with CORS headers (5 files)

**Implementation:**

#### Option A: Next.js Middleware (Recommended)

**Create `src/middleware.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';

// Allowed origins for CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://amante.in',
      'https://www.amante.in',
      // Add any other production domains
    ]
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
    ];

export function middleware(request: NextRequest) {
  // Get the origin from the request
  const origin = request.headers.get('origin');

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });

    // Set CORS headers
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours

    return response;
  }

  // For actual requests, add CORS headers to response
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

// Apply middleware to API routes only
export const config = {
  matcher: '/api/:path*',
};
```

**Remove CORS from individual API routes:**

**Files to modify:**
1. `src/app/api/careers/route.ts`
2. `src/app/api/feedback/route.ts`
3. `src/app/api/private-events/route.ts`
4. `src/app/api/reservations/route.ts`
5. `src/app/api/contact/route.ts`

**In each file, remove OPTIONS handler:**

```typescript
// DELETE THIS ENTIRE FUNCTION:
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',  // ❌ Remove
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

**Verification:**

1. **Test from allowed origin:**
```bash
# Should work
curl -X OPTIONS https://amante.in/api/contact \
  -H "Origin: https://amante.in" \
  -v

# Check for:
# < Access-Control-Allow-Origin: https://amante.in
```

2. **Test from disallowed origin:**
```bash
# Should NOT include CORS headers
curl -X OPTIONS https://amante.in/api/contact \
  -H "Origin: https://evil.com" \
  -v

# Should NOT see Access-Control-Allow-Origin header
```

3. **Test actual POST:**
```javascript
// From browser console on amante.in
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    phone: '+919999999999',
    inquiryType: 'General',
    message: 'Test message'
  })
}).then(r => r.json()).then(console.log);

// Should work
```

```javascript
// From browser console on evil.com
fetch('https://amante.in/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* ... */ })
});

// Should fail with CORS error
```

**Time:** 15 minutes
**Risk:** Low (can easily revert middleware)

---

### Fix #4: Upgrade Rate Limiting to Upstash Redis

**Current:** In-memory Map (doesn't work in serverless)
**Target:** Upstash Redis (persistent, serverless-compatible)

**Implementation Steps:**

#### Step 1: Sign up for Upstash

```bash
# 1. Go to https://upstash.com
# 2. Sign up with GitHub (free tier)
# 3. Create new Redis database
#    - Name: amante-rate-limit
#    - Region: Choose closest to Vercel region
#    - Type: Regional (free)
# 4. Copy REST URL and REST Token
```

#### Step 2: Install Dependencies

```bash
npm install @upstash/redis @upstash/ratelimit
```

#### Step 3: Add Environment Variables

```bash
# Add to .env.local for development
echo "UPSTASH_REDIS_REST_URL=https://your-db.upstash.io" >> .env.local
echo "UPSTASH_REDIS_REST_TOKEN=your-token-here" >> .env.local

# Add to Vercel production
vercel env add UPSTASH_REDIS_REST_URL production
# Paste URL when prompted

vercel env add UPSTASH_REDIS_REST_TOKEN production
# Paste token when prompted
```

#### Step 4: Update src/lib/api-utils.ts

**Replace RateLimiter class (lines 67-95):**

```typescript
// Remove old class:
// class RateLimiter { ... }

// Add new imports at top of file:
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Create rate limiters with sliding window algorithm
export const apiRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per minute
  analytics: true,
  prefix: 'ratelimit:api',
});

export const strictRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '60 s'), // 3 requests per minute
  analytics: true,
  prefix: 'ratelimit:strict',
});
```

**Update checkRateLimit function (lines 102-116):**

```typescript
// Before:
export function checkRateLimit(
  clientId: string,
  limiter: RateLimiter = apiRateLimiter
): NextResponse | null {
  if (limiter.isRateLimited(clientId)) {
    return errorResponse('Too many requests. Please try again later.', 429);
  }
  return null;
}

// After:
export async function checkRateLimit(
  clientId: string,
  limiter: Ratelimit = apiRateLimiter
): Promise<NextResponse | null> {
  const { success, limit, reset, remaining } = await limiter.limit(clientId);

  if (!success) {
    const resetDate = new Date(reset);
    return errorResponse(
      `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.`,
      429,
      {
        limit,
        remaining: 0,
        reset: reset,
      }
    );
  }

  return null;
}
```

#### Step 5: Update All API Route Handlers

**In EVERY API route that uses checkRateLimit, change:**

```typescript
// Before:
export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);

  const rateLimitResponse = checkRateLimit(clientId);  // ❌ Not awaited
  if (rateLimitResponse) {
    return rateLimitResponse;
  }
  // ...
}

// After:
export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);

  const rateLimitResponse = await checkRateLimit(clientId);  // ✅ Awaited
  if (rateLimitResponse) {
    return rateLimitResponse;
  }
  // ...
}
```

**Files to modify:**
- `src/app/api/contact/route.ts`
- `src/app/api/reservations/route.ts`
- `src/app/api/private-events/route.ts`
- `src/app/api/feedback/route.ts`
- `src/app/api/careers/route.ts`
- `src/app/api/admin/auth/route.ts`

#### Step 6: Test Rate Limiting

```bash
# Local test
npm run dev

# Test with curl (should allow 10, block 11th)
for i in {1..15}; do
  echo "Request $i:"
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","phone":"+919999999999","inquiryType":"General","message":"Test"}' \
    -w "\nStatus: %{http_code}\n\n"
done

# First 10 should succeed (200)
# Requests 11-15 should fail (429)
```

**Verification:**
- ✅ First 10 requests succeed
- ✅ 11th request returns 429 with clear error message
- ✅ Rate limit persists across server restarts
- ✅ Upstash dashboard shows request analytics

**Time:** 30 minutes
**Risk:** Medium (requires testing in production, but has fallback)

**Fallback Plan:**
If Upstash has issues, temporarily disable rate limiting:
```typescript
export async function checkRateLimit() {
  return null; // Temporarily disable
}
```

---

### Fix #5: Resend API Key Validation

**File:** `src/lib/email.ts:22-26`

**Current Code:**
```typescript
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined. Email sending will fail.');
}

export const resend = new Resend(process.env.RESEND_API_KEY || '');
```

**Fixed Code:**

```typescript
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error(
    'CRITICAL: RESEND_API_KEY environment variable is required. ' +
    'Email functionality will not work without this. ' +
    'Get your API key from https://resend.com/api-keys'
  );
}

export const resend = new Resend(RESEND_API_KEY);
```

**Verification:**

1. **Test without API key:**
```bash
# Remove from .env.local
# Start dev server - should throw error
npm run dev
```

2. **Test with API key:**
```bash
# Restore API key
# Server should start
# Test email sending
```

3. **Verify in Vercel:**
```bash
vercel env ls production | grep RESEND_API_KEY
```

**Time:** 5 minutes
**Risk:** Low

---

## 🟢 P2 - MEDIUM PRIORITY FIXES (Recommended)

### Fix #6: Reduce JWT Expiry Duration

**File:** `src/app/api/admin/auth/route.ts:63`

**Current:**
```typescript
const token = sign(
  { phone, name, role, accessLevel },
  JWT_SECRET,
  { expiresIn: '7d' }
);
```

**Option A: Simple Reduction**
```typescript
const token = sign(
  { phone, name, role, accessLevel },
  JWT_SECRET,
  { expiresIn: '24h' }  // 24 hours instead of 7 days
);

// Update cookie maxAge too:
response.cookies.set('admin_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24,  // 24 hours instead of 7 days
  path: '/',
});
```

**Option B: Refresh Token Pattern (More Complex)**

Create new file `src/app/api/admin/refresh/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Verify refresh token
    const decoded = verify(refreshToken.value, JWT_SECRET) as {
      phone: string;
      type: string;
    };

    if (decoded.type !== 'refresh') {
      return NextResponse.json({ error: 'Invalid token type' }, { status: 401 });
    }

    // Get user from Google Sheets
    const { findUserByPhone } = await import('@/lib/googleSheets');
    const user = await findUserByPhone(decoded.phone);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Issue new access token
    const newAccessToken = sign(
      {
        phone: user['Phone Number'],
        name: user['Name'],
        role: user['Role'],
        accessLevel: user['Access Level'],
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}
```

Update `src/app/api/admin/auth/route.ts`:
```typescript
// Issue both access and refresh tokens
const accessToken = sign(
  { phone: user['Phone Number'], name: user['Name'], role: user['Role'], accessLevel: user['Access Level'] },
  JWT_SECRET,
  { expiresIn: '1h' }
);

const refreshToken = sign(
  { phone: user['Phone Number'], type: 'refresh' },
  JWT_SECRET,
  { expiresIn: '7d' }
);

response.cookies.set('admin_token', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60, // 1 hour
  path: '/',
});

response.cookies.set('refresh_token', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
});
```

**Recommendation:** Start with Option A (simple), implement Option B in v1.1

**Time:** 10 minutes (Option A) or 45 minutes (Option B)
**Risk:** Low

---

### Fix #7: Email Configuration Validation

**File:** `src/lib/email.ts`

**Add after imports:**

```typescript
// Validate email configuration on initialization
if (process.env.NODE_ENV === 'production') {
  const requiredEmailEnvVars = [
    'RESEND_API_KEY',
    'EMAIL_FROM_ADDRESS',
    'RESTAURANT_EMAIL',
    'EVENTS_EMAIL',
    'CAREERS_EMAIL',
    'GENERAL_EMAIL',
    'FEEDBACK_EMAIL',
  ];

  const missing = requiredEmailEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ CRITICAL: Missing required email configuration for production:\n` +
      missing.map((key) => `   - ${key}`).join('\n')
    );

    throw new Error(
      `Missing required email environment variables: ${missing.join(', ')}. ` +
      `Email functionality will not work properly in production.`
    );
  }

  console.log('✅ Email configuration validated for production');
}
```

**Update EMAIL_CONFIG to remove fallbacks in production:**

```typescript
export const EMAIL_CONFIG = {
  from: {
    name: process.env.EMAIL_FROM_NAME || 'Amante Restaurant',
    address: process.env.EMAIL_FROM_ADDRESS || (
      process.env.NODE_ENV === 'production'
        ? (() => { throw new Error('EMAIL_FROM_ADDRESS required in production'); })()
        : 'hello@amante.in'
    ),
  },
  recipients: {
    reservations: process.env.RESTAURANT_EMAIL || (
      process.env.NODE_ENV === 'production'
        ? (() => { throw new Error('RESTAURANT_EMAIL required in production'); })()
        : 'reservations@amante.in'
    ),
    // ... same pattern for all emails
  },
  // ... rest of config
};
```

**Verification:**
```bash
# Build should fail if emails not configured
vercel build

# Should see clear error message listing missing vars
```

**Time:** 10 minutes
**Risk:** Low

---

## 🟢 P3 - LOW PRIORITY / FUTURE ENHANCEMENTS

### Enhancement #1: Implement 2FA/OTP

**Complexity:** High
**Time:** 2-4 hours
**Priority:** Future (v1.1 or v2.0)

**Options:**

1. **Firebase Authentication** (Recommended)
2. **Twilio Verify API**
3. **AWS SNS**
4. **NextAuth with SMS provider**

**Not implementing now** - requires significant changes to auth flow.

---

### Enhancement #2: Improve Client Identifier

**File:** `src/lib/api-utils.ts:136-147`

**Better Implementation:**

```typescript
import crypto from 'crypto';

export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  if (ip !== 'unknown') {
    return `ip:${ip}`;
  }

  // Generate fingerprint from multiple headers
  const fingerprintComponents = [
    request.headers.get('user-agent') || '',
    request.headers.get('accept-language') || '',
    request.headers.get('accept-encoding') || '',
    request.headers.get('accept') || '',
  ];

  const fingerprint = crypto
    .createHash('sha256')
    .update(fingerprintComponents.join('|'))
    .digest('hex')
    .slice(0, 16);

  return `fp:${fingerprint}`;
}
```

**Time:** 13 minutes
**Risk:** Low
**Priority:** P3 - Nice to have

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Critical Fixes (Required Before Production)
- [ ] Fix #1: Remove JWT_SECRET fallback (5 min)
- [ ] Fix #2: Update xlsx package (2 min)
- [ ] Verify no critical vulnerabilities: `npm audit`
- [ ] Test admin login still works
- [ ] Commit: "fix(security): Remove JWT_SECRET fallback and update vulnerable packages"

### Phase 2: High Priority Fixes (Recommended Before Production)
- [ ] Fix #3: Implement CORS middleware (15 min)
- [ ] Fix #4: Upgrade to Upstash Redis rate limiting (30 min)
- [ ] Fix #5: Add Resend API key validation (5 min)
- [ ] Test all API endpoints with rate limiting
- [ ] Test CORS from allowed and disallowed origins
- [ ] Commit: "feat(security): Implement proper CORS and Redis-based rate limiting"

### Phase 3: Medium Priority Fixes (Nice to Have)
- [ ] Fix #6: Reduce JWT expiry to 24h (10 min)
- [ ] Fix #7: Add email config validation (10 min)
- [ ] Test admin session expiry
- [ ] Verify email configuration on build
- [ ] Commit: "feat(security): Improve JWT expiry and email validation"

### Phase 4: Testing & Deployment
- [ ] Run full test suite: `npm test`
- [ ] Build production: `npm run build`
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Smoke test all endpoints in production
- [ ] Verify rate limiting works in production
- [ ] Monitor for errors in Vercel logs

---

## 🔧 QUICK REFERENCE COMMANDS

### Dependency Updates
```bash
npm uninstall xlsx
npm install xlsx@latest --save-dev
npm audit
```

### Environment Variable Management
```bash
# List production variables
vercel env ls production

# Add new variable
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production

# Remove variable (if needed)
vercel env rm VARIABLE_NAME production
```

### Testing Rate Limiting
```bash
# Test rate limit (10 requests allowed)
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","phone":"+919999999999","inquiryType":"General","message":"Test"}' \
    -w "Status: %{http_code}\n"
done
```

### Build & Deploy
```bash
# Local build test
npm run build

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📊 ESTIMATED TIMELINE

### Minimum (Critical Only)
- **Time:** ~7 minutes
- **Fixes:** #1, #2
- **Status:** Production-ready with basic security

### Recommended (Critical + High)
- **Time:** ~60 minutes
- **Fixes:** #1, #2, #3, #4, #5
- **Status:** Production-ready with excellent security

### Comprehensive (All P0-P2)
- **Time:** ~90 minutes
- **Fixes:** #1-7
- **Status:** Production-ready with premium security

---

## 🎯 SUCCESS CRITERIA

### After Implementation:
✅ `npm audit` shows 0 vulnerabilities
✅ JWT_SECRET required in all environments
✅ CORS only allows amante.in origins
✅ Rate limiting persists across serverless instances
✅ All required email variables validated
✅ Admin login works with secure tokens
✅ API endpoints protected from abuse
✅ No sensitive data exposed in errors

---

**Plan Created:** 2025-11-08
**Ready to Implement:** Yes
**Estimated Total Time:** 60-90 minutes
**Risk Level:** Low (all changes reversible via Git)
